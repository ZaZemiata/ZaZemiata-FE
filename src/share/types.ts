export type CrawledData = {
    id: number;
    text: string;
    contractor: string;
    date: Date;
    created_at: Date;
    source_url_id: string;
    sourceArticle: string | null;
    SourceUrls: {
        url: string;
        Sources: {
            display_name: string;
        };
    };
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

export type UserDataType = {
    token: string;
    is_admin: boolean;
};

export type LoginFormDataType = {
    email: string;
    password: string;
};

export type RegisterFormDataType = {
    email: string;
    password: string;
    repassword: string;
};

export type QueryParams = {
    containsText?: string;
    sourceId?: string;
    order: "asc" | "desc";
    page: number;
    dateBefore?: string;
    dateAfter?: string;
    dateExact?: string;
};

export type UpdateParams = {
    updateParams: (
        newParams: Partial<QueryParams> | ((prev: QueryParams) => QueryParams)
    ) => void;
};
