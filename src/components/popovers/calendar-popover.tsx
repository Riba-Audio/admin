import dayjs from "dayjs"
import { Card } from "../ui/card"
import { Paragraph } from "../ui/typography"
import PopoverContainer from "./container"
import CalendarCard from "../utils/calender";

const CalendarPopover = (
    {date, setDate}: 
    {date: Date | undefined; setDate: React.Dispatch<Date | undefined>}
) => {

    return (
        <PopoverContainer
            trigger={
                <Card className="flex items-center px-3 py-1 w-[200px] rounded-sm h-[38px]">
                    <Paragraph>{date ? dayjs(date).format("MMM YYYY"): "Publishing date"}</Paragraph>
                </Card>
            }
            contentClassName="p-0 border-none w-fit ml-10"
        >
            <CalendarCard
                date={date}
                setDate={setDate}
            />
        </PopoverContainer>
    )
};

export default CalendarPopover; 