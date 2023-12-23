import Image from "next/image"
import Link from "next/link"
import { Movie } from "@/types"

import { cn, getRating } from "@/lib/utils"

interface MovieSmallCardProps {
    movie: Movie
}

function MovieSmallCard({
    movie: { reviewAverage, title, image },
}: MovieSmallCardProps) {
    const { color, opinion } = getRating(reviewAverage)

    return (
        <div className="flex h-[316px] w-[183px] flex-shrink-0 flex-col gap-1 overflow-hidden">
            <div className="relative flex h-[244px] w-full overflow-hidden rounded-lg">
                <Image
                    src={image}
                    alt="placeholder"
                    fill
                    className="object-cover"
                />
            </div>
            <Link href="#" aria-label="">
                <h1 className=" line-clamp-1 text-xl font-extrabold underline hover:text-muted-foreground hover:no-underline">
                    {title}
                </h1>
            </Link>
            <Link href={"#"} aria-label="#">
                <div className="group flex items-center justify-start gap-1">
                    <div
                        className={cn(
                            "flex h-[24px] w-[24px] items-center justify-center rounded-sm bg-orange-500 text-xs font-black group-hover:opacity-65",
                            color
                        )}
                    >
                        <p>{reviewAverage}</p>
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
