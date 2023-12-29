import dynamic from "next/dynamic"
import { getSelf } from "@/actions"

import { filterUserReviews } from "@/lib/utils"

import RatingCard from "./rating-card"

const ScoreMovieInput = dynamic(() => import("./score-movie-input"), {
    loading: () => <p>Loading...</p>,
    ssr: false,
})

interface MyScoreProps {
    movieId: string
}

async function MyScore({ movieId }: MyScoreProps) {
    const user = await getSelf(true)

    if (!user) {
        return <ScoreMovieInput authorized={false} />
    }

    const review = filterUserReviews(user.user_reviews, movieId)
    if (!review) {
        return <ScoreMovieInput authorized={true} />
    }

    return (
        <>
            <h1 className="text-2xl">My Score</h1>
            <RatingCard review={review[0]} user={user} />
        </>
    )
}

export default MyScore
