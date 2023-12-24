import dynamic from "next/dynamic"

import Container from "@/components/ui/container"
import Logo from "@/components/ui/logo"

const UserSection = dynamic(() => import("@/components/Navbar/user-section"), {
    loading: () => null,
    ssr: false,
})

function Navbar() {
    return (
        <div className="mb-10 shadow-sm">
            <Container>
                <nav className="flex h-20 items-center justify-between py-5">
                    <Logo />
                    <UserSection />
                </nav>
            </Container>
        </div>
    )
}
export default Navbar
