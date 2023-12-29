import { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"

import prisma from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_SECRET_ID as string,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET as string,
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            // Check if the user already exists in the database
            const existingUser = await prisma.user.findFirst({
                where: {
                    email: user.email || "",
                },
            })

            if (!existingUser) {
                // If the user does not exist, insert them into the database
                await prisma.user.create({
                    data: {
                        id: user.id,
                        email: user.email || "",
                        image: user.image || "",
                        name: user.name || "",
                    },
                })
            }

            return true
        },
    },
}
