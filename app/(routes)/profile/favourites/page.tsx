import { redirect } from "next/navigation"
import { getUserFavourites } from "@/actions"
import { Navigation } from "@/enums/navigation"

async function page() {
    const favourites = await getUserFavourites()

    if (!favourites) return "there is any"

    return (
        <section>
            {favourites.map((favourite, index) => (
                <p key={favourite.id}>{favourite.title}</p>
            ))}
        </section>
    )
}
export default page
