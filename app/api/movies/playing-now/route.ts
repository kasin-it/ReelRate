import { NextResponse } from "next/server"
import { getPlayingNowMovies } from "@/actions/get-movies"

export async function GET() {
    const res = await getPlayingNowMovies()

    if (!res) {
        return new NextResponse("Internal error", { status: 500 })
    }

    return Response.json({ data: res })
}
