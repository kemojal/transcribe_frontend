// components/Sidebar.tsx
import React from "react";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-100 shadow-md hidden md:block">
      <div className="px-6 py-4">
        <ul className="space-y-4">
          <li>
            <a href="#" className="text-gray-700 hover:text-gray-900">
              Projects
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-700 hover:text-gray-900">
              Recordings
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-700 hover:text-gray-900">
              Workspaces
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
