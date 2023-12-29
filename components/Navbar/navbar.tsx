import dynamic from "next/dynamic"
import { checkUser } from "@/actions/check-user"
import { User } from "@/types"
import { getSession } from "@auth0/nextjs-auth0"

import Container from "@/components/ui/container"
import Logo from "@/components/ui/logo"

const UserSection = dynamic(() => import("@/components/Navbar/user-section"), {
    loading: () => null,
    ssr: false,
})

async function Navbar() {
    const session = await getSession()

    let user = null

    if (session?.user) {
        user = await checkUser(session.user as User)
    }

    return (
        <div className="mb-10 shadow-sm">
            <Container>
                <nav className="flex h-20 items-center justify-between py-5">
                    <Logo />
                    <UserSection user={user} />
                </nav>
            </Container>
        </div>
    )
}
export default Navbar
