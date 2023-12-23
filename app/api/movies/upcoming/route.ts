import { NextResponse } from "next/server"
import { getUpcomingMovies } from "@/actions/get-movies"

export async function GET() {
    const res = await getUpcomingMovies()

    if (!res) {
        return new NextResponse("Internal error", { status: 500 })
    }

    return Response.json({ data: res })
}
