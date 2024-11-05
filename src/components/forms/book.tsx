"use client"; 

import React from "react";
import AppInput from "../common/app-input";
import { BookInfoType } from "../data-columns/books";
import { Button } from "../ui/button";
import CalendarPopover from "../popovers/calendar-popover";
import { Heading4 } from "../ui/typography";

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
};

const BookForm: React.FC<BookFormProps> = (
    {
        id, title, setTitle, voice, setVoice, 
        info, setInfo, blurb, setBlurb,
        amount, setAmount
    }
) => {
    const [author, setAuthor] = React.useState<string>(info?.author || ""); 
    const [pages, setPages] = React.useState<number>(info?.pages || 0); 
    const [published, setPublished] = React.useState<Date | undefined>(info?.published ? new Date(info.published): undefined); 

    React.useEffect(() => {
        if (!published) return; 

        let updatedInfo: any = {...info, published};
        setInfo(updatedInfo)
    }, [published])
    return (
        <>
            <AppInput 
                label="Book Title"
                value={title}
                setValue={setTitle}
            />
            <AppInput 
                label="Book Author"
                value={author}
                setValue={setAuthor}
                onKeyUp={(str) => {
                    let updatedInfo: any = {...info, author: str}; 
                    setInfo(updatedInfo)
                }}
            />
            <div className="flex gap-2 items-center">
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
                    />
                </div>
                <div>
                    <Heading4 className="text-sm lg:text-md my-2">Publishing date</Heading4>
                    <CalendarPopover 
                        date={published}
                        setDate={setPublished}
                    />
                </div>
            </div>
            {
                id && setAmount && amount && (
                    <AppInput 
                        label="Amount"
                        value={amount}
                        type="number"
                        setValue={setAmount}
                    />
                )
            }
            <AppInput 
                label="Blurb"
                value={blurb}
                setValue={setBlurb}
                textarea={true}
                cls="h-[25vh]"
            />
        </>
    )
};

export default BookForm; 