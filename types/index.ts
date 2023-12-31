import { UserReview } from "@prisma/client"

import { Keyword, Result, SingleDataTMDB } from "@/types/tmdb"

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

export interface UserReviewWithName extends UserReview {
    user: {
        name: string
    }
}
