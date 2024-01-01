import { getUserReviews } from "@/actions"

import RatingCard from "@/components/ui/rating-card"

async function MyReviews() {
    const reviews = await getUserReviews()

    return (
        <section>
            {reviews.map((review) => (
                <p key={review.id}>{review.rating}</p>
            ))}
        </section>
    )
}
export default MyReviews
