"use client";
import React, { useEffect, useState } from "react";
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
  BoxIcon,
} from "lucide-react";
import Link from "next/link";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import ProfileMenu from "./ProfileMenu";
import { SelectProjectOption } from "./SelectProjectOption";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ProjectProps } from "@/types/interfaces";
import { fetchProjects, setCurrentProject } from "@/lib/reducers/ProjectSlice";
import { ProjectDialogue } from "./Dialogues/ProjectDialogue";
import ProjectsIcon from "@/icons/ProjectsIcon";

const Sidebar = ({
  isCollapsed,
  toggleCollpased,
}: {
  isCollapsed: boolean;
  toggleCollpased: () => void;
}) => {
  const pathname = usePathname();
  const { projects, currentProject, isLoading, error } = useAppSelector(
    (state) => state.project
  );
  const dispatch = useAppDispatch();
  const [selectedProjectOption, setSelectedProjectOption] =
    useState<ProjectProps | null>(null);
  const router = useRouter();

  const menuItems = [
    { label: "Home", icon: LayoutGrid, href: "/projects" },

    // { label: "Files", icon: FileMusic, href: "/files" },
    // { label: "Workspaces", icon: ProjectsIcon, href: "/projects" },
    { label: "Rewards", icon: Gift, href: "/rewards" },
    { label: "Analytics", icon: Layout, href: "/analytics" },
    { label: "Settings", icon: Settings, href: "/settings" },
    { label: "Upgrade", icon: Gem, href: "/upgrade" },
  ];

  const handleProjectOptionChange = (project: ProjectProps) => {
    setSelectedProjectOption(project);
    dispatch(setCurrentProject(project));
    router.push(`/projects?projectId=${project}`);
    if (typeof window !== "undefined") {
      const currentUrl = window.location.href;
      console.log("currentUrl = ", window.location.href);
      console.log("currentUrlDD = ", currentUrl);
      localStorage.setItem("currentUrl", currentUrl);
    }
  };

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  return (
    <aside
      className={`relative bg-[#F9F9F9] shadow-md flex flex-col items-center space-y-4 py-8 ${
        isCollapsed ? "w-20" : "w-64"
      } transition-width duration-300`}
    >
      <div className="px-2 w-full ">
        <a href="#" className="text-xl font-bold text-muted-foreground ">
          {isCollapsed ? (
            <span className="w-12 h-12 bg-gray-50 rounded-full text-center flex items-center justify-center ">
              T
            </span>
          ) : (
            <span>Transcribai</span>
          )}
        </a>
      </div>
      <div
        className={` w-full flex flex-col items-center  justify-center relative ${
          isCollapsed ? "px-2" : "px-2"
        } py-4`}
      >
        <div className="flex flex-col items-center justify-between w-full space-y-2 py-2">
          <div className="flex flex-col justify-center space-y-2 text-sm text-gray-600 w-full">
            <Link
              href="/projects"
              className={`hover:text-indigo-600 flex items-center flex items-center justify-center w-full  space-x-2 ${
                isCollapsed
                  ? "w-10 h-10 rounded-xl !justify-center bg-gray-100"
                  : "w-full !justify-start"
              }`}
            >
              <Boxes size={isCollapsed ? 20 : 16} className="" />
              {!isCollapsed && (
                <span className="font-bold"> Browse Spaces</span>
              )}
            </Link>
            <div className="flex w-auto py-1">
              <SelectProjectOption
                isCollapsed={isCollapsed}
                placeholder="No space"
                options={projects.map((p) => ({ value: p.id, label: p.name }))}
                onValueChange={handleProjectOptionChange}
                defaultValue={currentProject?.id}
              />
            </div>
          </div>
        </div>
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={toggleCollpased}
          className="absolute  top-1/2 rounded-full flex items-center justify-center right-[-16px] w-8 h-8 p-0 border-gray-50 bg-white"
        >
          {isCollapsed ? (
            <ChevronsRight className="w-4 h-4" />
          ) : (
            <ChevronsLeft className="w-4 h-4" />
          )}
        </Button>
        <ul className="space-y-2 text-sm flex flex-col items-center w-full ">
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

      <div className=" absolute bottom-0 w-full z-50 text-blue-500 h-40 p-2">
        <ProfileMenu isCollapsed={isCollapsed} />

        {/* <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip> */}
      </div>
    </aside>
  );
};

export default Sidebar;
