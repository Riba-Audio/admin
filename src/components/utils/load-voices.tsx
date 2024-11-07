// load voices to backend
"use client";
import { useCustomEffect } from "@/hooks/useEffect";
import useMounted from "@/hooks/useMounted";
import { getVoices } from "@/lib/api-calls/voices";
import React from "react";
import UploadFreshVoicesModal from "../modals/upload-voices";


const ConfirmVoices = () => {
    const [showEmptyModal, setShowEmptyModal] = React.useState<boolean>(false); 
    const mounted = useMounted(); 

    const fetchVoices = async () => {
        if (!mounted) return; 
        let res = await getVoices(); 
        if (res.length == 0) setShowEmptyModal(true); 
    }
    useCustomEffect(fetchVoices, [mounted]); 

    return (
        <>
             <UploadFreshVoicesModal
                isOpen={showEmptyModal}
                onClose={() => setShowEmptyModal(false)}
             />
        </>
    )
};

export default ConfirmVoices; 