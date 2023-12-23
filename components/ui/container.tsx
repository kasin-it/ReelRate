import { cn } from "@/lib/utils"

interface ContainerProps {
    children: React.ReactNode
    className?: string
}

function Container({ children, className }: ContainerProps) {
    return (
        <div className="flex w-full justify-center">
            <div
                className={cn(
                    "flex w-full max-w-[1300px] flex-col px-4 sm:px-6 md:px-10 xl:px-2 2xl:px-0",
                    className
                )}
            >
                {children}
            </div>
        </div>
    )
}
export default Container
