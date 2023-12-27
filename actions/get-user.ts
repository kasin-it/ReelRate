import prisma from "@/lib/prisma"

export async function getUser(userId: string) {
    try {
        const user =
            (await prisma.user.findFirst({
                where: {
                    user_id: userId,
                },
            })) ||
            (await prisma.user.create({
                data: {
                    user_id: userId,
                },
            }))

        return userId
    } catch (error) {
        console.error(error)
        return null
    }
}
