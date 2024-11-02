// category item

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Paragraph } from "@/components/ui/typography";
import { X } from "lucide-react";

interface CategoryProps {
    category: string; 
    setCategories: React.Dispatch<string[]>;
    categories: string[]; 
};

const Category: React.FC<CategoryProps> = (
    {category, setCategories, categories}
) => {

    return (
        <Card className="rounded-full px-3 py-1 cursor-pointer hover:border-secondary-color">
            <Paragraph>{category}</Paragraph>
            <X size={18}/>
        </Card>
    )
};

export default Category; 

export const CategorySkeleton = () => (
    <Skeleton className="flex-1 min-w-[200px] h-[20px] rounded-full"/>
)