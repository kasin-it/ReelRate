import dynamic from "next/dynamic"
import { getUserMovieReview } from "@/actions/get-rewiew"
import { getServerSession } from "next-auth"

import RatingCard from "./rating-card"

const ScoreMovieInput = dynamic(() => import("./score-movie-input"), {
    loading: () => <p>Loading...</p>,
    ssr: false,
})

interface MyScoreProps {
    movieId: string
}

async function MyScore({ movieId }: MyScoreProps) {
    const session = await getServerSession()

    if (!session) {
        return <ScoreMovieInput authorized={false} />
    }

    console.log(session.user)

    // const { error, review } = await getUserMovieReview(movieId, session.user)

    // if (error || !review) {
    //     return <ScoreMovieInput authorized={true} />
    // }

    return (
        <>
            <h1 className="text-2xl">My Score</h1>
            {/* <RatingCard review={review} /> */}
        </>
    )
}

export default MyScore
