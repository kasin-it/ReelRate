// import { NextResponse } from "next/server"
// import { getUserMovieReview } from "@/actions/get-rewiew"
// import { getUser } from "@/actions/get-user"
// import { postReview } from "@/actions/post-review"
// import { User } from "@/types"
// import { getServerSession } from "next-auth"
// import { z } from "zod"

// export const dynamic = "force-dynamic"

// async function validateRatingData(
//     data: any,
//     schema: z.ZodObject<any, any, any, any>
// ) {
//     try {
//         schema.parse(data)
//     } catch (error) {
//         console.error("Error validating schema: ", error)
//         throw new NextResponse("Bad request", { status: 400 })
//     }
// }

// export async function GET(req: Request) {
//     const session = await getServerSession()
//     const { searchParams } = new URL(req.url)
//     const movieId = searchParams.get("movieId")

//     if (!session) {
//         console.error("UNAUTHORIZED")
//         return new NextResponse("UNAUTHORIZED", { status: 401 })
//     }

//     if (!movieId) {
//         return new NextResponse("Bad request", { status: 500 })
//     }

//     try {
//         const user = await getUser(session.user as User)

//         if (!user) {
//             return new NextResponse("Internal error", { status: 500 })
//         }

//         const { error, review } = await getUserMovieReview(
//             movieId,
//             session.user.sid
//         )

//         if (review) {
//             return Response.json(review)
//         } else {
//             return Response.json(null)
//         }
//     } catch (error) {
//         console.error("Internal error: ", error)
//         return new NextResponse("Internal error", { status: 500 })
//     }
// }

// export async function POST(req: Request) {
//     const session = await getServerSession()

//     if (!session) {
//         console.error("UNAUTHORIZED")
//         return new NextResponse("UNAUTHORIZED", { status: 401 })
//     }

//     const ratingSchema = z.object({
//         rating: z.number().min(0).max(10),
//         content: z.string().max(512),
//         movieId: z.string().min(1).max(100),
//     })

//     const data = await req.json()

//     await validateRatingData(data, ratingSchema)

//     try {
//         await getUser(session.user as User)
//     } catch (error) {
//         console.error("Internal error: ", error)
//         return new NextResponse("Internal error", { status: 500 })
//     }

//     const res = await postReview({ ...data, userId: session.user.sid })

//     return Response.json(res)
// }
