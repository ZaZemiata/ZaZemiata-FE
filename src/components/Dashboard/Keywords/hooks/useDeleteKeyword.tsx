import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/reactQuery/queryClient";
import { queryKeys, urlKeys } from "@/reactQuery/constants";
import httpService from "@/reactQuery/httpService";

const { delete: del } = httpService();

const useDeleteKeyword = () => {
    return useMutation({
        mutationFn: (id: bigint) => del(urlKeys.delete.deleteKeyword + id),
        onSuccess: () => {
            toast.success("Ключовата дума е изтрита успешно");
            queryClient.invalidateQueries({ queryKey: [queryKeys.keywords] });
        },
        onError: (error) => {
            toast.error("Грешка при изтриването на ключова дума: " + error.message);
        },
    });
};

export default useDeleteKeyword;
