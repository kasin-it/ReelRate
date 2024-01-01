"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

function ProfileNavigation() {
    const pathname = usePathname()

    const ROUTES = [
        { label: "My reviews", href: "/profile" },
        { label: "My favourites", href: "/profile/favourites" },
    ]

    return (
        <div className="flex gap-3 text-black">
            {ROUTES.map((route, idx) => (
                <>
                    {idx !== 0 && (
                        <Separator orientation="vertical" key={idx} />
                    )}
                    <Link
                        key={route.href}
                        href={route.href}
                        className={cn(
                            pathname === route.href
                                ? "cursor-default text-muted-foreground"
                                : null
                        )}
                    >
                        {route.label}
                    </Link>
                </>
            ))}
        </div>
    )
}
export default ProfileNavigation
