import { NextResponse } from "next/server"
import { getSelf } from "@/actions"

import prisma from "@/lib/prisma"

export async function POST(request: Request) {
    try {
        const user = await getSelf()

        if (!user) {
            throw new NextResponse("Internal error: User not found", {
                status: 500,
            })
        }

        const data = await request.json()

        if (!data.movieId) {
            throw new NextResponse("Bad request: movieId is missing", {
                status: 400,
            })
        }

        const favourite = await prisma.userFavourite.findFirst({
            where: {
                user_id: user.id,
                movie_id: data.movieId,
            },
        })

        if (favourite) {
            const deleteFavourite = await prisma.userFavourite.delete({
                where: {
                    id: favourite.id,
                },
            })

            return Response.json(deleteFavourite)
        }

        const res = await prisma.userFavourite.create({
            data: {
                user_id: user.id,
                movie_id: data.movieId,
            },
        })

        return Response.json(res)
    } catch (error) {
        console.error("Error adding movie to favourites", error)
        throw new NextResponse("Internal error: " + error, { status: 500 })
    }
}
