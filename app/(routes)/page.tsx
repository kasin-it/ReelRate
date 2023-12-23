import {
    getPlayingNowMovies,
    getTopRatedMovies,
    getTrendingMovies,
    getUpcomingMovies,
} from "@/actions/get-movies"

import Container from "@/components/ui/container"
import ScrollMovies from "@/components/ui/scroll-movies"

export default async function Home() {
    const playingNowMoviesData = await getPlayingNowMovies()
    const topRatedMoviesData = await getTopRatedMovies()
    const trandingMoviesData = await getTrendingMovies()
    const upcomingMoviesData = await getUpcomingMovies()

    return (
        <Container className="gap-10">
            <div className="flex justify-center md:justify-start">
                <div className="flex flex-col items-center -space-y-5 md:items-start">
                    <h1 className="text-8xl font-black tracking-wider sm:text-9xl">
                        MOVIES
                    </h1>
                    <h2 className="text-xl font-thin tracking-widest sm:text-2xl">
                        Find your next captivating moment
                    </h2>
                </div>
            </div>
            {/* <ScrollMovies movies={MOVIES} heading="New Releases" />
            <ScrollMovies
                movies={MOVIES}
                heading="Upcoming Releases"
                smallCard={true}
            /> */}
        </Container>
    )
}
