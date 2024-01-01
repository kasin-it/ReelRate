import { getSelf } from "@/actions"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Container from "@/components/ui/container"
import { Separator } from "@/components/ui/separator"

import ProfileNavigation from "./profile-navigation"

async function ProfilePage() {
    const user = await getSelf()

    return (
        <Container className="flex flex-col gap-5">
            <section className="flex items-center gap-5">
                <Avatar className=" size-24">
                    <AvatarImage src={user?.image} />
                    <AvatarFallback>{user?.name[0]}</AvatarFallback>
                </Avatar>
                <p className="text-5xl">{user?.name}</p>
            </section>
            <Separator />
            <ProfileNavigation />
            <Separator />
        </Container>
    )
}
export default ProfilePage
