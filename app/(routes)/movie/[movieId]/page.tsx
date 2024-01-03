import Image from "next/image"
import { notFound } from "next/navigation"
import {
    getMovieReviewsbyId,
    getMovieWithReviews,
    getuserFavouriteMovieById,
} from "@/actions"
import { getMovieById } from "@/actions/tmdb"
import { UserReviewWithName } from "@/types"

import prisma from "@/lib/prisma"
import { cn, getImagePath, getRating } from "@/lib/utils"
import AddToFavouritesButton from "@/components/ui/add-to-favourites-button"
import { Badge } from "@/components/ui/badge"
import Container from "@/components/ui/container"
import ReviewsBar from "@/components/ui/reviews-bar"
import { Separator } from "@/components/ui/separator"

import MoreReviews from "./components/more-reviews"
import MyScore from "./components/my-score"

export const revalidate = 84400

export async function generateStaticParams(): Promise<any[]> {
    try {
        const movies = await prisma.movie.findMany({
            select: {
                id: true,
            },
        })

        return (
            movies.map((movie) => ({
                movieId: movie.id,
            })) || []
        )
    } catch (error) {
        console.error("Error fetching movie IDs:", error)
        return []
    }
}

interface MoviePageProps {
    params: { movieId: string }
}

async function MoviePage({ params: { movieId } }: MoviePageProps) {
    const movieData = await getMovieById(movieId)
    const reviews = (await getMovieReviewsbyId(movieId)) as UserReviewWithName[]
    const isFavourite = await getuserFavouriteMovieById(movieId)

    if (!movieData) {
        return notFound()
    }

    const movie = await getMovieWithReviews(movieData)

    if (!movie) {
        return notFound()
    }
    const image = getImagePath(movie.poster_path)

    const genres = movie.genres.slice(0, 8)

    const totalReviews =
        movie.positiveReviewsCount +
        movie.passiveReviewsCount +
        movie.negativeReviewsCount

    const { color, opinion, reviewAverageValue } = getRating(
        movie.reviewAverage,
        totalReviews
    )

    return (
        <Container className="flexz max-w-4xl flex-col gap-5">
            <div className="flex justify-center gap-10">
                <Image
                    src={image}
                    alt={movie.title}
                    width={400}
                    height={0}
                    style={{ height: "auto" }}
                    className="rounded-lg"
                    priority={true}
                    loading="eager"
                />
                <div className="flex w-full max-w-md flex-col items-start gap-5 pt-10">
                    <h1 className="text-pretty text-5xl font-bold">
                        {movie.title}
                    </h1>
                    <div className="flex flex-wrap gap-1">
                        {genres ? (
                            <>
                                {genres.map((keyword) => (
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
                            <p className="test-sm font-thin">
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
                        <AddToFavouritesButton
                            movieId={movieId}
                            isLiked={isFavourite}
                        />
                    </div>
                </div>
            </div>
            <Separator />
            <MyScore movieId={movieId} />
            <Separator />
            <MoreReviews reviews={reviews} />
        </Container>
    )
}
export default MoviePage
