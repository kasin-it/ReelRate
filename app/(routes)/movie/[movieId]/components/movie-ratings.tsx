import { getMovieReviewsWithPagination } from "@/actions/get-reviews"

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

import RatingCard from "./rating-card"

interface MovieRatingsProps {
    movieId: string
    page: number
}

async function MovieRatings({ movieId, page }: MovieRatingsProps) {
    const { error, reviews } = await getMovieReviewsWithPagination({
        movieId,
        page,
    })

    return (
        <section className="flex flex-col gap-8">
            <h1 className="text-2xl">Ratings</h1>

            <article className="flex flex-col gap-5">
                {reviews &&
                    reviews.map((review) => (
                        <RatingCard
                            key={review.review_id}
                            review={review}
                        />
                    ))}
            </article>

            {reviews && reviews.length > 0 && (
                <Pagination>
                    <PaginationContent>
                        {page > 1 && (
                            <>
                                <PaginationItem>
                                    <PaginationPrevious
                                        href={`/movies/${movieId}?page=${
                                            page - 1
                                        }`}
                                    />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink
                                        href={`/movies/${movieId}?page=${
                                            page - 1
                                        }`}
                                    >
                                        {page - 1}
                                    </PaginationLink>
                                </PaginationItem>
                            </>
                        )}

                        <PaginationItem>
                            <PaginationLink
                                href={`/movies/${movieId}?page=${page}`}
                                isActive
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>

                        {reviews && reviews.length === 10 && (
                            <>
                                <PaginationItem>
                                    <PaginationLink
                                        href={`/movies/${movieId}?page=${
                                            page + 1
                                        }`}
                                    >
                                        {page + 1}
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            </>
                        )}

                        <PaginationItem>
                            <PaginationNext
                                href={`/movies/${movieId}?page=${page + 1}`}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </section>
    )
}

export default MovieRatings
