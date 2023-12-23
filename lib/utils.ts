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

export function getRating(value: number) {
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

    return { color: color, opinion }
}

export async function getMoviesListWithReviews(
    data: DataTMBD
): Promise<Movie[]> {
    const movies: Movie[] = []

    for (const result of data.results) {
        const movie_id = result.id.toString()
        const keywordsData = await getMovieKeywords(movie_id)
        const {
            reviewAverage,
            positiveReviewsCount,
            passiveReviewsCount,
            negativeReviewsCount,
        } = await getMovieReviews(movie_id)

        const movieWithKeywords: Movie = {
            ...result,
            keywords: keywordsData?.keywords,
            reviewAverage,
            positiveReviewsCount,
            passiveReviewsCount,
            negativeReviewsCount,
        }
        movies.push(movieWithKeywords)
    }

    return movies
}
