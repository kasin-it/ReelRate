import { User, UserReview } from "@prisma/client"

import { Card, CardDescription, CardTitle } from "@/components/ui/card"

interface RatingCard {
    review: UserReview
    user: User
}

async function RatingCard({ review, user }: RatingCard) {
    return (
        <Card className="flex flex-col gap-2 p-5">
            <CardTitle>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                        <div className="flex size-16 items-center justify-center rounded-md bg-green-600 text-white">
                            <p>{review.rating}</p>
                        </div>
                        <h1>{user?.name}</h1>
                    </div>
                    <p className="text-lg font-thin text-muted-foreground">
                        {review.createdAt.toDateString()}
                    </p>
                </div>
            </CardTitle>
            <CardDescription className="text-lg">
                {review.content}
            </CardDescription>
        </Card>
    )
}
export default RatingCard
