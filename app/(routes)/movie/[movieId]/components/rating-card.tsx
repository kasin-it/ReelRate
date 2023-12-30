import { User, UserReview } from "@prisma/client"
import { Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"

import DeleteButton from "./delete-button"

interface RatingCardProps {
    review: UserReview
    user: User
    canDelete: boolean
}

async function RatingCard({ review, user, canDelete }: RatingCardProps) {
    return (
        <Card className="flex flex-col gap-2 p-5">
            <CardTitle>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                        <div className="flex size-16 items-center justify-center rounded-md bg-green-600 text-white">
                            <p className="text-4xl">{review.rating}</p>
                        </div>
                        <h1>{user?.name}</h1>
                    </div>
                    <div className="flex items-center gap-5">
                        <p className="text-lg font-thin text-muted-foreground">
                            {review.createdAt.toDateString()}
                        </p>
                        {canDelete && (
                            <DeleteButton reviewId={review.review_id} />
                        )}
                    </div>
                </div>
            </CardTitle>
            <CardDescription className="text-lg">
                {review.content}
            </CardDescription>
        </Card>
    )
}

export default RatingCard
