import { queryClient } from "@/reactQuery/queryClient";

import { queryKeys, urlKeys } from "@/reactQuery/constants";
import httpService from "@/reactQuery/httpService";
import { useMutation } from "@tanstack/react-query";
import { KeywordSubmitType } from "../types";

const { patch } = httpService();
const useUpdateKeyword = () => {
    return useMutation({
        mutationFn: (data: KeywordSubmitType) =>
            patch(urlKeys.patch.updateKeyword, data),
        onSuccess: () => {
            console.log("Keyword added successfully");
            queryClient.invalidateQueries({ queryKey: [queryKeys.keywords] });
        },
        onError: (error) => {
            console.log("Error while adding keyword", error);
        },
    });
};

export default useUpdateKeyword;
