import dynamic from "next/dynamic"
import { getSelf } from "@/actions"

import { filterUserReviews } from "@/lib/utils"

import RatingCard from "@/components/ui/rating-card"
import ScoreMovieInput from "./score-movie-input"

// const ScoreMovieInput = dynamic(() => import("./score-movie-input"), {
//     loading: () => <p>Loading...</p>,
//     ssr: false,
// })

interface MyScoreProps {
    movieId: string
}

async function MyScore({ movieId }: MyScoreProps) {
    const user = await getSelf(true)

    if (!user) {
        return <ScoreMovieInput authorized={false} />
    }

    const review = filterUserReviews(user.userReviews, movieId)

    if (review.length == 0) {
        return <ScoreMovieInput authorized={true} />
    }

    return (
        <>
            <h1 className="text-2xl">My Score</h1>
            <RatingCard
                review={review[0]}
                userName={user.name}
                canDelete={true}
            />
        </>
    )
}

export default MyScore
