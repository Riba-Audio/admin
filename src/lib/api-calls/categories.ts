// categories 

import { getDoc, patchDoc, postDoc } from "@/utils/api-wrappers"


export const getCategories = async () => {
    let res = await getDoc("/categories", true);
    return res?.data || false; 
}

export const addCategory = async (data: any) => {
    let res = await postDoc("/categories?role=admin", data, true); 
    return res?.status === "success"; 
};

export const editCategory = async (data: any) => {
    let res = await patchDoc("/categories?role=admin", data, true);
    return res?.status === "success";
};

export const deleteCategory = async (category: string) => {
    let res = await patchDoc("/categories/delete?role=admin", {category}, true);
    return res?.status === "success"; 
} 