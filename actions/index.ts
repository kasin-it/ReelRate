import { getMovieById } from "@/actions/tmdb"
import { getServerSession } from "next-auth"

import prisma from "@/lib/prisma"

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
                user_reviews: includeReviews,
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
