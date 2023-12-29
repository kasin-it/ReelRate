"use client"

import { User } from "@/types"

import AuthenticateButtons from "@/components/Navbar/authenticate-buttons"
import UserButton from "@/components/Navbar/user-button"

interface UserSectionProps {
    user: User | null
}

function UserSection({ user }: UserSectionProps) {
    return <>{user ? <UserButton user={user} /> : <AuthenticateButtons />}</>
}
export default UserSection
