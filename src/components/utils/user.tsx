// user card main 

import { ChevronDown } from "lucide-react"
import AppAvatar from "../common/app-avatar"
import { Card } from "../ui/card"
import { Heading5, Paragraph } from "../ui/typography"
import { cn } from "@/lib/utils";
import { useAuthUser } from "@/auth/authHooks";

const User = ({className}: {className?: string}) => {
    const auth = useAuthUser();
    const user = auth(); 

    return (
        <Card className={cn("rounded-lg flex items-center gap-2 bg-background w-fit px-5 py-2 duration-700 hover:border-secondary-color hover:bg-secondary cursor-pointer", className)}>
            {
                user && (
                    <>
                        <AppAvatar 
                            name={user.name}
                            src={user.avatar}
                        />
                        <div className="flex flex-col items-start">
                            <Heading5 className="text-xs lg:text-xs leading-0">{user.name}</Heading5>
                            <Paragraph className="capitalize text-xs lg:text-xs text-gray-500 leading-0">{user.role}</Paragraph>
                        </div>
                    
                    </>
                )
            }
            <ChevronDown size={20}/>
        </Card>
    )
};

export default User; 