"use client"

import { useState } from "react"
import axios from "axios"
import { Loader, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface DeleteButtonProps {
    reviewId: number
    className?: string
}

function DeleteButton({ reviewId, className }: DeleteButtonProps) {
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)

    const handleDeleteClick = async () => {
        const config = {
            data: {
                reviewId,
            },
        }

        setIsLoading(true)

        try {
            await axios.delete("/api/review", config)
            window.location.reload()
        } catch (error) {
            toast({
                variant: "destructive",
                title: "An unexpected error occurred. Please try again later.",
            })
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button
            variant={"destructive"}
            onClick={handleDeleteClick}
            disabled={isLoading}
            className={className}
        >
            {isLoading ? <Loader className="animate-spin" /> : <Trash />}
        </Button>
    )
}

export default DeleteButton
