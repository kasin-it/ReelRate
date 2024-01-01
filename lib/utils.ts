import { Opinions } from "@/enums/opinions"
import { UserReview } from "@prisma/client"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getRating(reviewAverage: number, totalReviews: number) {
    let color = "bg-negative text-white"
    let opinion = Opinions.VeryBad

    let reviewAverageValue = reviewAverage.toPrecision(2)

    if (reviewAverage > 8) {
        opinion = Opinions.VeryGood
        color = "bg-positive text-white"
    } else if (reviewAverage > 6) {
        opinion = Opinions.Good
        color = "bg-positive text-white"
    } else if (reviewAverage > 3) {
        opinion = Opinions.Mixed
        color = "bg-passive text-black"
    } else if (reviewAverage > 1) {
        color = "bg-negative text-white"
        opinion = Opinions.Bad
    }

    if (totalReviews === 0) {
        color = "bg-positive text-white"
        opinion = Opinions.NA
        reviewAverageValue = "N/A"
    }

    return { color, opinion, reviewAverageValue }
}

export function getImagePath(fileName: string) {
    return `https://image.tmdb.org/t/p/original${fileName}`
}

export function getMoviePath(movieId: string) {
    return `/movie/${movieId}`
}

export function filterUserReviews(reviews: UserReview[], movieId: string) {
    const filteredReviews = reviews.filter((review) => {
        if (review.movie_id == movieId) {
            return review
        }
    })
    return filteredReviews
}
