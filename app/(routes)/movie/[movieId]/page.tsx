import MovieRatings from "./components/movie-ratings"

interface ReviewsPageProps {
    params: { movieId: string }
}

function ReviewsPage({ params: { movieId } }: ReviewsPageProps) {
    return <MovieRatings movieId={movieId} page={0} />
}
export default ReviewsPage
