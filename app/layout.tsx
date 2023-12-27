import type { Metadata } from "next"
import { Akshar } from "next/font/google"

import "./globals.css"

import { UserProvider } from "@auth0/nextjs-auth0/client"
import { QueryClient, QueryClientProvider } from "react-query"

import { Toaster } from "@/components/ui/toaster"
import Footer from "@/components/Footer/footer"
import Navbar from "@/components/Navbar/navbar"
import TailwindIndicator from "@/components/tailwind-indicator"

const font = Akshar({
    subsets: ["latin"],
    weight: "400",
})

export const metadata: Metadata = {
    title: "ReelRate",
    description:
        "ReelRate is a vibrant platform designed for movie enthusiasts to share their cinematic insights. Offering a user-friendly interface, users can effortlessly rate and review films, fostering a global community of passionate cinephiles. With a diverse range of genres and a sleek design, ReelRate empowers users to discover new favorites based on community recommendations, making it the ultimate destination for insightful and reliable movie ratings. Join the conversation, celebrate your favorite films, and make informed choices with ReelRate.",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <UserProvider>
                <body className={font.className}>
                    <Navbar />
                    {children}
                    <Footer />
                    <TailwindIndicator />
                    <Toaster />
                </body>
            </UserProvider>
        </html>
    )
}
