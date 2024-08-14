"use client"
import React from "react";
import { LayoutGrid, Mic, Layout, Settings, Users } from "lucide-react";
import Link from "next/link";

import { usePathname } from 'next/navigation'

const Sidebar: React.FC = () => {

  const pathname = usePathname()

  const menuItems = [
    { label: "Projects", icon: LayoutGrid, href: "/projects" },
    // { label: "Recordings", icon: Mic, href: "/recordings" },
    // { label: "Workspaces", icon: Layout, href: "/workspaces" },
    { label: "Analytics", icon: Layout, href: "/analytics" },
    { label: "Settings", icon: Settings, href: "/settings" },
    { label: "Team", icon: Users, href: "/team" },
    // { label: "Analytics", icon: Users, href: "/analytics" },
  ];

  return (
    <aside className="w-64 bg-white shadow-md hidden md:block">
      <div className="px-6 py-4">
        <ul className="space-y-4 text-sm">
          
          {menuItems.map((item, index) => (
            <li key={index} >
              <Link
                href={item.href}
                className={`flex items-center text-gray-700  p-2 rounded  ${ pathname.split("/")[1] ===  item.label.toLowerCase() ? "bg-blue-50 text-blue-500" : " hover:text-gray-900"}`}
              >
                <item.icon className="mr-1 h-5 w-5" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div
          className="
          border-t-[0.5px] border-gray-200"
        >
          <p>Collaborations</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
