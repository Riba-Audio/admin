"use client";
import React from "react";
import { createArray } from "@/utils/format-numbers";
import { Card } from "../ui/card";
import { DataTable } from "../ui/data-table";
import { Skeleton } from "../ui/skeleton";
import useMounted from "@/hooks/useMounted";
import { useSearch } from "@/hooks/useSearchParams";
import Pagination from "./pagination";


interface PaginatedDataTableProps {
    loading: boolean; 
    data: any; 
    columns: any; 
    count: number; 
    perPage?: number; 
    limit: number; 
}


const PaginatedDataTable: React.FC<PaginatedDataTableProps> = (
    {loading, data, columns, count, limit, perPage = 10}
) => {
    const [currentData, setCurrentData] = React.useState<any>([])
    const mounted = useMounted(); 
    const params = useSearch(); 
    const section = Number(params?.get("section") || 0); 

    React.useEffect(() => {
        if (!mounted) return; 
        let start = section * perPage; 
        let items = data.slice(start, start + perPage); 
        setCurrentData(items); 

    }, [mounted, section, data]);

    return (
        <Card className="my-3">
            {
                loading && <DataTableSkeleton />
            }
            {
                !loading && (
                    <>
                        <DataTable columns={columns} data={currentData} />
                        {/* pagination */}
                        <Pagination 
                            count={count}
                            perPage={perPage}
                            limit={limit}
                            currentTotal={data.length}
                        />
                    </>
                )
            }
        </Card>
    )
}

export default PaginatedDataTable; 

const DataTableSkeleton = () => (
    <div className="px-2 py-5">
        {
            createArray(15).map((_, index) => (
                <div className="my-2 grid grid-cols-4 lg:grid-cols-8 gap-2" key={index}>
                    {
                        createArray(9).map((_, ind) => (
                            <Skeleton 
                                key={ind}
                                className="flex-1 h-[15px] rounded-full"
                            />
                        ))
                    }
                </div>
            ))
        }
    </div>
)