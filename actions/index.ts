import { getMovieById, getMovieKeywords } from "@/actions/tmdb"
import { Opinions } from "@/enums/opinions"
import { Movie, MovieDetails, UserFavouriteWithMovie, UserReviewWithMovie } from "@/types"
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

export async function getUserReviews() {
    const user = await getSelf()

    if (!user) {
        throw new Error("UNAUTHORIZED")
    }

    const movies: UserReviewWithMovie[] = []

    try {
        const reviews = await prisma.userReview.findMany({
            where: {
                user_id: user.id,
            },
            include: {
                movie: true,
            },
        })

        if (!reviews) {
            return movies
        }

        for (let movieReview of reviews) {
            const movieId = movieReview.movie_id
            try {
                const movie = await getMovieById(movieId)

                movies.push({ ...movieReview, ...movie })
            } catch (error) {
                console.error("Error fetching user favourite movie id: ", movieId)
            }
        }
    } catch (error) {
        console.error("Error fetching user reviews:", error)
    }

    return movies
}

export async function getUserFavourites(): Promise<UserFavouriteWithMovie[]> {
    const user = await getSelf()

    if (!user) {
        throw new Error("UNAUTHORIZED")
    }

    const movies: UserFavouriteWithMovie[] = []

    try {
        const favourites = await prisma.userFavourite.findMany({
            where: {
                user_id: user.id,
            },
            include: {
                movie: true,
            },
        })

        if (!favourites) {
            return movies
        }

        for (let favouriteMovie of favourites) {
            const movieId = favouriteMovie.movie_id
            try {
                const movie = await getMovieById(movieId)

                movies.push({ ...favouriteMovie, ...movie })
            } catch (error) {
                console.error("Error fetching id: ", movieId)
            }
        }
    } catch (error) {
        console.error("Error fetching user favourites:", error)
    }

    return movies
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
