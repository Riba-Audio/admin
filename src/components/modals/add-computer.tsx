// add computer 

import React from "react";
import { Modal } from "./modal";
import AppInput from "../common/app-input";
import { Button } from "../ui/button";
import { createToast } from "@/utils/toast";
import { ComputerType } from "@/types";
import { postComputer } from "@/lib/api-calls/computers";

interface AddComputerModalProps {
    isOpen: boolean; 
    onClose: () => void; 
    computers: ComputerType[]; 
    setComputers: React.Dispatch<ComputerType[]>;
      
}; 

const AddComputerModal: React.FC<AddComputerModalProps> = (
    {isOpen, onClose, computers, setComputers}
) => {
    const [loading, setLoading] = React.useState<boolean>(false); 
    const [title, setTitle] = React.useState<string>(""); 
    const [processor, setProcessor] = React.useState<string>("");
    const [storage, setStorage] = React.useState<string>(""); 
    const [ram, setRam] = React.useState<number>(0);
    const [gpu, setGpu] = React.useState<string>(""); 
    const [ngrok, setNgrok] = React.useState<string>(""); 

    const handleAddComputer = async () => {
        if (
            !title || !processor || !ram || !gpu || !ngrok ||!storage
        ) {
            createToast("error", "All fields are required!");
            return; 
        };
        setLoading(true);
        let computer: any = {
            title, processor, info: {ram, gpu, processor, storage}, ngrok,
        };
        let res = await postComputer(computer);
        if (res) {
            computer.id = res; 
            computer.status = "idle"; 

            createToast("success", "Compute added"); 
            setComputers([...computers, computer]);
            setTitle("")
            setGpu("")
            setStorage("")
            setRam(0); 
            setNgrok(""); 
            setProcessor("");
             
            onClose()
        };
        setLoading(false)
    }
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={"Add Compute"}
        >
            <div className="flex flex-col gap-1">
                <AppInput 
                    value={title}
                    setValue={setTitle}
                    label="Title"
                    placeholder={"Alpha 001"}
                />
                <div className="flex gap-1 ">
                    <div className="flex-1">
                        <AppInput 
                            value={processor}
                            setValue={setProcessor}
                            label="Processor"
                            placeholder={"Intel i7-9700"}
                        />
                    </div>
                    <div className="flex-1">
                        <AppInput 
                            value={ram}
                            setValue={setRam}
                            label="RAM"
                            type="number"
                            placeholder={8}
                        />
                    </div>
                </div>
                
                <div className="flex gap-1">
                    <div className="flex-1">
                        <AppInput 
                            value={gpu}
                            setValue={setGpu}
                            label="GPU"
                            placeholder={"Nvidia Tesla T4"}
                        />
                    </div>
                    <div className="flex-1">
                        <AppInput 
                            value={storage}
                            setValue={setStorage}
                            label="Storage"
                            placeholder={"2TB SSD"}
                        />
                    </div>
                </div>
                 
                <AppInput 
                    value={ngrok}
                    setValue={setNgrok}
                    label="Ngrok Token"
                    placeholder={"2sders ..."}
                />
                <Button
                    disabled={loading}
                    onClick={handleAddComputer}
                    className="my-2"
                >
                    Add Computer
                </Button>
            </div>
        </Modal>
    )
}

export default AddComputerModal; 