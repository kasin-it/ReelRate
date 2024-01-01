import { NextResponse } from "next/server"
import { getSelf } from "@/actions"
import { z } from "zod"

import prisma from "@/lib/prisma"

export const dynamic = "force-dynamic"

async function validateRatingData(
    data: any,
    schema: z.ZodObject<any, any, any, any>
) {
    try {
        schema.parse(data)
    } catch (error) {
        console.error("Error validating schema: ", error)
        throw new NextResponse("Bad request", { status: 400 })
    }
}

async function handlePostRequest(req: Request) {
    const user = await getSelf()

    if (!user) {
        throw new NextResponse("Internal error", { status: 500 })
    }

    const ratingSchema = z.object({
        rating: z.number().min(0).max(10),
        content: z.string().max(512),
        movieId: z.string().min(1).max(100),
    })

    const data = await req.json()
    await validateRatingData(data, ratingSchema)

    const review = await prisma.userReview.findFirst({
        where: {
            user_id: user.id,
            movie_id: data.movieId,
        },
    })

    if (review) {
        return new NextResponse("Review already exist.", { status: 500 })
    }

    const response = await prisma.userReview.create({
        data: {
            user_id: user.id,
            movie_id: data.movieId,
            rating: data.rating,
            content: data.content,
        },
    })

    return Response.json(response)
}
async function handleDeleteRequest(req: Request) {
    const user = await getSelf()

    if (!user) {
        throw new NextResponse("Internal error", { status: 500 })
    }

    const ratingSchema = z.object({
        reviewId: z.number(),
    })

    const data = await req.json()
    await validateRatingData(data, ratingSchema)

    const review = await prisma.userReview.delete({
        where: {
            id: data.reviewId,
            user_id: user.id,
        },
    })

    return Response.json(review)
}

export async function POST(req: Request) {
    try {
        return await handlePostRequest(req)
    } catch (error) {
        console.error("Error processing POST request: ", error)
        return new NextResponse("Internal error", { status: 500 })
    }
}
export async function DELETE(req: Request) {
    try {
        return await handleDeleteRequest(req)
    } catch (error) {
        console.error("Error processing DELETE request: ", error)
        return new NextResponse("Internal error", { status: 500 })
    }
}
