import { Opinions } from "@/enums/opinions"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getRating(value: number) {
    let color = "bg-negative text-white"
    let opinion = Opinions.VeryBad

    if (value > 8) {
        opinion = Opinions.VeryGood
        color = "bg-positive text-white"
    } else if (value > 6) {
        opinion = Opinions.Good
        color = "bg-positive text-white"
    } else if (value > 4) {
        opinion = Opinions.Mixed
        color = "bg-passive"
    } else if (value > 1) {
        color = "bg-negative text-white"
        opinion = Opinions.Bad
    }

    return { color: color, opinion }
}
