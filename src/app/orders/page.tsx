"use client"; 

import React from "react";
import AddButton from "@/components/add";
import AppInput from "@/components/common/app-input";
import Container from "@/components/container";
import { columns, OrderType } from "@/components/data-columns/orders";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";


export default function Page() {
    const [loading, setLoading] = React.useState<boolean>(true);
    const [orders, setOrders] = React.useState<OrderType[]>([...dummy_orders]);
    const [count, setCount] = React.useState<number>(0);

    const [search, setSearch] = React.useState<string>("");
    return (
        <Container title="Orders">
            <AddButton>
                <AppInput
                    value={search}
                    setValue={setSearch}
                    placeholder={"Search order..."}
                    containerClassName="rounded-full min-w-[200px]"
                />
            </AddButton>
            <Card className="my-3">
                <DataTable columns={columns} data={orders} />
            </Card>
        </Container>
    )
}

const dummy_orders: OrderType[] = [
    {
        id: "ord1",
        user: {
            id: "user1",
            name: "Alice Smith",
        },
        book: {
            id: "1",
            title: "The Great Gatsby",
            banner: "path/to/gatsby/banner.jpg"
        },
        payment: {
            id: "pay1",
            status: "Completed",
            amount: 500,
            mode: "MPESA"
        },
        completed: 50,
        createdAt: "2023-10-01"
    },
    {
        id: "ord2",
        user: {
            id: "user2",
            name: "Bob Johnson",
        },
        book: {
            id: "2",
            title: "To Kill a Mockingbird",
            banner: "path/to/mockingbird/banner.jpg"
        },
        payment: {
            id: "pay2",
            status: "Pending",
            amount: 500,
            mode: "MPESA"
        },
        completed: 50,
        createdAt: "2023-10-02"
    },
    {
        id: "ord3",
        user: {
            id: "user3",
            name: "Charlie Brown",
        },
        book: {
            id: "3",
            title: "1984",
            banner: "path/to/1984/banner.jpg"
        },
        payment: {
            id: "pay3",
            status: "Completed",
            amount: 500,
            mode: "MPESA"
        },
        completed: 50,
        createdAt: "2023-10-03"
    },
    {
        id: "ord4",
        user: {
            id: "user4",
            name: "Diana Prince",
        },
        book: {
            id: "4",
            title: "Moby Dick",
            banner: "path/to/mobydick/banner.jpg"
        },
        payment: {
            id: "pay4",
            status: "Failed",
            amount: 500,
            mode: "MPESA"
        },
        completed: 50,
        createdAt: "2023-10-04"
    },
    {
        id: "ord5",
        user: {
            id: "user5",
            name: "Edward Nygma",
        },
        book: {
            id: "5",
            title: "Pride and Prejudice",
            banner: "path/to/prideandprejudice/banner.jpg"
        },
        payment: {
            id: "pay5",
            status: "Completed",
            amount: 500,
            mode: "MPESA"
        },
        completed: 50,
        createdAt: "2023-10-05"
    },
    {
        id: "ord6",
        user: {
            id: "user6",
            name: "Fiona Gallagher",
        },
        book: {
            id: "6",
            title: "The Catcher in the Rye",
            banner: "path/to/catcher/banner.jpg"
        },
        payment: {
            id: "pay6",
            status: "Completed",
            amount: 500,
            mode: "MPESA"
        },
        completed: 50,
        createdAt: "2023-10-06"
    },
    {
        id: "ord7",
        user: {
            id: "user7",
            name: "George Lucas",
        },
        book: {
            id: "7",
            title: "The Hobbit",
            banner: "path/to/hobbit/banner.jpg"
        },
        payment: {
            id: "pay7",
            status: "Pending",
            amount: 500,
            mode: "MPESA"
        },
        completed: 50,
        createdAt: "2023-10-07"
    },
    {
        id: "ord8",
        user: {
            id: "user8",
            name: "Hannah Baker",
        },
        book: {
            id: "8",
            title: "Fahrenheit 451",
            banner: "path/to/fahrenheit/banner.jpg"
        },
        payment: {
            id: "pay8",
            status: "Completed",
            amount: 500,
            mode: "MPESA"
        },
        completed: 50,
        createdAt: "2023-10-08"
    },
    {
        id: "ord9",
        user: {
            id: "user9",
            name: "Isaac Newton",
        },
        book: {
            id: "9",
            title: "Brave New World",
            banner: "path/to/bravenewworld/banner.jpg"
        },
        payment: {
            id: "pay9",
            status: "Failed",
            amount: 500,
            mode: "MPESA"
        },
        completed: 50,
        createdAt: "2023-10-09"
    },
    {
        id: "ord10",
        user: {
            id: "user10",
            name: "Jack Sparrow",
        },
        book: {
            id: "10",
            title: "The Picture of Dorian Gray",
            banner: "path/to/doriangray/banner.jpg"
        },
        payment: {
            id: "pay10",
            status: "Completed",
            amount: 500,
            mode: "MPESA"
        },
        completed: 50,
        createdAt: "2023-10-10"
    },
    {
        id: "ord11",
        user: {
            id: "user11",
            name: "Luna Lovegood",
        },
        book: {
            id: "11",
            title: "The Alchemist",
            banner: "path/to/alchemist/banner.jpg"
        },
        payment: {
            id: "pay11",
            status: "Completed",
            amount: 500,
            mode: "MPESA"
        },
        completed: 50,
        createdAt: "2023-10-11"
    },
    {
        id: "ord12",
        user: {
            id: "user12",
            name: "Mike Wazowski",
        },
        book: {
            id: "12",
            title: "The Kite Runner",
            banner: "path/to/kiterunner/banner.jpg"
        },
        payment: {
            id: "pay12",
            status: "Pending",
            amount: 500,
            mode: "MPESA"
        },
        completed: 50,
        createdAt: "2023-10-12"
    },
    {
        id: "ord13",
        user: {
            id: "user13",
            name: "Nina Simone",
        },
        book: {
            id: "13",
            title: "The Road",
            banner: "path/to/road/banner.jpg"
        },
        payment: {
            id: "pay13",
            status: "Completed",
            amount: 500,
            mode: "MPESA"
        },
        completed: 50,
        createdAt: "2023-10-13"
    },
    {
        id: "ord14",
        user: {
            id: "user14",
            name: "Oscar Wilde",
        },
        book: {
            id: "14",
            title: "Sapiens: A Brief History of Humankind",
            banner: "path/to/sapiens/banner.jpg"
        },
        payment: {
            id: "pay14",
            status: "Completed",
            amount: 500,
            mode: "MPESA"
        },
        completed: 50,
        createdAt: "2023-10-14"
    },
    {
        id: "ord15",
        user: {
            id: "user15",
            name: "Pablo Picasso",
        },
        book: {
            id: "15",
            title: "Educated",
            banner: "path/to/educated/banner.jpg"
        },
        payment: {
            id: "pay15",
            status: "Failed",
            amount: 500,
            mode: "MPESA"
        },
        completed: 50,
        createdAt: "2023-10-15"
    },
    {
        id: "ord16",
        user: {
            id: "user16",
            name: "Quentin Tarantino",
        },
        book: {
            id: "16",
            title: "Where the Crawdads Sing",
            banner: "path/to/crawdads/banner.jpg"
        },
        payment: {
            id: "pay16",
            status: "Pending",
            amount: 500,
            mode: "MPESA"
        },
        completed: 50,
        createdAt: "2023-10-16"
    },
    {
        id: "ord17",
        user: {
            id: "user17",
            name: "Rachel Green",
        },
        book: {
            id: "17",
            title: "Becoming",
            banner: "path/to/becoming/banner.jpg"
        },
        payment: {
            id: "pay17",
            status: "Completed",
            amount: 500,
            mode: "MPESA"
        },
        completed: 50,
        createdAt: "2023-10-17"
    },
    {
        id: "ord18",
        user: {
            id: "user18",
            name: "Steve Jobs",
        },
        book: {
            id: "18",
            title: "The Silent Patient",
            banner: "path/to/silentpatient/banner.jpg"
        },
        payment: {
            id: "pay18",
            status: "Completed",
            amount: 500,
            mode: "MPESA"
        },
        completed: 50,
        createdAt: "2023-10-18"
    },
    {
        id: "ord19",
        user: {
            id: "user19",
            name: "Tina Fey",
        },
        book: {
            id: "19",
            title: "Circe",
            banner: "path/to/circe/banner.jpg"
        },
        payment: {
            id: "pay19",
            status: "Pending",
            amount: 500,
            mode: "MPESA"
        },
        completed: 50,
        createdAt: "2023-10-19"
    },
    {
        id: "ord20",
        user: {
            id: "user20",
            name: "Usain Bolt",
        },
        book: {
            id: "20",
            title: "The Vanishing Half",
            banner: "path/to/vanishinghalf/banner.jpg"
        },
        payment: {
            id: "pay20",
            status: "Completed",
            amount: 500,
            mode: "MPESA"
        },
        completed: 50,
        createdAt: "2023-10-20"
    }
];
