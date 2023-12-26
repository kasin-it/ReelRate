import { Card, CardDescription, CardTitle } from "@/components/ui/card"

function RatingCard() {
    return (
        <Card className="flex flex-col gap-2 p-5">
            <CardTitle>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                        <div className="flex size-16 items-center justify-center rounded-md bg-green-600 text-white">
                            <p>10</p>
                        </div>
                        <h1>Marcelek Precelek</h1>
                    </div>
                    <p className="text-lg font-thin text-muted-foreground">
                        12/07/2004
                    </p>
                </div>
            </CardTitle>
            <CardDescription className="text-lg">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam
                quasi iure illo libero? Ipsum quos magnam, fuga exercitationem
                ab minima perferendis libero rem aperiam, ad tempore odio,
                placeat nam corporis.
            </CardDescription>
        </Card>
    )
}
export default RatingCard
