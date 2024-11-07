import { SquarePen } from "lucide-react";
import { BookInfoType } from "../data-columns/books";
import SheetContainer from "./container";
import BookForm from "../forms/book";
import { cn } from "@/lib/utils";


interface BookFormSheetProps {
    id: string;
    title: string;
    setTitle: React.Dispatch<string>;
    voice: string;
    setVoice: React.Dispatch<string>;
    info: BookInfoType | undefined;
    setInfo: React.Dispatch<BookInfoType | undefined>;
    blurb: string;
    setBlurb: React.Dispatch<string>;
    amount?: number;
    setAmount?: React.Dispatch<number>;
    category: string;
    setCategory: React.Dispatch<string>;
    loading: boolean; 
};


const BookFormSheet: React.FC<BookFormSheetProps> = (
    {
        id, title, setTitle, voice,
        setVoice, info, setInfo, blurb,
        setBlurb, amount, setAmount, category, setCategory, loading
    }
) => {

    return (
        <SheetContainer
            trigger={
                <span 
                    className={cn(loading ? "cursor-not-allowed": "cursor-pointer hover:text-secondary-color hover:bg-secondary", "block w-8 h-8 p-2" )}
                    onClick={loading ? (e) =>  {e.preventDefault(); e.stopPropagation()}: () => {}}
                >
                    <SquarePen size={18} />
                </span>
            }
            width="min-w-[60vw]"
            title={title}
        >
            <BookForm
                id={id}
                title={title}
                setTitle={setTitle}
                voice={voice}
                setVoice={setVoice}
                info={info}
                setInfo={setInfo}
                blurb={blurb}
                setBlurb={setBlurb}
                amount={amount}
                setAmount={setAmount}
                category={category}
                setCategory={setCategory}
            />
        </SheetContainer>
    )
};

export default BookFormSheet; 