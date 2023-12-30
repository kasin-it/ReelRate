"use client"

import dynamicImport from "next/dynamic"
import Link from "next/link"
import { Navigation } from "@/enums/navigation"
import { User } from "next-auth"
import { useSession } from "next-auth/react"

import { buttonVariants } from "@/components/ui/button"
import Container from "@/components/ui/container"
import Logo from "@/components/ui/logo"

const UserButton = dynamicImport(() => import("./user-button"), {
    loading: () => null,
    ssr: true,
})

function Navbar() {
    const session = useSession()

    return (
        <div className="mb-10 shadow-sm">
            <Container>
                <nav className="flex h-20 items-center justify-between py-5">
                    <Logo />
                    {session.data?.user ? (
                        <UserButton user={session.data.user as User} />
                    ) : (
                        <Link
                            className={buttonVariants({ variant: "default" })}
                            href={Navigation.SignIn}
                        >
                            Sign In
                        </Link>
                    )}
                </nav>
            </Container>
        </div>
    )
}
export default Navbar
