const Register = () => {
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
export default Register;