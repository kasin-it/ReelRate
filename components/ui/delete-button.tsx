"use client"

import { useState } from "react"
import axios from "axios"
import { Loader, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface DeleteButtonProps {
    reviewId: number
}

function DeleteButton({ reviewId }: DeleteButtonProps) {
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)

    const handleDeleteClick = async () => {
        const config = {
            data: {
                reviewId,
            },
        }

        try {
            await axios.delete("/api/review", config)
            window.location.reload()
        } catch (error) {
            toast({
                variant: "destructive",
                title: "An unexpected error occurred. Please try again later.",
            })
            console.error(error)
        }
    }

    return (
        <Button
            variant={"destructive"}
            onClick={handleDeleteClick}
            disabled={isLoading}
        >
            {isLoading ? <Loader className="animate-spin" /> : <Trash />}
        </Button>
    )
}

export default DeleteButton
