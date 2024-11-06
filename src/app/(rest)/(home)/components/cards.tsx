"use client"; 

import { numberWithCommas } from "@/utils/format-numbers"
import DashboardCard from "./dashboard-card"
import { Coins, CreditCard, Library, Users } from "lucide-react"
import React from "react";
import { getDashboardCards } from "@/lib/api-calls/dashboard";
import { useCustomEffect } from "@/hooks/useEffect";


const Cards = () => {
    type CType = {count: number; diff: number}; 
    let def: CType = {count: 0, diff: 0}; 

    const [mounted, setMounted] = React.useState<boolean>(false); 
    const [books, setBooks] = React.useState<CType>(def);
    const [users, setUsers] = React.useState<CType>(def); 
    const [orders, setOrders] = React.useState<CType>(def);
    const [total, setTotal] = React.useState<CType>(def); 

    React.useEffect(() => setMounted(true), []); 
    const fetchCards = async () => {
        if (!mounted) return; 
         
        try {
            const [bookRes, userRes, orderRes, totalRes] = await Promise.all([
                getDashboardCards("books"),
                getDashboardCards("users"),
                getDashboardCards("orders"),
                getDashboardCards("total")
            ]);
            
            if (bookRes) setBooks(bookRes);
            if (userRes) setUsers(userRes); 
            if (orderRes) setOrders(orderRes);
            if (totalRes) setTotal(totalRes)
            
        } catch (error) { }
    }
    useCustomEffect(fetchCards, [mounted]);
    const getPercentage = (count: number, diff: number) => (
        Math.ceil((count - diff)/count * 100)
    )
    return (
        <div className="flex gap-1 flex-wrap flex-col lg:flex-row">
            <DashboardCard 
                title="Total Books"
                value={`${numberWithCommas(books.count)}`}
                icon={<Library size={18}/>}
                subtitle={`${getPercentage(books.count, books.diff)}% from last month`}
            />
            <DashboardCard 
                title="Total Users"
                value={`${numberWithCommas(users.count)}`}
                icon={<Users size={18}/>}
                subtitle={`${getPercentage(users.count, users.diff)}% from last month`}
            />
            <DashboardCard 
                title="Total Orders"
                value={`${numberWithCommas(orders.count)}`}
                icon={<CreditCard size={18}/>}
                subtitle={`${getPercentage(orders.count, orders.diff)}% from last month`}
            />
            <DashboardCard 
                title="Total Earned"
                value={`KES: ${numberWithCommas(total.count)}`}
                icon={<Coins size={18}/>}
                subtitle={`${getPercentage(total.count, total.diff)}% from last month`}
            />
        </div>
    )
};

export default Cards; 