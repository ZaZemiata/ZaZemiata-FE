import { redirect } from "react-router-dom";

import { UserDataType } from "./share/types";
import { clearUserData, getUserData } from "./util/localStorage";

// restrict the login page if the user is already logged in
export const restrictLoginPage = () => {
    const userData: UserDataType | undefined = getUserData();

    // if there is missing data in the local storage, clear the data
    if (userData?.is_admin === undefined || !userData?.token) {
        clearUserData();
    }
    // if the user is logged in, redirect to the home page
    else {
        return redirect("/");
    }

    return null;
};

export const restrictDashboard = ({ request }: { request: Request }) => {
    const userData: UserDataType | undefined = getUserData();

    // if there is missing data in the local storage, redirect to the home page
    if (!userData) {
        return redirect("/");
    }

    // if there is missing token or is_admin data, clear the data and redirect to the login page
    if (!userData.token || userData.is_admin === undefined) {
        clearUserData();
        return redirect("/login");
    }

    // if the user is not an admin and tries to access the register page, redirect to the keywords page
    if (!userData.is_admin && request.url.includes("/dashboard/register")) {
        return redirect("/dashboard/keywords");
    }

    return userData;
};
