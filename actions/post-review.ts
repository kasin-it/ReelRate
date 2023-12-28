import { NextResponse } from "next/server"

import prisma from "@/lib/prisma"

interface PostReviewProps {
    movieId: string
    userId: string
    content: string
    rating: number
}

export async function postReview({
    movieId,
    userId,
    content,
    rating,
}: PostReviewProps) {
    try {
        const reviewExist = await getExistingReview(movieId, userId)

        let res

        if (reviewExist) {
            res = await updateReview(reviewExist.review_id, {
                content,
                rating,
            })
        } else {
            res = await createReview({ movieId, userId, content, rating })
        }

        if (!res) {
            return new NextResponse("Internal error", { status: 500 })
        }

        return new NextResponse(JSON.stringify(res), { status: 200 })
    } catch (error) {
        console.error("Error creating/updating user review:", error)
        return new NextResponse("Internal error", { status: 500 })
    }
}

async function getExistingReview(movieId: string, userId: string) {
    return prisma.userReview.findFirst({
        where: {
            movie_id: movieId,
            user_id: userId,
        },
    })
}

async function updateReview(
    reviewId: number,
    data: { content: string; rating: number }
) {
    return prisma.userReview.update({
        where: {
            review_id: reviewId,
        },
        data,
    })
}

async function createReview({
    movieId,
    userId,
    content,
    rating,
}: {
    movieId: string
    userId: string
    content: string
    rating: number
}) {
    return prisma.userReview.create({
        data: {
            movie_id: movieId,
            user_id: userId,
            content,
            rating,
        },
    })
}
