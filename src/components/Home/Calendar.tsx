import dayjs, { Dayjs } from "dayjs";
import { useMemo, useState } from "react";
import { ReactComponent as Arrow } from "@/assets/svgs/arrow-left.svg";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

import cn from "../../util/cn";
import { generateDate, months } from "@/util/generateDate";

type CalendarProps = {
    changeDate: (date: Dayjs) => void;
    selectedDate: { startDate: Dayjs | string; endDate: Dayjs | string };
    currentDate: Dayjs;
};

const Calendar = ({ changeDate, selectedDate, currentDate }: CalendarProps) => {
    const days = ["Пон", "Вт", "Ср", "Чт", "Пт", "Сб", "Нед"];

    const [today, setToday] = useState(() =>
        dayjs(selectedDate.startDate).isValid()
            ? dayjs(selectedDate.startDate)
            : currentDate
    );

    // Use useMemo to optimize performance
    const generatedDates = useMemo(
        () => generateDate(today.month(), today.year()),
        [today]
    );

    return (
        <div className="w-72 text-[#0e381e] text-[15px] font-medium leading-5">
            <div className="flex justify-between">
                <h1>
                    {months[today.month()]} {today.year()}
                </h1>
                <div className="flex gap-2">
                    <button
                        onClick={() => setToday(today.subtract(1, "month"))}
                        className="p-1.5 border border-[#19ad52] rounded-md"
                    >
                        <Arrow />
                    </button>
                    <button
                        onClick={() => setToday(today.add(1, "month"))}
                        className="p-1.5 border border-[#19ad52] rounded-md"
                    >
                        <Arrow className="rotate-180" />
                    </button>
                </div>
            </div>
            <div className="grid w-full grid-cols-7 text-gray-500 dark:text-gray-50">
                {days.map((day, index) => (
                    <div key={index} className="grid h-14 place-content-center">
                        <h1>{day}</h1>
                    </div>
                ))}
            </div>
            <div className="grid w-full grid-cols-7 overflow-hidden rounded-xl">
                {generatedDates.map(
                    ({ date, currentMonth, today: isToday }, index) => {
                        const isStart =
                            dayjs(selectedDate.startDate).isValid() &&
                            dayjs(selectedDate.startDate).isSame(date, "day");

                        const isEnd =
                            dayjs(selectedDate.endDate).isValid() &&
                            dayjs(selectedDate.endDate).isSame(date, "day");

                        const isBetween =
                            dayjs(selectedDate.startDate).isValid() &&
                            dayjs(selectedDate.endDate).isValid() &&
                            dayjs(date).isBetween(
                                selectedDate.startDate,
                                selectedDate.endDate,
                                "day",
                                "[]"
                            );

                        return (
                            <div
                                key={index}
                                className="grid h-10 place-content-center"
                            >
                                <span
                                    className={cn(
                                        "grid h-8 w-8 cursor-pointer place-content-center rounded-lg transition-all hover:bg-black hover:text-white",
                                        !currentMonth && "text-gray-400",
                                        isToday ? "text-red-500" : "",
                                        (isStart || isEnd) &&
                                            "bg-[#19ad52] !text-white",
                                        isBetween && "bg-[#19ad52] text-white"
                                    )}
                                    onClick={() => changeDate(date)}
                                >
                                    {date.date()}
                                </span>
                            </div>
                        );
                    }
                )}
            </div>
        </div>
    );
};

export default Calendar;
