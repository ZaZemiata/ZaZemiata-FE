import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminRegister from "./AdminRegister";

const AdminNav: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Register User");

  const tabs = [
    { name: "Register User", path: "/register" },
    { name: "Keywords", path: "/keywords" },
    { name: "Sync Settings", path: "/settings" },
  ];

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center justify-center space-x-8">
        {tabs.map((tab) => (
          <Link
            key={tab.name}
            to={tab.path}
            className={`px-4 py-2 cursor-pointer text-lg ${
              activeTab === tab.name
                ? "text-black border-b-2 border-black font-bold"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.name}
          </Link>
        ))}
      </div>

      {/* Conditionally render AdminRegister */}
      {activeTab === "Register User" && <AdminRegister />}
    </div>
  );
};

export default AdminNav;

