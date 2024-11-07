import React from "react";
import { Button } from "../ui/button";
import { Modal } from "./modal";
import { loadVoices } from "@/lib/api-calls/voices";
import { createToast } from "@/utils/toast";


interface UploadFreshVoicesModalProps {
    isOpen: boolean; 
    onClose: () => void; 
};

const UploadFreshVoicesModal: React.FC<UploadFreshVoicesModalProps> = ({isOpen, onClose}) => {
    const [loading, setLoading] = React.useState<boolean>(false); 

    const handleLoadingVoice = async () => {
        setLoading(true);
        let res = await loadVoices();
        if (res) {
            createToast("success", "Voices have been added!");
            onClose(); 
        }
        setLoading(false)
    }
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Add Initial Voices"
            description="Load the first voices to the backend. Pressing the button will store them and initiate the process."
             
        >
            <Button className="w-full" disabled={loading} onClick={handleLoadingVoice}>
                Load Voices
            </Button>
        </Modal>
    )
};

export default UploadFreshVoicesModal; 