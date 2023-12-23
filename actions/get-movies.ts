import axios, { AxiosResponse } from "axios"

import { DataTMBD } from "@/types/tmbd"

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

export async function getTrendingMovies(timeWindow: "day" | "week" = "day") {
    try {
        const url = `https://api.themoviedb.org/3/trending/movie/${timeWindow}?language=en-US`
        const response: AxiosResponse = await axios.get(url, options)
        const data: DataTMBD = response.data
        return data
    } catch (error) {
        console.error("Error fetching trending movies:", error)
        return null
    }
}

export async function getPlayingNowMovies(page: number = 1) {
    try {
        const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`
        const response: AxiosResponse = await axios.get(url, options)
        const data: DataTMBD = response.data
        return data
    } catch (error) {
        console.error("Error fetching now playing movies:", error)
        return null
    }
}

export async function getTopRatedMovies(page: number = 1) {
    try {
        const url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`
        const response: AxiosResponse = await axios.get(url, options)
        const data: DataTMBD = response.data
        return data
    } catch (error) {
        console.error("Error fetching top rated movies:", error)
        return null
    }
}

export async function getUpcomingMovies(page: number = 1) {
    try {
        const url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`

        const response: AxiosResponse = await axios.get(url, options)
        const data: DataTMBD = response.data
        return data
    } catch (error) {
        console.error("Error fetching now playing movies:", error)
        return null
    }
}

export async function getMoviesByKeyword(keyword_id: number) {
    try {
        const url = `https://api.themoviedb.org/3/trending/movie/${keyword_id}?language=en-US`
        const response: AxiosResponse = await axios.get(url, options)
        const data: DataTMBD = response.data
        return data
    } catch (error) {
        console.error("Error fetching movies by keyword:", error)
        return null
    }
}

export async function getMoviesByQuery(query: string) {
    try {
        const url = `https://api.themoviedb.org/3/search/movie?query=${query}include_adult=false&language=en-US&page=1`
        const response: AxiosResponse = await axios.get(url, options)
        const data: DataTMBD = response.data
        return data
    } catch (error) {
        console.error("Error fetching movies by keyword:", error)
        return null
    }
}
