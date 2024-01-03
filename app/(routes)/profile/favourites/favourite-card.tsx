import Image from "next/image"
import { UserFavouriteWithMovie } from "@/types"

import { cn, getImagePath, getMoviePath, getRating } from "@/lib/utils"
import AddToFavouritesButton from "@/components/ui/add-to-favourites-button"

interface FavouriteCardProps {
    favourite: UserFavouriteWithMovie
}

function FavouriteCard({ favourite }: FavouriteCardProps) {
    return (
        <div className="relative max-w-xs">
            <Image
                src={getImagePath(favourite.poster_path)}
                alt={favourite.title}
                width={300}
                height={0}
                style={{ height: "auto" }}
            />
            <h1>{favourite.title}</h1>
            <div className={"absolute -right-5 -top-5 z-50"}>
                <AddToFavouritesButton
                    refresh={true}
                    isLiked={true}
                    movieId={favourite.movie_id}
                />
            </div>
        </div>
    )
}
export default FavouriteCard
