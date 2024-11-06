"use client";

import React from "react";
import { Play } from "lucide-react";
import dayjs from "dayjs";

import Container from "@/components/utils/container";
import { BookInfoType } from "@/components/data-columns/books";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heading2, Heading3, Heading4, Paragraph } from "@/components/ui/typography";
import Rating from "@/components/utils/rating";
import { formatBytes, formatDuration, formatLargeNumber, numberWithCommas } from "@/utils/format-numbers";
import { Separator } from "@/components/ui/separator";
import ImageUpload from "@/components/utils/image-upload";
import AppImage from "@/components/common/app-image";
import { cn } from "@/lib/utils";
import BookForm from "@/components/forms/book";
import { images } from "@/assets";
import BookFormSheet from "@/components/sheets/book-sheet";
import SectionSheet from "@/components/sheets/section-sheet";
import useMounted from "@/hooks/useMounted";
import { getSingleBook } from "@/lib/api-calls/books";
import { useCustomEffect } from "@/hooks/useEffect";

export type SectionType = {
    title: string;
    text: string;
    processed: boolean;
    processing?: boolean;
    duration: number;
    file_key: string;
    size: number;
}
export type BookType = {
    id: string;
    title: string;
    info: BookInfoType;
    category: string;
    blurb: string;
    listed: boolean;
    amount: number;
    key: string;
    ratingsAverage: number;
    ratingsQuantity: number;
    createdAt: string;
    slug: string;
    voice: string;
    views: number;
    duration: number;
    sections: SectionType[];
}

export default function Page({ params }: { params: { bookId: string } }) {
    const [book, setBook] = React.useState<BookType>()
    const [loading, setLoading] = React.useState<boolean>(false); 

    const [id, setId] = React.useState<string | undefined>(undefined)
    const [title, setTitle] = React.useState<string>("")
    const [blurb, setBlurb] = React.useState<string>("");
    const [category, setCategory] = React.useState<string>("");
    const [info, setInfo] = React.useState<BookInfoType | undefined>(undefined);
    const [amount, setAmount] = React.useState<number>(0);
    const [voice, setVoice] = React.useState<string>(""); 
    const [sections, setSections] = React.useState<SectionType[]>([])
    
    const mounted = useMounted(); 

    const fetchBook = async () => {
        if (!mounted || params.bookId === "new") return; 
        setLoading(true);
        let res = await getSingleBook(params.bookId); 
        if (res) {
            setBook(res);
            setId(res.id); 
            setTitle(res.title);
            setBlurb(res.blurb);
            setCategory(res.category);
            setInfo(res.info);
            setAmount(res.amount);
            setVoice(res.voice); 
            setSections(res.sections);
        };
        setLoading(false); 
    };

    useCustomEffect(fetchBook, [mounted])
    return (
        <Container
            title={loading ? "Loading...": book?.title || "New Book"}
            backPage={true}
        >
            {
                loading && (
                    <Card className="w-full h-[60vh] flex items-center justify-center">
                        <Heading4>Loading...</Heading4>
                    </Card>
                )
            }
            {
                !loading && (
                    <>
                        <Card className="px-3 py-5 my-3 flex flex-col lg:flex-row gap-5 items-start">
                            <Banner
                                info={info}
                                setInfo={setInfo}
                                title={title}
                            />
                            <Details
                                id={id}
                                title={title}
                                setTitle={setTitle}
                                listed={book?.listed || false}
                                info={info}
                                setInfo={setInfo}
                                category={category}
                                setCategory={setCategory}
                                amount={amount}
                                setAmount={setAmount}
                                rating={book?.ratingsAverage || 5}
                                ratingsCount={book?.ratingsQuantity || 0}
                                views={book?.views || 0}
                                
                                blurb={blurb}
                                setBlurb={setBlurb}
                                voice={voice}
                                setVoice={setVoice}
                                duration={book?.duration || 0}

                            />
                        </Card>
                        <Sections id={id} sections={sections} setSections={setSections}/>
                    </>
                )
            }
        </Container>
    )
}

// book components 

const Banner = ({ title, info, setInfo }: { title?: string, info: BookInfoType | undefined, setInfo: React.Dispatch<BookInfoType | undefined> }) => {
    return (
        <div className="w-[25%] flex flex-col items-center">
            <div className="w-full h-[50vh] relative">
                <AppImage 
                    src={info?.banner || images.placeholder_img}
                    title={title || "New Book"}
                    alt={title || "New Book"}
                    fill
                    nonBlur={true}
                />
            </div>
            <ImageUpload 
                text={`${info?.banner ? "Edit " : "Add "} Banner`}
                onChange={(src) => {
                    let updatedInfo: any = {...info, banner: src};
                    setInfo(updatedInfo)
                }}
                onRemove={(src) => {

                }}
                path={`${process.env.NODE_ENV === "development" ? "test/": ""}audiobooks/new/books`}
                className="my-2"
            />
        </div>
    )
}

const Details = (
    {
        id, title, duration, voice,  setVoice, setTitle, listed,
        info, setInfo, category, setCategory, amount, setAmount,
        rating, ratingsCount, views, blurb, setBlurb,  
    }:
    {
        id?: string; title: string; duration: number;  voice: string;  setVoice: React.Dispatch<string>; 
        setTitle: React.Dispatch<string>; listed: boolean; info: BookInfoType | undefined;
        setInfo: React.Dispatch<BookInfoType | undefined>; rating: number;
        ratingsCount: number; amount: number; setAmount: React.Dispatch<number>;
        category: string; setCategory: React.Dispatch<string>; views: number;
        blurb: string; setBlurb: React.Dispatch<string>;  
    }
) => {

    return (
        <div className="flex-1 flex flex-col gap-2">
            {
                id ? (
                    <>
                        <div className="flex justify-between items-center">
                            <Badge className={cn(listed ? "bg-green-500" : "")}>{listed ? "Listed" : "Not Listed"}</Badge>
                             
                            <BookFormSheet 
                                id={id}
                                title={title}
                                setTitle={setTitle}
                                voice={voice}
                                setVoice={setVoice}
                                info={info}
                                setInfo={setInfo}
                                blurb={blurb}
                                setBlurb={setBlurb}
                                amount={amount}
                                setAmount={setAmount}
                                category={category}
                                setCategory={setCategory}
                            />
                        </div>
                        <Heading2>{title}</Heading2>
                        <Paragraph className="text-gray-500">
                            {info?.author} |&nbsp;
                            {info?.pages} pages |&nbsp; 
                            {formatDuration(duration)} |&nbsp; 
                            {dayjs(new Date(info?.published || Date.now())).format("MM, YYYY")}
                        </Paragraph>
                        <div className="flex gap-2 items-center">
                            <Paragraph>{category} | </Paragraph>
                            <Paragraph className="capitalize">Voice - {voice}</Paragraph>
                        </div>
                        <Separator />
                        <Paragraph className="text-justify">
                            {blurb}
                        </Paragraph>
                        <Separator />
                        <div className="flex items-center gap-2">
                            <Rating rating={rating} count={ratingsCount} />
                            <Paragraph className="mt-2">Views - {formatLargeNumber(views)}</Paragraph>
                        </div>
                        <Heading3>KES: {numberWithCommas(amount)}</Heading3>
                    </>
                ) : (
                    <>
                        <BookForm 
                            title={title}
                            setTitle={setTitle}
                            voice={voice}
                            setVoice={setVoice}
                            info={info}
                            setInfo={setInfo}
                            blurb={blurb}
                            setBlurb={setBlurb}
                            category={category}
                            setCategory={setCategory}
                        />
                    </>
                )
            }
            <div className="flex justify-end gap-2 items-center">
                <Button>
                    {id ? "Edit Book": "Post Book"}
                </Button>
            </div>
        </div>
    )
}

const Sections = (
    {id, sections, setSections}:
    {
        id?: string; 
        sections: SectionType[]; 
        setSections: React.Dispatch<SectionType[]>
    }
) => {

    return (
        <Card className="py-5 px-3">
            <div className="my-2 flex justify-between items-center">
                <Heading3>Sections - {sections.length}</Heading3>
                 
                <SectionSheet 
                    sections={sections}
                    setSections={setSections}
                />
            </div>
            <Separator />
            <div className="my-2 grid grid-cols-1 lg:grid-cols-4 gap-2">
                {
                    sections.map((section, index) => (
                        <Section 
                            id={id}
                            section={section}
                            sections={sections}
                            setSections={setSections}
                            key={index}
                        />
                    ))
                }
            </div>
        </Card>
    )
}


const Section = (
    {id, section, sections, setSections}: 
    {
        id?: string; 
        section: SectionType; 
        sections: SectionType[]; 
        setSections: React.Dispatch<SectionType[]>
    }
) => {

    return (
        <div className="flex flex-col gap-3 p-3 border rounded-md">
            <div className="flex justify-between items-center">
                <Badge className={cn(`${section.processed ? "bg-green-500": "bg-transparent"}`)}>
                    {section.processing ? "processing": section.processed ? "processed": "pending"}
                </Badge>
                <SectionSheet 
                    id={id}
                    section={section}
                    sections={sections}
                    setSections={setSections}
                />
            </div>
            <Heading4 className="text-md lg:text-base line-clamp-1">{section.title}</Heading4>
            {
                !section.text && (
                    <>  
                        <Paragraph>{formatBytes(section.size)} | {formatDuration(section.duration)}</Paragraph>
                        <Button
                            size="sm"
                            className="w-fit rounded-full"
                            variant={"outline"}
                        >
                            <Play size={18}/>
                            Play
                        </Button>
                    </>
                )
            }
            {
                section.text && (
                    <Paragraph className="line-clamp-4">{section.text}</Paragraph>
                )
            }
        </div>
    )
}
 

const dummy_book: BookType = {
    "id": "6593ad37ed178e8dcaf40d7f",
    "listed": true,
    "category": "Self-help",
    "title": "Ikigai: The Japanese Secret to a Long and Happy Life",
    "info": {
        "author": "Héctor García and Francesc Miralles ",
        "banner": "https://res.cloudinary.com/dyo0ezwgs/image/upload/v1703047785/audio-books/n3lb0kq5txwlzlliucai.jpg",
        "pages": 208,
        "published": "2017-08-17"
    },
    "sections": [
        {
            "title": "Sample",
            "text": "",
            "processed": true,
            "file_key": "audio-books/self-help/ikigai:-the-japanese-secret-to-a-long-and-happy-life-1703048932099/sample.wav",
            "duration": 0.6784,
            "size": 2133050
        },
        {
            "title": "Epigraph",
            "text": "",
            "processed": true,
            "file_key": "audio-books/self-help/ikigai:-the-japanese-secret-to-a-long-and-happy-life-1703048932099/epigraph.wav",
            "duration": 0.3703166666666667,
            "size": 2133050
        },
        {
            "title": "Prologue",
            "text": "",
            "processed": true,
            "file_key": "audio-books/self-help/ikigai:-the-japanese-secret-to-a-long-and-happy-life-1703048932099/prologue.wav",
            "duration": 5.10435,
            "size": 29401146
        },
        {
            "title": "I IKIGAI",
            "text": "",
            "processed": true,
            "file_key": "audio-books/self-help/ikigai:-the-japanese-secret-to-a-long-and-happy-life-1703048932099/i-ikigai.wav",
            "duration": 10.220083333333333,
            "size": 58867770
        },
        {
            "title": "II ANTIAGING SECRETS",
            "text": "",
            "processed": true,
            "file_key": "audio-books/self-help/ikigai:-the-japanese-secret-to-a-long-and-happy-life-1703048932099/ii-antiaging-secrets.wav",
            "duration": 19.245333333333335,
            "size": 110853178
        },
        {
            "title": "III FROM LOGOTHERAPY TO IKIGAI",
            "text": "",
            "processed": true,
            "file_key": "audio-books/self-help/ikigai:-the-japanese-secret-to-a-long-and-happy-life-1703048932099/iii-from-logotherapy-to-ikigai.wav",
            "duration": 19.94205,
            "size": 114866234
        },
        {
            "title": "IV FIND FLOW IN EVERYTHING YOU DO",
            "text": "",
            "processed": true,
            "file_key": "audio-books/self-help/ikigai:-the-japanese-secret-to-a-long-and-happy-life-1703048932099/iv-find-flow-in-everything-you-do.wav",
            "duration": 44.126216666666664,
            "size": 254167098
        },
        {
            "title": "V MASTERS OF LONGEVITY",
            "text": "",
            "processed": true,
            "file_key": "audio-books/self-help/ikigai:-the-japanese-secret-to-a-long-and-happy-life-1703048932099/v-masters-of-longevity.wav",
            "duration": 13.910216666666667,
            "size": 80122938
        },
        {
            "title": "VI LESSONS FROM JAPAN’S CENTENARIANS",
            "text": "",
            "processed": true,
            "file_key": "audio-books/self-help/ikigai:-the-japanese-secret-to-a-long-and-happy-life-1703048932099/vi-lessons-from-japan’s-centenarians.wav",
            "duration": 19.283549999999998,
            "size": 111073338
        },
        {
            "title": "VII THE IKIGAI DIET",
            "text": "",
            "processed": true,
            "file_key": "audio-books/self-help/ikigai:-the-japanese-secret-to-a-long-and-happy-life-1703048932099/vii-the-ikigai-diet.wav",
            "duration": 14.7408,
            "size": 84907066
        },
        {
            "title": "VII GENTLE MOVEMENTS, LONGER LIFE",
            "text": "",
            "processed": true,
            "file_key": "audio-books/self-help/ikigai:-the-japanese-secret-to-a-long-and-happy-life-1703048932099/vii-gentle-movements,-longer-life.wav",
            "duration": 24.483549999999997,
            "size": 141025338
        },
        {
            "title": "IX RESILIENCE AND WABI-SABI",
            "text": "",
            "processed": true,
            "file_key": "audio-books/self-help/ikigai:-the-japanese-secret-to-a-long-and-happy-life-1703048932099/ix-resilience-and-wabi-sabi.wav",
            "duration": 19.741683333333334,
            "size": 113712186
        },
        {
            "title": "EPILOGUE",
            "text": "",
            "processed": true,
            "file_key": "audio-books/self-help/ikigai:-the-japanese-secret-to-a-long-and-happy-life-1703048932099/epilogue.wav",
            "duration": 1.51165,
            "size": 8707130
        },
        {
            "title": "Conclusion",
            "text": "",
            "processed": true,
            "file_key": "audio-books/self-help/ikigai:-the-japanese-secret-to-a-long-and-happy-life-1703048932099/conclusion.wav",
            "duration": 4.4542166666666665,
            "size": 25656378
        }
    ],
    "blurb": "According to the Japanese, everyone has an ikigai—a reason for living. And according to the residents of the Japanese village with the world’s longest-living people, finding it is the key to a happier and longer life. Having a strong sense of ikigai—where what you love, what you’re good at, what you can get paid for, and what the world needs all overlap—means that each day is infused with meaning. It’s the reason we get up in the morning. It’s also the reason many Japanese never really retire (in fact there’s no word in Japanese that means retire in the sense it does in English): They remain active and work at what they enjoy, because they’ve found a real purpose in life—the happiness of always being busy.\n\nIn researching this book, the authors interviewed the residents of the Japanese village with the highest percentage of 100-year-olds—one of the world’s Blue Zones. Ikigai reveals the secrets to their longevity and happiness: how they eat, how they move, how they work, how they foster collaboration and community, and—their best-kept secret—how they find the ikigai that brings satisfaction to their lives. And it provides practical tools to help you discover your own ikigai. Because who doesn’t want to find happiness in every day?",
    "amount": 130,
    "key": "audio-books/self-help/ikigai:-the-japanese-secret-to-a-long-and-happy-life-1703048932099/",
    "ratingsAverage": 5,
    "ratingsQuantity": 0,
    "slug": "ikigai:-the-japanese-secret-to-a-long-and-happy-life-1703048932099",
    "voice": "william",
    "createdAt": "2023-12-20T05:08:52.107Z",
    "views": 462,
    "duration": 197.81241666666668
}