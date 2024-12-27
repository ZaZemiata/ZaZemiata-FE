import { keepPreviousData, QueryKey, useQuery } from "@tanstack/react-query";

import httpService from "@/reactQuery/httpService";
import { queryKeys, urlKeys } from "@/reactQuery/constants";
import { CrawledDataFilter } from "@/share/types";

const { get } = httpService();

const useGetCrawledData = ({ page, limit }: { page: number; limit: number }) => {
    return useQuery<CrawledDataFilter, Error, CrawledDataFilter, QueryKey>({
        queryKey: [queryKeys.crawledData, page, limit],
        queryFn: () => get<CrawledDataFilter>(urlKeys.get.crawledData, { page, limit }),
        placeholderData: keepPreviousData,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    });
};

export default useGetCrawledData;
