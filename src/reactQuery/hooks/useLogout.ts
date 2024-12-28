import { useLocation, useNavigate } from "react-router-dom";

import { useLoginData } from "@/context/AuthContext";

const useLogout = () => {
    // get the clearLoginData function from the AuthContext
    const { clearLoginData } = useLoginData();

    // get the navigate and location hooks from react-router-dom
    const navigate = useNavigate();

    // get the current location
    const location = useLocation();

    // split the pathname and filter out any empty strings
    const pathnames = location.pathname.split("/").filter((x) => x);

    const logout = () => {
        clearLoginData();
        // if the user is on the dashboard page, navigate to home page
        if (pathnames[0] === "dashboard") {
            navigate("/");
        }
    };

    return { logout };
};

export default useLogout;
