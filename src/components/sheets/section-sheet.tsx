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


interface SectionSheetProps {
    id?: string;
    section?: SectionType;
    sections: SectionType[];
    setSections: React.Dispatch<SectionType[]>;
};


const SectionSheet: React.FC<SectionSheetProps> = ({
    id, section, sections, setSections
}) => {
    const [title, setTitle] = React.useState<string>(section?.title || "");
    const [text, setText] = React.useState<string>(section?.text || "");

    return (
        <SheetContainer
            trigger={
                <span className={cn(id ? " w-8 h-8 p-2 hover:bg-secondary": "px-3 py-1 rounded-full bg-secondary", "duration-700 flex gap-2 items-center justify-center cursor-pointer hover:text-secondary-color ")}>
                    {
                        id ? <SquarePen size={18} /> : (
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
                            <Badge className={cn(`${section.processed ? "bg-green-500" : "bg-transparent"}`)}>
                                {section.processing ? "processing" : section.processed ? "processed" : "pending"}
                            </Badge>
                            <Paragraph>{formatBytes(section.size)} | {formatDuration(section.duration)}</Paragraph>
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
                <Button className="self-end min-w-[150px]">
                    Proceed
                </Button>

            </div>
        </SheetContainer>
    )
};

export default SectionSheet; 