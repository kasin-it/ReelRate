import { getMovieKeywords } from "@/actions/get-keywords"
import { getMovieReviews } from "@/actions/get-reviews"
import { Opinions } from "@/enums/opinions"
import { Movie, MovieDetails } from "@/types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { DataTMDB, SingleDataTMDB } from "@/types/tmdb"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getRating(reviewAverage: number, totalReviews: number) {
    let color = "bg-negative text-white"
    let opinion = Opinions.VeryBad

    let reviewAverageValue = reviewAverage.toPrecision(2)

    if (reviewAverage === 10) {
        reviewAverageValue = reviewAverage.toPrecision(1)
    }

    if (reviewAverage > 8) {
        opinion = Opinions.VeryGood
        color = "bg-positive text-white"
    } else if (reviewAverage > 6) {
        opinion = Opinions.Good
        color = "bg-positive text-white"
    } else if (reviewAverage > 4) {
        opinion = Opinions.Mixed
        color = "bg-passive"
    } else if (reviewAverage > 1) {
        color = "bg-negative text-white"
        opinion = Opinions.Bad
    }

    if (totalReviews === 0) {
        color = "bg-positive text-white"
        opinion = Opinions.NA
        reviewAverageValue = "N/A"
    }

    return { color, opinion, reviewAverageValue }
}

export function getImagePath(fileName: string) {
    const url = `https://image.tmdb.org/t/p/original${fileName}`
    return url
}

export function getMoviePath(movieId: string) {
    const url = `/movie/${movieId}`
    return url
}

export async function getMovieWithReviews(
    movieData: SingleDataTMDB
): Promise<MovieDetails | undefined> {
    const movieId = movieData.id.toString()

    try {
        const { success, data, error } = await getMovieReviews(movieId)

        if (!success) {
            console.error(
                `Failed to retrieve reviews for movie ${movieId}: ${
                    error || "Unknown error"
                }`
            )
            return undefined
        }

        if (!data) {
            return undefined
        }

        const {
            review_average,
            passive_reviews,
            positive_reviews,
            negative_reviews,
        } = data

        const movieWithReviews: MovieDetails = {
            ...movieData,
            reviewAverage: review_average,
            positiveReviewsCount: positive_reviews,
            passiveReviewsCount: passive_reviews,
            negativeReviewsCount: negative_reviews,
        }

        return movieWithReviews
    } catch (error) {
        console.error(`Error processing movie ${movieId}: ${error}`)
        return undefined
    }
}

export async function getMoviesListWithReviews(
    moviesData: DataTMDB
): Promise<Movie[]> {
    const movies: Movie[] = []

    for (const result of moviesData.results) {
        const movieId = result.id.toString()

        try {
            const keywordsData = await getMovieKeywords(movieId)
            const { success, data, error } = await getMovieReviews(movieId)

            if (!success || !data) {
                console.error(
                    `Failed to retrieve reviews for movie ${movieId}: ${
                        error || "Unknown error"
                    }`
                )
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
