import { Metadata } from "next";
import Requests from "./components/requests";
import { generateStaticMetadata } from "@/utils/metadata";
export const metadata: Metadata = generateStaticMetadata("Requests", "");

const Page = () => <Requests />;

export default Page; 