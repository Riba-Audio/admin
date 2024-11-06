// books 

import { getDoc } from "@/utils/api-wrappers"

export const getBooks = async (page: number) => {
    let res = await getDoc(`/admin/books?page=${page}&role=admin`, true);
    return res?.data || false; 
}

export const getSingleBook = async (bookId: string) => {
    let res = await getDoc(`/admin/books/${bookId}?role=admin`, true); 
    return res?.data || false; 
}