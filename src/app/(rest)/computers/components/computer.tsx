// computer component 

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Heading2, Paragraph } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { Copy, SquarePen, Trash2 } from "lucide-react";
import { ComputerType } from "@/types";



interface ComputerProps extends ComputerType { };

const Computer: React.FC<ComputerProps> = (
    { id, status, title, info, ngrok }
) => {
    let bdgeBg = status === "processing" ? "bg-yellow-500" : status === "down" || status === "terminated" ? "bg-red-500" : "bg-secondary";
    let bdgeType: "outline" | "default" = status === "idle" ? "outline" : "default";
    return (
        <Card
            className="flex flex-col gap-2 rounded-md flex-1 p-3 py-5"
        >
            <div className="flex justify-between items-center">
                <Badge variant={bdgeType} className={cn(bdgeBg)} >{status}</Badge>

            </div>
            <Heading2 className="text-md lg:text-lg">{title}</Heading2>
            <Paragraph className="text-xs lg:text-xs text-gray-500 flex items-center gap-2 line-clamp-1">
                <span>{info.processor} | </span>
                <span>{info.ram} GB | </span>
                <span>{info.storage} | </span>
                <span>{info.gpu}</span>
            </Paragraph>
            <Paragraph className="text-xs lg:text-sm flex items-center gap-5 my-5">
                <span className="max-w-[80%]">{ngrok}</span>
                <span className="cursor-pointer hover:text-secondary-color"><Copy size={16} /></span>
            </Paragraph>
            <Separator />
            <div className="flex gap-2 items-center justify-end">
                <Button
                    variant="ghost"
                    size={"sm"}
                >
                    <SquarePen size={18} />
                </Button>
                <Button
                    variant="ghost"
                    size={"sm"}
                >
                    <Trash2 size={18} />
                </Button>
            </div>
        </Card>
    )
};

export default Computer;

export const ComputerSkeleton = () => (
    <Skeleton className="flex-1 h-[180px]" />
)