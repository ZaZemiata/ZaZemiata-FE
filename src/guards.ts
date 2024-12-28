import { redirect } from "react-router-dom";

import { UserDataType } from "./share/types";
import { clearUserData, getUserData } from "./util/localStorage";

// restrict the login page if the user is already logged in
export function restrictLoginPage() {
    const userData: UserDataType | undefined = getUserData();

    // if there is missing data in the local storage, clear the data
    if (!userData?.is_admin || !userData?.token) {
        clearUserData();
    }
    // if the user is logged in, redirect to the home page
     else {
        return redirect("/");
    }

    return null;
}
