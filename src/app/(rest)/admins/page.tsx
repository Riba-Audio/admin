import Container from "@/components/utils/container";
import { generateStaticMetadata } from "@/utils/metadata";
import { Metadata } from "next";

export const metadata: Metadata = generateStaticMetadata("Admins", "");

export default function Page() {

    return (
        <Container title="Admins">
            
        </Container>
    )
}