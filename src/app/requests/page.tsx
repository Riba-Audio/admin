"use client"; 
import AddButton from "@/components/add";
import AppInput from "@/components/common/app-input";
import Container from "@/components/container";
import { columns, RequestType } from "@/components/data-columns/requests";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import React from "react";


export default function Page() {
    const [loading, setLoading] = React.useState<boolean>(true);
    const [requests, setRequests] = React.useState<RequestType[]>([...dummy_requests]);
    const [count, setCount] = React.useState<number>(0);

    const [search, setSearch] = React.useState<string>("");

    return (
        <Container title="Requests">
            <AddButton>
                <AppInput
                    value={search}
                    setValue={setSearch}
                    placeholder={"Search request..."}
                    containerClassName="rounded-full min-w-[200px]"
                />

            </AddButton>
            <Card className="my-3 ">
                <DataTable columns={columns} data={requests} />
            </Card>
        </Container>
    )
}

const dummy_requests: RequestType[] = [
    {
        id: "req-001",
        user: { id: "user-001", name: "Alice Johnson" },
        book: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        listed: true,
        createdAt: "2024-10-01T12:00:00Z"
    },
    {
        id: "req-002",
        user: { id: "user-002", name: "Bob Smith" },
        book: "1984",
        author: "George Orwell",
        listed: false,
        createdAt: "2024-10-02T13:00:00Z"
    },
    {
        id: "req-003",
        user: { id: "user-003", name: "Charlie Brown" },
        book: "To Kill a Mockingbird",
        author: "Harper Lee",
        listed: true,
        createdAt: "2024-10-03T14:00:00Z"
    },
    {
        id: "req-004",
        user: { id: "user-004", name: "Diana Prince" },
        book: "Pride and Prejudice",
        author: "Jane Austen",
        listed: false,
        createdAt: "2024-10-04T15:00:00Z"
    },
    {
        id: "req-005",
        user: { id: "user-005", name: "Edward Norton" },
        book: "The Catcher in the Rye",
        author: "J.D. Salinger",
        listed: true,
        createdAt: "2024-10-05T16:00:00Z"
    },
    {
        id: "req-006",
        user: { id: "user-006", name: "Fiona Gallagher" },
        book: "Brave New World",
        author: "Aldous Huxley",
        listed: false,
        createdAt: "2024-10-06T17:00:00Z"
    },
    {
        id: "req-007",
        user: { id: "user-007", name: "George Lucas" },
        book: "Moby Dick",
        author: "Herman Melville",
        listed: true,
        createdAt: "2024-10-07T18:00:00Z"
    },
    {
        id: "req-008",
        user: { id: "user-008", name: "Hannah Baker" },
        book: "War and Peace",
        author: "Leo Tolstoy",
        listed: false,
        createdAt: "2024-10-08T19:00:00Z"
    },
    {
        id: "req-009",
        user: { id: "user-009", name: "Isaac Asimov" },
        book: "Foundation",
        author: "Isaac Asimov",
        listed: true,
        createdAt: "2024-10-09T20:00:00Z"
    },
    {
        id: "req-010",
        user: { id: "user-010", name: "Jessica Jones" },
        book: "The Hobbit",
        author: "J.R.R. Tolkien",
        listed: false,
        createdAt: "2024-10-10T21:00:00Z"
    },
    {
        id: "req-011",
        user: { id: "user-011", name: "Kevin Hart" },
        book: "The Alchemist",
        author: "Paulo Coelho",
        listed: true,
        createdAt: "2024-10-11T22:00:00Z"
    },
    {
        id: "req-012",
        user: { id: "user-012", name: "Laura Croft" },
        book: "The Picture of Dorian Gray",
        author: "Oscar Wilde",
        listed: false,
        createdAt: "2024-10-12T23:00:00Z"
    },
    {
        id: "req-013",
        user: { id: "user-013", name: "Mike Wazowski" },
        book: "Crime and Punishment",
        author: "Fyodor Dostoevsky",
        listed: true,
        createdAt: "2024-10-13T12:30:00Z"
    },
    {
        id: "req-014",
        user: { id: "user-014", name: "Nina Williams" },
        book: "The Brothers Karamazov",
        author: "Fyodor Dostoevsky",
        listed: false,
        createdAt: "2024-10-14T13:30:00Z"
    },
    {
        id: "req-015",
        user: { id: "user-015", name: "Oliver Twist" },
        book: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        listed: true,
        createdAt: "2024-10-15T14:30:00Z"
    },
    {
        id: "req-016",
        user: { id: "user-016", name: "Paula Abdul" },
        book: "A Tale of Two Cities",
        author: "Charles Dickens",
        listed: false,
        createdAt: "2024-10-16T15:30:00Z"
    },
    {
        id: "req-017",
        user: { id: "user-017", name: "Quentin Tarantino" },
        book: "The Grapes of Wrath",
        author: "John Steinbeck",
        listed: true,
        createdAt: "2024-10-17T16:30:00Z"
    },
    {
        id: "req-018",
        user: { id: "user-018", name: "Rachel Green" },
        book: "The Hitchhiker's Guide to the Galaxy",
        author: "Douglas Adams",
        listed: false,
        createdAt: "2024-10-18T17:30:00Z"
    },
    {
        id: "req-019",
        user: { id: "user-019", name: "Steve Rogers" },
        book: "Fahrenheit 451",
        author: "Ray Bradbury",
        listed: true,
        createdAt: "2024-10-19T18:30:00Z"
    },
    {
        id: "req-020",
        user: { id: "user-020", name: "Tony Stark" },
        book: "The Da Vinci Code",
        author: "Dan Brown",
        listed: false,
        createdAt: "2024-10-20T19:30:00Z"
    }
];
