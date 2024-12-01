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
import React from "react";
import DeleteComputerModal from "@/components/modals/delete-computer";
import AddComputerModal from "@/components/modals/add-computer";

interface ComputerProps extends ComputerType {
    setComputers: React.Dispatch<ComputerType[]>;
    computers: ComputerType[]; 
};

const Computer: React.FC<ComputerProps> = (
    { id, status, title, email, info, ngrok, computers, setComputers }
) => {
    let bdgeBg = status === "processing" ? "bg-yellow-500" : status === "down" || status === "terminated" ? "bg-red-500" : "bg-secondary";
    let bdgeType: "outline" | "default" = status === "idle" ? "outline" : "default";
    const [showDelete, setShowDelete] = React.useState<boolean>(false); 
    const [showEdit, setShowEdit] = React.useState<boolean>(false); 
    
    return (
        <>
            <Card
                className="flex flex-col gap-2 rounded-md flex-1 p-2 py-3"
            >
                <div className="flex justify-between items-center">
                    <Badge variant={bdgeType} className={cn(bdgeBg)} >{status}</Badge>

                </div>
                <Heading2 className="text-md lg:text-base">{title}</Heading2>
                <Paragraph className="text-xs lg:text-xs text-gray-500 flex items-center gap-2 line-clamp-1">
                    <span>{info.processor} | </span>
                    <span>{info.ram} GB | </span>
                    <span>{info.storage} | </span>
                    <span>{info.gpu}</span>
                </Paragraph>
                <div className="flex">
                    <Paragraph className="flex-1 text-xs lg:text-xs">{email}</Paragraph>
                    <Paragraph className="flex-1 text-xs lg:text-xs flex items-center gap-5">
                        <span className="max-w-[80%] flex-1">{ngrok}</span>
                        <span className="cursor-pointer hover:text-secondary-color"><Copy size={16} /></span>
                    </Paragraph>
                </div>
                <Separator />
                <div className="flex gap-2 items-center justify-end">
                    <Button
                        variant="ghost"
                        size={"sm"}
                        onClick={() => setShowEdit(true)}

                    >
                        <SquarePen size={18} />
                    </Button>
                    <Button
                        variant="ghost"
                        size={"sm"}
                        onClick={() => setShowDelete(true)}
                    >
                        <Trash2 size={18} />
                    </Button>
                </div>
            </Card>
            <DeleteComputerModal 
                show={showDelete}
                setShow={setShowDelete}
                id={id}
                title={title}
                computers={computers}
                setComputers={setComputers}
            />
            <AddComputerModal 
                computers={computers}
                setComputers={setComputers}
                isOpen={showEdit}
                onClose={() => setShowEdit(false)}
                computer={{id, status, title, email, info, ngrok,}}
            />
        </>
    )
};

export default Computer;

export const ComputerSkeleton = () => (
    <Skeleton className="flex-1 h-[180px]" />
)