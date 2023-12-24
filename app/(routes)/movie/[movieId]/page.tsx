import { notFound } from "next/navigation"
import { getMovieById } from "@/actions/get-movies"

import { getMoviesListWithReviews } from "@/lib/utils"

interface MoviePageProps {
    params: { movieId: string }
}

async function MoviePage({ params: { movieId } }: MoviePageProps) {
    const movieData = await getMovieById(movieId)

    if (!movieData) {
        return notFound()
    }

    const movieList = getMoviesListWithReviews(movieData)

    const movie = movieData.results[0]

    return <div>{movie.title}</div>
}
export default MoviePage
