import { User } from "@/types"

import prisma from "@/lib/prisma"

export async function checkUser(user: User) {
    try {
        const userRes = await prisma.user.findFirst({
            where: {
                user_id: user.sid,
            },
        })

        if (!userRes) {
            await prisma.user.create({
                data: {
                    user_id: user.sid,
                    nickname: user.nickname,
                    img: user.picture,
                },
            })
        }

        return user
    } catch (error) {
        console.error("Error fetching or creating user:", error)
        return null
    }
}
