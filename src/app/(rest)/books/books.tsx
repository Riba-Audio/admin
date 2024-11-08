"use client";
import React from "react";
import { Plus } from "lucide-react";

import AddButton from "@/components/utils/add";
import AppInput from "@/components/common/app-input";
import Container from "@/components/utils/container";
import { BookType, columns } from "@/components/data-columns/books";
import { Button } from "@/components/ui/button";

import { usePathname, useRouter } from "next/navigation";
import useMounted from "@/hooks/useMounted";
import { getBooks } from "@/lib/api-calls/books";
import { useCustomEffect } from "@/hooks/useEffect";
import PaginatedDataTable from "@/components/utils/paginated-data-table";
import { useSearch } from "@/hooks/useSearchParams";

const Books = () => {
    const mounted = useMounted();
    const searchParams = useSearch(); 

    const { push } = useRouter();
    const page = Number(searchParams?.get("page") || 0); 
    const q = searchParams?.get("q") || ""; 

    const [loading, setLoading] = React.useState<boolean>(true);
    const [books, setBooks] = React.useState<BookType[]>([]);
    const [count, setCount] = React.useState<number>(0);
    const [search, setSearch] = React.useState<string>("");

    React.useEffect(() => {
        if (!mounted || !q) return; 
        setSearch(q); 

    }, [mounted, q])

    const fetchBooks = async () => {
        if (!mounted) return;
        setLoading(true)
        let res = await getBooks(page, q);

        if (res) {
            setBooks(res.docs);
            setCount(res.count);
        }
        setLoading(false)
    }

    useCustomEffect(fetchBooks, [mounted, page, q])
    return (
        <Container
            title="Books"
            subtitle={`Found - ${count} books`}
            headerComponent={
                <AddButton>
                    <AppInput
                        value={search}
                        setValue={setSearch}
                        placeholder={"Search book..."}
                        containerClassName="rounded-full min-w-[250px] lg:min-w-[350px]"
                        onKeyUp={(str: string | number) => {
                            if (str) push(`/books?page=0&q=${str}`)
                            else push(`/books?page=${page}`)
                        }}
                    />
                    <Button
                        className="items-center gap-2 rounded-full"
                        size="icon"
                        onClick={() => push("/books/new")}
                    >
                        <Plus size={17} />
                    </Button>
                </AddButton>
            }
        >
            <PaginatedDataTable
                loading={loading}
                data={books}
                columns={columns}
                count={count}
                limit={40}
            />
        </Container>
    )
};

export default Books; 