import Link from "next/link"
import { Navigation } from "@/enums/navigation"

function Logo() {
    return (
        <Link
            href={Navigation.Home}
            aria-label="Home"
            className="text-xl font-bold"
        >
            ⭐ReelRate
        </Link>
    )
}
export default Logo
