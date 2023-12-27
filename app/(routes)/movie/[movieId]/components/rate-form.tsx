import { useParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { SubmitHandler, useForm } from "react-hook-form"
import z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

interface RateForm {
    color: string | null
    index: number
}

const formSchema = z.object({
    content: z.string().max(512),
    rating: z.number().min(0).max(10),
    movieId: z.string().min(1).max(100),
})

type FormData = z.infer<typeof formSchema>

function RateForm({ color, index }: RateForm) {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        mode: "onSubmit",
        reValidateMode: "onSubmit",
    })
    const { toast } = useToast()
    const { movieId } = useParams()

    const onSubmit = async (data: FormData) => {
        try {
            const res = await axios.post("/api/reviews", data)
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
                    id="content"
                    {...register("content")}
                    disabled={isSubmitting}
                />
                <Input
                    value={index}
                    {...register("rating", {
                        valueAsNumber: true,
                    })}
                    className="hidden"
                    disabled={isSubmitting}
                />
                <Input
                    value={movieId}
                    {...register("movieId")}
                    className="hidden"
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
