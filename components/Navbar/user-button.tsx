import Link from "next/link"
import { Navigation } from "@/enums/navigation"
import { User } from "@/types"
import { LogOut, User as UserIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface UserButtonProps {
    user: User
}

function UserButton({ user: { picture, nickname, name } }: UserButtonProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar>
                    <AvatarImage src={picture} />
                    <AvatarFallback>{nickname[0]}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>{name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link
                        href={Navigation.Profile}
                        aria-label="profile"
                        className="flex w-full items-center"
                    >
                        <UserIcon className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link
                        href={Navigation.Logout}
                        aria-label="logout"
                        className="flex w-full items-center"
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export default UserButton
