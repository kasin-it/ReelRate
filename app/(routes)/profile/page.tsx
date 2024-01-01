import { redirect } from "next/navigation"
import { getSelf } from "@/actions"
import { Navigation } from "@/enums/navigation"

import prisma from "@/lib/prisma"

async function MyReviews() {
    const user = await getSelf()

    if (!user) {
        redirect(Navigation.SignIn)
    }

    // const my_reviews = await prisma.userReview.findMany({
    //     where: {
    //         user_id: user.id,
    //     },
    //     include: {
    //         movie,
    //     },
    // })

    return <section></section>
}
export default MyReviews
