 
import Book from "./book";
import { getBookUnauthorized } from "@/lib/api-calls/books";
import type { Metadata, ResolvingMetadata } from 'next'
 
type Props = {
    params: Promise<{ bookId: string }>
    //   searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const bookId = (await params).bookId
    // fetch data
    let book = bookId === "new" ? null: await getBookUnauthorized(bookId)
    const title = book || "New Book";
    return {
        title,
    }
}


const Page = ({params}: {params: {bookId: string}}) => {

    return <Book params={params}/>
};

export default Page; 