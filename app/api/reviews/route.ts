import { NextResponse } from "next/server"
import { getUserMovieReview } from "@/actions/get-reviews"
import { getUser } from "@/actions/get-user"
import { postReview } from "@/actions/post-review"
import { getSession } from "@auth0/nextjs-auth0"
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

export async function GET(req: Request) {
    const session = await getSession()
    const { searchParams } = new URL(req.url)
    const movieId = searchParams.get("movieId")

    if (!session) {
        console.error("UNAUTHORIZED")
        return new NextResponse("UNAUTHORIZED", { status: 401 })
    }

    if (!movieId) {
        return new NextResponse("Bad request", { status: 500 })
    }

    try {
        const user = await getUser(session.user.sid)

        if (!user) {
            return new NextResponse("Internal error", { status: 500 })
        }

        const userReview = await getUserMovieReview(movieId, session.user.sid)

        if (userReview.success) {
            return Response.json(userReview.data)
        } else {
            return Response.json(null)
        }
    } catch (error) {
        console.error("Internal error: ", error)
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function POST(req: Request) {
    const session = await getSession()

    if (!session) {
        console.error("UNAUTHORIZED")
        return new NextResponse("UNAUTHORIZED", { status: 401 })
    }

    const ratingSchema = z.object({
        rating: z.number().min(0).max(10),
        content: z.string().max(512),
        movieId: z.string().min(1).max(100),
    })

    const data = await req.json()

    await validateRatingData(data, ratingSchema)

    try {
        await getUser(session.user.sid)
    } catch (error) {
        console.error("Internal error: ", error)
        return new NextResponse("Internal error", { status: 500 })
    }

    const res = await postReview({ ...data, userId: session.user.sid })

    return Response.json(res)
}
