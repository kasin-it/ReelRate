import Container from "@/components/ui/container"
import MovieCard from "@/components/ui/movie-card"

import ScrollMovies from "./components/scroll-movies"

export default function Home() {
    return (
        <Container>
            <div className="flex justify-center md:justify-start">
                <div className="flex flex-col items-center">
                    <h1 className="text-8xl font-bold sm:text-9xl">MOVIES</h1>
                    <h2 className="text-xl text-muted-foreground sm:text-2xl">
                        Find your next captivating moment
                    </h2>
                </div>
            </div>
            <ScrollMovies />
            <MovieCard reviewAverage={26} />
        </Container>
    )
}
