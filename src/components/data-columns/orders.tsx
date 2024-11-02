import { ColumnDef } from "@tanstack/react-table";
import { BookBanner } from "./books";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";

export type UserOrderType = {
    id: string; 
    name: string; 
}

export type BookOrderType = {
    id: string; 
    title: string; 
    banner: string; 
}
export type PaymentOrderType = {
    id: string; 
    status: string; 
    amount: number; 
}
export type OrderType = {
    id: string; 
    user: UserOrderType; 
    book: BookOrderType; 
    payment: PaymentOrderType; 
    createdAt: string; 
};


export const columns: ColumnDef<OrderType>[] = [
    {
        accessorKey: "book",
        header: "",
        cell: (({ row}) => {
            let order = row.original; 

            return (
                <BookBanner 
                    src={order.book.banner}
                    title={order.book.title}
                />
            )
        })
    },
    {
        accessorKey: "book",
        header: "Title",
        cell: (({ row }) => {
            let order = row.original;
            return (
                <span>{order.book.title}</span>
            )
        })
    },
    {
        accessorKey: "user",
        header: "User",
        cell: (({ row }) => {
            let order = row.original; 

            return (
                <span>{order.user.name}</span>
            )

        })
    },
    {
        accessorKey: "payment", 
        header: "Amount",
        cell: (({ row }) => {
            let order = row.original; 
            return (
                <span>KES: {order.payment.amount}</span>
            )
        })
    },
    {
        accessorKey: "createdAt", 
        header: "Created",
        cell: (({ row }) => <span>{dayjs(new Date(row.getValue("createdAt"))).format("DD MMM, YYYY")}</span>)
    },
    {
        accessorKey: "payment", 
        header: "Status",
        cell: (({ row }) => {
            let order = row.original; 

            return (
                <Badge 
                    className={
                        cn(order.payment.status === "completed" ? "bg-green-500": "")
                    }
                >
                    {order.payment.status}
                </Badge>
        )})
    },
    
]