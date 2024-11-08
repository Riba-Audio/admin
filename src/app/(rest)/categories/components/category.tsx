// category item
"use client"; 
import React from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Paragraph } from "@/components/ui/typography";
import { X } from "lucide-react";
import CategoryModal from "@/components/modals/category-modal";

interface CategoryProps {
    category: string; 
    setCategories: React.Dispatch<string[]>;
    categories: string[]; 
};

const Category: React.FC<CategoryProps> = (
    {category, setCategories, categories}
) => {
    const [showDeleteModal, setShowDeleteModal] = React.useState<boolean>(false);
    const [showEditModal, setShowEditModal] = React.useState<boolean>(false);

    return (
        <>
            <CategoryModal 
                type={showDeleteModal ? "delete": "edit"}
                isOpen={showDeleteModal || showEditModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setShowEditModal(false); 
                }}
                current={category}
                categories={categories}
                setCategories={setCategories}
            />
            <Card 
                className="rounded-full px-3 py-1 cursor-pointer duration-700 hover:border-secondary-color flex items-center gap-4 px-3"
                // onClick={() => setCategories([...categories.filter(ct => ct !== category)])}
                onClick={(e: any) => {
                    e.stopPropagation();
                    setShowEditModal(true)
                }}

            >
                <Paragraph>{category}</Paragraph>
                <span
                    onClick={(e: any) => {
                        e.stopPropagation(); 
                        setShowDeleteModal(true)
                    }}
                    className={"hover:text-destructive duration-700"}
                >
                    <X size={18}/>
                </span>
            </Card>
        </>
    )
};

export default Category; 

export const CategorySkeleton = () => (
    <Skeleton className="flex-1 min-w-[200px] h-[20px] rounded-full"/>
)