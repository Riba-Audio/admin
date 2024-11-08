export type SectionType = {
    title: string;
    text: string;
    processed: boolean;
    processing?: boolean;
    duration?: number;
    file_key?: string;
    size?: number;
}
export type BookInfoType = {
    author: string;
    banner: string;
    pages: number;
    published: string;
}

export type BookType = {
    id: string;
    title: string;
    info: BookInfoType;
    category: string;
    blurb: string;
    listed: boolean;
    amount: number;
    key: string;
    ratingsAverage: number;
    ratingsQuantity: number;
    createdAt: string;
    slug: string;
    voice: string;
    views: number;
    duration: number;
    sections: SectionType[];
}