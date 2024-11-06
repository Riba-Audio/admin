// user routes

import { getDoc } from "@/utils/api-wrappers"

// get user 
export const getUser = async () => {
    let res = await getDoc("/users?role=admin", true); 
    return res?.data || false; 
}