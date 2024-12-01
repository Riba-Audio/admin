import React from "react";
import { Button } from "../ui/button";
import { Modal } from "./modal";
import { deleteComputer } from "@/lib/api-calls/computers";
import { createToast } from "@/utils/toast";
import { ComputerType } from "@/types";


interface DeleteComputerModalProps {
    id: string;
    title: string;
    setShow: React.Dispatch<boolean>;
    show: boolean;
    computers: ComputerType[]; 
    setComputers: React.Dispatch<ComputerType[]>;
};

const DeleteComputerModal: React.FC<DeleteComputerModalProps> = (
    { id, title, setShow, show, computers, setComputers }
) => {
    const [loading, setLoading] = React.useState<boolean>(false); 
    const handleDelete = async () => {
        setLoading(true); 

        let res = await deleteComputer(id);
        if (res) {
            createToast("success", "Computer has been deleted!");
            setComputers([...computers.filter(comp => comp.id !== id)])
            setShow(false); 
        };
        setLoading(false)
    }
    return (
        <Modal
            isOpen={show}
            onClose={() => {
                setShow(false)
            }}
            title="Delete Computer"
            description={`Do you wish to delete the compute ${title}. The action is irrervisible.`}
            width={"lg:w-[50vw]"}
        >
            <Button
                variant={"destructive"}
                onClick={handleDelete}
                className="w-full"
                disabled={loading}
            >
                Proceed
            </Button>
        </Modal>
    )
};

export default DeleteComputerModal; 