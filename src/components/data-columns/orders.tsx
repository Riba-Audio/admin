import { ColumnDef } from "@tanstack/react-table";
import { BookBanner } from "./books";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { BookInfoType } from "./books"; 

export type UserOrderType = {
    id: string;
    name: string;
}

// export type BookOrderType = {
//     id: string;
//     title: string;
//     banner: string;
// }
export type PaymentOrderType = {
    id: string;
    status: string;
    mode: "MPESA";
    amount: number;
}
export type OrderType = {
    id: string;
    user: UserOrderType;
    book: BookInfoType & {id: string; title: string; published?: string};
    payment: PaymentOrderType;
    completed: number;
    createdAt: string;
};


export const columns: ColumnDef<OrderType>[] = [
    {
        accessorKey: "book",
        header: "",
        cell: (({ row }) => {
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
                <span className="flex flex-col gap-2 max-[250px]">
                    <span className="font-bold text-sm lg:text-md line-clamp-1">{order.book.title}</span>
                    <span className="text-xs lg:text-xs text-gray-500 line-clamp-1">{order.book.author} | {order.book.pages} pages</span>
                     
                </span>
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
        accessorKey: "completed",
        header: "Completed",
        cell: (({ row }) => {
            let order = row.original;

            return (
                <span>{order.completed}%</span>
            )

        })
    },
    {
        accessorKey: "payment",
        header: "Mode",
        cell: (({ row }) => {
            let order = row.original;
            return (
                <span>{order.payment.mode}</span>
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
            let status = order.payment.status.toLowerCase(); 
            return (
                <Badge
                    variant={status === "completed" ? "default" : status === "failed" ? "destructive":  "secondary"}
                    className={cn(status === "completed" ? "bg-green-500" : "")}
                >
                    {status === "completed" ? "Paid" : status}
                </Badge>
            )
        })
    },

]