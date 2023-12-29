import { NextResponse } from "next/server"
import { getSelf } from "@/actions"
import { z } from "zod"

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

    console.log(user)

    const ratingSchema = z.object({
        rating: z.number().min(0).max(10),
        content: z.string().max(512),
        movieId: z.string().min(1).max(100),
    })

    const data = await req.json()
    await validateRatingData(data, ratingSchema)

    const reviewData = { ...data, userId: user.id }
    // const response = await postReview(reviewData)

    // return Response.json(response)
}

export async function POST(req: Request) {
    try {
        return await handlePostRequest(req)
    } catch (error) {
        console.error("Error processing POST request: ", error)
        return new NextResponse("Internal error", { status: 500 })
    }
}
