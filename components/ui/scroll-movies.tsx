import { Movie } from "@/types"

import MovieCard from "@/components/ui/movie-card"
import { Separator } from "@/components/ui/separator"

import MovieSmallCard from "./movie-small-card"

interface ScrollMoviesProps {
    movies: Movie[]
    heading: string
    smallCard?: boolean
}

function ScrollMovies({
    movies,
    heading,
    smallCard = false,
}: ScrollMoviesProps) {
    return (
        <section className="flex w-full flex-col gap-5">
            <h1 className="text-2xl font-bold tracking-wide">{heading}</h1>
            <Separator className="h-[2px]" />
            <div className="relative flex">
                <section className="relative flex gap-3 overflow-x-scroll">
                    {movies.map((movie, idx) =>
                        smallCard ? (
                            <MovieSmallCard movie={movie} key={idx} />
                        ) : (
                            <MovieCard movie={movie} key={idx} />
                        )
                    )}
                </section>
                <div className="absolute right-0 z-50 h-full w-10 bg-gradient-to-l from-white" />
            </div>
        </section>
    )
}
export default ScrollMovies
