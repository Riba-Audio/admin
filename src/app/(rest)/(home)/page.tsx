import Container from "@/components/utils/container";
import Cards from "./components/cards";
import { ChartComponent } from "./components/graph-container";
import Requests from "./components/requests";
import { generateStaticMetadata } from "@/utils/metadata";
import { Metadata } from "next";
import AppVersion from "./components/app-version";

export const metadata: Metadata = generateStaticMetadata("Dashboard", "");


export default function Home() {
  return (
    <Container title="Dashboard">
       <Cards />
       <div className="flex-1 flex flex-col lg:flex-row gap-2 items-start my-2">
          <ChartComponent height={"h-[calc(70vh-70px)]"}/>
          <div>
            <AppVersion />
            <Requests />
          </div>
       </div>
    </Container>
  );
}
