// login page
"use client"; 

import AppInput from "@/components/common/app-input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {  Heading2 } from "@/components/ui/typography";
import { Logo } from "@/components/utils/side-bar";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";

export default function Page() {

    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const theme: any = useTheme().theme ?? "light";

    return (
        <main className="flex items-center justify-center flex-1 p-2">
            <Card className="max-md:w-full lg:min-w-[400px] p-4 flex flex-col gap-3">
                <div className="flex justify-center">
                    <Logo theme={theme} expanded={true}/>
                </div>
                <Heading2 className="text-center">Admin Login</Heading2>
                <Separator />
                <Email
                    value={email}
                    setValue={setEmail}

                />
                <Password
                    value={password}
                    setValue={setPassword}
                />
                <Button>
                    Login
                </Button>
                <Separator />
                <Link href="/forgot" className="text-xs lg:text-sm duration-700 hover:text-secondary-color">Forgot Password?</Link>
            </Card>
        </main>
    )
};

export const Email = (
    { value, setValue }:
        {
            value: string;
            setValue: React.Dispatch<string>;
        }
) => {


    return (
        <AppInput
            value={value}
            setValue={setValue}
            placeholder={"user@domain.com"}
            icon={<Mail size={18} />}
        />
    )
}
export const Password = (
    { value, setValue }:
        {
            value: string;
            setValue: React.Dispatch<string>;
        }
) => {
    const [showPassword, setShowPassword] = React.useState<boolean>(false);


    return (
        <AppInput
            value={value}
            setValue={setValue}
            placeholder={"*********"}
            type={showPassword ? "text": "password"}
            icon={
                <Lock size={18} />
            }
            button={
                <Button variant={"ghost"} onClick={() => setShowPassword(!showPassword)}>{!showPassword ? <Eye size={18} /> : <EyeOff size={18} />}</Button>
            }
        />
    )
}