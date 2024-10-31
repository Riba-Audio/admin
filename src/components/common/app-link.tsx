// common link component 

import { cn } from "@/lib/utils";
import Link from "next/link";

interface AppLinkProps {
    text?: string; 
    title: string; 
    href: string; 
    icon?: React.ReactNode; 
    afterIcon?: React.ReactNode;
    className?: string;
    target?: string;  
}

const AppLink: React.FC<AppLinkProps> = (
    {text, title, href, icon, afterIcon, className, target}
) => (
    <Link
        href={href}
        title={title}
        className={cn("flex items-center gap-2 text-sm lg:text-md hover:text-secondary-color duration-700", className)}
        target={target}
    >
        {icon && icon}
        <span className="flex-1">{text && text}</span>
        {afterIcon && afterIcon}
    </Link>
);

export default AppLink; 