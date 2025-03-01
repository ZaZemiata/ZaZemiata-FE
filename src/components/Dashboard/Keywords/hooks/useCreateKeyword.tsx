import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/reactQuery/queryClient";
import { queryKeys, urlKeys } from "@/reactQuery/constants";
import httpService from "@/reactQuery/httpService";
import { KeywordSubmitType } from "../types";

const { post } = httpService();
const useCreateKeyword = () => {
    return useMutation({
        mutationFn: (data: KeywordSubmitType) => post(urlKeys.post.addKeyWord, data),
        onSuccess: () => {
            toast.success("Ключовата дума е добавена успешно");
            queryClient.invalidateQueries({ queryKey: [queryKeys.keywords] });
        },
        onError: (error) => {
            toast.error("Грешка при добавяне на ключова дума: " + error.message, { duration: 10000 });
        },
    });
};

export default useCreateKeyword;
