import { getUserReviews } from "@/actions"

import RatingCard from "@/components/ui/rating-card"

import MyReviewCard from "./components/my-review-card"

async function MyReviews() {
    const reviews = await getUserReviews()

    return (
        <section className="flex w-full flex-col flex-wrap items-center gap-10 sm:items-start">
            {reviews.map((review) => (
                <MyReviewCard review={review} key={review.id} />
            ))}
        </section>
    )
}
export default MyReviews
