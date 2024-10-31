// sidebar 
"use client";

import { useTheme } from "next-themes"
import AppImage from "./common/app-image";
import { images } from "@/assets";
import { ChartNoAxesCombined, ChevronsLeftRightIcon, Cog, Cpu, CreditCard, GitPullRequest, Layers3, Library, LogOut, Shield, Users } from "lucide-react";
import { Separator } from "./ui/separator";
import AppLink from "./common/app-link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import React from "react";


const SideBar = () => {
    const theme: any = useTheme().theme ?? "dark";
    const pathname = usePathname();

    const [expandSideBar, setExpandSideBar] = React.useState<boolean>(false);

    let linkClassName = (link: NavLinkType) => cn(pathname === link.href ? "bg-secondary text-secondary-color" : "", "my-1 hover:bg-secondary px-2 py-2")
    return (
        <section className={cn(expandSideBar ? "min-w-[180px]" : "", "duration-700 z-0 relative py-3 border-r-[.3px] border-r-grey-500 bg-background flex flex-col h-full overflow-hidden")}>
            <Button
                variant={"secondary"}
                size={"icon"}
                className=" absolute right-0 bottom-0 mb-[7rem] -mr-[.5rem] z-[9999]"
                onClick={() => setExpandSideBar(!expandSideBar)}
            >
                <ChevronsLeftRightIcon size={18} />
            </Button>
            <Logo theme={theme} expanded={expandSideBar} className="px-2"/>
            <Separator className="my-3" />
            <nav className="flex-1 flex flex-col">
                <div className="flex-1">
                    {
                        links.map((link, index) => (
                            <AppLink
                                key={index}
                                text={expandSideBar ? link.text : ""}
                                title={link.text}
                                icon={link.icon}
                                href={link.href}
                                className={linkClassName(link)}
                            />
                        ))
                    }
                </div>
                <div>
                    {
                        footer_links.map((link, index) => (
                            <AppLink
                                key={index}
                                text={expandSideBar ? link.text : ""}
                                title={link.text}
                                icon={link.icon}
                                href={link.href}
                                className={linkClassName(link)}
                            />
                        ))
                    }
                </div>
            </nav>
        </section>
    )
};

export default SideBar;

type NavLinkType = {
    text: string;
    href: string;
    icon: React.ReactNode;
}

const links: NavLinkType[] = [
    {
        text: "Dashboard",
        href: "/",
        icon: <ChartNoAxesCombined size={20} />
    },
    {
        text: "Categories",
        href: "/categories",
        icon: <Layers3 size={20} />
    },
    {
        text: "Books",
        href: "/books",
        icon: <Library size={20} />
    },
    {
        text: "Orders",
        href: "/orders",
        icon: <CreditCard size={20} />
    },
    {
        text: "GPUs",
        href: "/gpus",
        icon: <Cpu size={20} />
    },
    {
        text: "Requests",
        href: "/requests",
        icon: <GitPullRequest size={20} />
    },
    {
        text: "Users",
        href: "/users",
        icon: <Users size={20} />
    },

    {
        text: "Admins",
        href: "/admins",
        icon: <Shield size={20} />
    },
];

const footer_links: NavLinkType[] = [
    {
        text: "Settings",
        href: "/settings",
        icon: <Cog size={20} />
    },
    {
        text: "Logout",
        href: "/logout",
        icon: <LogOut size={20} />
    }
]

export const Logo = ({ theme, expanded, className }: { theme: "light" | "dark", expanded?: boolean, className?: string }) => {

    return (
        <AppImage
            src={theme === "dark" ? 
                (expanded ? images.logo_white : images.logo_minor_white): 
                (expanded ? images.logo_black : images.logo_minor_black)
            }
            title="Logo"
            alt="Logo"
            width={expanded ? 80: 35}
            height={expanded ? 50: 35}
            objectFit="contain"
            nonBlur={true}
            className={cn(className)}
        />
    )
}