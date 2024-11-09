import { VoiceType } from "@/types";
import SheetContainer from "./container";
import { AudioLines, Play, SquarePen, Trash2 } from "lucide-react";
import { Heading3, Heading4, Paragraph } from "../ui/typography";
import { Separator } from "../ui/separator";
 
import { Button } from "../ui/button";
import React from "react";
import VoiceModal from "../modals/voice-modal";
import { usePlayerState } from "@/store/player";
import { getSoundURI } from "@/lib/api-calls/voices";

interface VoiceSheetProps {
    voices: VoiceType[];
    setVoices: React.Dispatch<VoiceType[]>; 
}


const VoiceSheet: React.FC<VoiceSheetProps> = (
    {voices, setVoices}
) => {
    const [showVoiceModal, setShowVoiceModal] = React.useState<boolean>(false); 
  
    return (
        <>
            <VoiceModal 
                isOpen={showVoiceModal}
                onClose={() =>setShowVoiceModal(false)}
                type={"Add"}
                setVoices={setVoices}
                voices={voices}
            />
            <SheetContainer 
                trigger={
                    <span 
                        className={"fixed bottom-0 right-0 m-5 z-40 flex items-center gap-3 text-xs lg:text-xs bg-primary text-primary-foreground shadow hover:bg-primary/90 rounded-full mb-[5rem] cursor-pointer hover:text-secondary-color w-fit py-1 px-2"}
                    >
                        Voices <AudioLines size={18}/>
                    </span>
                }
                title="Voices"
                side="left"
            >
                <div className="h-[95vh] flex flex-col gap-1">
                    <Heading3 className="text-md lg:text-base">Voices ({voices.length})</Heading3>
                    <Separator />
                    <div className="flex-1 overflow-auto" >
                        {
                            voices.map((voice, index) => (
                                <Voice 
                                    key={index}
                                    voice={voice}
                                    voices={voices}
                                    setVoices={setVoices}
                                />
                            ))
                        }
                    </div>
                    <Button className="w-full" onClick={() => setShowVoiceModal(true)}>
                        Add Voice
                    </Button>
                </div>
            </SheetContainer>
        </>
    )
}

export default VoiceSheet; 


const Voice = (
    {voice, voices, setVoices}: 
    {voice: VoiceType, voices: VoiceType[], setVoices: React.Dispatch<VoiceType[]>}
) => {
    const [showVoiceModal, setShowVoiceModal] = React.useState<boolean>(false); 
    const [type, setType] = React.useState<"Edit" | "Add" | "Delete" >("Edit");
    const {addTrack} = usePlayerState(); 


    const handlePlaySample = async () => {
        if (!voice) return; 

        let uri = await getSoundURI(voice.key); 

        if (uri) {
            addTrack({
                title: `Voice - ${voice.title}`,
                src: uri
            })
        }
    }
    return (
        <>
            <VoiceModal 
                isOpen={showVoiceModal}
                onClose={() =>setShowVoiceModal(false)}
                type={type}
                voice={voice}
                setVoices={setVoices}
                voices={voices}
            />
            <div className="flex flex-col gap-2 py-2">
                <div className="flex items-center justify-between">
                    <Heading4 className="text-xs lg:text-md">{voice.title}</Heading4>
                    <div className="flex gap-1">
                        <Button variant="ghost" size={"icon"} onClick={() => setShowVoiceModal(true)}>
                            <SquarePen size={15}/>
                        </Button>
                        <Button className="hover:text-destructive" variant="ghost" size={"icon"} onClick={() => {
                            setType("Delete");
                            setShowVoiceModal(true)
                        }}>
                            <Trash2 size={15}/>
                        </Button>
                    </div>
                </div>
                <Paragraph className="text-xs lg:text-xs text-gray-500">Pointer: {voice.pointer}</Paragraph>
                <span onClick={handlePlaySample}  className="cursor-pointer flex gap-2 items-center border hover:border-secondary-color hover:text-secondary-color duration-700 px-3 px-1 text-xs lg:text-xs self-end w-fit min-w-[100px] gap-2 items-center rounded-full">
                    Add to play
                </span>
                <Separator />
            </div>
        </>
    )
}