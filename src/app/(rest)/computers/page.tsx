import { Metadata } from "next";
import Computers from "./components/computers";
import { generateStaticMetadata } from "@/utils/metadata";
export const metadata: Metadata = generateStaticMetadata("Computers", "");

const Page = () => <Computers />;

export default Page; 