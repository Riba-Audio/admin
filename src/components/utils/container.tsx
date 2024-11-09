"use client"; 

import React, { PropsWithChildren } from "react";
import { Card } from "@/components/ui/card";

import UserPopover from "../popovers/user-popover";
import { Heading1, Heading2, Heading4 } from "../ui/typography";
import { ChevronLeft, Copyright } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Player from "@/components/utils/player";
 

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
 
    const {back} = useRouter();  

    return (
        <>
            
            <main className="flex-1 flex flex-col gap-1 p-2 py-0 relative">
                <Player />
                <div className="flex justify-between items-center py-2">
                    <div className="flex gap-2 items-center">
                        {backPage && <Button size="icon" variant="secondary" onClick={() => back()} className="hover:bg-background"><ChevronLeft size={25}/></Button>}
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
};

export default Container; 