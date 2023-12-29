import { Keyword, Result, SingleDataTMDB } from "@/types/tmdb"

export interface User {
    id: string
    name: string
    email: string
    image: string
}

export interface Movie extends Result {
    reviewAverage: number
    positiveReviewsCount: number
    passiveReviewsCount: number
    negativeReviewsCount: number
    keywords?: Keyword[]
}
export interface MovieDetails extends SingleDataTMDB {
    reviewAverage: number
    positiveReviewsCount: number
    passiveReviewsCount: number
    negativeReviewsCount: number
}
