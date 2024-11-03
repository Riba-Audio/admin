"use client";
import Container from "@/components/container";
import { createArray } from "@/utils/format-numbers";
import React from "react";
import Category, { CategorySkeleton } from "./components/category";
import { Card } from "@/components/ui/card";
import { Heading3, Paragraph } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddButton from "@/components/add";


export default function Page() {
    const [count, setCount] = React.useState<number>(1);
    const [categories, setCategories] = React.useState<string[]>([...dummy_categories]);
    const [loading, setLoading] = React.useState<boolean>(false);



    return (
        <Container title="Categories" subtitle={`Total - 50 categories`}>
            <AddButton>
                <Button className="items-center gap-2 rounded-full" size="sm">
                    <Plus size={14}/>
                    <span>Add Category</span>
                </Button>
            </AddButton>
            <div className="my-3 flex gap-2 flex-wrap">
                {
                    loading && createArray(30).map(itm => (
                        <CategorySkeleton key={itm} />
                    ))
                }
                {
                    (!loading && count) ? categories.map((cat, index) => (
                        <Category categories={categories} category={cat} setCategories={setCategories} key={index} />
                    )):<></>
                }
                {
                    !loading && !count ? (
                        <Card className="h-[50vh] w-full flex items-center justify-center">
                            <Heading3>No Categories found</Heading3>
                        </Card>
                    ): <></>
                }
            </div>
        </Container>
    )
};

const dummy_categories: string[] = [
    "Fiction",
    "Non-Fiction",
    "Mystery",
    "Science Fiction",
    "Fantasy",
    "Biography",
    "Historical Fiction",
    "Romance",
    "Self-Help",
    "Health & Wellness",
    "Children's",
    "Young Adult",
    "Classic Literature",
    "Thriller",
    "Poetry",
    "Graphic Novels",
    "Cookbooks",
    "Travel",
    "Science",
    "Religion & Spirituality"
];
