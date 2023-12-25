import Image from "next/image"
import { notFound } from "next/navigation"
import { getMovieById } from "@/actions/get-movies"
import { getMovieIds } from "@/actions/get-reviews"
import { Bookmark, Heart, List, Star } from "lucide-react"

import { cn, getImagePath, getMovieWithReviews, getRating } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import Container from "@/components/ui/container"
import ReviewsBar from "@/components/ui/reviews-bar"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export const revalidate = 84400

export async function generateStaticParams() {
    try {
        const res = await getMovieIds()

        return (
            res.data?.map(({ movie_id }: { movie_id: string }) => ({
                movieId: movie_id,
            })) || []
        )
    } catch (error) {
        // Handle errors or return an empty array based on your use case
        console.error("Error fetching movie IDs:", error)
        return []
    }
}

interface MoviePageProps {
    params: { movieId: string }
}

async function MoviePage({ params: { movieId } }: MoviePageProps) {
    const movieData = await getMovieById(movieId)

    if (!movieData) {
        return notFound()
    }

    const movie = await getMovieWithReviews(movieData)

    if (!movie) {
        return notFound()
    }
    const image = getImagePath(movie.poster_path)

    const keywords = movie.genres.slice(1, 8)

    const totalReviews =
        movie.positiveReviewsCount +
        movie.passiveReviewsCount +
        movie.negativeReviewsCount
    const { color, opinion, reviewAverageValue } = getRating(
        movie.reviewAverage,
        totalReviews
    )

    return (
        <Container>
            <div className="flex justify-center gap-10">
                <Image
                    src={image}
                    alt={movie.title}
                    width={400}
                    height={400}
                    className="rounded-lg"
                    priority={true}
                    loading="eager"
                />
                <div className="flex w-full max-w-md flex-col items-start gap-5 pt-10">
                    <h1 className="text-pretty text-5xl font-bold">
                        {movie.title}
                    </h1>
                    <div className="flex flex-wrap gap-1">
                        {keywords ? (
                            <>
                                {keywords?.map((keyword) => (
                                    <Badge
                                        className="rounded-sm border border-primary bg-transparent py-1 text-sm font-light capitalize tracking-wide text-primary hover:bg-transparent"
                                        key={keyword.name}
                                    >
                                        {keyword.name}
                                    </Badge>
                                ))}
                            </>
                        ) : null}
                    </div>
                    <p>{movie.overview}</p>
                    <div className="flex w-full justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-widest text-muted-foreground">
                                SCORE
                            </p>
                            <p className="text-lg font-semibold">{opinion}</p>
                            <p className="test-sm font-thin hover:text-muted-foreground hover:underline">
                                Based on {totalReviews} reviews
                            </p>
                        </div>
                        <div
                            className={cn(
                                "flex h-[80px] w-[80px] items-center justify-center rounded-lg bg-orange-500 text-4xl font-black",
                                color
                            )}
                        >
                            <p>{reviewAverageValue}</p>
                        </div>
                    </div>
                    <ReviewsBar
                        positiveReviewsAmount={movie.positiveReviewsCount}
                        passiveReviewsAmount={movie.passiveReviewsCount}
                        negativeReviewsAmount={movie.negativeReviewsCount}
                        totalReviews={totalReviews}
                    />
                    <p className="font-bold">
                        Premiere:{" "}
                        <span className="font-thin">
                            {movie.release_date.toString()}
                        </span>
                    </p>
                    <div className="flex w-full gap-3">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <div className="rounded-full border p-5 shadow-lg">
                                        <List />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Add to library</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <div className="rounded-full border p-5 shadow-lg">
                                        <Heart />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Add to library</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <div className="rounded-full border p-5 shadow-lg">
                                        <Bookmark />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Add to library</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
            </div>
        </Container>
    )
}
export default MoviePage
