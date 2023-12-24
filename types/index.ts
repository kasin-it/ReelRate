import { Keyword, Result } from "@/types/tmbd"

export interface User {
    user_id?: string
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
