import Image from "next/image"
import Link from "next/link"
import { Movie } from "@/types"

import { cn, getRating } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardTitle } from "@/components/ui/card"
import ReviewsBar from "@/components/ui/reviews-bar"
import { Separator } from "@/components/ui/separator"

interface MovieCardProps {
    movie: Movie
}

function MovieCard({
    movie: {
        reviewAverage,
        title,
        categories,
        positiveReviewsCount,
        passiveReviewsCount,
        negativeReviewsCount,
        image,
    },
}: MovieCardProps) {
    const { color, opinion } = getRating(reviewAverage)

    const totalReviews =
        positiveReviewsCount + passiveReviewsCount + negativeReviewsCount

    return (
        <Card className="relative h-[440px] w-[330px] flex-shrink-0 overflow-hidden bg-gray-100">
            <div className={cn("h-[130px] w-full", color)} />
            <div className="absolute top-0 z-50 flex h-full flex-col gap-2 p-4">
                <Link href="#" aria-label="">
                    <div className="flex h-[160px] w-full items-center justify-center overflow-hidden rounded-lg ">
                        <Image
                            src={image}
                            alt="placeholder"
                            width={300}
                            height={0}
                            style={{ height: "auto" }}
                            className="object-cover"
                        />
                    </div>
                </Link>

                <Link href="#" aria-label="">
                    <CardTitle className="line-clamp-2 text-pretty text-3xl font-extrabold">
                        {title}
                    </CardTitle>
                </Link>
                <div className="flex flex-wrap gap-1">
                    {categories.map((category) => (
                        <Link
                            href={"/categories/" + category}
                            aria-label={category}
                            key={category}
                        >
                            <Badge className="rounded-sm border border-primary bg-transparent py-1 text-sm font-light capitalize tracking-wide text-primary hover:text-white">
                                {category}
                            </Badge>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="absolute bottom-0 z-50 flex w-full flex-col gap-3 p-4">
                <Separator className="h-[2px]" />
                <div className="flex justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-widest text-muted-foreground">
                            SCORE
                        </p>
                        <p className="text-lg font-semibold">{opinion}</p>
                        <Link href={"#"}>
                            <p className="test-sm font-thin hover:text-muted-foreground hover:underline">
                                Based on {totalReviews} reviews
                            </p>
                        </Link>
                    </div>
                    <Link href={"#"} aria-label="#">
                        <div
                            className={cn(
                                "flex h-[80px] w-[80px] items-center justify-center rounded-lg bg-orange-500 text-4xl font-black",
                                color
                            )}
                        >
                            <p>{reviewAverage}</p>
                        </div>
                    </Link>
                </div>
                <ReviewsBar
                    positiveReviewsAmount={positiveReviewsCount}
                    passiveReviewsAmount={passiveReviewsCount}
                    negativeReviewsAmount={negativeReviewsCount}
                    totalReviews={totalReviews}
                />
            </div>
        </Card>
    )
}
export default MovieCard
