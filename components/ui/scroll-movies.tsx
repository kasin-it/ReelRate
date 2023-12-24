"use client"

import { Movie } from "@/types"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
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
            <h1 className="text-3xl font-bold tracking-wide">{heading}</h1>
            <Separator className="h-[2px]" />
            <div className="md:px-5 xl:px-10 ">
                <Carousel>
                    <CarouselContent>
                        {movies.map((movie) =>
                            smallCard ? (
                                <CarouselItem
                                    key={movie.id}
                                    className="basis-1/7"
                                >
                                    <MovieSmallCard movie={movie} />
                                </CarouselItem>
                            ) : (
                                <CarouselItem
                                    key={movie.id}
                                    className="basis-1/7"
                                >
                                    <MovieCard movie={movie} key={movie.id} />
                                </CarouselItem>
                            )
                        )}
                    </CarouselContent>
                    <CarouselPrevious className="hidden md:inline-flex" />
                    <CarouselNext className="hidden md:inline-flex" />
                </Carousel>
            </div>
        </section>
    )
}
export default ScrollMovies
