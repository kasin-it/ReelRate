import dynamic from "next/dynamic"
import Link from "next/link"
import { Navigation } from "@/enums/navigation"

import Container from "@/components/ui/container"
import { Skeleton } from "@/components/ui/skeleton"

const UserSection = dynamic(() => import("@/components/Navbar/user-section"), {
    loading: () => null,
    ssr: false,
})

function Navbar() {
    return (
        <div className="mb-10 shadow-sm">
            <Container>
                <nav className="flex h-20 items-center justify-between py-5">
                    <Link
                        href={Navigation.Home}
                        aria-label="Home"
                        className="text-xl font-bold"
                    >
                        ⭐ReelRate
                    </Link>
                    <UserSection />
                </nav>
            </Container>
        </div>
    )
}
export default Navbar
