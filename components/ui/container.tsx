interface ContainerProps {
    children: React.ReactNode
}

function Container({ children }: ContainerProps) {
    return (
        <div className="flex w-full justify-center">
            <div className="w-full max-w-[1300px] px-4 sm:px-6 md:px-10 xl:px-2 2xl:px-0">
                {children}
            </div>
        </div>
    )
}
export default Container
