"use client"; 
import React from "react";
import { Button } from "../ui/button";
import { Modal } from "./modal";
import AppInput from "../common/app-input";
import { addCategory, deleteCategory, editCategory } from "@/lib/api-calls/categories";
import { createToast } from "@/utils/toast";


interface CategoryModalProps {
    isOpen: boolean; 
    onClose: () => void; 
    type: "delete" | "edit" | "add"; 
    current?: string;
    categories: string[]; 
    setCategories: React.Dispatch<string[]>; 
}

const CategoryModal: React.FC<CategoryModalProps> = ({isOpen, onClose,type, current, categories, setCategories}) => {
    let title = type === "delete" ? "Delete Category": type === "add" ? "Add Category": "Edit Category"; 
    let description = type === "delete" ? "Do you wish to delete the category? This action is irreversible and cannot be undone.":
        type === "add" ? "A new category will be added to the categories. Type its name to proceed.":
        `Do you wish to edit the category ${current}. Type the new name to proceed`; 

    const [category, setCategory] = React.useState<string>(""); 
    const [loading, setLoading] = React.useState<boolean>(false); 

    const handleButtonPress = async () => {
        let res: boolean = false; 

        if (type !== "delete" && !category) {
            createToast("error", "Type a category");
            return; 
        }
        setLoading(true); 

        if (type === "delete" && current) res = await deleteCategory(current);
        if (type === "edit" && current) res = await editCategory({old: current, category});
        if (type === "add") res = await addCategory({category});

        if (res) {
            let message = `Category ${type}${type === "delete" ? "d": "ed"} successfully`; 
            createToast("success", message); 
            let updated = [...categories]; 
            if (type === "delete") updated = updated.filter(ct => ct !== current);
            if (type === "edit") {
                let updatedList: string[] = []
                for (let i = 0; i < updated.length; i++) {
                    let curr = updated[i];
                    if (curr === current) updatedList.push(category)
                    else updatedList.push(curr)
                }
                updated = [...updatedList]; 
            }
            if (type === "add") updated = [...updated, category]; 
            setCategories([...updated]); 
            if (type !== "delete") setCategory("");
            onClose()
        };
        setLoading(false);
        
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            description={description}
        >
            {
                type !== "delete" && (
                    <AppInput 
                        value={category}
                        setValue={setCategory}
                        placeholder={"Category.."}
                        disabled={loading}
                    />
                )
            }
            <Button
                className="capitalize w-full my-3"
                variant={type === "delete" ? "destructive": "default"}
                onClick={handleButtonPress}
                disabled={loading}
            >
                {type}
            </Button>
        </Modal>
    )
};


export default CategoryModal; 