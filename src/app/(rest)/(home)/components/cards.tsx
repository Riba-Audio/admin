import { numberWithCommas } from "@/utils/format-numbers"
import DashboardCard from "./dashboard-card"
import { Coins, CreditCard, Library, Users } from "lucide-react"


const Cards = () => {

    return (
        <div className="flex gap-1 flex-wrap flex-col lg:flex-row">
            <DashboardCard 
                title="Total Books"
                value={`${numberWithCommas(4000)}`}
                icon={<Library size={18}/>}
                subtitle="+20% from last month"
            />
            <DashboardCard 
                title="Total Users"
                value={`${numberWithCommas(4000)}`}
                icon={<Users size={18}/>}
                subtitle="+15% from last month"
            />
            <DashboardCard 
                title="Total Orders"
                value={`${numberWithCommas(40000)}`}
                icon={<CreditCard size={18}/>}
                subtitle="+10% from last month"
            />
            <DashboardCard 
                title="Total Earned"
                value={`KES: ${numberWithCommas(400000)}`}
                icon={<Coins size={18}/>}
                subtitle="+120% from last month"
            />
        </div>
    )
};

export default Cards; 