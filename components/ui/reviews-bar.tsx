import { cn } from "@/lib/utils"

interface ReviewsBarProps {
    positiveReviewsAmount: number
    passiveReviewsAmount: number
    negativeReviewsAmount: number
    totalReviews: number
}

function ReviewsBar({
    positiveReviewsAmount,
    passiveReviewsAmount,
    negativeReviewsAmount,
    totalReviews,
}: ReviewsBarProps) {
    const negativePercent = Math.floor(
        (negativeReviewsAmount / totalReviews) * 100
    )
    const passivePercent = Math.floor(
        (passiveReviewsAmount / totalReviews) * 100
    )
    const positivePercent = Math.floor(
        (positiveReviewsAmount / totalReviews) * 100
    )

    return (
        <div
            className={cn(
                "flex h-[8px] w-full gap-1 overflow-hidden rounded-full bg-gray-300"
            )}
        >
            {totalReviews === 0 ? null : (
                <>
                    <div
                        className="h-full w-full bg-positive"
                        style={{ width: `${positivePercent}%` }}
                    />
                    <div
                        className="h-full w-full bg-passive"
                        style={{
                            width: `${passivePercent}%`,
                        }}
                    />
                    <div
                        className="h-full w-full bg-negative"
                        style={{ width: `${negativePercent}%` }}
                    />
                </>
            )}
        </div>
    )
}

export default ReviewsBar
