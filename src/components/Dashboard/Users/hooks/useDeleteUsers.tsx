import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

import { queryKeys, urlKeys } from "@/reactQuery/constants";
import { queryClient } from "@/reactQuery/queryClient";
import httpService from "@/reactQuery/httpService";

const { delete: deleteRequest } = httpService();

const useDeleteUsers = () => {
    return useMutation({
        mutationFn: (id: bigint) => deleteRequest(urlKeys.delete.deleteUser + id),
        onSuccess: () => {
            toast.success("Потребителят е изтрит успешно");
            queryClient.invalidateQueries({ queryKey: [queryKeys.users] });
        },
        onError: (error) => {
            toast.error("Грешка при изтриването на потребител: " + error.message);
        },
    });
}

export default useDeleteUsers;