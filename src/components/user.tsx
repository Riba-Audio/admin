// user card main 

import { ChevronDown } from "lucide-react"
import AppAvatar from "./common/app-avatar"
import { Card } from "./ui/card"
import { Heading5, Paragraph } from "./ui/typography"
import { cn } from "@/lib/utils";

const User = ({className}: {className?: string}) => {
    const user: {name: string, role: string, avatar: string} = {
        name: "Test User",
        role: "Admin",
        avatar: ""
    }
    return (
        <Card className={cn("rounded-md flex items-center gap-2 bg-background w-fit px-2 py-1 duration-700 hover:border-secondary-color hover:bg-secondary cursor-pointer", className)}>
            <AppAvatar 
                name={user.name}
                src={user.avatar}
            />
            <div className="flex flex-col items-start">
                <Heading5 className="text-xs lg:text-xs leading-0">{user.name}</Heading5>
                <Paragraph className="text-xs lg:text-xs text-gray-500 leading-0">{user.role}</Paragraph>
            </div>
            <ChevronDown size={20}/>
        </Card>
    )
};

export default User; 