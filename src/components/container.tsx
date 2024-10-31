import React, { PropsWithChildren } from "react";
import SideBar from "./side-bar";
import User from "./user";
import UserPopover from "./popovers/user-popover";
import { Heading1, Heading2, Heading4 } from "./ui/typography";
import { Copyright } from "lucide-react";
import ThemeToggle from "@/utils/theme-toggle";

// screen container 
interface ContainerProps extends PropsWithChildren {
    title: string;
    headerComponent?: React.ReactNode;
    subtitle?: string;
}
const Container: React.FC<ContainerProps> = ({
    title, headerComponent, subtitle, children
}) => {

    return (
        <>
            <SideBar />
            <main className="flex-1 flex flex-col gap-3 p-2">
                <div className="flex justify-between items-center">
                    <div>
                        <Heading1 className="text-xl lg:text-2xl">{title}</Heading1>
                        {
                            subtitle && (
                                <Heading2 className="text-sm lg:text-md text-grey-500">{subtitle}</Heading2>
                            )
                        }
                    </div>
                    <div className="flex gap-2 items-center">
                        <ThemeToggle />
                        <UserPopover />
                    </div>
                </div>
                <div className="flex-1 overflow-auto">
                    {children}
                </div>
                <div className="py-1 flex justify-center gap-2 items-center">
                    <Copyright size={18} />
                    <Heading4 className="text-sm lg:text-md">{process.env.NEXT_PUBLIC_COMPANY} Admin. {new Date().getFullYear()}</Heading4>
                </div>
            </main>
        </>
    )
};

export default Container; 