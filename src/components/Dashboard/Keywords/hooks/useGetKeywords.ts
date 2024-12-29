import { QueryKey, useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";

import httpService from "@/reactQuery/httpService";
import { queryKeys, urlKeys } from "@/reactQuery/constants";
import { KeywordType } from "../types";

const { get } = httpService();

const useGetKeywords = () => {
    const [keywordFilter, setKeywordFilter] = useState("");

    const handleKeyWord = useCallback((data: string) => {
        setKeywordFilter(data);
    }, []);

    const selectFn = useCallback(
        (data: KeywordType[], filter: string) => {
            // filter data based on the search input
            const filteredData = filter
                ? data.filter((project) =>
                      project.word.toLowerCase().includes(filter.toLowerCase().trim())
                  )
                : data;

            // Sort the data based on the active status
            return filteredData.sort((a, b) => {
                if (a.active === b.active) return 0; // If they are equal, return 0
                return a.active ? -1 : 1; // If a is active, return -1 else return 1
            });
        },
        []
    );
    const { data: keywords } = useQuery<KeywordType[], Error, KeywordType[], QueryKey>({
        queryKey: [queryKeys.keywords],
        queryFn: () => get(urlKeys.get.keywords),
        select: (data) => selectFn(data, keywordFilter),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    });

    return { keywords, keywordFilter, handleKeyWord };
};

export default useGetKeywords;
