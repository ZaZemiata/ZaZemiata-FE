import { useCallback, useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { ReactComponent as SortDescending } from "@/assets/svgs/sort-descending.svg";
import { ReactComponent as Search } from "@/assets/svgs/search.svg";
import { ReactComponent as SortDescending2 } from "@/assets/svgs/sort-small.svg";
import { ReactComponent as Check } from "@/assets/svgs/check.svg";

import useGetCrawledData from "./hooks/useGetCrawledData";
import InfoCard from "./InfoCard";
import Pagination from "./Pagination";
import cn from "@/util/cn";
import FilterCrawledData from "./FilterCrawledData";

const Home = () => {
    const limit = 10;
    const sortRef = useRef<HTMLDivElement>(null);

    // Get the current URL parameters
    const [searchParams, setSearchParams] = useSearchParams();
    
    const page = Number(searchParams.get("page")) || 1;

    // Get the initial filters from the URL
    const initialSortType =
        (searchParams.get("order") as "asc" | "desc") || "desc";
    const initialSearch = searchParams.get("search") || "";
    const initialSourceId = searchParams.get("sourceId") || "";
    const initialDateBefore = searchParams.get("dateBefore") || "";
    const initialDateAfter = searchParams.get("dateAfter") || "";
    const initialDateExact = searchParams.get("dateExact") || "";

    // State for sorting
    const [sortType, setSortType] = useState<"asc" | "desc">(initialSortType);
    // State for active sort dropdown
    const [activeSort, setActiveSort] = useState(false);

    // Fetch the data with filters from the URL
    const { crawledData, isError, isPlaceholderData, updateParams, isLoading } =
        useGetCrawledData({
            page,
            limit,
        });


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                sortRef.current &&
                !sortRef.current.contains(event.target as Node)
            ) {
                setActiveSort(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Update URL when filters change
    const updateFiltersInURL = useCallback(
        (newParams: Record<string, string | number | undefined>) => {
            setSearchParams((prev) => {
                const updatedParams = new URLSearchParams(prev);
    
                // Merge existing params with new ones
                Object.entries(newParams).forEach(([key, value]) => {
                    if (value !== undefined && value !== "") {
                        updatedParams.set(key, String(value));
                    } else {
                        updatedParams.delete(key);
                    }
                });
    
                // Special handling for date filters
                if (updatedParams.has("dateBefore") && updatedParams.has("dateAfter") && updatedParams.has("dateExact")) {
                    updatedParams.delete("dateExact");
                }
    
                if (!updatedParams.has("dateBefore") && updatedParams.has("dateAfter")) {
                    updatedParams.delete("dateBefore");
                    updatedParams.set("dateExact", updatedParams.get("dateAfter") as string);
                    updatedParams.delete("dateAfter");
                }
    
                return updatedParams;
            });
        },
        [setSearchParams] // Ensure this function is memoized correctly
    );
    
    
    // Restore filters on component load
    useEffect(() => {
        updateParams({
            containsText: initialSearch,
            order: initialSortType,
            sourceId: initialSourceId,
            dateBefore: initialDateBefore,
            dateAfter: initialDateAfter,
            dateExact: initialDateExact,
        });
    }, [updateParams]);

    // Handle page change
    const handlePageChange = useCallback(
        (newPage: number) => {
            if (newPage > 0 && newPage !== page) {
                updateFiltersInURL({ page: newPage });
                updateParams({ page: newPage });
            }
        },
        [page, updateFiltersInURL, updateParams]
    );
    // Handle search submission
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const search = (data.get("search") as string).trim();

        updateFiltersInURL({ search, page: 1 });
        updateParams({ containsText: search, page: 1 });
    };

    // Handle sorting
    const handleSortChange = useCallback(
        (order: "asc" | "desc") => {
            if (sortType !== order) {
                setSortType(order);
                updateFiltersInURL({ order, page: 1 });
                updateParams({ order, page: 1 });
            }
            setActiveSort(false);
        },
        [sortType, updateFiltersInURL, updateParams]
    );

    // Handle filters from FilterCrawledData
    const handleFilterChange = (filters: {
        dateBefore: string;
        dateAfter: string;
        sourceId: string;
    }) => {
        updateFiltersInURL({ ...filters, page: 1 });
        updateParams({ ...filters, page: 1 });
    };

    return (
        <div className="flex flex-col items-center gap-6 my-6 w-[75rem] m-auto relative">
            <div className="bg-[#19ad52] w-full py-3 rounded-[20px] flex justify-between items-center px-10">
                <form
                    onSubmit={handleFormSubmit}
                    className="flex items-center gap-4 relative"
                >
                    <input
                        type="text"
                        name="search"
                        defaultValue={initialSearch} // Restore search value
                        placeholder="Search..."
                        className="max-w-52 outline-none bg-inherit border-b border-gray-300 p-2 rounded-lg pl-10 text-white placeholder:text-white placeholder:opacity-70"
                    />
                    <Search className="w-6 h-6 absolute left-1" />
                    <button className="text-white">Търси</button>
                </form>
                <div className="flex gap-4 items-center mr-4 relative">
                    <FilterCrawledData updateParams={handleFilterChange} />
                    <div ref={sortRef} className="relative">
                        <SortDescending
                            onClick={() => setActiveSort(!activeSort)}
                        />
                        {activeSort && (
                            <div className="absolute -bottom-36 -right-12 w-[200px] h-[104px] px-4 py-6 bg-[#fbfefe] rounded-xl shadow-[0px_12px_24px_4px_rgba(0,0,0,0.15)] flex-col justify-start items-start gap-2 inline-flex text-base font-normal leading-normal">
                                <button
                                    onClick={() => handleSortChange("desc")}
                                    className={cn(
                                        sortType === "desc"
                                            ? "text-[#0e381e]"
                                            : "text-[#729c82]",
                                        "flex justify-between items-center w-full"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <SortDescending2
                                            className={cn(
                                                sortType === "desc"
                                                    ? "fill-[#0e381e]"
                                                    : "fill-[#729c82]"
                                            )}
                                        />
                                        най-нови
                                    </div>
                                    {sortType === "desc" && <Check />}
                                </button>
                                <button
                                    onClick={() => handleSortChange("asc")}
                                    className={cn(
                                        sortType === "asc"
                                            ? "text-[#0e381e]"
                                            : "text-[#729c82]",
                                        "flex justify-between items-center w-full"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <SortDescending2
                                            className={cn(
                                                sortType === "asc"
                                                    ? "fill-[#0e381e]"
                                                    : "fill-[#729c82]"
                                            )}
                                        />
                                        най-стари
                                    </div>
                                    {sortType === "asc" && <Check />}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {(isLoading || isPlaceholderData) && (
                <div role="status">
                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin  fill-[#729c82]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
            )}
            {isError && <div>Възникна грешка при зареждането на данните.</div>}
            {crawledData?.data?.length ? (
                <div className="flex flex-col gap-4">
                    {crawledData.data.map((data) => (
                        <InfoCard key={data.id} {...data} />
                    ))}
                    <Pagination
                        handlePageChange={handlePageChange}
                        page={page}
                        totalPages={crawledData.pagination.totalPages}
                    />
                </div>
            ) : (
                (!isLoading && !isPlaceholderData ) && <div>Няма данни</div>
            )}
        </div>
    );
};

export default Home;
