"use client";
import React, { useState } from "react";
import {
  LayoutGrid,
  Mic,
  Layout,
  Settings,
  Users,
  FileMusic,
  Gift,
  Gem,
  ChevronRight,
  ChevronLeft,
  ChevronsRight,
  ChevronsLeft,
  Boxes,
} from "lucide-react";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const menuItems = [
    { label: "Projects", icon: LayoutGrid, href: "/projects" },

    { label: "Files", icon: FileMusic, href: "/files" },
    { label: "Workspaces", icon: Boxes, href: "/projects" },
    { label: "Rewards", icon: Gift, href: "/rewards" },
    // { label: "Recordings", icon: Mic, href: "/recordings" },
    // { label: "Workspaces", icon: Layout, href: "/workspaces" },
    { label: "Analytics", icon: Layout, href: "/analytics" },
    { label: "Settings", icon: Settings, href: "/settings" },
    { label: "Upgrade", icon: Gem, href: "/upgrade" },
    // { label: "Rewards", icon: Gift, href: "/rewards" },
    // { label: "Analytics", icon: Users, href: "/analytics" },
  ];

  return (
    <aside
      className={`relative bg-white shadow-md ${
        isCollapsed ? "w-20" : "w-64"
      } transition-width duration-300`}
    >
      <div
        className={`flex flex-col items-center  justify-center relative ${
          isCollapsed ? "px-2" : "px-6"
        } py-4`}
      >
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute  top-1/2 rounded-full flex items-center justify-center right-[-16px] w-8 h-8 p-0 border-gray-50 bg-white"
        >
          {isCollapsed ? (
            <ChevronsRight className="w-4 h-4" />
          ) : (
            <ChevronsLeft className="w-4 h-4" />
          )}
        </Button>
        <ul className="space-y-2 text-sm flex flex-col items-center">
          {menuItems.map((item, index) => (
            <li key={index} className="w-full">
              <Link
                href={item.href}
                className={`flex items-center p-2 rounded-xl hover:bg-gray-100  ${
                  pathname.split("/")[1] === item.label.toLowerCase()
                    ? "bg-blue-50 text-blue-500"
                    : "hover:text-gray-900"
                } ${
                  isCollapsed
                    ? "justify-center w-12 h-12"
                    : "justify-start w-full h-auto"
                }`}
              >
                <item.icon
                  className={`mr-2 h-5 w-5 ${isCollapsed ? "text-center" : ""}`}
                />
                {!isCollapsed && item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
