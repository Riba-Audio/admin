import Container from "@/components/utils/container";
import Cards from "./components/cards";
import { ChartComponent } from "./components/graph-container";
import Requests from "./components/requests";

export default function Home() {
  return (
    <Container title="Dashboard">
       <Cards />
       <div className="flex-1 flex flex-col lg:flex-row gap-2 items-start my-2">
          <ChartComponent height={"h-[calc(70vh-70px)]"}/>
          <Requests />
       </div>
    </Container>
  );
}
