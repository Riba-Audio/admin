// books 

import { getDoc, postDoc } from "@/utils/api-wrappers"

export const getBooks = async (page: number) => {
    let res = await getDoc(`/admin/books?page=${page}&role=admin`, true);
    return res?.data || false; 
}

export const getSingleBook = async (bookId: string) => {
    let res = await getDoc(`/admin/books/${bookId}?role=admin`, true); 
    return res?.data || false; 
}

export const postBook = async (data: any) => {
    let res = await postDoc("/admin/books?role=admin", data, true);
     
    return res?.data || false; 
}