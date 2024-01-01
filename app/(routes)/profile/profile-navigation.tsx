"use client"

import React from "react"
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
                <React.Fragment key={idx}>
                    {idx !== 0 && (
                        <Separator
                            orientation="vertical"
                            key={`separator-${idx}`}
                        />
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
                </React.Fragment>
            ))}
        </div>
    )
}

export default ProfileNavigation
