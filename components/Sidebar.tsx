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
  Command,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
import { cn } from "@/lib/utils";

const menuItems = [
  {
    label: "Home",
    icon: LayoutGrid,
    href: "/projects",
    description: "View all your projects",
  },
  {
    label: "Rewards",
    icon: Gift,
    href: "/rewards",
    description: "Your earned rewards",
  },
  {
    label: "Analytics",
    icon: Layout,
    href: "/analytics",
    description: "View insights and metrics",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    description: "Manage your preferences",
  },
  {
    label: "Upgrade",
    icon: Gem,
    href: "/upgrade",
    description: "Unlock premium features",
  },
];

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
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleProjectOptionChange = (project: ProjectProps) => {
    setSelectedProjectOption(project);
    dispatch(setCurrentProject(project));
    router.push(`/projects?projectId=${project}`);
  };

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  return (
    <motion.aside
      initial={false}
      animate={{
        width: isCollapsed ? "5rem" : "16rem",
      }}
      className={cn(
        "relative bg-white/50 backdrop-blur-xl border-r border-gray-100 flex flex-col items-center py-6 h-screen",
        "shadow-[0_2px_40px_-12px_rgba(0,0,0,0.05)]"
      )}
    >
      {/* Logo Section */}
      <div className="px-4 w-full mb-6">
        <motion.div
          initial={false}
          animate={{ width: isCollapsed ? "auto" : "100%" }}
          className="relative"
        >
          <Link
            href="/"
            className="flex items-center gap-3 text-gray-900 hover:text-gray-900"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold text-lg shadow-md">
              T
            </div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="font-semibold text-lg"
                >
                  Transcribai
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </motion.div>
      </div>

      {/* Navigation Section */}
      <div className="flex-1 w-full px-3 space-y-6">
        {/* Project Selector */}
        <div className="space-y-2">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="px-2 mb-2"
              >
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Workspace
                </span>
              </motion.div>
            )}
          </AnimatePresence>
          <SelectProjectOption
            isCollapsed={isCollapsed}
            projects={projects}
            selectedProjectOption={selectedProjectOption}
            handleProjectOptionChange={handleProjectOptionChange}
          />
          <ProjectDialogue />
        </div>

        {/* Menu Items */}
        <nav className="space-y-1">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="px-2 mb-2"
              >
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Menu
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Tooltip key={item.href} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    onMouseEnter={() => setHoveredItem(item.label)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
                      "hover:bg-gray-50 group relative",
                      isActive &&
                        "bg-gray-50 text-indigo-600 hover:bg-gray-100/80"
                    )}
                  >
                    <motion.div
                      initial={false}
                      animate={{
                        scale: hoveredItem === item.label ? 1.1 : 1,
                      }}
                      className="relative"
                    >
                      <Icon
                        className={cn(
                          "w-5 h-5",
                          isActive ? "text-indigo-600" : "text-gray-500",
                          "group-hover:text-indigo-600 transition-colors"
                        )}
                      />
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-4 bg-indigo-600 rounded-full"
                        />
                      )}
                    </motion.div>
                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className={cn(
                            "text-sm font-medium",
                            isActive
                              ? "text-indigo-600"
                              : "text-gray-700 group-hover:text-indigo-600"
                          )}
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="text-xs bg-gray-900 text-white"
                >
                  {item.description}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="w-full px-3 mt-auto">
        <motion.button
          onClick={toggleCollpased}
          className={cn(
            "w-full flex items-center gap-2 p-2 rounded-lg text-gray-500",
            "hover:bg-gray-50 transition-colors duration-200"
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Command className="w-5 h-5" />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-sm"
              >
                Toggle sidebar
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        <div className="mt-4">
          <ProfileMenu isCollapsed={isCollapsed} />
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
