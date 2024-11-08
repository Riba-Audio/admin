"use client";
import Container from "@/components/utils/container";
import { createArray } from "@/utils/format-numbers";
import React from "react";
import Category, { CategorySkeleton } from "./category";
import { Card } from "@/components/ui/card";
import { Heading3 } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddButton from "@/components/utils/add";
import { getCategories } from "@/lib/api-calls/categories";
import { useCustomEffect } from "@/hooks/useEffect";
import CategoryModal from "@/components/modals/category-modal";


const Categories = () => {
    const [count, setCount] = React.useState<number>(1);
    const [categories, setCategories] = React.useState<string[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [mounted, setMounted] = React.useState<boolean>(false);

    const [showAddModal, setShowAddModal] = React.useState<boolean>(false);

    React.useEffect(() => setMounted(true), []); 

    const fetchCategories = async () => {
        if (!mounted) return; 

        setLoading(true);
        let res = await getCategories(); 
        if (res) {
            setCount(res.count)
            setCategories(res.docs)
        }
        setLoading(false); 
    };

    useCustomEffect(fetchCategories, [mounted]); 

    return (
        <Container 
            title="Categories" 
            subtitle={`Total - ${categories.length} categories`}
            headerComponent={
                <AddButton>
                    <Button className="items-center gap-2 rounded-full" size="sm" onClick={() => setShowAddModal(true)}>
                        <Plus size={14}/>
                        <span>Add Category</span>
                    </Button>
                </AddButton>

            }
        >
            <CategoryModal 
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                categories={categories}
                setCategories={setCategories}
                type="add"
            />
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
 
export default Categories; 