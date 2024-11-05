import React, { PropsWithChildren } from "react";
import { Card } from "@/components/ui/card";

import SideBar from "./side-bar";
import UserPopover from "../popovers/user-popover";
import { Heading1, Heading2, Heading4 } from "../ui/typography";
import { Copyright } from "lucide-react";

// screen container 
interface ContainerProps extends PropsWithChildren {
    title: string;
    headerComponent?: React.ReactNode;
    subtitle?: string | React.ReactNode;
}
const Container: React.FC<ContainerProps> = ({
    title, headerComponent, subtitle, children
}) => {

    return (
        <>
            <SideBar />
            <main className="flex-1 flex flex-col gap-1 p-2 py-0">
                <div className="flex justify-between items-center py-2 mb-5">
                    <div>
                        <Heading1 className="text-xl lg:text-2xl">{title}</Heading1>
                        {
                            subtitle && (
                                <Heading2 className="text-sm lg:text-md text-gray-500">{subtitle}</Heading2>
                            )
                        }
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