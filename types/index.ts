import { Keyword, Result, SingleDataTMDB } from "@/types/tmdb"

export interface User {
    sid: string
    nickname: string
    name: string
    picture?: string
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
