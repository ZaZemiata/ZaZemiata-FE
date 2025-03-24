import { QueryKey, useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";

import httpService from "@/reactQuery/httpService";
import { queryKeys, urlKeys } from "@/reactQuery/constants";
import { User } from "../types";

const { get } = httpService();

const useUsers = () => {
    const [userFilter, setUserFilter] = useState("");

    const handleUser = useCallback((data: string) => {
        setUserFilter(data);
    }, []);

    const selectFn = useCallback(
        (data: User[], filter: string) => {
            return filter
                ? data.filter((user) =>
                      user.email.toLowerCase().includes(filter.toLowerCase().trim())
                  )
                : data;
        },
        []
    );

    const { data: users, isLoading } = useQuery<User[], Error, User[], QueryKey>({
        queryKey: [queryKeys.users],
        queryFn: () => get(urlKeys.get.users),
        select: (data) => selectFn(data, userFilter),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    });

    return {
        users,
        isLoading,
        userFilter,
        handleUser
    };
};

export default useUsers; 