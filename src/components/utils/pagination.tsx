import useMounted from "@/hooks/useMounted";
import { createArray } from "@/utils/format-numbers";
import React from "react";
import { Button } from "../ui/button";
import { useSearch } from "@/hooks/useSearchParams";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface PaginationProps {
    count: number; 
    limit: number; 
    perPage: number; 
    currentTotal: number; 
    // section: number; 
}

const Pagination: React.FC<PaginationProps> = (
    {count, limit, perPage, currentTotal}
) => {
    const [pages, setPages] = React.useState<number[]>([]); 

    const mounted = useMounted(); 
    const params = useSearch(); 
    const {push} = useRouter(); 
    const pathname = usePathname(); 

    const page = Number(params?.get("page") || 0); 
    const section = Number(params?.get("section") || 0); 

    React.useEffect(() => {
        if (!mounted) return; 
        let _ = Math.ceil(currentTotal/perPage); 
        setPages(createArray(_ + 1))
    }, [mounted, page])

    const handleNavigatePage = (dir: "prev" | "next") => {
        let val = page; 
        if (dir === "prev") val = val - 1; 
        if (dir === "next") val = val + 1; 

        push(`${pathname}?page=${val}`)
    }
    const handleMoveToSection = (section: number) => {
        push(`${pathname}?page=${page}&section=${section}`)
    }
    return (
        <>
            {
                pages.length > 1 && (
                    <div className="my-2 flex justify-center gap-2">
                        {
                            page !== 0 && (
                                <Button variant="ghost" size="sm" onClick={() => handleNavigatePage("prev")}>
                                    <ChevronLeft size={19}/>
                                </Button>
                            )
                        }
                        {
                            pages.map((_, index) => (
                                <Button
                                    key={index}
                                    variant={index === (section) ? "secondary": "ghost"}
                                    size="sm"
                                    onClick={() => handleMoveToSection(index)}
                                >
                                    {index + 1}
                                </Button>
                            ))
                        }
                        {
                            ((page + 1) * (limit)) < count && (
                                <Button variant="ghost" size="sm" onClick={() => handleNavigatePage("next")}>
                                    <ChevronRight size={18}/>
                                </Button>
                            )
                        }
                    </div>
                )
            }
        </>
    )
}

export default Pagination; 