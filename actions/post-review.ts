"use server"

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
        const review_exist = await prisma.userReview.findFirst({
            where: {
                movie_id: movieId,
                user_id: userId,
            },
        })

        let res

        if (review_exist) {
            res = await prisma.userReview.update({
                where: {
                    review_id: review_exist.review_id,
                },
                data: {
                    content,
                    rating,
                },
            })
            console.log(res)
        } else {
            res = await prisma.userReview.create({
                data: {
                    movie_id: movieId,
                    user_id: userId,
                    content,
                    rating,
                    // movie: {
                    //     connect: { movie_id: movieId },
                    // },
                    // user: {
                    //     connect: { user_id: userId },
                    // },
                },
            })
        }

        if (!res) {
            return new NextResponse("Internal error", { status: 500 })
        }

        return new NextResponse(JSON.stringify(res), { status: 200 })
    } catch (error) {
        console.error("Error creating user review:", error)
        return new NextResponse("Internal error", { status: 500 })
    }
}
