//  forgot page 

"use client";
import { Card } from "@/components/ui/card";
import {  Heading2 } from "@/components/ui/typography";
import { Logo } from "@/components/utils/side-bar";
import { useTheme } from "next-themes";
import React from "react";
import { Email } from "../login/page";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

 


export default function Page() {
    const [email, setEmail] = React.useState<string>(""); 
    const theme: any = useTheme().theme ?? "light";
    return (
        <main className="flex items-center justify-center flex-1 p-2">
            <Card className="max-md:w-full lg:min-w-[400px] p-4 flex flex-col gap-3">
                <div className="flex justify-center">
                    <Logo theme={theme} expanded={true}/>
                </div>
                <Heading2 className="text-center">Forgot password</Heading2>
                <Separator />
                <Email 
                    value={email}
                    setValue={setEmail}
                />
                <Button>
                    Submit
                </Button>
                <Separator />
                <Link href="/login" className="text-xs lg:text-sm duration-700 hover:text-secondary-color">Back to login</Link>
            </Card>
        </main>
    )
}