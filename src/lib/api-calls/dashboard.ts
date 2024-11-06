// dashboard routes

import { getDoc } from "@/utils/api-wrappers";

export type CardType = "books" | "users" | "orders" | "total"; 
export const getDashboardCards = async (type: CardType) => {
    let res = await getDoc(`/admin/cards/${type}?role=admin`, true); 
    return res?.data || false; 
};

export const getDashboardGraph = async () => {
    let res = await getDoc(`/admin/graph?role=admin`, true); 
    return res?.data || false; 
}

export const getDashboardRequests = async () => {
    let res = await getDoc(`/admin/dash/requests?role=admin`, true);
    return res?.data || false;
}