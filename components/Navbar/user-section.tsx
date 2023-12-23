"use client"

import { User } from "@/types"
import { getSession } from "@auth0/nextjs-auth0"
import { useUser } from "@auth0/nextjs-auth0/client"

import AuthenticateButtons from "@/components/Navbar/authenticate-buttons"
import UserButton from "@/components/Navbar/user-button"

function UserSection() {
    const { user, error, isLoading } = useUser()

    if (isLoading) {
        return null
    }

    if (error) {
        return <AuthenticateButtons />
    }

    return (
        <>
            {user ? (
                <UserButton user={user as User} />
            ) : (
                <AuthenticateButtons />
            )}
        </>
    )
}
export default UserSection
