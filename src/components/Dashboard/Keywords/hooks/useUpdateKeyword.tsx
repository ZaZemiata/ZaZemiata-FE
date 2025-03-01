import { queryClient } from "@/reactQuery/queryClient";

import { queryKeys, urlKeys } from "@/reactQuery/constants";
import httpService from "@/reactQuery/httpService";
import { useMutation } from "@tanstack/react-query";
import { KeywordSubmitType } from "../types";
import toast from "react-hot-toast";

const { patch } = httpService();
const useUpdateKeyword = () => {
    return useMutation({
        mutationFn: (data: KeywordSubmitType) => patch(urlKeys.patch.updateKeyword, data),
        onSuccess: () => {
            toast.success("Ключовата дума е обновена успешно");
            queryClient.invalidateQueries({ queryKey: [queryKeys.keywords] });
        },
        onError: (error) => {
            toast.error("Грешка при обновяване на ключова дума: " + error.message);
        },
    });
};

export default useUpdateKeyword;
