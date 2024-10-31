import Container from "@/components/container";
import Cards from "./components/cards";
import { ChartComponent } from "./components/graph-container";
import Requests from "./components/requests";

export default function Home() {
  return (
    <Container title="Dashboard">
       <Cards />
       <div className="flex flex-col lg:flex-row gap-2 items-start my-2">
          <ChartComponent />
          <Requests />
       </div>
    </Container>
  );
}
