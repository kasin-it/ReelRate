import prisma from "@/lib/prisma"

export async function getMovieIds() {
    try {
        const movies = await prisma.movie.findMany({
            select: {
                movie_id: true,
            },
        })

        return {
            success: true,
            data: movies,
        }
    } catch (error) {
        return {
            success: false,
            error: error,
        }
    }
}

export async function getMovieReviews(movie_id: string) {
    try {
        const movie = await prisma.movie.findFirst({
            where: {
                movie_id,
            },
        })

        if (!movie) {
            const new_movie = await prisma.movie.create({
                data: {
                    movie_id,
                },
            })

            return {
                success: true,
                data: new_movie,
            }
        }

        return {
            success: true,
            data: movie,
        }
    } catch (error) {
        return {
            success: false,
            error: error,
        }
    }
}
