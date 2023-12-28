import prisma from "@/lib/prisma"

export async function getMovieReviews(movieId: string) {
    try {
        const review = await prisma.movie.findFirst({
            where: {
                movie_id: movieId,
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
