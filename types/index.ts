export interface User {
    nickname: string
    name: string
    picture?: string
}

export interface Movie {
    title: string
    categories: string[]
    reviewAverage: number
    positiveReviewsCount: number
    passiveReviewsCount: number
    negativeReviewsCount: number
    image: string
}
