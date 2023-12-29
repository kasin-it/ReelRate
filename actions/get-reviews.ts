import prisma from "@/lib/prisma"

export async function getMovieReviews(movieId: string) {
    try {
        const review = await prisma.movie.findFirst({
            where: {
                id: movieId,
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

interface getMovieReviewsWithPaginationProps {
    movieId: string
    page: number
}
export async function getMovieReviewsWithPagination({
    movieId,
    page,
}: getMovieReviewsWithPaginationProps) {
    const skip = 10 * page
    const take = 10

    try {
        const reviews = await prisma.userReview.findMany({
            where: {
                movie_id: movieId,
            },
            skip,
            take,
        })

        return {
            reviews,
        }
    } catch (error) {
        return {
            error: error,
        }
    }
}
