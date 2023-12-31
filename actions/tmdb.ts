import axios, { AxiosResponse } from "axios"

import prisma from "@/lib/prisma"

const TMDB_API_BASE_URL = "https://api.themoviedb.org/3"

interface RequestOptions {
    method: string
    params?: Record<string, string | number>
}

async function requestTMDB(
    url: string,
    options: RequestOptions = { method: "GET" }
) {
    try {
        const response: AxiosResponse = await axios({
            url: `${TMDB_API_BASE_URL}${url}`,
            method: options.method,
            params: options.params,
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${
                    process.env.TMBD_ACCES_READ_KEY || ""
                }`,
            },
        })

        return response.data
    } catch (error) {
        console.error(`Error fetching TMDB data from ${url}:`, error)
        return null
    }
}

export async function getMovieKeywords(id: string) {
    const res = await requestTMDB(`/movie/${id}/keywords`)
    return res.keywords
}

export async function getTrendingMovies(timeWindow: "day" | "week" = "day") {
    return requestTMDB(`/trending/movie/${timeWindow}?language=en-US`)
}

export async function getPlayingNowMovies(page: number = 1) {
    return requestTMDB(`/movie/now_playing?language=en-US&page=${page}`)
}

export async function getTopRatedMovies(page: number = 1) {
    return requestTMDB(`/movie/top_rated?language=en-US&page=${page}`)
}

export async function getUpcomingMovies(page: number = 1) {
    return requestTMDB(`/movie/upcoming?language=en-US&page=${page}`)
}

export async function getMoviesByKeyword(keywordId: string) {
    return requestTMDB(`/trending/movie/${keywordId}?language=en-US`)
}

export async function getMoviesByQuery(query: string) {
    return requestTMDB(`/search/movie`, {
        params: { query, language: "en-US", page: 1 },
        method: "GET",
    })
}

export async function getMovieById(movieId: string) {
    return requestTMDB(`/movie/${movieId}?language=en-US`)
}
