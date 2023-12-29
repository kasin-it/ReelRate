import { NextResponse } from "next/server"
import { getMoviesByQuery } from "@/actions/tmdb"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("query")

    if (!query) {
        return new NextResponse("Query is required", { status: 500 })
    }

    const res = await getMoviesByQuery(query)

    if (!res) {
        return new NextResponse("Internal error", { status: 500 })
    }

    return Response.json({ data: res })
}
