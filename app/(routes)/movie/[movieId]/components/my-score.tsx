"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useUser } from "@auth0/nextjs-auth0/client"
import { UserReview } from "@prisma/client"
import axios from "axios"

import RatingCard from "./rating-card"
import ScoreMovieInput from "./score-movie-input"

const API_ENDPOINT = "/api/reviews"

function MyScore() {
    const [myScore, setMyScore] = useState<UserReview | null>(null)
    const { movieId } = useParams()
    const session = useUser()

    useEffect(() => {
        const getMyScore = async () => {
            try {
                const res = await axios.get(API_ENDPOINT, {
                    params: { movieId },
                })

                console.log(res.data)

                setMyScore(res.data)
            } catch (error) {
                console.error(error)
            }
        }

        getMyScore()
    }, [movieId])

    return (
        <>
            {myScore ? (
                <RatingCard
                    review={myScore}
                    author={session?.user?.nickname as string}
                />
            ) : (
                <ScoreMovieInput />
            )}
        </>
    )
}

export default MyScore
