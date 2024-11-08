"use client"; 
import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import {  Heading3,  Paragraph } from "@/components/ui/typography";
import { useAuthUser, useSignIn, useSignOut} from "@/auth/authHooks";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { getUser } from "@/lib/api-calls/user";
import { useCustomEffect } from "@/hooks/useEffect";
import { getCookie, setCookie } from "@/helpers/cookies";
import ConfirmVoices from "@/components/utils/load-voices";

export default function ProtectedLayout({
    children, 
}: Readonly<{
  children: React.ReactNode;
}>) {
    const [loading, setLoading] = React.useState<boolean>(true);
    const [mounted, setMounted] = React.useState<boolean>(false);
    const [loggedIn, setLoggedIn] = React.useState<boolean>(false); 

    const auth = useAuthUser(); 
    const user = auth(); 
    const signOut = useSignOut(); 
    const { push } = useRouter(); 

    React.useEffect(() => setMounted(true), []); 

    const fetchUser = async () => {
        if (!mounted || !user || !user.role) return;
        setLoading(true)
        let res = await getUser(); 
        if (res) {
            let authState: any = getCookie("_auth_state"); 

            let updatedAuthState = {...JSON.parse(authState), ...res};
            setCookie("_auth_state", JSON.stringify(updatedAuthState));
            setLoggedIn(true);
        } else {
            setLoggedIn(false)
            signOut();
            push("/login")
        }
        setLoading(false)
    }

    useCustomEffect(fetchUser, [user, mounted]);

    if (!mounted || loading) {
        return (
            <Card className="flex-1 px-2 py-2">
                <div className="w-full flex items-center justify-between w-full">
                    <Skeleton className="h-[20px] w-[160px] rounded-lg bg-secondary"/>
                    <div className="flex gap-2">
                         
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
                        <ConfirmVoices />
                        {children}
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
}