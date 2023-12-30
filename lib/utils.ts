import { getMovieKeywords } from "@/actions/tmdb"
import { Opinions } from "@/enums/opinions"
import { Movie, MovieDetails } from "@/types"
import { UserReview } from "@prisma/client"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { DataTMDB, SingleDataTMDB } from "@/types/tmdb"
import prisma from "@/lib/prisma"

import { Genre } from "./../types/tmdb"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getRating(reviewAverage: number, totalReviews: number) {
    let color = "bg-negative text-white"
    let opinion = Opinions.VeryBad

    let reviewAverageValue = reviewAverage.toPrecision(2)

    if (reviewAverage > 8) {
        opinion = Opinions.VeryGood
        color = "bg-positive text-white"
    } else if (reviewAverage > 6) {
        opinion = Opinions.Good
        color = "bg-positive text-white"
    } else if (reviewAverage > 3) {
        opinion = Opinions.Mixed
        color = "bg-passive text-black"
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
    return `https://image.tmdb.org/t/p/original${fileName}`
}

export function getMoviePath(movieId: string) {
    return `/movie/${movieId}`
}

export function filterUserReviews(reviews: UserReview[], movieId: string) {
    const filteredReviews = reviews.filter((review) => {
        if (review.movie_id == movieId) {
            return review
        }
    })
    return filteredReviews
}

export async function getMovieWithReviews(
    movieData: SingleDataTMDB
): Promise<MovieDetails | null> {
    const movieId = movieData.id.toString()

    try {
        const genres = (await getMovieKeywords(movieId)) as Genre[]
        const movie = await prisma.movie.findFirst({
            where: {
                id: movieId,
            },
            include: {
                user_reviews: true,
            },
        })

        if (!movie) {
            return null
        }

        let reviewAverage = 0
        let positiveReviews = 0
        let passiveReviews = 0
        let negativeReviews = 0

        movie.user_reviews.forEach((review) => {
            const { opinion } = getRating(review.rating, 1)

            reviewAverage += review.rating

            if (opinion == Opinions.Good || opinion == Opinions.VeryGood) {
                positiveReviews += 1
            } else if (opinion == Opinions.Mixed) {
                passiveReviews += 1
            } else {
                negativeReviews += 1
            }
        })

        if (movie.user_reviews.length > 0) {
            reviewAverage /= movie.user_reviews.length
        }

        const movieWithReviews: MovieDetails = {
            ...movieData,
            genres,
            reviewAverage: reviewAverage,
            positiveReviewsCount: positiveReviews,
            passiveReviewsCount: passiveReviews,
            negativeReviewsCount: negativeReviews,
        }

        return movieWithReviews
    } catch (error) {
        console.error(`Error processing movie ${movieId}: ${error}`)
        return null
    }
}

export async function getMoviesListWithReviews(
    moviesData: DataTMDB
): Promise<Movie[]> {
    const movies: Movie[] = []

    for (let result of moviesData.results) {
        const movieId = result.id.toString()

        try {
            const genres = (await getMovieKeywords(movieId)) as Genre[]
            const movie = await prisma.movie.findFirst({
                where: {
                    id: movieId,
                },
                include: {
                    user_reviews: true,
                },
            })

            if (!movie) {
                continue
            }

            let reviewAverage = 0
            let positiveReviews = 0
            let passiveReviews = 0
            let negativeReviews = 0

            movie.user_reviews.forEach((review) => {
                const { opinion } = getRating(review.rating, 1)

                reviewAverage += review.rating

                if (opinion == Opinions.Good || opinion == Opinions.VeryGood) {
                    positiveReviews += 1
                } else if (opinion == Opinions.Mixed) {
                    passiveReviews += 1
                } else {
                    negativeReviews += 1
                }
            })

            if (movie.user_reviews.length > 0) {
                reviewAverage /= movie.user_reviews.length
            }

            const movieWithReviews = {
                ...result,
                genres,
                reviewAverage: reviewAverage,
                positiveReviewsCount: positiveReviews,
                passiveReviewsCount: passiveReviews,
                negativeReviewsCount: negativeReviews,
            }

            movies.push(movieWithReviews)
        } catch (error) {
            console.error(`Error processing movie ${movieId}: ${error}`)
        }
    }

    return movies
}
