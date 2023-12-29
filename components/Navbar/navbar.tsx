import dynamic from "next/dynamic"
import Link from "next/link"
import { Navigation } from "@/enums/navigation"
import { getServerSession, User } from "next-auth"

import { buttonVariants } from "@/components/ui/button"
import Container from "@/components/ui/container"
import Logo from "@/components/ui/logo"

const UserButton = dynamic(() => import("./user-button"), {
    loading: () => null,
    ssr: false,
})

async function Navbar() {
    const session = await getServerSession()

    return (
        <div className="mb-10 shadow-sm">
            <Container>
                <nav className="flex h-20 items-center justify-between py-5">
                    <Logo />
                    {session?.user ? (
                        <UserButton user={session.user as User} />
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
