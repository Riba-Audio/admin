import { Cog, LogOut, UserIcon } from "lucide-react"
import AppLink from "../common/app-link"
import User from "../utils/user"
import PopoverContainer from "./container"



const UserPopover = () => {

    return (
        <PopoverContainer
            trigger={
                <User className="self-end"/>
            }
            contentClassName="w-[180px] absolute -mt-[.1rem] -right-[5rem]"
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
                <AppLink 
                    text="Logout" 
                    title="Logout" 
                    href="/logout"
                    icon={<LogOut size={18}/>}
                />

            </div>
        </PopoverContainer>
    )
};

export default UserPopover; 