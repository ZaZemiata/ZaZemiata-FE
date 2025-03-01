import { UserDataType } from "@/share/types";
import cn from "@/util/cn";

import React, { useEffect, useState } from "react";
import { Link, Outlet, useLoaderData, useLocation } from "react-router-dom";

const AdminNav: React.FC = () => {
    // get the location hook from react-router-dom
    const location = useLocation();

    // function to get the current path and return the second path
    const getLocationPath = (path: string) => {
        const pathArray = path.split("/").filter((x) => x);
        return pathArray[1];
    };

    // set the active tab based on the current path
    const [activeTab, setActiveTab] = useState("");

    // get the user data from the loader data
    const userData = useLoaderData() as UserDataType;

    // tabs base user
    const baseTabs = [
        { name: "Keywords", path: "/dashboard/keywords", tab: "keywords" },
        { name: "Sync Settings", path: "/dashboard/settings", tab: "settings" },
    ];

    // tabs for admin
    const adminTabs = [{ name: "Register User", path: "/dashboard/register", tab: "register" }, ...baseTabs];

    // set the tabs based on the user data
    const tabs = userData.is_admin ? adminTabs : baseTabs;

    // set the active tab based on the current path
    useEffect(() => {
        setActiveTab(getLocationPath(location.pathname));
    }, [location.pathname]);

    return (
        <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-center space-x-8">
                {tabs.map((tab) => (
                    <Link
                        key={tab.name}
                        to={tab.path}
                        className={cn(
                            activeTab === tab.tab ? "text-black border-b-2 border-black font-bold" : "text-gray-400",
                            "px-4 py-2 cursor-pointer text-lg"
                        )}
                    >
                        {tab.name}
                    </Link>
                ))}
            </div>
            <Outlet />
        </div>
    );
};

export default AdminNav;
