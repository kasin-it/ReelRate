import { UserReviewWithName } from "@/types"

import RatingCard from "./rating-card"

interface MoreReviewsProps {
    reviews: UserReviewWithName[]
}

function MoreReviews({ reviews }: MoreReviewsProps) {
    return (
        <div className="flex flex-col gap-5">
            <h1 className="text-2xl">Reviews</h1>
            {reviews.map((review) => (
                <RatingCard
                    key={review.review_id}
                    review={review}
                    userName={review.user.name}
                />
            ))}
        </div>
    )
}

export default MoreReviews
