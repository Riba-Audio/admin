"use client"; 

import React from "react";
import { Plus } from "lucide-react";

import AddButton from "@/components/add";
import AppInput from "@/components/common/app-input";
import Container from "@/components/container";
import { BookType, columns } from "@/components/data-columns/books";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";


export default function Page() {
    const [loading, setLoading] = React.useState<boolean>(true);
    const [books, setBooks] = React.useState<BookType[]>([...dummy_books]); 
    const [count, setCount] = React.useState<number>(0); 

    const [search, setSearch] = React.useState<string>(""); 

    return (
        
        <Container title="Books" subtitle="Found - 254 books">
            <AddButton>
                <AppInput 
                    value={search}
                    setValue={setSearch}
                    placeholder={"Search book..."}
                    containerClassName="rounded-full min-w-[200px]"
                />
                <Button className="items-center gap-2 rounded-full" size="icon">
                    <Plus size={17}/>
                    {/* <span>Add Book</span> */}
                </Button>
            </AddButton>
            <Card className="my-3">
                <DataTable columns={columns} data={books} />
            </Card>
        </Container>
    )
}

const dummy_books: BookType[] = [
    {
        id: "1",
        title: "The Great Gatsby",
        amount: 10,
        info: {
            author: "F. Scott Fitzgerald",
            banner: "path/to/gatsby/banner.jpg",
            pages: 180,
            published: "1925-04-10"
        },
        category: "Classic",
        processed: true,
        sections: 9,
        rating: 4.2,
        ratingsCount: 12000,
        audio: {
            voice: "Narrator A",
            duration: 300
        },
        views: 150000,
        createdAt: "2023-01-01"
    },
    {
        id: "2",
        title: "To Kill a Mockingbird",
        amount: 8,
        info: {
            author: "Harper Lee",
            banner: "path/to/mockingbird/banner.jpg",
            pages: 281,
            published: "1960-07-11"
        },
        category: "Classic",
        processed: true,
        sections: 11,
        rating: 4.8,
        ratingsCount: 20000,
        audio: {
            voice: "Narrator B",
            duration: 420
        },
        views: 200000,
        createdAt: "2023-02-01"
    },
    {
        id: "3",
        title: "1984",
        amount: 12,
        info: {
            author: "George Orwell",
            banner: "path/to/1984/banner.jpg",
            pages: 328,
            published: "1949-06-08"
        },
        category: "Dystopian",
        processed: true,
        sections: 10,
        rating: 4.6,
        ratingsCount: 18000,
        audio: {
            voice: "Narrator C",
            duration: 480
        },
        views: 175000,
        createdAt: "2023-03-01"
    },
    {
        id: "4",
        title: "Moby Dick",
        amount: 9,
        info: {
            author: "Herman Melville",
            banner: "path/to/mobydick/banner.jpg",
            pages: 585,
            published: "1851-10-18"
        },
        category: "Classic",
        processed: true,
        sections: 135,
        rating: 3.5,
        ratingsCount: 5000,
        audio: {
            voice: "Narrator D",
            duration: 600
        },
        views: 70000,
        createdAt: "2023-04-01"
    },
    {
        id: "5",
        title: "Pride and Prejudice",
        amount: 11,
        info: {
            author: "Jane Austen",
            banner: "path/to/prideandprejudice/banner.jpg",
            pages: 279,
            published: "1813-01-28"
        },
        category: "Classic",
        processed: true,
        sections: 12,
        rating: 4.3,
        ratingsCount: 15000,
        audio: {
            voice: "Narrator E",
            duration: 450
        },
        views: 120000,
        createdAt: "2023-05-01"
    },
    {
        id: "6",
        title: "The Catcher in the Rye",
        amount: 10,
        info: {
            author: "J.D. Salinger",
            banner: "path/to/catcher/banner.jpg",
            pages: 214,
            published: "1951-07-16"
        },
        category: "Classic",
        processed: true,
        sections: 26,
        rating: 3.9,
        ratingsCount: 16000,
        audio: {
            voice: "Narrator F",
            duration: 390
        },
        views: 140000,
        createdAt: "2023-06-01"
    },
    {
        id: "7",
        title: "The Hobbit",
        amount: 15,
        info: {
            author: "J.R.R. Tolkien",
            banner: "path/to/hobbit/banner.jpg",
            pages: 310,
            published: "1937-09-21"
        },
        category: "Fantasy",
        processed: true,
        sections: 19,
        rating: 4.7,
        ratingsCount: 25000,
        audio: {
            voice: "Narrator G",
            duration: 540
        },
        views: 220000,
        createdAt: "2023-07-01"
    },
    {
        id: "8",
        title: "Fahrenheit 451",
        amount: 7,
        info: {
            author: "Ray Bradbury",
            banner: "path/to/fahrenheit/banner.jpg",
            pages: 160,
            published: "1953-10-19"
        },
        category: "Dystopian",
        processed: true,
        sections: 5,
        rating: 4.1,
        ratingsCount: 8000,
        audio: {
            voice: "Narrator H",
            duration: 300
        },
        views: 90000,
        createdAt: "2023-08-01"
    },
    {
        id: "9",
        title: "Brave New World",
        amount: 12,
        info: {
            author: "Aldous Huxley",
            banner: "path/to/bravenewworld/banner.jpg",
            pages: 311,
            published: "1932-08-31"
        },
        category: "Dystopian",
        processed: true,
        sections: 18,
        rating: 4.2,
        ratingsCount: 11000,
        audio: {
            voice: "Narrator I",
            duration: 480
        },
        views: 130000,
        createdAt: "2023-09-01"
    },
    {
        id: "10",
        title: "The Picture of Dorian Gray",
        amount: 9,
        info: {
            author: "Oscar Wilde",
            banner: "path/to/doriangray/banner.jpg",
            pages: 254,
            published: "1890-07-01"
        },
        category: "Classic",
        processed: true,
        sections: 20,
        rating: 4.0,
        ratingsCount: 9000,
        audio: {
            voice: "Narrator J",
            duration: 420
        },
        views: 95000,
        createdAt: "2023-10-01"
    },
    {
        id: "11",
        title: "The Alchemist",
        amount: 13,
        info: {
            author: "Paulo Coelho",
            banner: "path/to/alchemist/banner.jpg",
            pages: 208,
            published: "1988-04-15"
        },
        category: "Philosophy",
        processed: true,
        sections: 12,
        rating: 4.5,
        ratingsCount: 14000,
        audio: {
            voice: "Narrator K",
            duration: 360
        },
        views: 175000,
        createdAt: "2023-10-15"
    },
    {
        id: "12",
        title: "The Kite Runner",
        amount: 10,
        info: {
            author: "Khaled Hosseini",
            banner: "path/to/kiterunner/banner.jpg",
            pages: 371,
            published: "2003-05-29"
        },
        category: "Contemporary",
        processed: true,
        sections: 24,
        rating: 4.3,
        ratingsCount: 19000,
        audio: {
            voice: "Narrator L",
            duration: 540
        },
        views: 160000,
        createdAt: "2023-10-20"
    },
    {
        id: "13",
        title: "The Road",
        amount: 8,
        info: {
            author: "Cormac McCarthy",
            banner: "path/to/road/banner.jpg",
            pages: 287,
            published: "2006-09-26"
        },
        category: "Dystopian",
        processed: true,
        sections: 23,
        rating: 4.0,
        ratingsCount: 15000,
        audio: {
            voice: "Narrator M",
            duration: 480
        },
        views: 110000,
        createdAt: "2023-11-01"
    },
    {
        id: "14",
        title: "Sapiens: A Brief History of Humankind",
        amount: 14,
        info: {
            author: "Yuval Noah Harari",
            banner: "path/to/sapiens/banner.jpg",
            pages: 443,
            published: "2011-01-01"
        },
        category: "Non-Fiction",
        processed: true,
        sections: 28,
        rating: 4.6,
        ratingsCount: 30000,
        audio: {
            voice: "Narrator N",
            duration: 600
        },
        views: 210000,
        createdAt: "2023-10-30"
    },
    {
        id: "15",
        title: "Educated",
        amount: 7,
        info: {
            author: "Tara Westover",
            banner: "path/to/educated/banner.jpg",
            pages: 334,
            published: "2018-02-20"
        },
        category: "Memoir",
        processed: true,
        sections: 15,
        rating: 4.7,
        ratingsCount: 12000,
        audio: {
            voice: "Narrator O",
            duration: 480
        },
        views: 130000,
        createdAt: "2023-11-01"
    },
    {
        id: "16",
        title: "Where the Crawdads Sing",
        amount: 9,
        info: {
            author: "Delia Owens",
            banner: "path/to/crawdads/banner.jpg",
            pages: 368,
            published: "2018-08-14"
        },
        category: "Fiction",
        processed: true,
        sections: 20,
        rating: 4.8,
        ratingsCount: 20000,
        audio: {
            voice: "Narrator P",
            duration: 540
        },
        views: 190000,
        createdAt: "2023-10-25"
    },
    {
        id: "17",
        title: "Becoming",
        amount: 11,
        info: {
            author: "Michelle Obama",
            banner: "path/to/becoming/banner.jpg",
            pages: 426,
            published: "2018-11-13"
        },
        category: "Memoir",
        processed: true,
        sections: 18,
        rating: 4.9,
        ratingsCount: 18000,
        audio: {
            voice: "Narrator Q",
            duration: 600
        },
        views: 250000,
        createdAt: "2023-11-01"
    },
    {
        id: "18",
        title: "The Silent Patient",
        amount: 10,
        info: {
            author: "Alex Michaelides",
            banner: "path/to/silentpatient/banner.jpg",
            pages: 336,
            published: "2019-02-05"
        },
        category: "Thriller",
        processed: true,
        sections: 30,
        rating: 4.2,
        ratingsCount: 15000,
        audio: {
            voice: "Narrator R",
            duration: 480
        },
        views: 160000,
        createdAt: "2023-10-28"
    },
    {
        id: "19",
        title: "Circe",
        amount: 12,
        info: {
            author: "Madeline Miller",
            banner: "path/to/circe/banner.jpg",
            pages: 400,
            published: "2018-04-10"
        },
        category: "Fantasy",
        processed: true,
        sections: 22,
        rating: 4.5,
        ratingsCount: 20000,
        audio: {
            voice: "Narrator S",
            duration: 540
        },
        views: 140000,
        createdAt: "2023-10-25"
    },
    {
        id: "20",
        title: "The Vanishing Half",
        amount: 13,
        info: {
            author: "Brit Bennett",
            banner: "path/to/vanishinghalf/banner.jpg",
            pages: 352,
            published: "2020-06-02"
        },
        category: "Contemporary",
        processed: true,
        sections: 16,
        rating: 4.3,
        ratingsCount: 19000,
        audio: {
            voice: "Narrator T",
            duration: 600
        },
        views: 175000,
        createdAt: "2023-11-01"
    }
];
