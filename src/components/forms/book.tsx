"use client"; 

import React from "react";
import AppInput from "../common/app-input";
import { Button } from "../ui/button";
import CalendarPopover from "../popovers/calendar-popover";
import { Heading4, Paragraph } from "../ui/typography";
import Combobox, { ComboType } from "../utils/combo-box";
import { getCategories } from "@/lib/api-calls/categories";
import { useCustomEffect } from "@/hooks/useEffect";
import useMounted from "@/hooks/useMounted";
import { getVoices } from "@/lib/api-calls/voices";
import { BookInfoType, VoiceType } from "@/types";
import ConfirmVoices  from "../utils/load-voices";
import { checkBookByTitle } from "@/lib/api-calls/books";
import { Card } from "../ui/card";
import { X } from "lucide-react";

interface BookFormProps {
    id?: string; 
    title: string; 
    setTitle: React.Dispatch<string>; 
    voice: string; 
    setVoice: React.Dispatch<string>; 
    info: BookInfoType | undefined;
    setInfo: React.Dispatch<BookInfoType | undefined>; 
    blurb: string; 
    setBlurb: React.Dispatch<string>; 
    amount?: number; 
    setAmount?: React.Dispatch<number>; 
    category: string; 
    setCategory: React.Dispatch<string>; 
    loading?: boolean; 
};

type SimilarType = {
    id: string; 
    title: string; 
    author: string; 
}
const BookForm: React.FC<BookFormProps> = (
    {
        id, title, setTitle, voice, setVoice, 
        info, setInfo, blurb, setBlurb,
        amount, setAmount, category, setCategory, loading
    }
) => {
    const [author, setAuthor] = React.useState<string>(info?.author || ""); 
    const [pages, setPages] = React.useState<number>(info?.pages || 0); 
    const [published, setPublished] = React.useState<string>(info?.published || ""); 

    const [categories, setCategories] = React.useState<ComboType[]>([]);
    const [voices, setVoices] = React.useState<VoiceType[]>([]); 

    const [similar, setSimilar] = React.useState<SimilarType[]>([]);

    const mounted = useMounted(); 

    React.useEffect(() => {
        if (!published || !mounted) return; 

        let updatedInfo: any = {...info, published};
        setInfo(updatedInfo)
    }, [published, mounted]);

    const fetchCategories = async () => {
        if (!mounted) return; 
        let res = await getCategories(); 
        if (res)  setCategories(res.docs.map((ct: string) => ({label: ct, value: ct})))
    }
    // const fetchVoices = async () => {
    //     if (!mounted || id) return; 
    //     let res = await getVoices(); 
    //     if (res) setVoices(res.map((vc: any) => ({label: vc.title, value: vc.title}))); 
    // }
    useCustomEffect(fetchCategories, [mounted])
    // useCustomEffect(fetchVoices, [mounted]);

    const  handleCheckTitle = async () => {

        let res = await checkBookByTitle(title);

        if (res) setSimilar(res);
    }
     
    return (
        <>
            <AppInput 
                label="Book Title"
                value={title}
                setValue={setTitle}
                disabled={loading}
                onKeyUp={handleCheckTitle}
            />
            {
                similar.length > 0 && (
                    <Card className="p-3 flex flex-col gap-1">
                        <Button onClick={() => setSimilar([])} className="self-end" variant={"ghost"}>
                            <X size={20}/>
                        </Button>
                        {
                            similar.map((sim, index) => (
                                <div key={index} className="flex items-center gap-2 w-full">
                                    <Heading4 className="max-w-[60%] w-full text-xs lg:text-sm">{sim.title}</Heading4>
                                    <Paragraph className="text-xs lg:text-sm">{sim.author}</Paragraph>
                                </div>
                            ))
                        }
                    </Card>
                )
            }
            <ConfirmVoices 
                voices={voices}
                setVoices={setVoices}
            />
            <AppInput 
                label="Book Author"
                value={author}
                setValue={setAuthor}
                onKeyUp={(str) => {
                    let updatedInfo: any = {...info, author: str}; 
                    setInfo(updatedInfo)
                }}
                disabled={loading}

            />
            {/* voice */}
            <Heading4 className="text-sm lg:text-md mt-2">Voice</Heading4>
            <Combobox 
                title="voice"
                value={voice}
                values={voices.map((vc: any) => ({label: vc.title, value: vc.title}))}
                setValue={setVoice}
                height="h-[40vh]"
                
            />
                 
            <div className="flex gap-2 items-center">
                <div>
                    <Heading4 className="text-sm lg:text-md my-2">Category</Heading4>
                    <Combobox 
                        title="category"
                        values={categories}
                        value={category}
                        setValue={setCategory}
                        height="h-[40vh]"
                    />
                </div>
                <div>
                    <AppInput 
                        label="Pages"
                        value={pages}
                        type="number"
                        setValue={setPages}
                        onKeyUp={(str: any) => {
                            let updatedInfo: any = {...info, pages: Number(str)}
                            setInfo(updatedInfo)
                        }}
                        disabled={loading}

                    />
                </div>
                <div>
                    <AppInput 
                        label="Published"
                        value={published}
                        placeholder={"2022-01-25"}
                        setValue={setPublished}
                        onKeyUp={(str: any) => {
                            let updatedInfo: any = {...info, published: str}
                            setInfo(updatedInfo)
                        }}
                        disabled={loading}

                    />
                </div>
            </div>
            {
                id && setAmount && (
                    <AppInput 
                        label="Amount"
                        value={amount || 0}
                        type="number"
                        setValue={setAmount}
                        disabled={loading}

                    />
                )
            }
            <AppInput 
                label="Blurb"
                value={blurb}
                setValue={setBlurb}
                textarea={true}
                cls="h-[25vh]"
                disabled={loading}

            />
        </>
    )
};

export default BookForm; 
 