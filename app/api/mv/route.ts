import { NextResponse } from "next/server"
import { getMovieById, getMoviesByQuery } from "@/actions/get-movies"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("query")

    if (!query) {
        return new NextResponse("Query is required", { status: 500 })
    }

    const res = await getMovieById(query)

    if (!res) {
        return new NextResponse("Internal error", { status: 500 })
    }

    return Response.json({ data: res })
}
