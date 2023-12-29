import dynamic from "next/dynamic"
import { User } from "@/types"
import { getServerSession } from "next-auth"

import Container from "@/components/ui/container"
import Logo from "@/components/ui/logo"

import AuthenticateButtons from "./authenticate-buttons"

const UserButton = dynamic(() => import("./user-button"), {
    loading: () => null,
    ssr: false,
})

async function Navbar() {
    const session = await getServerSession()

    console.log(session)

    return (
        <div className="mb-10 shadow-sm">
            <Container>
                <nav className="flex h-20 items-center justify-between py-5">
                    <Logo />
                    {session?.user ? (
                        <UserButton user={session.user} />
                    ) : (
                        <AuthenticateButtons />
                    )}
                </nav>
            </Container>
        </div>
    )
}
export default Navbar
