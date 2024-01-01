import { getMovieKeywords } from "@/actions/tmdb"
import { Opinions } from "@/enums/opinions"
import { Movie, MovieDetails } from "@/types"
import { getServerSession } from "next-auth"

import { DataTMDB, Genre, SingleDataTMDB } from "@/types/tmdb"
import prisma from "@/lib/prisma"
import { getRating } from "@/lib/utils"

export async function getSelf(includeReviews: boolean = false) {
    const session = await getServerSession()

    if (!session || !session.user || !session.user.email) {
        return null
    }

    try {
        const user = await prisma.user.findFirst({
            where: {
                email: session.user.email,
            },
            include: {
                userReviews: includeReviews,
            },
        })

        return user
    } catch (error) {
        console.error("Error fetching or creating user:", error)
    }
}

export async function getMovieReviewsbyId(movieId: string) {
    try {
        const reviews = await prisma.userReview.findMany({
            where: {
                movie_id: movieId,
            },
            include: {
                user: {
                    select: {
                        name: true,
                    },
                },
            },
        })

        return reviews
    } catch (error) {
        console.error("Error fetching movie reviews:", error)
    }
}

export async function getMovie(movieId: string) {
    const movie = await prisma.movie.findFirst({
        where: {
            id: movieId,
        },
        include: {
            userReviews: true,
        },
    })

    if (movie) {
        return movie
    }

    const new_movie = await prisma.movie.create({
        data: {
            id: movieId,
        },
        include: {
            userReviews: true,
        },
    })

    return new_movie
}

export async function getMovieWithReviews(
    movieData: SingleDataTMDB
): Promise<MovieDetails | null> {
    const movieId = movieData.id.toString()

    try {
        const genres = (await getMovieKeywords(movieId)) as Genre[]
        const movie = await getMovie(movieId)

        let reviewAverage = 0
        let positiveReviews = 0
        let passiveReviews = 0
        let negativeReviews = 0

        movie.userReviews.forEach((review) => {
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

        if (movie.userReviews.length > 0) {
            reviewAverage /= movie.userReviews.length
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
            const movie = await getMovie(movieId)

            let reviewAverage = 0
            let positiveReviews = 0
            let passiveReviews = 0
            let negativeReviews = 0

            movie.userReviews.forEach((review) => {
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

            if (movie.userReviews.length > 0) {
                reviewAverage /= movie.userReviews.length
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
