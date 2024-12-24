export type CrawledData = {
    id: number;
    text: string;
    contractor: string;
    date: Date;
    created_at: Date;
    source_url_id: string;
};

type CrawledDataPagination = {
    currentPage: number;
    next: string | null;
    previous: string | null;
    totalPages: number;
};

export type CrawledDataFilter = {
    data: CrawledData[];
    pagination: CrawledDataPagination;
    status: "success" | "error";
};
