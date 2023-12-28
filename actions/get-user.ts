import prisma from "@/lib/prisma"

export async function getUser(userId: string) {
    try {
        let user = await prisma.user.findFirst({
            where: {
                user_id: userId,
            },
        })

        if (!user) {
            user = await prisma.user.create({
                data: {
                    user_id: userId,
                },
            })
        }

        return user
    } catch (error) {
        console.error("Error fetching or creating user:", error)
        return null
    }
}
