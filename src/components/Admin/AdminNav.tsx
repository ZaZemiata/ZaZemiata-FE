import React, { useState } from "react";

const AdminNav: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Register User");

  const tabs = ["Register User", "Keywords", "Sync Settings"];

  return (
    <div className="flex items-center justify-center space-x-8">
      {tabs.map((tab) => (
        <div
          key={tab}
          className={`px-4 py-2 cursor-pointer text-lg ${
            activeTab === tab
              ? "text-black border-b-2 border-black font-bold"
              : "text-gray-400"
          }`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

export default AdminNav;
