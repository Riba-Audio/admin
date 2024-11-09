import { VoiceType } from "@/types";
import React from "react";
import { Modal } from "./modal";
import AppInput from "../common/app-input";
import { Button } from "../ui/button";
import { deleteVoice, postVoice, updateVoice } from "@/lib/api-calls/voices";
import { createToast } from "@/utils/toast";

interface VoiceModalProps {
    isOpen: boolean; 
    onClose: () => void; 
    type: "Edit" | "Add" | "Delete", 
    voice?: VoiceType; 
    voices: VoiceType[];
    setVoices: React.Dispatch<VoiceType[]>; 
}

const VoiceModal: React.FC<VoiceModalProps> = (
    {isOpen, onClose, type, voice, voices, setVoices}
) => {
    const [title, setTitle] = React.useState<string>(voice?.title || "");
    const [pointer, setPointer] = React.useState<string>(voice?.pointer || "");
    const [key, setKey] = React.useState<string>(voice?.key || "");
    const [loading, setLoading] = React.useState<boolean>(false); 

    const handleDelete = async () => {
        if (!voice) return; 
        setLoading(true); 
        let res = await deleteVoice(voice.id);
        if (res) {
            createToast("success", "Voice deleted");
            setVoices([...voices.filter(vc => vc.id !== voice.id)]);
            onClose();
        };
        setLoading(false)
    };

    const handleAdd = async () => {
        if (!title || !pointer || !key) {
            createToast("error", "All fields are required!"); 
            return
        };
        setLoading(true);
        let vc = {title, pointer, key}; 
        let res = await postVoice(vc);
        if (res) {
            createToast("success", "Voice added");
            setVoices([...voices, {...vc, id: res}]);
            onClose(); 
        };
        setLoading(false)
    };

    const handleEdit = async () => {
        if (!voice) return;
        if (!title || !pointer || !key) {
            createToast("error", "All fields are required!"); 
            return
        };
        if (
            title === voice.title && 
            pointer === voice.pointer && 
            key === voice.key
        ) {
            createToast("error", "Nothing to update");
            return; 
        }
        setLoading(true);
        let update: any = {};
        if (title !== voice.title) update.title = title; 
        if (pointer !== voice.pointer) update.pointer = pointer; 
        if (key !== voice.key) update.key = key; 

        let res = await updateVoice(voice.id, update); 
        if (res) {
            createToast("success", "Voice updated!");
            let updated = []; 
            for (let i = 0; i < voices.length; i++) {
                let curr = voices[i]; 

                if (curr.id === voice.id) updated.push({...curr, ...update});
                else updated.push(curr)
            };
            setVoices(updated);
            onClose()
        };
        setLoading(false)
    }

    return (
        <Modal
            title={`${type} Voice`}
            isOpen={isOpen}
            onClose={onClose}
            description={type === "Delete" ? "This action is irreversible. Once you delete the voice, it will be purged from the database!": ""}
        >
            {
                type === "Delete" ? (
                    <Button
                        disabled={loading}
                        className="w-full"
                        variant={"destructive"}
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                ): (
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-1">
                            <div>
                                <AppInput 
                                    value={title}
                                    setValue={setTitle}
                                    label="Voice title"
                                    placeholder={"John"}
                                    disabled={loading}
                                />
                            </div>
                            <div>
                                <AppInput 
                                    value={pointer}
                                    setValue={setPointer}
                                    label="Voice pointer"
                                    placeholder={"en_speaker_1"}
                                    disabled={loading}
                                />
                            </div>
                        </div>
                        <AppInput 
                            value={key}
                            setValue={setKey}
                            label="Voice key"
                            placeholder={"riba002/voices/john.wav"}
                            disabled={loading}

                        />
                        <Button 
                            disabled={loading}
                            className="my-3"
                            onClick={type === "Edit" ? handleEdit: handleAdd}
                        >
                            {type}
                        </Button>
                    </div>

                )
            }
        </Modal>
    )
};

export default VoiceModal;