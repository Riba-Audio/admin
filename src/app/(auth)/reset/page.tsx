//  forgot page 

"use client";
import { Card } from "@/components/ui/card";
import {   Heading2 } from "@/components/ui/typography";
import { Logo } from "@/components/utils/side-bar";
import { useTheme } from "next-themes";
import React from "react";
import {   Password } from "../login/page";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
 

 


export default function Page() {
    const [password, setPassword] = React.useState<string>(""); 
    const [passwordConfirm, setPasswordConfirm] = React.useState<string>(""); 

    const theme: any = useTheme().theme ?? "light";
    return (
        <main className="flex items-center justify-center flex-1 p-2">
            <Card className="max-md:w-full lg:min-w-[400px] p-4 flex flex-col gap-3">
                <div className="flex justify-center">
                    <Logo theme={theme} expanded={true}/>
                </div>
                <Heading2 className="text-center">Reset password</Heading2>
                <Separator />
                <Password
                    value={password}
                    setValue={setPassword}
                />
                <Password
                    value={passwordConfirm}
                    setValue={setPasswordConfirm}
                />
                <Button>
                    Reset
                </Button>
              
            </Card>
        </main>
    )
}