import { getMovieKeywords } from "@/actions/get-keywords"
import { getMovieReviews } from "@/actions/get-reviews"
import { Opinions } from "@/enums/opinions"
import { Movie } from "@/types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { DataTMBD } from "@/types/tmbd"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getRating(value: number, totalReviews: number) {
    let color = "bg-negative text-white"
    let opinion = Opinions.VeryBad

    if (value > 8) {
        opinion = Opinions.VeryGood
        color = "bg-positive text-white"
    } else if (value > 6) {
        opinion = Opinions.Good
        color = "bg-positive text-white"
    } else if (value > 4) {
        opinion = Opinions.Mixed
        color = "bg-passive"
    } else if (value > 1) {
        color = "bg-negative text-white"
        opinion = Opinions.Bad
    }

    if (totalReviews === 0) {
        color = "bg-positive text-white"
        opinion = Opinions.NA
    }

    return { color: color, opinion }
}

export function getImagePath(fileName: string) {
    const url = `https://image.tmdb.org/t/p/original${fileName}`
    return url
}

export function getMoviePath(movieId: string) {
    const url = `/movie/${movieId}`
    return url
}

export async function getMoviesListWithReviews(
    data: DataTMBD
): Promise<Movie[]> {
    const movies: Movie[] = []

    for (const result of data.results) {
        const movieId = result.id.toString()

        try {
            const keywordsData = await getMovieKeywords(movieId)
            const { success, data, error } = await getMovieReviews(movieId)

            if (!success) {
                console.error(
                    `Failed to retrieve reviews for movie ${movieId}: ${
                        error || "Unknown error"
                    }`
                )
                continue
            }

            if (!data) {
                continue
            }

            const {
                review_average,
                passive_reviews,
                positive_reviews,
                negative_reviews,
            } = data

            const movieWithKeywords: Movie = {
                ...result,
                keywords: keywordsData?.keywords,
                reviewAverage: review_average,
                positiveReviewsCount: positive_reviews,
                passiveReviewsCount: passive_reviews,
                negativeReviewsCount: negative_reviews,
            }
            movies.push(movieWithKeywords)
        } catch (error) {
            console.error(`Error processing movie ${movieId}: ${error}`)
        }
    }

    return movies
}
