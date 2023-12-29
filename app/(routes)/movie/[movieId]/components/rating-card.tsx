import { getUser } from "@/actions/get-user"
import { useUser } from "@auth0/nextjs-auth0/client"
import { UserReview } from "@prisma/client"

import { Card, CardDescription, CardTitle } from "@/components/ui/card"

interface RatingCard {
    review: UserReview
}

async function RatingCard({ review }: RatingCard) {
    const author = await getUser(review.user_id)

    return (
        <Card className="flex flex-col gap-2 p-5">
            <CardTitle>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                        <div className="flex size-16 items-center justify-center rounded-md bg-green-600 text-white">
                            <p>{review.rating}</p>
                        </div>
                        <h1>{author}</h1>
                    </div>
                    <p className="text-lg font-thin text-muted-foreground">
                        {/* {review.createdAt.getUTCDate()} */}
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
