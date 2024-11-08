import { Metadata } from "next";
import Categories from "./components/categories";
import { generateStaticMetadata } from "@/utils/metadata";
export const metadata: Metadata = generateStaticMetadata("Categories", "");

const Page = () => <Categories />;

export default Page; 