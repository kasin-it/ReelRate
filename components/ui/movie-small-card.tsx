import Image from "next/image"
import Link from "next/link"
import { Movie } from "@/types"

import { cn, getImagePath, getMoviePath, getRating } from "@/lib/utils"

interface MovieSmallCardProps {
    movie: Movie
}

function MovieSmallCard({
    movie: {
        reviewAverage,
        passiveReviewsCount,
        positiveReviewsCount,
        negativeReviewsCount,
        title,
        poster_path,
        id,
    },
}: MovieSmallCardProps) {
    const totalReviews =
        passiveReviewsCount + positiveReviewsCount + negativeReviewsCount
    const { color, opinion } = getRating(reviewAverage, totalReviews)
    const image = getImagePath(poster_path)
    const moviePath = getMoviePath(id.toString())

    return (
        <div className="flex h-[316px] w-[183px] flex-shrink-0 flex-col gap-1 overflow-hidden">
            <Link
                href={moviePath}
                aria-label={title}
                className="flex flex-col gap-1"
            >
                <div className="relative flex h-[254px] w-full overflow-hidden rounded-lg">
                    <Image
                        src={image}
                        alt="placeholder"
                        fill
                        className="object-cover"
                        loading="eager"
                    />
                </div>
                <h1 className=" line-clamp-1 text-xl font-extrabold underline hover:text-muted-foreground hover:no-underline">
                    {title}
                </h1>
            </Link>
            <Link href={moviePath} aria-label={title}>
                <div className="group flex items-center justify-start gap-1">
                    <div
                        className={cn(
                            "flex h-[24px] w-[24px] items-center justify-center rounded-sm bg-orange-500 text-xs font-black group-hover:opacity-65",
                            color
                        )}
                    >
                        <p>{totalReviews === 0 ? "N/A" : reviewAverage}</p>
                    </div>

                    <p className="text-sm font-normal text-muted-foreground group-hover:underline">
                        {opinion}
                    </p>
                </div>
            </Link>
        </div>
    )
}
export default MovieSmallCard
