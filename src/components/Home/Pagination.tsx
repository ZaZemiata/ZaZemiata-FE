import cn from "@/util/cn";
import React from "react";

type PaginationProps = {
    page: number;
    totalPages: number;
    handlePageChange: (newPage: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, handlePageChange }) => {
    const renderPaginationButtons = () => {
        // Variables to store the buttons
        const buttons = [];

        // Calculate the start and end page
        const startPage = Math.max(1, page - 1);
        const endPage = Math.min(totalPages, page + 1);

        // Add the first page
        if (startPage > 1) {
            buttons.push(
                <button
                    key={1}
                    onClick={() => handlePageChange(1)}
                    className="text-[#3b3b3b] text-xs font-normal rounded-lg bg-[#ebecec] p-2"
                >
                    1
                </button>
            );
            if (startPage > 2) {
                buttons.push(
                    <span key="start-ellipsis" className="text-xs">
                        ...
                    </span>
                );
            }
        }

        // Add the middle pages
        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={cn(
                        i === page ? "bg-[#19ad52] text-white" : "bg-[#ebecec] text-[#3b3b3b]",
                        "text-xs font-normal rounded-lg p-2 min-w-8 min-h-8"
                    )}
                >
                    {i}
                </button>
            );
        }

        // Add the last page
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                buttons.push(
                    <span key="end-ellipsis" className="text-xs">
                        ...
                    </span>
                );
            }
            buttons.push(
                <button
                    key={totalPages}
                    onClick={() => handlePageChange(totalPages)}
                    className="text-[#3b3b3b] text-xs font-normal rounded-lg bg-[#ebecec] p-2 min-w-8 min-h-8"
                >
                    {totalPages}
                </button>
            );
        }

        return buttons;
    };

    return (
        <div className="flex justify-center items-center gap-3">
            <button
                disabled={page <= 1}
                onClick={() => handlePageChange(page - 1)}
                className={cn(
                    page <= 1 ? "cursor-not-allowed" : "cursor-pointer",
                    "text-[#3b3b3b] text-xs font-normal"
                )}
                aria-label="Previous Page"
            >
                Назад
            </button>
            {renderPaginationButtons()}
            <button
                disabled={page >= totalPages}
                onClick={() => handlePageChange(page + 1)}
                className={cn(
                    page >= totalPages ? "cursor-not-allowed" : "cursor-pointer",
                    "text-[#3b3b3b] text-xs font-normal"
                )}
                aria-label="Next Page"
            >
                Напред
            </button>
        </div>
    );
};

export default Pagination;
