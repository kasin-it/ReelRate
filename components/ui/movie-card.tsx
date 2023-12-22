import Image from "next/image"
import Link from "next/link"
import placeholder from "@/public/images/img.webp"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

import ReviewsBar from "./reviews-bar"

interface MovieCardProps {
    title?: string
    categories?: string[] | string
    reviewAverage: number
    reviewsCount?: number
    positiveReviewsCount?: number
    passiveReviewsCount?: number
    negativeReviewsCount?: number
}

function MovieCard({ reviewAverage }: MovieCardProps) {
    let color = ""

    if (reviewAverage > 60) {
        color = "bg-positive text-white"
    } else if (reviewAverage > 40) {
        color = "bg-passive"
    } else {
        color = "bg-negative text-white"
    }

    return (
        <Card className="relative h-[440px] w-[330px] overflow-hidden bg-gray-100">
            <div className={cn("h-[130px] w-full", color)} />
            <div className="absolute top-0 z-50 flex h-full flex-col gap-2 p-4">
                <Link href="#" aria-label="">
                    <div className="flex h-[160px] w-full items-center justify-center overflow-hidden rounded-lg ">
                        <Image
                            src={placeholder}
                            alt="placeholder"
                            width={300}
                            height={0}
                            style={{ height: "auto" }}
                            className="object-cover"
                        />
                    </div>
                </Link>

                <Link href="#" aria-label="">
                    <CardTitle className="text-pretty text-3xl font-extrabold">
                        The Zone of Interest
                    </CardTitle>
                </Link>
                <div className="flex flex-wrap">
                    <Link href={"#"} aria-label="3">
                        <Badge className="rounded-sm border border-primary bg-transparent py-1 text-sm font-light tracking-wide text-primary hover:text-white">
                            Horror
                        </Badge>
                    </Link>
                </div>
            </div>
            <div className="absolute bottom-0 z-50 flex w-full flex-col gap-3 p-4">
                <Separator className="h-[2px]" />
                <div className="flex justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-widest text-muted-foreground">
                            SCORE
                        </p>
                        <p className="text-lg font-semibold">
                            Mixed or Average
                        </p>
                        <Link href={"#"}>
                            <p className="test-sm font-thin hover:text-muted-foreground hover:underline">
                                Based on 22 Critic Reviews
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
                    positiveReviewsAmount={10}
                    passiveReviewsAmount={100}
                    negativeReviewsAmount={20}
                />
            </div>
        </Card>
    )
}
export default MovieCard
