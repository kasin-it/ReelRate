import { getUserFavourites } from "@/actions"
import { UserFavourite, UserReview } from "@prisma/client"

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

export interface UserFavouriteWithMovie extends SingleDataTMDB, UserFavourite {}
export interface UserReviewWithMovie extends SingleDataTMDB, UserReview {}

export interface UserReviewWithName extends UserReview {
    user: {
        name: string
    }
}
