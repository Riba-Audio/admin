import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const Requests = () => {

    return (
        <Card className="min-w-[400px] rounded-md h-[70vh]">
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>Recent Book Requests</CardTitle>
                    <CardDescription>
                        Book requests by customers
                    </CardDescription>
                </div>

            </CardHeader>
        </Card>
    )
};

export default Requests; 