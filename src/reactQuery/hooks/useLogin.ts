import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { urlKeys } from "@/reactQuery/constants";
import { useLoginData } from "@/context/AuthContext";
import httpService from "@/reactQuery/httpService";
import { LoginFormDataType, UserDataType } from "@/share/types";

const useLogin = () => {
    // get the post function from the httpService
    const { post } = httpService();
    const navigate = useNavigate();
    // get the setLoginData function from the AuthContext
    const { setLoginData } = useLoginData();

    // useMutation hook to login the user
    return useMutation<UserDataType, Error, LoginFormDataType>({
        mutationFn: (data) => post(urlKeys.post.login, data),
        onSuccess: (response) => {
            // set the login data in the context
            setLoginData(response);
            // navigate to the home page
            navigate("/");
        },
        onError: (error) => {
            console.log(error.message);
        },
    });
};

export default useLogin;
