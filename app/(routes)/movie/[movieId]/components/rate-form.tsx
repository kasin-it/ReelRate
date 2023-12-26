import { zodResolver } from "@hookform/resolvers/zod"
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
    rating: z.string(),
    content: z.string().max(512),
})

type FormSchema = z.infer<typeof formSchema>

function RateForm({ color, index }: RateForm) {
    const {
        register,
        handleSubmit,
        formState: { errors, isLoading },
    } = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
    })
    // const { toast } = useToast()
    const onSubmit: SubmitHandler<FormSchema> = (data) => {
        console.log(data)
    }

    // if (errors.content) {
    //     toast({
    //         variant: "destructive",
    //         title: "Uh oh! Something went wrong.",
    //         description: errors.content.message,
    //     })
    // } else if (errors.rating) {
    //     toast({
    //         variant: "destructive",
    //         title: "Uh oh! Something went wrong.",
    //         description: errors.rating.message,
    //     })
    // }

    return (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Textarea
                    rows={5}
                    placeholder="Share with us your opinion!"
                    className=" focus-visible:ring-0"
                    id="content"
                    {...register("content")}
                    disabled={isLoading}
                />
                <Input
                    className="hidden"
                    id="rating"
                    type="number"
                    defaultValue={index}
                    value={index}
                    {...register("rating")}
                    disabled={isLoading}
                />
            </div>
            <Button
                className={cn("hover:bg- hover:opacity-80", color)}
                type="submit"
                disabled={isLoading}
            >
                Submit
            </Button>
        </form>
    )
}
export default RateForm
