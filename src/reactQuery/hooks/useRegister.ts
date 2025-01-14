import { useMutation } from "@tanstack/react-query";

import { urlKeys } from "@/reactQuery/constants";
import { useLoginData } from "@/context/AuthContext";
import httpService from "@/reactQuery/httpService";
import { RegisterFormDataType, UserDataType } from "@/share/types";

const useRegister = () => {
    // get the post function from the httpService
    const { post } = httpService();

    // get the setLoginData function from the AuthContext
    const { setUserData } = useLoginData();

    // useMutation hook to login the user
    return useMutation<UserDataType, Error, RegisterFormDataType>({
        mutationFn: (data) => post(urlKeys.post.register, data),
        onSuccess: (response) => {
            // set the login data in the context
            setUserData(response);
            // navigate to the home page
        },
        onError: (error) => {
            console.log(error.message);
        },
    });
};

export default useRegister;
