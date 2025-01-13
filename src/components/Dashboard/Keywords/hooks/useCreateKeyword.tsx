import { queryClient } from "@/reactQuery/queryClient";

import { queryKeys, urlKeys } from "@/reactQuery/constants";
import httpService from "@/reactQuery/httpService";
import { useMutation } from "@tanstack/react-query";
import { KeywordSubmitType } from "../types";

const { post } = httpService();
const useCreateKeyword = () => {
    return useMutation({
        mutationFn: (data: KeywordSubmitType) =>
            post(urlKeys.post.addKeyWord, data),
        onSuccess: () => {
            console.log("Keyword added successfully");
            queryClient.invalidateQueries({ queryKey: [queryKeys.keywords] });
        },
        onError: (error) => {
            console.log("Error while adding keyword", error);
        },
    });
};

export default useCreateKeyword;
