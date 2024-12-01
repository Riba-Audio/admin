"use client";

import React from "react";
import { Play } from "lucide-react";
import dayjs from "dayjs";

import Container from "@/components/utils/container";
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
import { getSingleBook, postBook } from "@/lib/api-calls/books";
import { useCustomEffect } from "@/hooks/useEffect";
import { createToast } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { BookInfoType, BookType, SectionType } from "@/types";



const Book = ({ params }: { params: { bookId: string } }) => {
    const [book, setBook] = React.useState<BookType>()
    const [loading, setLoading] = React.useState<boolean>(false);
    const [sLoading, setSloading] = React.useState<boolean>(false);

    const [id, setId] = React.useState<string | undefined>(undefined)
    const [listed, setListed] = React.useState<boolean>(false);
    const [title, setTitle] = React.useState<string>("")
    const [blurb, setBlurb] = React.useState<string>("");
    const [category, setCategory] = React.useState<string>("");
    const [info, setInfo] = React.useState<BookInfoType | undefined>(undefined);
    const [amount, setAmount] = React.useState<number>(0);
    const [voice, setVoice] = React.useState<string>("");
    const [sections, setSections] = React.useState<SectionType[]>([])

    const mounted = useMounted();
    const {push} = useRouter(); 

    const fetchBook = async () => {
        if (!mounted || params.bookId === "new") return;
        setLoading(true);
        let res = await getSingleBook(params.bookId);
        if (res) {
            setBook(res);
            setId(res.id);
            setListed(res.listed)
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

    useCustomEffect(fetchBook, [mounted]);
    const handlePostBook = async () => {
        let banner = info?.banner || "https://res.cloudinary.com/dyo0ezwgs/image/upload/v1702762536/audio-books/yrsyyop4lw7yilddu7nd.jpg"; 

        if (!book) {
            // posting new book 
            if (
                !title || !info?.author || !voice || !category ||
                !info.pages || !blurb || !info.published || !banner ||
                sections.length === 0
            ) {
                 
                createToast("error", "Make sure all the fields are filled");
                return;
            }
            // validate the publishing date
            let publishing_date_arr = info.published.split("-"); 
            if (publishing_date_arr.length !== 3) {
                createToast("error", "Check publishing date format - 2002-01-25 - (YYYY-MM-DD)")
                return; 
            }
            setSloading(true);

            let book: any = { title, voice, category, blurb, ...info, banner, sections };
           
            let res = await postBook(book); 
            if (res) {
                createToast("success", "Book has been added!");
                push(`/books/${res}`); 
            }
            setSloading(false);
        } else {
            // edit book 
            let oldBook = {
                title: book.title,
                info: book.info,
                category: book.category,
                blurb: book.blurb,
                amount: book.amount,
                sections: book.sections
            };

            let updates: any = {
                title, info, category, blurb, amount, sections
            };


            if (JSON.stringify(oldBook) === JSON.stringify(updates)) {
                createToast("error", "Nothing to update!");
                return;
            };

            setSloading(true);

            let toUpdate: any = {};
            let updatedInfo = { ...info, published: dayjs(new Date(info?.published || Date.now())).format("YYYY-MM-DD") }
            let oldInfo = { ...book.info, published: dayjs(new Date(book.info?.published)).format("YYYY-MM-DD") }

            if (title !== book.title) toUpdate.title = title;
            if (blurb !== book.blurb) toUpdate.blurb = blurb;
            if (JSON.stringify(updatedInfo) !== JSON.stringify(oldInfo)) toUpdate.info = updatedInfo;
            if (category !== book.category) toUpdate.category = category;
            if (JSON.stringify(sections) !== JSON.stringify(book.sections)) {
                toUpdate.sections = sections;
                toUpdate.listed = false;
                setListed(false)
            }
            if (amount !== book.amount) toUpdate.amount = amount;

            setSloading(false);
        }
    }
    return (
        <Container
            title={loading ? "Loading..." : book?.title || "New Book"}
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
                                loading={sLoading}
                            />
                            <Details
                                id={id}
                                title={title}
                                setTitle={setTitle}
                                listed={listed}
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
                                handleSubmit={handlePostBook}
                                loading={sLoading}
                            />
                        </Card>
                        <Sections id={id} sections={sections} setSections={setSections} loading={sLoading} />
                    </>
                )
            }
        </Container>
    )
}

export default Book; 
// book components 

const Banner = ({ title, info, setInfo, loading }:
    {
        title?: string;
        info: BookInfoType | undefined;
        setInfo: React.Dispatch<BookInfoType | undefined>;
        loading: boolean;
    }) => {
    return (
        <div className="w-[25%] flex flex-col items-center">
            <Card className="w-full h-[50vh] relative overflow-hidden">
                <AppImage
                    src={info?.banner || images.placeholder_img}
                    title={title || "New Book"}
                    alt={title || "New Book"}
                    fill
                />
            </Card>
            <ImageUpload
                disabled={loading}
                text={`${info?.banner ? "Edit " : "Add "} Banner`}
                onChange={(src) => {
                    let updatedInfo: any = { ...info, banner: src };
                    setInfo(updatedInfo)
                }}
                onRemove={(src) => {

                }}
                path={`${process.env.NODE_ENV === "development" ? "test/" : ""}audiobooks/new/books`}
                className="my-2"
            />
        </div>
    )
}

const Details = (
    {
        id, title, duration, voice, setVoice, setTitle, listed,
        info, setInfo, category, setCategory, amount, setAmount,
        rating, ratingsCount, views, blurb, setBlurb, handleSubmit, loading
    }:
        {
            id?: string; title: string; duration: number; voice: string; setVoice: React.Dispatch<string>;
            setTitle: React.Dispatch<string>; listed: boolean; info: BookInfoType | undefined;
            setInfo: React.Dispatch<BookInfoType | undefined>; rating: number;
            ratingsCount: number; amount: number; setAmount: React.Dispatch<number>;
            category: string; setCategory: React.Dispatch<string>; views: number;
            blurb: string; setBlurb: React.Dispatch<string>; handleSubmit: () => Promise<void>; loading: boolean;
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
                                loading={loading}
                            />
                        </div>
                        <Heading2>{title}</Heading2>
                        <Paragraph className="text-gray-500">
                            {info?.author} |&nbsp;
                            {info?.pages} pages |&nbsp;
                            {formatDuration(duration)} |&nbsp;
                            {dayjs(new Date(info?.published || Date.now())).format("MMM, YYYY")}
                        </Paragraph>
                        <div className="flex gap-2 items-center">
                            <Paragraph className="capitalize">{category} | </Paragraph>
                            <Paragraph className="capitalize">Voice - {voice}</Paragraph>
                        </div>
                        <Separator />
                        <Paragraph className="text-justify">
                            {blurb}
                        </Paragraph>
                        <Separator />
                        <div className="flex items-center gap-2">
                            <Rating rating={rating} count={ratingsCount} />
                            <Paragraph className="mt-2"> | {formatLargeNumber(views)} views </Paragraph>
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
                            loading={loading}
                        />
                    </>
                )
            }
            <div className="flex justify-end gap-2 items-center">
                <Button
                    className="w-[200px]"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {id ? "Edit Book" : "Post Book"}
                </Button>
            </div>
        </div>
    )
}

const Sections = (
    { id, sections, setSections, loading }:
        {
            id?: string;
            sections: SectionType[];
            setSections: React.Dispatch<SectionType[]>;
            loading: boolean;
        }
) => {

    return (
        <Card className="py-5 px-3">
            <div className="my-2 flex justify-between items-center">
                <Heading3>Sections - {sections.length}</Heading3>

                <SectionSheet
                    sections={sections}
                    setSections={setSections}
                    loading={loading}
                />
            </div>
            <Separator />
            <div className="my-2 grid grid-cols-1 lg:grid-cols-4 gap-2">
                {
                    sections.map((section, index) => (
                        <Section
                            id={id}
                            loading={loading}
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
    { id, section, sections, setSections, loading }:
        {
            id?: string;
            section: SectionType;
            sections: SectionType[];
            setSections: React.Dispatch<SectionType[]>;
            loading: boolean;
        }
) => {

    return (
        <div className="flex flex-col gap-3 p-3 border rounded-md">
            <div className="flex justify-between items-center">
                <Badge className={cn(`${section.processed ? "bg-green-500" : "bg-gray-500"}`)}>
                    {section.processing ? "processing" : section.processed ? "processed" : "pending"}
                </Badge>
                <SectionSheet
                    small={true}
                    id={id}
                    section={section}
                    sections={sections}
                    setSections={setSections}
                    loading={loading}
                />
            </div>
            <Heading4 className="text-md lg:text-base line-clamp-1">{section.title}</Heading4>
            {
                !section.text && (
                    <>
                        <Paragraph>{formatBytes(section.size || 0)} | {formatDuration(section.duration || 0)}</Paragraph>
                        <Button
                            size="sm"
                            className="w-fit rounded-full"
                            variant={"outline"}
                            disabled={loading}
                        >
                            <Play size={18} />
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