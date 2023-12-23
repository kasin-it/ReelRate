export async function getMovieReviews(movie_id: string) {
    return {
        reviewAverage: 0,
        positiveReviewsCount: 0,
        passiveReviewsCount: 0,
        negativeReviewsCount: 0,
    }
}
