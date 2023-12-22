import Link from "next/link"
import { Navigation } from "@/enums/navigation"

import { buttonVariants } from "../ui/button"

function AuthenticateButtons() {
    return (
        <div className="flex gap-2">
            <Link
                className={buttonVariants({ variant: "default" })}
                href={Navigation.SignIn}
            >
                Sign In
            </Link>
            <Link
                className={buttonVariants({ variant: "outline" })}
                href={Navigation.SignUp}
            >
                Sign Up
            </Link>
        </div>
    )
}
export default AuthenticateButtons
