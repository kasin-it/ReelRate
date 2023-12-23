import placeholder from "@/public/images/img.webp"

import Container from "@/components/ui/container"
import ScrollMovies from "@/components/ui/scroll-movies"

const MOVIES = [
    {
        title: "Aquaman",
        categories: ["Action", "Sci-Fi"],
        reviewAverage: 6.3,
        positiveReviewsCount: 30,
        passiveReviewsCount: 15,
        negativeReviewsCount: 28,
        image: placeholder.src,
    },
    {
        title: "Batman",
        categories: ["Action", "Sci-Fi"],
        reviewAverage: 8.3,
        positiveReviewsCount: 20,
        passiveReviewsCount: 100,
        negativeReviewsCount: 38,
        image: placeholder.src,
    },
    {
        title: "Spiederman",
        categories: ["Action", "Sci-Fi"],
        reviewAverage: 5.3,
        positiveReviewsCount: 20,
        passiveReviewsCount: 15,
        negativeReviewsCount: 58,
        image: placeholder.src,
    },
    {
        title: "Aquaman",
        categories: ["Action", "Sci-Fi"],
        reviewAverage: 6.3,
        positiveReviewsCount: 30,
        passiveReviewsCount: 15,
        negativeReviewsCount: 28,
        image: placeholder.src,
    },
    {
        title: "Aquama ndddddddd ddddddddddd ddddddd",
        categories: ["Action", "Sci-Fi"],
        reviewAverage: 6.3,
        positiveReviewsCount: 30,
        passiveReviewsCount: 15,
        negativeReviewsCount: 28,
        image: placeholder.src,
    },
    {
        title: "Aquaman",
        categories: ["Action", "Sci-Fi"],
        reviewAverage: 3.3,
        positiveReviewsCount: 30,
        passiveReviewsCount: 15,
        negativeReviewsCount: 28,
        image: placeholder.src,
    },
    {
        title: "Aquaman",
        categories: ["Action", "Sci-Fi"],
        reviewAverage: 3.3,
        positiveReviewsCount: 30,
        passiveReviewsCount: 15,
        negativeReviewsCount: 28,
        image: placeholder.src,
    },
    {
        title: "Aquaman",
        categories: ["Action", "Sci-Fi"],
        reviewAverage: 3.3,
        positiveReviewsCount: 30,
        passiveReviewsCount: 15,
        negativeReviewsCount: 28,
        image: placeholder.src,
    },
]

export default function Home() {
    return (
        <Container className="gap-10">
            <div className="flex justify-center md:justify-start">
                <div className="flex flex-col items-center -space-y-5 md:items-start">
                    <h1 className="text-8xl font-black tracking-wider sm:text-9xl">
                        MOVIES
                    </h1>
                    <h2 className="text-xl font-thin tracking-widest sm:text-2xl">
                        Find your next captivating moment
                    </h2>
                </div>
            </div>
            <ScrollMovies movies={MOVIES} heading="New Releases" />
            <ScrollMovies
                movies={MOVIES}
                heading="Upcoming Releases"
                smallCard={true}
            />
        </Container>
    )
}
