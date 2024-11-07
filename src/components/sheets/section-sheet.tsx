import { SectionType } from "@/app/(rest)/books/[bookId]/page";
import React from "react";
import SheetContainer from "./container";
import { Plus, SquarePen } from "lucide-react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import AppInput from "../common/app-input";
import { formatBytes, formatDuration } from "@/utils/format-numbers";
import { Heading3, Paragraph } from "../ui/typography";
import { Button } from "../ui/button";
import { createToast } from "@/utils/toast";


interface SectionSheetProps {
    id?: string;
    small?: boolean; 
    section?: SectionType;
    sections: SectionType[];
    setSections: React.Dispatch<SectionType[]>;
    loading: boolean; 
};


const SectionSheet: React.FC<SectionSheetProps> = ({
    id, small, section, sections, setSections, loading
}) => {
    const [title, setTitle] = React.useState<string>(section?.title || "");
    const [text, setText] = React.useState<string>(section?.text || "");

    const handleSection = (e: any) => {
        // validation
        if (section) {
             
            if (section.processing) {
                createToast("error", "Section is being processed!");
                return; 
            }
            if (section.title === title && section.text === text) {
                createToast("error", "Nothing to update");
                return; 
            }
        } else {
            if (!title || !text) {
                createToast("error", "Enter title and text");
                return
            }
        };

        // actual update 
        let updatedSection: any = {}
        if (section) {
            updatedSection = {...section};
            if (text !== section.text && section.processed) {
                updatedSection.processed = false; 
            }
        } 
        else updatedSection = {title, text, processed: false}; 

        if (!section) setSections([...sections, updatedSection]);
        else {
            let newSections = []; 
            for (let i = 0; i < sections.length; i++) {
                let curr = sections[i];

                if (curr.title === section.title) newSections.push(updatedSection);
                else newSections.push(curr)
            };
            setSections(newSections); 
        }

        setTitle("");
        setText("")
        let closeButton = e.target.parentElement.parentElement.children[0]; 
        closeButton.click(); 
        

    }
    return (
        <SheetContainer
            title={title}
            trigger={
                <span 
                    className={cn(loading ? "cursor-not-allowed": id ? " w-8 h-8 p-2 hover:bg-secondary": "px-3 py-1 rounded-full bg-secondary", "duration-700 flex gap-2 items-center justify-center cursor-pointer hover:text-secondary-color ")}
                    onClick={loading ? (e) =>  {e.preventDefault(); e.stopPropagation()}: () => {}}
                >
                    {
                        (small) ? <SquarePen size={18} /> : (
                            <>
                                <Plus size={18} />
                                Add Section
                            </>
                        )
                    }
                </span>
            }
            width="min-w-[60vw]"
        >
            <div className="flex flex-col gap-2">
                <Heading3 className="text-md lg:text-base text-center mt-5">{id ? "Edit": "Add"} section</Heading3>
                {
                    id && section && (
                        <>
                            <Badge className={cn(`${section.processed ? "bg-green-500" : "bg-gray-500"}`)}>
                                {section.processing ? "processing" : section.processed ? "processed" : "pending"}
                            </Badge>
                            <Paragraph>{formatBytes(section.size || 0)} | {formatDuration(section.duration || 0)}</Paragraph>
                        </>
                    )
                }
                <AppInput
                    value={title}
                    setValue={setTitle}
                    placeholder={"Introduction"}
                    label="Section title"
                />
                <AppInput
                    value={text}
                    setValue={setText}
                    placeholder={"John Kiriamiti was born in a humble neighbourhood off the coast of Kenya..."}
                    label="Text"
                    textarea={true}
                    cls="h-[45vh]"
                />
                <Button 
                    className="self-end min-w-[150px]"
                    onClick={handleSection}
                >
                    {!id ? "Add": "Edit"} Section
                </Button>
            </div>
        </SheetContainer>
    )
};

export default SectionSheet; 