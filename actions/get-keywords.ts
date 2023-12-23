import axios, { AxiosResponse } from "axios"

interface Options {
    method: string
    headers: {
        accept: string
        Authorization: string
    }
}

const options: Options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMBD_ACCES_READ_KEY || ""}`,
    },
}

export async function getMovieKeywords(
    movie_id: number
): Promise<AxiosResponse | null> {
    try {
        const url = `https://api.themoviedb.org/3/movie/${movie_id}/keywords`
        const response: AxiosResponse = await axios.get(url, options)
        return response
    } catch (error) {
        console.error("Error fetching movie keywords:", error)
        return null
    }
}
