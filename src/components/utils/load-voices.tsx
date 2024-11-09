// load voices to backend
"use client";
import { useCustomEffect } from "@/hooks/useEffect";
import useMounted from "@/hooks/useMounted";
import { getVoices } from "@/lib/api-calls/voices";
import React from "react";
import UploadFreshVoicesModal from "../modals/upload-voices";
import { AudioLines } from "lucide-react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { VoiceType } from "@/types";
import VoiceSheet from "../sheets/voice-sheet";


const ConfirmVoices = (
    {setVoices, voices}: 
    {
        setVoices: React.Dispatch<VoiceType[]>;
        voices: VoiceType[]; 
    }
) => {
    const [showEmptyModal, setShowEmptyModal] = React.useState<boolean>(false); 
    const mounted = useMounted(); 
    const pathname = usePathname(); 

    const fetchVoices = async () => {
        if (!mounted) return; 
        let res = await getVoices(); 
        
        if (res.length == 0) setShowEmptyModal(true); 
        else setVoices(res); 
    }
    useCustomEffect(fetchVoices, [mounted]); 

    return (
        <>
             <UploadFreshVoicesModal
                isOpen={showEmptyModal}
                onClose={() => setShowEmptyModal(false)}
             />
            {
                pathname.startsWith("/books/") && (
                    <VoiceSheet 
                        setVoices={setVoices}
                        voices={voices}
                    />
                )
            }
        </>
    )
};

export default ConfirmVoices; 

{/* <Button
                        // variant="secondary"
                        className="fixed bottom-0 right-0 m-5 z-40 rounded-full mb-12"
                        size="sm"
                    >
                        Voices <AudioLines size={18}/>
                    </Button> */}