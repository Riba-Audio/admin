"use client"; 

import React, { PropsWithChildren } from "react";
import { Card } from "@/components/ui/card";

import SideBar from "./side-bar";
import UserPopover from "../popovers/user-popover";
import { Heading1, Heading2, Heading3, Heading4, Paragraph } from "../ui/typography";
import { ChevronLeft, Copyright } from "lucide-react";
import { useAuthUser } from "@/auth/authHooks";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import Link from "next/link";

type AdminType = "main";

// screen container 
interface ContainerProps extends PropsWithChildren {
    title: string;
    headerComponent?: React.ReactNode;
    subtitle?: string | React.ReactNode;
    authorized?: AdminType,
    backPage?: boolean; 
}
const Container: React.FC<ContainerProps> = ({
    title, headerComponent, subtitle, children,
    authorized, backPage = false
}) => {
    const [loading, setLoading] = React.useState<boolean>(true);
    const [mounted, setMounted] = React.useState<boolean>(false); 
    const [loggedIn, setLoggedIn] = React.useState<boolean>(false); 

    const auth = useAuthUser(); 
    const user = auth(); 

    const {back, push} = useRouter();  

    React.useEffect(() => setMounted(true), []); 

    React.useEffect(() => {
        if (!mounted) return; 

        if (
            user && user.role !== "user" 
            // && (authorized ? authorized?.includes(user.role): true)
        ) setLoggedIn(true); 
        else {
            setLoggedIn(false); 
        }; 

        setLoading(false); 
    }, [user, mounted]); 

    if (!mounted || loading) {
        return (
            <Card className="flex-1 px-2 py-2">
                <div className="w-full flex items-center justify-between w-full">
                    <Skeleton className="h-[20px] w-[160px] rounded-lg bg-secondary"/>
                    <div className="flex gap-2">
                        {/* <Button variant="secondary" size="icon" className="bg-background"/> */}
                        <Skeleton className="w-[140px] h-[40px] rounded-lg bg-secondary"/>
                    </div>
                </div>
                
                <div>
                    <Paragraph className="text-xs lg:text-md font-bold my-4">Loading...</Paragraph>
                </div>
            </Card>
        )
    }

    return (
        <>
            {
                !loading && loggedIn && (
                    <>
                        <SideBar />
                        <main className="flex-1 flex flex-col gap-1 p-2 py-0">
                            <div className="flex justify-between items-center py-2 mb-5">
                                <div className="flex gap-2 items-center">
                                    {backPage && <Button size="icon" variant="ghost" onClick={() => back()} className="hover:bg-background"><ChevronLeft size={25}/></Button>}
                                    <div>
                                        <Heading1 className="text-xl lg:text-2xl">{title}</Heading1>
                                        {
                                            subtitle && (
                                                <Heading2 className="text-sm lg:text-md text-gray-500">{subtitle}</Heading2>
                                            )
                                        }

                                    </div>
                                </div>
                                
                                <div className="flex gap-2 items-center">
                                    
                                    <UserPopover />
                                </div>
                            </div>
                            {headerComponent && headerComponent}
                            <div className="flex-1 overflow-auto">
                                {children}
                            </div>
                            <Card className="py-2 rounded-none flex justify-center gap-2 items-center">
                                <Copyright size={18} />
                                <Heading4 className="text-sm lg:text-md">{process.env.NEXT_PUBLIC_COMPANY} Admin. {new Date().getFullYear()}</Heading4>
                            </Card>
                        </main>
                    </>
                )
            }
            {
                !loading && !loggedIn && (
                    <main className="flex-1 flex">
                        <Card className="flex-1 flex flex-col gap-1 p-2">
                            <Heading3 className="text-sm lg:text-md my-2">You are not authorized to access the page!</Heading3>
                            <Link href="/login" className="text-sm lg:text-md hover:text-active-color">Click here to log in.</Link>
                        </Card>
                    </main>
                )
            }
        </>
    )
};

export default Container; 