// add computer 

import React from "react";
import { Modal } from "./modal";
import AppInput from "../common/app-input";
import { Button } from "../ui/button";
import { createToast } from "@/utils/toast";
import { ComputerStatusType, ComputerType } from "@/types";
import { postComputer, updateComputer } from "@/lib/api-calls/computers";
import { validateEmail } from "@/utils/validation";
import { Paragraph } from "../ui/typography";
import { cn } from "@/lib/utils";

interface AddComputerModalProps {
    isOpen: boolean;
    onClose: () => void;
    computer?: ComputerType;
    computers: ComputerType[];
    setComputers: React.Dispatch<ComputerType[]>;

};

const statuses = ["idle", "processing", "down", "terminated"];

const AddComputerModal: React.FC<AddComputerModalProps> = (
    { isOpen, onClose, computer, computers, setComputers }
) => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [title, setTitle] = React.useState<string>(computer?.title || "");
    const [email, setEmail] = React.useState<string>(computer?.email || "");
    const [processor, setProcessor] = React.useState<string>(computer?.info.processor || "");
    const [storage, setStorage] = React.useState<string>(computer?.info.storage || "");
    const [ram, setRam] = React.useState<number>(computer?.info.ram || 0);
    const [gpu, setGpu] = React.useState<string>(computer?.info.gpu || "");
    const [ngrok, setNgrok] = React.useState<string>(computer?.ngrok || "");
    const [status, setStatus] = React.useState<ComputerStatusType>(computer?.status || "idle");

    const handleAddUpdateComputer = async () => {
        if (
            !title || !processor || !ram || !gpu || !ngrok || !storage || !email
        ) {
            createToast("error", "All fields are required!");
            return;
        };
        if (!validateEmail(email)) {
            createToast("error", "Enter a valid email!");
            return;
        }
        setLoading(true);
        if (!computer) {
            let computer: any = {
                title, processor, email, info: { ram, gpu, processor, storage }, ngrok,
            };
            let res = await postComputer(computer);
            if (res) {
                computer.id = res;
                computer.status = "idle";

                createToast("success", "Compute added");
                setComputers([...computers, computer]);
                setTitle("")
                setGpu("");
                setEmail("");
                setStorage("");
                setRam(0);
                setNgrok("");
                setProcessor("");

                onClose()
            };
        } else {
            let toUpdate: any = {};
            if (computer.title !== title) toUpdate.title = title;
            if (computer.status !== status) toUpdate.status = status;

            let res = await updateComputer(computer.id, toUpdate);
            if (res) {
                createToast("success", "Computer has been updated!");
                let list: ComputerType[] = [];

                for (let i = 0; i < computers.length; i++) {
                    let curr = computers[i];
                    if (curr.id === computer.id) {
                        list.push({ ...computer, title, status })
                    } else list.push(curr)
                };
                setComputers(list);
                onClose()
            }
        }
        setLoading(false)
    }
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={"Add Compute"}
        >
            <div className="flex flex-col gap-1">
                {
                    computer && (
                        <div className="flex flex-wrap gap-2">
                            {
                                statuses.map((st: any, index) => (
                                    <div
                                        className={cn("duration-700 px-2 rounded-full cursor-pointer border hover:border-secondary-color", st === status ? "border-secondary-color" : "border-gray-500")}
                                        key={index}
                                        onClick={() => setStatus(st)}
                                    >
                                        <Paragraph className="text-xs lg:text-xs capitalize">{st}</Paragraph>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
                <AppInput
                    value={title}
                    setValue={setTitle}
                    label="Title"
                    placeholder={"Alpha 001"}
                    disabled={loading}
                />
                <div className="flex gap-1 ">
                    <div className="flex-1">
                        <AppInput
                            value={processor}
                            setValue={setProcessor}
                            label="Processor"
                            placeholder={"Intel i7-9700"}
                            disabled={loading}

                        />
                    </div>
                    <div className="flex-1">
                        <AppInput
                            value={ram}
                            setValue={setRam}
                            label="RAM"
                            type="number"
                            placeholder={8}
                            disabled={loading}

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
                            disabled={loading}

                        />
                    </div>
                    <div className="flex-1">
                        <AppInput
                            value={storage}
                            setValue={setStorage}
                            label="Storage"
                            placeholder={"2TB SSD"}
                            disabled={loading}

                        />
                    </div>
                </div>

                <div className="flex gap-1">
                    <div className="flex-1">
                        <AppInput
                            value={ngrok}
                            setValue={setNgrok}
                            label="Ngrok Token"
                            placeholder={"2sders ..."}
                            disabled={loading}

                        />
                    </div>
                    <div className="flex-1">
                        <AppInput
                            value={email}
                            setValue={setEmail}
                            label="Compute email"
                            placeholder={"data@vuteer.com"}
                            disabled={loading}

                        />
                    </div>
                </div>
                <Button
                    disabled={loading}
                    onClick={handleAddUpdateComputer}
                    className="my-2"
                >
                    {computer ? "Edit" : "Add"} Computer
                </Button>
            </div>
        </Modal>
    )
}

export default AddComputerModal; 