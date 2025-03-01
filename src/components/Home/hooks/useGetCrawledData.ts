import { keepPreviousData, QueryKey, useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import httpService from "@/reactQuery/httpService";
import { queryKeys, urlKeys } from "@/reactQuery/constants";
import { CrawledDataFilter, QueryParams } from "@/share/types";
import areObjectsEqual from "@/util/areObjectEqual";

const { get } = httpService();

type useGetCrawledDataProps = {
    page: number;
    limit: number;
};

const useGetCrawledData = ({ page, limit }: useGetCrawledDataProps) => {
    // State for parameters
    const [params, setParams] = useState<QueryParams>({
        containsText: "",
        sourceId: undefined,
        order: "desc",
        dateBefore: "",
        dateAfter: "",
        page,
    });

    // Ensure `page` updates in state when prop `page` changes
    useEffect(() => {
        setParams((prev) => (prev.page !== page ? { ...prev, page } : prev));
    }, [page]);

    // Memoize query keys
    const queryKeysMemoized = useMemo(() => {
        const updatedParams = { ...params };

        if (!updatedParams.dateBefore && updatedParams.dateAfter) {
            updatedParams.dateExact = updatedParams.dateAfter;
            updatedParams.dateAfter = "";
        }

        if (updatedParams.dateBefore && updatedParams.dateAfter && updatedParams.dateExact) {
            updatedParams.dateExact = "";
        }

        return [
            queryKeys.crawledData,
            updatedParams.page,
            limit,
            updatedParams.containsText,
            updatedParams.order,
            updatedParams.sourceId,
            updatedParams.dateBefore,
            updatedParams.dateAfter,
            updatedParams.dateExact,
        ];
    }, [params, limit]);

    const {
        data: crawledData,
        isError,
        isPlaceholderData,
        refetch,
        isLoading,
    } = useQuery<CrawledDataFilter, Error, CrawledDataFilter, QueryKey>({
        queryKey: queryKeysMemoized,
        queryFn: () =>
            get<CrawledDataFilter>(urlKeys.get.crawledData, {
                limit,
                ...params,
            }),
        placeholderData: keepPreviousData,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    });

    // Efficient updateParams function
    const updateParams = useCallback(
        (newParams: Partial<QueryParams> | ((prev: QueryParams) => QueryParams)) => {
            setParams((prev) => {
                const updatedParams = typeof newParams === "function" ? newParams(prev) : { ...prev, ...newParams };
                return areObjectsEqual(updatedParams, prev) ? prev : updatedParams;
            });
        },
        []
    );

    // Automatically trigger refetch when params change
    useEffect(() => {
        refetch();
    }, [params, refetch]);

    return {
        crawledData,
        isError,
        isPlaceholderData,
        refetch,
        params,
        updateParams,
        isLoading,
    };
};

export default useGetCrawledData;
