import { Metadata } from "next";
import { generateStaticMetadata } from "@/utils/metadata";
import Books from "./books";

export const metadata: Metadata = generateStaticMetadata("Books", "");

export default function Page() {
    return  <Books />
}

