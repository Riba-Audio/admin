import { Metadata } from "next";
import Orders from "./components/orders";
import { generateStaticMetadata } from "@/utils/metadata";
export const metadata: Metadata = generateStaticMetadata("Orders", "");

const Page = () => <Orders />;

export default Page; 