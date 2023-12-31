"use client"

import { useState } from "react"
import { Github, Loader } from "lucide-react"
import { signIn } from "next-auth/react"

import { Button } from "@/components/ui/button"

function GithubLoginButton() {
    const [loading, setLoading] = useState(false)

    const handleClick = () => {
        setLoading(true)
        signIn("github")
    }

    return (
        <Button onClick={handleClick} className="flex gap-2" disabled={loading}>
            {loading ? <Loader className="animate-spin" /> : <Github />} Sign in
            with Github
        </Button>
    )
}
export default GithubLoginButton
