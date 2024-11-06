// categories 

import { getDoc } from "@/utils/api-wrappers"


export const getCategories = async () => {
    let res = await getDoc("/categories", true);
    return res?.data || false; 
}