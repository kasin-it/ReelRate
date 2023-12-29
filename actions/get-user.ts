import prisma from "@/lib/prisma"

export async function getUser(userId?: string) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                user_id: userId,
            },
        })

        return user
    } catch (error) {
        console.error("Error fetching or creating user:", error)
        return null
    }
}
