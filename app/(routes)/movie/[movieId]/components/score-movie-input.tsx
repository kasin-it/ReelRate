"use client"

import { useState } from "react"

import { cn, getRating } from "@/lib/utils"

import RateForm from "./rate-form"

interface RatingButtonProps {
    index: number
    currentIndex: number | null
    handleOnMouseOver: (opinion: string, index: number) => void
    handleOnMouseLeave: (index: number) => void
    handleClickRating: (index: number) => void
}

function RatingButton({
    index,
    currentIndex,
    handleOnMouseOver,
    handleOnMouseLeave,
    handleClickRating,
}: RatingButtonProps) {
    const { color, opinion } = getRating(index, 1) // "1" is here to bypass the mechanism that throws N/A

    const getButtonColor = () => {
        if (currentIndex === null) {
            return color
        }

        if (currentIndex >= index) {
            return color
        }

        return "bg-gray-200 text-black"
    }

    return (
        <button
            className={cn(
                "border-x border-white py-1 text-center",
                getButtonColor()
            )}
            onMouseOver={() => handleOnMouseOver(opinion, index)}
            onMouseLeave={() => handleOnMouseLeave(index)}
            onClick={() => handleClickRating(index)}
        >
            {index}
        </button>
    )
}

function ScoreMovieInput() {
    const SCORE_LENGTH = 11
    const DEFAULT_OPINION = "Hover and click to give a rating"

    const [opinion, setOpinion] = useState(DEFAULT_OPINION)
    const [currentIndex, setCurrentIndex] = useState<number | null>(null)
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

    const getCurrentColor = (index: number | null) => {
        if (index === null) {
            return null
        }

        const { color } = getRating(index, 1)

        return color
    }

    const handleOnMouseOver = (opinion: string, index: number) => {
        setOpinion(opinion)
        setCurrentIndex(index)
    }

    const handleOnMouseLeave = (index: number) => {
        if (index === selectedIndex) {
            return
        }
        setOpinion(DEFAULT_OPINION)
        setCurrentIndex(selectedIndex)
    }

    const handleClickRating = (index: number) => {
        if (selectedIndex === index) {
            setSelectedIndex(null)
            return
        }
        setSelectedIndex(index)
    }

    return (
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
            <div className="grid grid-cols-11 [&>*:first-child]:rounded-s-full [&>*:last-child]:rounded-e-full">
                {Array.from({ length: SCORE_LENGTH }).map((_, index) => (
                    <RatingButton
                        key={index}
                        index={index}
                        currentIndex={currentIndex}
                        handleOnMouseOver={handleOnMouseOver}
                        handleOnMouseLeave={handleOnMouseLeave}
                        handleClickRating={handleClickRating}
                    />
                ))}
            </div>
            {selectedIndex !== null ? (
                <RateForm
                    color={getCurrentColor(selectedIndex)}
                    index={selectedIndex}
                />
            ) : null}
        </div>
    )
}

export default ScoreMovieInput
