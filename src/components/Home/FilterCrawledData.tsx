import { ReactComponent as V2 } from "@/assets/svgs/V2.svg";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Calendar from "./Calendar";
import dayjs, { Dayjs } from "dayjs";
import SourceList from "./SourceList";
import { useSearchParams } from "react-router-dom";

type FilterCrawledDataProps = {
    updateParams: (filters: {
        dateBefore: string;
        dateAfter: string;
        sourceId: string;
    }) => void;
};

const FilterCrawledData = ({ updateParams }: FilterCrawledDataProps) => {
    const [searchParams, setSearchParams] = useSearchParams();

    // Get filters from the URL
    const initialDateBefore = searchParams.get("dateBefore") || "";
    const initialDateAfter = searchParams.get("dateAfter") || "";
    const initialSourceId = searchParams.get("sourceId") || "";
    const initialDateExact = searchParams.get("dateExact") || "";

    // State for the filter dropdown
    const [showFilters, setShowFilters] = useState(false);

    // State for selected source
    const [selectedSource, setSelectedSource] = useState<string | undefined>(
        initialSourceId || undefined
    );

    // Reference for focus handling
    const filterRef = useRef<HTMLDivElement>(null);

    // State for the selected date range
    const [selectedDate, setSelectedDate] = useState<{
        startDate: Dayjs | "";
        endDate: Dayjs | "";
    }>({
        startDate: initialDateAfter
            ? dayjs(initialDateAfter)
            : initialDateExact
            ? dayjs(initialDateExact)
            : "",
        endDate: initialDateBefore ? dayjs(initialDateBefore) : "",
    });

    // Function to update filters in URL
    const updateFiltersInURL = (filters: {
        dateBefore: string;
        dateAfter: string;
        sourceId: string;
    }) => {
        setSearchParams((prev) => {
            const updatedParams = new URLSearchParams(prev);

            Object.entries(filters).forEach(([key, value]) => {
                if (value) {
                    updatedParams.set(key, value);
                } else {
                    updatedParams.delete(key);
                }
            });

            return updatedParams;
        });
    };

    // Function to select a source
    const selectSource = useCallback((id: string) => {
        setSelectedSource((prev) => (prev === id ? undefined : id));
    }, []);

    // Memoized current date
    const currentDate = useMemo(() => dayjs(), []);

    // Function to apply filters
    const handleFilters = () => {
        setShowFilters(false);

        const filters = {
            dateBefore: selectedDate.endDate
                ? dayjs(selectedDate.endDate).format("YYYY-MM-DD")
                : "",
            dateAfter: selectedDate.startDate
                ? dayjs(selectedDate.startDate).format("YYYY-MM-DD")
                : "",
            sourceId: selectedSource || "",
        };

        updateFiltersInURL(filters);
        updateParams(filters);
    };

    // Function to handle date selection
    const handleChangeDate = useCallback((date: Dayjs) => {
        setSelectedDate((prev) => {
            if (!prev.startDate) {
                return { startDate: date, endDate: "" };
            }

            if (dayjs(prev.startDate).isSame(date, "day")) {
                return prev.endDate
                    ? { startDate: prev.endDate, endDate: "" }
                    : { startDate: "", endDate: "" };
            }

            if (!prev.endDate) {
                return dayjs(date).isBefore(prev.startDate, "day")
                    ? { startDate: date, endDate: prev.startDate }
                    : { startDate: prev.startDate, endDate: date };
            }

            return { startDate: date, endDate: "" };
        });
    }, []);

    // Close filter dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                filterRef.current &&
                !filterRef.current.contains(event.target as Node)
            ) {
                setShowFilters(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative">
            <V2
                className="w-6 h-6 cursor-pointer"
                onClick={() => setShowFilters((prev) => !prev)}
                aria-label="Toggle filter menu"
                aria-expanded={showFilters}
            />
            {showFilters && (
                <div
                    ref={filterRef}
                    className="absolute space-y-2 top-9 right-0 z-10 mt-4 rounded-md border-2 border-gray-300 bg-gray-50 p-4"
                >
                    <Calendar
                        changeDate={handleChangeDate}
                        selectedDate={selectedDate}
                        currentDate={currentDate}
                    />
                    <SourceList
                        selectSource={selectSource}
                        selectedSource={selectedSource}
                    />
                    <div className="flex justify-center gap-2 pt-3 border-t border-[#b8e6c9]">
                        <button
                            className="p-3 rounded-xl border border-[#19ad52] justify-center items-center gap-2 inline-flex text-[#0e381e] text-sm font-normal"
                            onClick={() => setShowFilters(false)}
                        >
                            Откажи
                        </button>
                        <button
                            className="p-3 bg-[#19ad52] rounded-xl justify-center items-center gap-2 inline-flex text-[#fbfefe] text-sm font-bold"
                            onClick={handleFilters}
                        >
                            Приложи
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterCrawledData;
