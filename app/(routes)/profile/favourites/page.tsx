import { getUserFavourites } from "@/actions"

import FavouriteCard from "./favourite-card"

export const dynamic = "force-dynamic"

async function page() {
    const favourites = await getUserFavourites()

    if (!favourites) return "there is any"

    return (
        <section className="flex w-full flex-wrap justify-center gap-7 sm:items-start md:justify-start">
            {favourites.map((favourite) => (
                <FavouriteCard favourite={favourite} key={favourite.id} />
            ))}
        </section>
    )
}
export default page
