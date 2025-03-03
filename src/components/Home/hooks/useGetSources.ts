import { useQuery } from "@tanstack/react-query";

import httpService from "@/reactQuery/httpService";
import { queryKeys, urlKeys } from "@/reactQuery/constants";

const { get } = httpService();

type Source = {
    id: string;
    display_name: string;
};

const useGetSources = () => {
    return useQuery<Source[], Error>({
        queryKey: [queryKeys.sources],
        queryFn: () =>
            get<Source[]>(urlKeys.get.sources),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    });
};

export default useGetSources;
