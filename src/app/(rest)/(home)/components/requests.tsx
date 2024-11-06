"use client"; 
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Heading3, Paragraph } from "@/components/ui/typography";
import { useCustomEffect } from "@/hooks/useEffect";
import { getDashboardRequests } from "@/lib/api-calls/dashboard";
import { createArray } from "@/utils/format-numbers";
import dayjs from "dayjs";
import { ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

type RequestType = {
    id: string; 
    user: {
        id: string; 
        name: string; 
        email: string; 
    }; 
    book: string; 
    status: string; 
    title: string; 
    author: string; 
    createdAt: string; 
}

const Requests = () => {
    const [mounted, setMounted] = React.useState<boolean>(false); 

    const [count, setCount] = React.useState<number>(0);
    const [requests, setRequests] = React.useState<RequestType[]>([]); 
    const [loading, setLoading] = React.useState<boolean>(true);

    const { push } = useRouter();

    React.useEffect(() => setMounted(true), [])

    const fetchRequests = async () => {
        if (!mounted) return; 

        setLoading(true); 
        let res = await getDashboardRequests(); 

        if (res) {
            setCount(res.count);
            setRequests(res.docs); 
        }

        setLoading(false); 
    }
    useCustomEffect(fetchRequests, [mounted])
    return (
        <Card className="min-w-[400px] rounded-md h-[70vh] flex flex-col">
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>Recent Book Requests ({count})</CardTitle>
                    <CardDescription>
                        Book requests by customers
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="py-3 flex-1 h-[60vh] overflow-auto flex flex-col gap-1">
                {
                    loading && (
                        <>
                            {createArray(11).map((_, index) => <RequestSkeleton key={index}/>)}
                        </>
                    )
                }
                {
                    !loading && (
                        <>
                            {
                                requests.map((request, index) => (
                                    <Request key={index} request={request}/>
                                ))
                            }
                        </>
                    )
                }
                {
                    !loading && !requests.length && (
                        <div className="h-[40vh] flex items-center justify-center">
                            <Paragraph>No requests found!</Paragraph>
                        </div>
                    )
                }
            </CardContent>
            <CardFooter>
                <Button
                    onClick={() => push("/requests")}
                    className="w-full"
                >
                    View all <ExternalLink size={18}/>
                </Button>
            </CardFooter>
        </Card>
    )
};

export default Requests; 

const Request = ({request}: {request: RequestType}) => {

    return (
        <div className="flex flex-col gap-1">
            <Heading3 className="text-sm lg:text-md">{request.title}</Heading3>
            <Paragraph className="text-xs lg:text-sm">Author: {request.author}</Paragraph>
            <Paragraph className="text-xs lg:text-xs">Requested by: {request.user.name}</Paragraph>
            <Paragraph className="self-end text-xs lg:text-xs">{dayjs(new Date(request.createdAt)).format("DD MMM, YYYY")}</Paragraph>
            <Separator />
        </div>
    )
}
const RequestSkeleton = () => (
    <div className="flex flex-col gap-2">
        <Skeleton className="w-[80%] h-[15px] rounded-full"/>
        <div className="flex gap-2 items-center">
            <Skeleton className="w-[25%] h-[10px] rounded-full"/>
            {/* <Skeleton className="w-[25%] h-[10px] rounded-full"/> */}
        </div>
        <div className="flex flex-col">
            <Skeleton className="w-[50%] h-[10px] rounded-full"/>
            <Skeleton className="w-[30%] h-[10px] rounded-full self-end"/>
        </div>
    </div>
)