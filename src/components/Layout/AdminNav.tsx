import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const AdminNav: React.FC = () => {
    const [activeTab, setActiveTab] = useState("Register User");

    const tabs = [
        { name: "Register User", path: "/dashboard/register" },
        { name: "Keywords", path: "/dashboard/keywords" },
        { name: "Sync Settings", path: "/dashboard/settings" },
    ];

    return (
        <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-center space-x-8">
                {tabs.map((tab) => (
                    <Link
                        key={tab.name}
                        to={tab.path}
                        className={`px-4 py-2 cursor-pointer text-lg ${
                            activeTab === tab.name ? "text-black border-b-2 border-black font-bold" : "text-gray-400"
                        }`}
                        onClick={() => setActiveTab(tab.name)}
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
