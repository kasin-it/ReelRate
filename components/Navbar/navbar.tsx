import Link from "next/link"
import { Navigation } from "@/enums/navigation"

import Container from "@/components/ui/container"
import UserSection from "@/components/Navbar/user-section"

function Navbar() {
    return (
        <div className="mb-10 shadow-sm">
            <Container>
                <nav className="flex items-center justify-between py-5">
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
