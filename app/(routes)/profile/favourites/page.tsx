import { redirect } from "next/navigation"
import { getUserFavourites } from "@/actions"
import { Navigation } from "@/enums/navigation"

import FavouriteCard from "./favourite-card"

async function page() {
    const favourites = await getUserFavourites()

    if (!favourites) return "there is any"

    return (
        <section>
            {favourites.map((favourite) => (
                <FavouriteCard favourite={favourite} key={favourite.id} />
            ))}
        </section>
    )
}
export default page
