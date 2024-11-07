import { deleteDoc, getDoc, patchDoc, postDoc } from "@/utils/api-wrappers"; 

// get computers 
export const getComputers = async () => {
    let res = await getDoc("/computers?role=admin", true);
    return res?.data || false; 
};

// edit computer 
export const updateComputer = async (computerId: string, data: any) => {
    let res = await patchDoc(`/computers/${computerId}?role=admin`, data, true);
    return res?.status === "success"; 
};

// add computer
export const postComputer = async (data: any) => {
    let res = await postDoc(`/computers?role=admin`, data, true);
    return res?.doc || false; 
};

// delete computer 
export const deleteComputer = async (computerId: string) => {
    let res = await deleteDoc(`/computers/${computerId}`, true);
    return res?.status === "success"; 
}