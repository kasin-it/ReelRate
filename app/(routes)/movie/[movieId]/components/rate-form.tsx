import { useState } from "react"
import { useParams } from "next/navigation"
import axios from "axios"
import { useForm } from "react-hook-form"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

interface RateForm {
    color: string | null
    index: number
}

function RateForm({ color, index }: RateForm) {
    const {
        handleSubmit,
        formState: { isSubmitting },
    } = useForm({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
    })
    const { toast } = useToast()
    const { movieId } = useParams()
    const [content, setContent] = useState("")

    const handleContentChange = (value: string) => {
        setContent(value)
    }

    const onSubmit = async () => {
        const data = {
            movieId,
            rating: index,
            content,
            index,
        }

        try {
            await axios.post("/api/reviews", data)
            toast({
                title: "Your review has been successfully posted!",
            })
        } catch (error) {
            toast({
                variant: "destructive",
                title: "An unexpected error occurred. Please try again later.",
            })
            console.error(error)
        }
    }

    return (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Textarea
                    rows={5}
                    placeholder="Share with us your opinion!"
                    className=" focus-visible:ring-0"
                    value={content}
                    onChange={(e) => handleContentChange(e.target.value)}
                    disabled={isSubmitting}
                />
            </div>
            <Button
                className={cn("hover:bg- hover:opacity-80", color)}
                type="submit"
                disabled={isSubmitting}
            >
                Submit
            </Button>
        </form>
    )
}
export default RateForm
