// books 

import { getDoc, patchDoc, postDoc } from "@/utils/api-wrappers"

export const getBooks = async (page: number, q?: string) => {
    let res = await getDoc(`/admin/books?page=${page}&role=admin${q ? `&q=${q}`: ""}`, true);
    return res?.data || false; 
}

export const getSingleBook = async (bookId: string) => {
    let res = await getDoc(`/admin/books/${bookId}?role=admin`, true); 
    return res?.data || false; 
}

export const getBookUnauthorized = async (bookId: string) => {
    let res = await getDoc(`/books/${bookId}?form=title`, true);
    return res?.data || false; 
}

export const postBook = async (data: any) => {
    let res = await postDoc("/admin/books?role=admin", data, true);
     
    return res?.data || false; 
};

export const updateBook = async (bookId: string, data: any) => {
    let res = await patchDoc(`/admin/books/${bookId}?role=admin`, data, true); 
    return res?.status === "success";
}