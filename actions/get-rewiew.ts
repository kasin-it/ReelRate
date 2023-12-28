import prisma from "@/lib/prisma"

export async function getMovieInfo(movie_id: string) {
    try {
        let movie = await prisma.movie.findFirst({
            where: {
                movie_id,
            },
        })

        if (!movie) {
            movie = await prisma.movie.create({
                data: {
                    movie_id,
                },
            })

            return {
                new_movie: movie,
            }
        }

        return {
            movie,
        }
    } catch (error) {
        return {
            error: error,
        }
    }
}

export async function getUserMovieReview(movie_id: string, user_id: string) {
    try {
        const review = await prisma.userReview.findFirst({
            where: {
                movie_id,
                user_id,
            },
        })

        return {
            review,
        }
    } catch (error) {
        return {
            error: error,
        }
    }
}
