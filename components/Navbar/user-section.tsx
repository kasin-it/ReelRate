import { User } from "@/types"
import { getSession } from "@auth0/nextjs-auth0"

import AuthenticateButtons from "@/components/Navbar/authenticate-buttons"
import UserButton from "@/components/Navbar/user-button"

async function UserSection() {
    const session = await getSession()

    return (
        <>
            {session?.user ? (
                <UserButton user={session.user as User} />
            ) : (
                <AuthenticateButtons />
            )}
        </>
    )
}
export default UserSection
