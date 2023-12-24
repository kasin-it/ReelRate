import { notFound } from "next/navigation"
import { getMovieById } from "@/actions/get-movies"

import { getMoviesListWithReviews, getMovieWithReviews } from "@/lib/utils"

interface MoviePageProps {
    params: { movieId: string }
}

async function MoviePage({ params: { movieId } }: MoviePageProps) {
    const movieData = await getMovieById(movieId)

    if (!movieData) {
        return notFound()
    }

    const movie = await getMovieWithReviews(movieData)

    if (!movie) {
        return notFound()
    }

    return <div>{movie.title}</div>
}
export default MoviePage
