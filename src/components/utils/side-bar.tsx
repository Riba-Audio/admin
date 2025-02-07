// sidebar 
"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes"
import AppImage from "../common/app-image";
import { images } from "@/assets";
import { ChartNoAxesCombined, ChevronsLeftRightIcon, Cog, Cpu, CreditCard, GitPullRequest, Layers3, Library, LogOut, Shield, Users } from "lucide-react";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import AppLink, {linkClassName as linkClassName2} from "../common/app-link";
import ThemeToggle from "@/components/utils/theme-toggle";
import { useAuthUser} from "@/auth/authHooks";
import useMounted from "@/hooks/useMounted";
import LogoutModal from "../modals/logout-modal";
import { cn } from "@/lib/utils";
import {getLocalStorageItem, setLocalStorageItem} from "@/helpers/local-storage"; 

const SideBar = () => {
    const theme: any = useTheme().theme ?? "dark";
    const pathname = usePathname();
    const mounted = useMounted(); 

    const [expandSideBar, setExpandSideBar] = React.useState<boolean>(false);
    const [openLogoutModal, setOpenLogoutModal] = React.useState<boolean>(false); 

    const auth = useAuthUser();
    const user = auth(); 

    React.useEffect(() => {
        if (!mounted) return; 

        let sidebarState = getLocalStorageItem("sidebar"); 
        if (sidebarState) {
            let val = Number(sidebarState); 
            if (val) setExpandSideBar(true)
        }
    }, [mounted])

    let linkClassName = (link: NavLinkType) => cn(pathname === link.href ? "bg-secondary text-secondary-color" : "", "my-1 hover:bg-secondary pl-2 py-2")
    let sideBarClass = (expanded: boolean) => cn(expanded ? "min-w-[180px]" : "", "py-4 duration-700 z-0 relative border-r-[.3px] border-r-background bg-background flex flex-col h-full overflow-hidden")
    if (!mounted) return <Skeleton className={sideBarClass(expandSideBar)}/>
    

    const handleExpandSideBar = () => {
        let val = !expandSideBar
        setExpandSideBar(val);
        setLocalStorageItem("sidebar", val ? 1: 0)
    }
    return (
        <>
            {
                user && (
                    <section className={sideBarClass(expandSideBar)}>
                        <>
                            <LogoutModal 
                                isOpen={openLogoutModal}
                                onClose={() => setOpenLogoutModal(false)}
                            />
                            <Logo theme={theme} expanded={expandSideBar} className=" px-2"/>
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
                                    <ThemeToggle expanded={expandSideBar}/>
                                    {
                                        footer_links.map((link, index) => (
                                            <React.Fragment key={index}>
                                                {
                                                    !link.button && (
                                                        <AppLink
                                                            key={index}
                                                            text={expandSideBar ? link.text : ""}
                                                            title={link.text}
                                                            icon={link.icon}
                                                            href={link.href}
                                                            className={linkClassName(link)}
                                                        />
                                                    )
                                                }
                                                {
                                                    link.button && link.text === "Logout" && (
                                                        <span 
                                                            className={cn(linkClassName2, linkClassName(link), "cursor-pointer")}
                                                            onClick={() => setOpenLogoutModal(true)}
                                                        >
                                                            {link.icon}
                                                            <span>{expandSideBar ? link.text : ""}</span>
                                                        </span>
                                                    )
                                                }
                                            </React.Fragment>
                                        ))
                                    }
                                </div>
                                <div className="flex justify-end my-2 px-1">
                                    <span
                                        // variant={"secondary"}
                                        // size={"icon"}
                                        className="block w-fit cursor-pointer p-2 rounded-sm "
                                        onClick={handleExpandSideBar}
                                    >
                                        <ChevronsLeftRightIcon size={18} />
                                    </span>

                                </div>
                            </nav>
                        </>
                    </section>
                )
            }
        </>
    )
};

export default SideBar;

type NavLinkType = {
    text: string;
    href: string;
    icon: React.ReactNode;
    button?: boolean;  
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
        text: "Computers",
        href: "/computers",
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
        icon: <LogOut size={20} />,
        button: true
    }
]

export const Logo = ({ theme, expanded, className }: { theme: "light" | "dark", expanded?: boolean, className?: string }) => {
    const [logo, setLogo] = React.useState<string>(images.logo_minor_black); 

    React.useEffect(() => {
        if (theme) {
            let img = theme === "dark" ? 
            (expanded ? images.logo_white : images.logo_minor_white): 
            (expanded ? images.logo_black : images.logo_minor_black)
        
            setLogo(img)
        }
    },[theme, expanded])
    return (
        <div
            className={cn(expanded ? "w-[80px] h-[40px]": "w-[40px] h-[40px]", "  relative")}
        >

            <AppImage
                src={logo}
                title="Logo"
                alt="Logo"
                fill
                objectFit="contain"
                nonBlur={true}
                className={cn("object-contain", className)}
                noLoad={true}
            />
        </div>
    )
}