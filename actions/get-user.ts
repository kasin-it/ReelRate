import prisma from "@/lib/prisma"

export async function checkUser(userId: string) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                user_id: userId,
            },
        })

        if (!user) {
            const new_user = await prisma.user.create({
                data: {
                    user_id: userId,
                },
            })
        }

        return userId
    } catch (error) {
        console.log(error)
        return null
    }
}
