import Image from "next/image"
import { UserReviewWithMovie } from "@/types"

import { cn, getImagePath, getRating } from "@/lib/utils"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import DeleteButton from "@/components/ui/delete-button"

interface MyReviewCardProps {
    review: UserReviewWithMovie
}

function MyReviewCard({ review }: MyReviewCardProps) {
    const { color, opinion } = getRating(review.rating, 1)

    return (
        <Card
            className="relative flex max-w-2xl flex-col items-center gap-5 p-4 sm:flex-row sm:items-start"
            key={review.id}
        >
            <Image
                src={getImagePath(review.poster_path)}
                width={200}
                height={0}
                style={{ height: "auto" }}
                alt={review.title}
                className="rounded-md"
            />

            <div className="flex flex-col gap-3">
                <h1 className="text-4xl">{review.title}</h1>
                <div className="flex items-center gap-5">
                    <div
                        className={cn(
                            "flex size-16 items-center justify-center rounded-md text-3xl",
                            color
                        )}
                    >
                        {review.rating}
                    </div>
                    <p className="text-2xl">{opinion}</p>
                </div>
                <p className="text-xl text-muted-foreground">
                    {review.content}
                </p>
            </div>
            <DeleteButton className={""} reviewId={review.id} />
        </Card>
    )
}
export default MyReviewCard
