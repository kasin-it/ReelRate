"use client"

import { useRouter } from "next/navigation"
import { Navigation } from "@/enums/navigation"

import { cn, getRating } from "@/lib/utils"
import useRating from "@/hooks/use-rating"

import RateForm from "./rate-form"

interface RatingButtonprops {
    index: number
    currentIndex: number | null
    handleOnMouseOver: (opinion: string, index: number) => void
    handleOnMouseLeave: (index: number) => void
    handleClickRating: (index: number) => void
    isAuthenticated: boolean
}

function RatingButton({
    index,
    currentIndex,
    handleOnMouseOver,
    handleOnMouseLeave,
    handleClickRating,
    isAuthenticated,
}: RatingButtonprops) {
    const router = useRouter()
    const { color, opinion } = getRating(index, 1) // "1" is here to bypass the mechanism that throws N/A

    const getButtonColor = () => {
        if (currentIndex === null) {
            return color
        } else if (currentIndex >= index) {
            return color
        }
        return "bg-gray-200 text-black"
    }

    const handleClick = () => {
        if (!isAuthenticated) {
            router.push(Navigation.SignIn)
            return
        }
        handleClickRating(index)
    }

    return (
        <button
            className={cn(
                "border-x border-white py-1 text-center",
                getButtonColor()
            )}
            onMouseOver={() => handleOnMouseOver(opinion, index)}
            onMouseLeave={() => handleOnMouseLeave(index)}
            onClick={handleClick}
        >
            {index}
        </button>
    )
}

interface ScoreMovieInputProps {
    authorized: boolean
}

function ScoreMovieInput({ authorized }: ScoreMovieInputProps) {
    const {
        opinion,
        currentIndex,
        selectedIndex,
        getCurrentColor,
        handleOnMouseOver,
        handleOnMouseLeave,
        handleClickRating,
    } = useRating()

    const SCORE_LENGTH = 11
    const showForm = selectedIndex !== null

    return (
        <>
            <div className="flex max-w-5xl flex-col gap-5">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl">My Score</h1>
                        <p className="text-lg font-bold">{opinion}</p>{" "}
                    </div>
                    <div
                        className={cn(
                            "flex size-16 items-center justify-center rounded-full border text-3xl",
                            getCurrentColor(currentIndex)
                        )}
                    >
                        <p>{currentIndex === null ? "" : currentIndex}</p>
                    </div>
                </div>
                <div className="grid grid-cols-11 px-0 [&>*:first-child]:rounded-s-full [&>*:last-child]:rounded-e-full">
                    {Array.from({ length: SCORE_LENGTH }).map((_, index) => (
                        <RatingButton
                            key={index}
                            index={index}
                            currentIndex={currentIndex}
                            handleOnMouseOver={handleOnMouseOver}
                            handleOnMouseLeave={handleOnMouseLeave}
                            handleClickRating={handleClickRating}
                            isAuthenticated={authorized}
                        />
                    ))}
                </div>
                {showForm ? (
                    <RateForm
                        color={getCurrentColor(selectedIndex)}
                        index={selectedIndex}
                    />
                ) : null}
            </div>
        </>
    )
}

export default ScoreMovieInput
