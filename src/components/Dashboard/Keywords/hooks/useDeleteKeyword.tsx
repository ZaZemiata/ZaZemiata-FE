import { queryClient } from "@/reactQuery/queryClient";

import { queryKeys, urlKeys } from "@/reactQuery/constants";
import httpService from "@/reactQuery/httpService";
import { useMutation } from "@tanstack/react-query";

const { delete: del } = httpService();

const useDeleteKeyword = () => {
    return useMutation({
        mutationFn: (id: bigint) => del(urlKeys.delete.deleteKeyword + id),
        onSuccess: () => {
            console.log("Keyword added successfully");
            queryClient.invalidateQueries({ queryKey: [queryKeys.keywords] });
        },
        onError: (error) => {
            console.log("Error while adding keyword", error);
        },
    });
};

export default useDeleteKeyword;
