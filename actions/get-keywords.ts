import axios, { AxiosResponse } from "axios"

import { KeywordsData } from "@/types/tmdb"

interface RequestOptions {
    method: string
}

const TMDB_API_BASE_URL = "https://api.themoviedb.org/3"

async function requestTMDB(
    url: string,
    options: RequestOptions = {
        method: "GET",
    }
) {
    try {
        const response: AxiosResponse = await axios({
            url: `${TMDB_API_BASE_URL}${url}`,
            method: options.method,
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

export async function getMovieKeywords(movie_id: string) {
    return requestTMDB(`/movie/${movie_id}/keywords`)
}
