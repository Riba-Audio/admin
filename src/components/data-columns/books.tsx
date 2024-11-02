"use client"

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table"
import dayjs from "dayjs";
import { ExternalLink } from "lucide-react";

import { images } from "@/assets";
import AppImage from "@/components/common/app-image";
import { Badge } from "@/components/ui/badge";
import Rating from "@/components/utils/rating";
import { cn } from "@/lib/utils";
import { numberWithCommas } from "@/utils/format-numbers";


export type BookInfoType = {
    author: string;
    banner: string;
    pages: number;
    published: string;
}
export type BookAudioType = {
    voice: string; 
    duration: number; 
}
export type BookType = {
    id: string;
    title: string;
    amount: number; 
    info: BookInfoType;
    category: string;
    processed: boolean;
    sections: number; 
    rating: number; 
    ratingsCount: number; 
    audio: BookAudioType;
    views: number; 
    createdAt: string; 
}

export const BookBanner = ({src, title}: {src: string, title: string}) => (
    <span
        className="block w-[80px] h-[70px] relative border-gray-500"
    >
        <AppImage 
            alt={title}
            title={title}
            src={process.env.NODE_ENV == "development" ? images.dummy_book_image: src}
            fill
            nonBlur={true}
        />
    </span>
)

export const columns: ColumnDef<BookType>[] = [
    {
        accessorKey: "info",
        header: "",
        cell: (({ row}) => {
            let book = row.original; 

            return (
                <BookBanner 
                    src={book.info.banner}
                    title={book.title}
                />
            )
        })
    },
    {
        accessorKey: "title",
        header: "Title",
        cell: (({ row }) => {
            let book = row.original 

            return (
                <span className="flex flex-col gap-2 max-[250px]">
                    <span className="font-bold text-sm lg:text-md line-clamp-1">{book.title}</span>
                    <span className="text-xs lg:text-xs text-gray-500 line-clamp-1">{book.info.author} | {book.info.pages} pages | {dayjs(new Date(book.info.published)).format("MMM YYYY")}</span>
                </span>
            )
        })
    },
    {
        accessorKey: "amount",
        header: "Amount",
        cell: (({ row }) => (<span>KES: {numberWithCommas(row.getValue("amount"))}</span>))
    },
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "sections",
        header: "Sections",
        cell: (({ row }) => (<span>{row.getValue("sections")}</span>))
    },
    {
        accessorKey: "views",
        header: "Views",
        cell: (({ row }) => (<span>{numberWithCommas(row.getValue("views"))}</span>))
    },
    {
        accessorKey: "createdAt",
        header: "Added",
        cell: (({ row }) => (<span>{dayjs(new Date(row.getValue("createdAt"))).format("DD MMM, YYYY")}</span>))
    },
    {
        accessorKey: "processed",
        header: "Status",
        cell: (({ row }) => {

            return (
                <Badge 
                    variant={row.getValue("processed") ? "default": "secondary"}
                    className={cn(row.getValue("processed") ? "bg-green-500": "")}
                >
                    {row.getValue("processed") ? "Processed": "Queued"}
                </Badge>
            )
        })
    },
    {
        accessorKey: "rating",
        header: "Rating",
        cell: (({ row }) => (<Rating rating={row.getValue("rating")} count={row.getValue("ratingsCount")}/>))
    },
    {
        accessorKey: "id",
        header: "",
        cell: (({ row }) => <Link className="hover:text-secondary-color" href={`/books/${row.getValue("id")}`}><ExternalLink size={18}/></Link>)
    }

]
