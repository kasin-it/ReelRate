import { cn } from "@/lib/utils"

interface ReviewsBarProps {
    positiveReviewsAmount: number
    passiveReviewsAmount: number
    negativeReviewsAmount: number
}

function ReviewsBar({
    positiveReviewsAmount,
    passiveReviewsAmount,
    negativeReviewsAmount,
}: ReviewsBarProps) {
    const totalReviewsCount =
        positiveReviewsAmount + passiveReviewsAmount + negativeReviewsAmount

    const negativePercent = Math.floor(
        (negativeReviewsAmount / totalReviewsCount) * 100
    )
    const passivePercent = Math.floor(
        (passiveReviewsAmount / totalReviewsCount) * 100
    )
    const positivePercent = Math.floor(
        (positiveReviewsAmount / totalReviewsCount) * 100
    )

    return (
        <div
            className={cn(
                "flex h-[8px] w-full gap-1 overflow-hidden rounded-full"
            )}
        >
            <div
                className="bg-positive h-full w-full"
                style={{ width: `${positivePercent}%` }}
            />
            <div
                className="bg-passive h-full w-full"
                style={{
                    width: `${passivePercent}%`,
                }}
            />
            <div
                className="bg-negative h-full w-full"
                style={{ width: `${negativePercent}%` }}
            />
        </div>
    )
}

export default ReviewsBar
