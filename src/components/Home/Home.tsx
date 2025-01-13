import React, { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

import useGetCrawledData from "./hooks/useGetCrawledData";
import InfoCard from "./InfoCard";
import Pagination from "./Pagination";

const Home: React.FC = () => {
    const limit = 10;

    // Get the current page from the URL
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;

    // Fetch the data
    const { data: crawledData, isError, isPlaceholderData } = useGetCrawledData({ page, limit });

    // Function to handle the page change
    const handlePageChange = useCallback(
        (newPage: number) => {
            if (newPage > 0) {
                setSearchParams({ page: newPage.toString() });
                window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top smoothly
            }
        },
        [setSearchParams]
    );

    return (
        <div className="flex flex-col items-center gap-6 my-6 max-w-[75rem] m-auto relative">
            {/* TODO: Add loading spinner */}
            {isPlaceholderData && <div className="absolute top-10">Loading...</div>}
            {/* TODO: Add error  */}
            {isError && <div>Error loading data</div>}
            {crawledData && (
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
            )}
        </div>
    );
};

export default Home;
