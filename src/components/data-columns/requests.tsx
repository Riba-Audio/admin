import { ColumnDef } from "@tanstack/react-table";
import { UserOrderType } from "./orders";
import dayjs from "dayjs";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";


export type RequestType = {
    id: string; 
    user: UserOrderType; 
    book: string; 
    author: string; 
    listed: boolean; 
    createdAt: string; 
};


export const columns: ColumnDef<RequestType>[]  = [
    {
        accessorKey: "user",
        header: "User",
        cell: (({ row }) => <span>{row.original.user?.name || ""}</span>)
    },
    {
        accessorKey: "book",
        header: "Book"
    },
    {
        accessorKey: "author",
        header: "Author"
    },
    {
        accessorKey: "createdAt",
        header: "Created",
        cell: (({ row }) => <span>{dayjs(new Date(row.getValue("createdAt"))).format("DD MMM, YYYY")}</span>)
    },
    {
        accessorKey: "listed",
        header: "Listed",
        cell: (({ row }) => {
            let request = row.original; 

            let status = request.listed ? "Yes": "No"; 

            return (
                <Badge
                    className={cn(status === "Yes" ? "bg-green-500": "")}
                >
                    {status}
                </Badge>
            )
        })
    }
]