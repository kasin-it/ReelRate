import { useState } from "react"

import { getRating } from "@/lib/utils"

const DEFAULT_OPINION = "Hover and click to give a rating"

const useRating = () => {
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

    return {
        opinion,
        currentIndex,
        selectedIndex,
        getCurrentColor,
        handleOnMouseOver,
        handleOnMouseLeave,
        handleClickRating,
    }
}

export default useRating
