import dynamic from "next/dynamic"
import { getUserMovieReview } from "@/actions/get-rewiew"
import { getSession } from "@auth0/nextjs-auth0"

import RatingCard from "./rating-card"

const ScoreMovieInput = dynamic(() => import("./score-movie-input"), {
    loading: () => <p>Loading...</p>,
    ssr: false,
})

interface MyScoreProps {
    movieId: string
}

async function MyScore({ movieId }: MyScoreProps) {
    const session = await getSession()

    if (!session) {
        return <ScoreMovieInput authorized={false} />
    }

    const { error, review } = await getUserMovieReview(
        movieId,
        session?.user?.sid
    )

    if (!review) {
        return <ScoreMovieInput authorized={true} />
    }

    return (
        <>
            <h1 className="text-2xl">My Score</h1>
            <RatingCard review={review} author={session.user.nickname} />
        </>
    )
}

export default MyScore
