// login page
"use client"; 

import AppInput from "@/components/common/app-input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {  Heading2 } from "@/components/ui/typography";
import { Logo } from "@/components/utils/side-bar";
import { validateEmail } from "@/utils/validation";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";
import {createToast} from '@/utils/toast';
import { login } from "@/auth/api-calls";
import { useSignIn, useAuthUser } from "@/auth/authHooks";
import { useRouter } from "next/navigation";

export default function Page() {
    const [mounted, setMounted] = React.useState<boolean>(false); 
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(false)
    const theme: any = useTheme().theme ?? "light";
    const signIn = useSignIn(); 
    const {push} = useRouter(); 
    const auth = useAuthUser(); 

    const user = auth(); 

    React.useEffect(() => setMounted(true), [])

    React.useEffect(() => {
        if (!mounted || !user) return; 
        if (user) {
            createToast("success", "Welcome back!");
            push("/")
        }
    }, [user, mounted])

    const handleLogin = async () => {
        if (!validateEmail(email)) {
            createToast("error", "Invalid email!");
            return; 
        }

        if (!password) {
            createToast("error", "Provide password!");
            return; 
        }

        setLoading(true); 

        let res = await login({email, password}, true);
        
        if (res) {
            createToast("success", "Login successfull!"); 
            signIn({
                token: res.token, 
                expiresIn: 60 * 60 * 1000, 
                tokenType: 'Bearer',
                authState: res.user, 
                 
            }); 
            push("/")
        }

        setLoading(false); 

    }

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
                    disabled={loading}
                />
                <Password
                    value={password}
                    setValue={setPassword}
                    disabled={loading}
                />
                <Button
                    disabled={loading}
                    onClick={handleLogin}
                >
                    Login
                </Button>
                <Separator />
                <Link href="/forgot" className="text-xs lg:text-sm duration-700 hover:text-secondary-color">Forgot Password?</Link>
            </Card>
        </main>
    )
};

export const Email = (
    { value, setValue, disabled }:
        {
            value: string;
            setValue: React.Dispatch<string>;
            disabled: boolean; 
        }
) => {


    return (
        <AppInput
            value={value}
            setValue={setValue}
            placeholder={"user@domain.com"}
            icon={<Mail size={18} />}
            disabled={disabled}
        />
    )
}
export const Password = (
    { value, setValue, disabled }:
        {
            value: string;
            setValue: React.Dispatch<string>;
            disabled: boolean; 
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
            disabled={disabled}
        />
    )
}