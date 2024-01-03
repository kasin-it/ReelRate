"use client"

import { useState } from "react"
import axios from "axios"
import { Heart } from "lucide-react"

import { cn } from "@/lib/utils"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"

interface AddToFavouritesButtonProps {
    movieId: string
    isLiked?: boolean
    refresh?: boolean
}

function AddToFavouritesButton({
    movieId,
    isLiked = false,
    refresh = false,
}: AddToFavouritesButtonProps) {
    const [isFavourite, setIsFavourite] = useState(isLiked)
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()

    const handleClick = async () => {
        setIsFavourite((prev) => !prev)
        setIsLoading(true)

        try {
            const data = {
                movieId: movieId,
            }

            const res = await axios.post("/api/favourites", data)

            if (!res.data) {
                throw new Error("No data returned")
            }

            if (refresh) {
                window.location.reload()
            }
        } catch (error) {
            setIsFavourite((prev) => !prev)
            toast({
                variant: "destructive",
                title: "Something went wrong...",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <button
                        disabled={isLoading}
                        onClick={handleClick}
                        className={cn(
                            "rounded-full border bg-white p-5 shadow-lg",
                            isFavourite ? "bg-red-500 text-white" : null
                        )}
                    >
                        <Heart />
                    </button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>
                        {isFavourite
                            ? "Remove from favorites"
                            : "Add to favorites"}
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default AddToFavouritesButton
