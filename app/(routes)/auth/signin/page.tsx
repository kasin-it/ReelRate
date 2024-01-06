import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { Card, CardTitle } from "@/components/ui/card"

import GithubLoginButton from "./github-login-button"

const LoginPage = async () => {
    const session = await getServerSession()

    if (!session) {
        return (
            <div className="flex h-full w-full justify-center">
                <Card className="flex h-[150px] w-full max-w-sm flex-col items-center gap-5 py-5">
                    <CardTitle>Sign In</CardTitle>
                    <GithubLoginButton />
                </Card>
            </div>
        )
    } else {
        redirect("/")
    }
}

export default LoginPage
