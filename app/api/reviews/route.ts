import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"
import { checkUser } from "@/actions/get-user"
import { postReview } from "@/actions/post-review"
import { getSession } from "@auth0/nextjs-auth0"
import { z } from "zod"

export const dynamic = "force-dynamic"

export async function POST(req: Request) {
    const session = await getSession()
    if (!session) {
        return new NextResponse("UNAUTHORIZED", { status: 401 })
    }
    if (!session.user) {
        return new NextResponse("UNAUTHORIZED", { status: 401 })
    }

    console.log(session.user)

    const ratingSchema = z.object({
        rating: z.number().min(0).max(10),
        content: z.string().max(512),
        movieId: z.string().min(1).max(100),
    })
    const data = await req.json()

    try {
        ratingSchema.parse(data)
    } catch (error) {
        return new NextResponse("Bad request", { status: 400 })
    }

    try {
        const user = await checkUser(session.user.sid)

        if (!user) {
            return new NextResponse("Internal error", { status: 500 })
        }
    } catch (error) {
        return new NextResponse("Internal error", { status: 500 })
    }

    const res = await postReview({ ...data, userId: session.user.sid })

    if (!res) {
        return new NextResponse("Internal error", { status: 500 })
    }

    revalidatePath("/movie/" + data.movieId)

    return Response.json(res)
}
