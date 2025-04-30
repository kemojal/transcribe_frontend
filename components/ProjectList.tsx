"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "./tables/DataTable";
import { ProjectColumns } from "./tables/columns";
import { Button } from "@/components/ui/button";
import { ProjectDialogue } from "./Dialogues/ProjectDialogue";
import { Input } from "@/components/ui/input";
import Loader from "./Loader";
import { debounce } from "lodash";
import {
  Search,
  Table as TableIcon,
  AudioLinesIcon,
  Grid2X2,
} from "lucide-react";

import { useDispatch } from "react-redux";
import { Project } from "@/lib/store/types";
import { api } from "@/lib/store/api";
import { setCurrentProject } from "@/lib/store/slices/projectSlice";
import NoProjectsSection from "./NoProjectsSection";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Box,
  Boxes,
  ChevronRight,
  Columns4,
  Grid,
  LogsIcon,
  Rows4,
  ScrollText,
  SlidersHorizontal,
  UserPlus2Icon,
} from "lucide-react";
import Link from "next/link";
import { FileColumns } from "./tables/FileColumns";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import CustomTabs from "./SideProjecTabs/CustomTabs";
import EmptyTabs from "./SideProjecTabs/EmptyTabs";
import { Card } from "./ui/card";
import TableDropdown from "./Dropdowns/TableDropdown";

import { motion } from "framer-motion";
import { formatDate } from "@/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon } from "lucide-react";
import { PlusCircle } from "lucide-react";
import { useProjects } from "@/lib/hooks/useProjects";
import { useUI } from "@/lib/hooks/useUI";
import { Plus } from "lucide-react";
import { ProjectCard } from "./ProjectCard";
import { EditProjectDialogue } from "./Dialogues/EditProjectDialogue";
import { DeleteProjectModal } from "./Dialogues/DeleteProjectModal";

// GridView component for rendering projects in grid mode
const GridView = ({ data }: { data: Project[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {data.map((project) => (
        <div
          key={project.id}
          className="group h-[280px] bg-background/50 backdrop-blur-sm border border-border/50 shadow-lg rounded-2xl p-4 transition-all duration-300 hover:shadow-xl hover:border-primary/20 hover:bg-gradient-to-b hover:from-background/50 hover:to-background/80"
        >
          <div className="relative h-36 bg-gradient-to-br from-gray-500/5 to-gray-500/2 rounded-xl flex items-center justify-center overflow-hidden group-hover:from-primary/5 group-hover:to-secondary/5 transition-all duration-500">
            <AudioLinesIcon
              size={40}
              className="text-primary/40 group-hover:text-primary/60 transition-colors duration-500"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <div className="space-y-4 pt-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                  {project.name}
                </h3>
                <span className="text-[10px] px-2 py-0 h-4 bg-background/50 hover:bg-primary/5 transition-colors duration-300">
                  {project.status}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{new Date(project.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const ProjectList = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState<"all" | "recent" | "old">("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const { data: projects = [], isLoading, error } = api.useGetProjectsQuery();

  const handleProjectSelect = (project: Project) => {
    dispatch(setCurrentProject(project));
    router.push(`/projects/${project.id}`);
  };

  const handleAddProject = (project: Project) => {
    dispatch(setCurrentProject(project));
    router.push(`/projects/${project.id}`);
  };

  const handleCloseDialog = () => {
    // Dialog closed
  };

  const handleEditProject = (project: Project) => {
    // Handle edit project
    console.log("Edit project:", project);
  };

  const handleDeleteProject = (project: Project) => {
    // Handle delete project
    console.log("Delete project:", project);
  };

  const filteredProjects = useMemo(() => {
    if (!projects) return [];

    let filtered = [...projects];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (project) =>
          project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply date filter
    if (dateFilter === "recent") {
      filtered.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } else if (dateFilter === "old") {
      filtered.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    }

    return filtered;
  }, [projects, searchQuery, dateFilter]);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchQuery(value);
    }, 300),
    []
  );

  const { showNotification } = useUI();

  useEffect(() => {
    if (error) {
      showNotification({
        type: "error",
        message: error as string,
        duration: 5000,
      });
    }
  }, [error, showNotification]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <p className="text-destructive">
          Error loading projects. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              className="pl-8"
              onChange={(e) => debouncedSearch(e.target.value)}
            />
          </div>
          <Select
            value={dateFilter}
            onValueChange={(value: "all" | "recent" | "old") =>
              setDateFilter(value)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="old">Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="icon"
            onClick={() => setViewMode("grid")}
          >
            <Grid2X2 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "table" ? "default" : "ghost"}
            size="icon"
            onClick={() => setViewMode("table")}
          >
            <TableIcon className="h-4 w-4" />
          </Button>
          <ProjectDialogue
            onAddProject={handleAddProject}
            onClose={handleCloseDialog}
          />
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <NoProjectsSection />
      ) : viewMode === "grid" ? (
        <GridView data={filteredProjects} />
      ) : (
        <DataTable
          columns={ProjectColumns}
          data={filteredProjects}
          onEditClick={handleEditProject}
          onDeleteClick={handleDeleteProject}
        />
      )}
    </div>
  );
};

export default ProjectList;
