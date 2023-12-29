import dynamic from "next/dynamic"
import {
    getPlayingNowMovies,
    getTopRatedMovies,
    getTrendingMovies,
    getUpcomingMovies,
} from "@/actions/tmdb"

import { getMoviesListWithReviews } from "@/lib/utils"
import Container from "@/components/ui/container"

const ScrollMovies = dynamic(() => import("@/components/ui/scroll-movies"), {
    ssr: true,
})

export const revalidate = 86400

export default async function Home() {
    const playingNowMoviesData = await getPlayingNowMovies()
    const topRatedMoviesData = await getTopRatedMovies()
    const trandingMoviesData = await getTrendingMovies()
    const upcomingMoviesData = await getUpcomingMovies()

    const playingNowMoviesList = await getMoviesListWithReviews(
        playingNowMoviesData!
    )
    const topRatedMoviesList = await getMoviesListWithReviews(
        topRatedMoviesData!
    )
    const trandingMoviesList = await getMoviesListWithReviews(
        trandingMoviesData!
    )
    const upcomingMoviesList = await getMoviesListWithReviews(
        upcomingMoviesData!
    )

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
            <ScrollMovies
                movies={topRatedMoviesList}
                heading={"Top Rated ✨"}
            />
            <ScrollMovies
                movies={playingNowMoviesList}
                heading={"Playing Now 📺"}
                smallCard={true}
            />
            <ScrollMovies movies={trandingMoviesList} heading={"Tranding 📈"} />
            <ScrollMovies
                movies={upcomingMoviesList}
                heading={"Upcoming 📨"}
                smallCard={true}
            />
        </Container>
    )
}
