// dashboard card 

import { Card } from "@/components/ui/card"
import { Heading3, Heading4, Paragraph } from "@/components/ui/typography";

interface DashboardCardProps {
    title: string; 
    value: string; 
    subtitle?: string; 
    icon: React.ReactNode; 
}

const DashboardCard: React.FC<DashboardCardProps> = (
    {title, value, subtitle, icon}
) => {

    return (
        <Card className="py-3 p-2 flex flex-col justify-center gap-1 min-w-[190px] min-h-[110px] rounded-md">
            <div className="flex items-center justify-between">
                <Heading3 className="text-sm lg:text-sm">{title}</Heading3>
                {icon}
            </div>
            <Heading4 className="text-md lg:text-lg">{value}</Heading4>
            {
                subtitle && (
                    <Paragraph className="text-xs lg:text-xs text-gray-500">{subtitle}</Paragraph>
                )
            }
        </Card>
    )
};

export default DashboardCard; 