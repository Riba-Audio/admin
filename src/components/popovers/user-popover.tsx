"use client"; 
import React from "react";
import { Cog, LogOut, UserIcon } from "lucide-react"
import AppLink, { linkClassName } from "../common/app-link"
import User from "../utils/user"
import PopoverContainer from "./container"
import LogoutModal from "../modals/logout-modal";
import { cn } from "@/lib/utils";



const UserPopover = () => {
    const [openLogoutModal, setOpenLogoutModal] = React.useState<boolean>(false); 

    return (
        <>
            <LogoutModal 
                isOpen={openLogoutModal}
                onClose={() => setOpenLogoutModal(false)}
            />
            <PopoverContainer
                trigger={
                    <User className="self-end"/>
                }
                contentClassName="w-[180px] absolute -mt-[.1rem] -right-[5.8rem]"
            >
                <div className="flex flex-col gap-3">
                    <AppLink 
                        text="Profile" 
                        title="Profile" 
                        href="/profile"
                        icon={<UserIcon size={18}/>}
                    />
                    <AppLink 
                        text="Settings" 
                        title="Settings" 
                        href="/settings"
                        icon={<Cog size={18}/>}
                    />
                    <span 
                        className={cn(linkClassName, "cursor-pointer")}
                        onClick={() => setOpenLogoutModal(true)}
                    >
                        <LogOut size={18}/> 
                        <span>Logout</span>
                    </span>
                </div>
            </PopoverContainer>
        </>
    )
};

export default UserPopover; 