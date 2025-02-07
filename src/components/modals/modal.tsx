"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ModalProps {
    title: string;
    description?: string;
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
    width?: string; 
    height?: string; 
}

export const Modal: React.FC<ModalProps> = ({
    title, description, isOpen, onClose, children, width, height
}) => {
    const onChange = (open: boolean) => {
        if (!open) onClose();
    }

    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
            <DialogDescription className="hidden"/>
            <DialogContent className={cn("max-md:max-w-[80vw] w-[90vw]", width, height)}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                {description && <DialogDescription >{description}</DialogDescription>}
                <div className="w-full">
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    )
}