// calender component
"use client";

import { Calendar } from "@/components/ui/calendar"


interface CalendarCardProps {
    date: Date | undefined;
    setDate: React.Dispatch<Date | undefined>;
}

const CalendarCard: React.FC<CalendarCardProps> = ({ date, setDate }) => {

    return (
        <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border w-full"
           style={{width: "100%"}}
        />
    )
};

export default CalendarCard; 