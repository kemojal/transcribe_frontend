"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DataTable } from "./tables/DataTable";
import { ProjectColumns } from "./tables/columns";
import { Button } from "@/components/ui/button";
import { ProjectDialogue } from "./Dialogues/ProjectDialogue";
import { Input } from "@/components/ui/input";
import Loader from "./Loader";
import { ProjectProps } from "@/types/interfaces";
import { debounce } from "lodash";

import { SelectProjectOption } from "@/components/SelectProjectOption";
import {
  AudioLinesIcon,
  Box,
  Boxes,
  ChevronRight,
  Columns4,
  Grid,
  LogsIcon,
  Rows4,
  ScrollText,
  Search,
  Table as TableIcon,
  SlidersHorizontal,
  UserPlus2Icon,
} from "lucide-react";
import { ProjectDropdown } from "@/components/Dropdowns/ProjectDropdown";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  fetchProjects,
  addProject,
  updateProject,
  deleteProject,
  setCurrentProject,
  // Project,
} from "@/lib/reducers/ProjectSlice";
import { EditProjectDialogue } from "./Dialogues/EditProjectDialogue";
import { DeleteProjectModal } from "./Dialogues/DeleteProjectModal";
import Link from "next/link";
import { FileColumns } from "./tables/FileColumns";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import NoProjectsSection from "./NoProjectsSection";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon } from "lucide-react";
import { PlusCircle } from "lucide-react";

// GridView component for rendering projects in grid mode
const GridView = ({ data }: { data: ProjectProps[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-6">
      {data.map((project, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          key={project.id}
        >
          <Link href={`/projects/${project?.id}`}>
            <Card className="group h-[280px] bg-background/50 backdrop-blur-sm border border-border/50 shadow-lg rounded-2xl p-4 transition-all duration-300 hover:shadow-xl hover:border-primary/20 hover:bg-gradient-to-b hover:from-background/50 hover:to-background/80">
              <div className="relative h-36 bg-gradient-to-br from-gray-500/5 to-gray-500/2 rounded-xl flex items-center justify-center overflow-hidden group-hover:from-primary/5 group-hover:to-secondary/5 transition-all duration-500">
                <motion.div
                  initial={false}
                  animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative z-10"
                >
                  <AudioLinesIcon
                    size={40}
                    className="text-primary/40 group-hover:text-primary/60 transition-colors duration-500"
                  />
                </motion.div>

                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
                >
                  <Button
                    variant="secondary"
                    size="sm"
                    className="shadow-lg bg-background/80 hover:bg-background/90 hover:scale-105 transition-all duration-300"
                  >
                    View Space
                  </Button>
                </motion.div>

                <div className="absolute top-2 right-2">
                  <TableDropdown item={project} />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-2 right-2"
                >
                  <span className="px-3 py-1 rounded-full bg-background/90 backdrop-blur-sm text-xs font-medium text-foreground/80 shadow-sm border border-border/50 group-hover:border-primary/20 transition-all duration-300">
                    {project?.files?.length > 0
                      ? `${project?.files?.length} files`
                      : "Empty"}
                  </span>
                </motion.div>
              </div>

              <div className="space-y-4 pt-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                      {project.name}
                    </h3>
                    <Badge
                      variant="outline"
                      className="text-[10px] px-2 py-0 h-4 bg-background/50 hover:bg-primary/5 transition-colors duration-300"
                    >
                      {project.type || "Audio"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CalendarIcon size={12} />
                    <span>{formatDate(project.created_at)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex -space-x-2 relative">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, x: -10 }}
                        animate={{ scale: 1, x: 0 }}
                        whileHover={{ y: -2, zIndex: 10 }}
                        transition={{
                          delay: i * 0.1,
                          type: "spring",
                          stiffness: 200,
                        }}
                      >
                        <Avatar className="border-2 border-background w-7 h-7 bg-primary/10 hover:ring-2 hover:ring-primary/20 transition-all duration-300">
                          <AvatarFallback className="text-xs text-primary/60 font-medium">
                            U{i}
                          </AvatarFallback>
                        </Avatar>
                      </motion.div>
                    ))}
                    <motion.div
                      initial={{ scale: 0, x: -10 }}
                      animate={{ scale: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="w-7 h-7 rounded-full bg-background/80 border-2 border-background flex items-center justify-center text-[10px] font-medium text-muted-foreground hover:text-primary/60 transition-colors duration-300"
                    >
                      +2
                    </motion.div>
                  </div>

                  <Button
                    size="sm"
                    variant="ghost"
                    className="rounded-full w-7 h-7 bg-background/80 hover:bg-primary/10 hover:scale-105 transition-all duration-300"
                  >
                    <UserPlus2Icon size={13} className="text-primary/60" />
                  </Button>
                </div>
              </div>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

const ProjectList = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");

  // State declarations
  const [viewMode, setViewMode] = useState<"table" | "grid">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [isProjectDialogueOpen, setIsProjectDialogueOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    date: "all",
    status: "all",
    type: "all",
  });
  const [selectedProjectOption, setSelectedProjectOption] =
    useState<ProjectProps | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectProps | null>(
    null
  );

  // Get projects from Redux store
  const { projects, loading } = useAppSelector((state) => state.project);

  // Fetch projects
  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  // Filter projects based on search query and filters
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Search filter
      const matchesSearch = project.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      // Date filter
      let matchesDate = true;
      if (selectedFilters.date !== "all") {
        const projectDate = new Date(project.created_at);
        const now = new Date();
        const days = {
          "7days": 7,
          "30days": 30,
          "90days": 90,
        }[selectedFilters.date];

        if (days) {
          const cutoff = new Date(now.setDate(now.getDate() - days));
          matchesDate = projectDate >= cutoff;
        }
      }

      // Add more filter conditions as needed
      return matchesSearch && matchesDate;
    });
  }, [projects, searchQuery, selectedFilters]);

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchQuery(value);
    }, 300),
    []
  );

  const handleProjectOptionChange = (project: ProjectProps) => {
    setSelectedProjectOption(project);
    dispatch(setCurrentProject(project));
    router.push(`/projects?projectId=${project}`);
    if (typeof window !== "undefined") {
      const currentUrl = window.location.href;
      localStorage.setItem("currentUrl", currentUrl);
    }
  };

  const { currentProject, isLoading, error } = useAppSelector(
    (state) => state.project
  );

  const tabItems = [
    {
      label: "Open",
      content: (
        <>
          {viewMode === "table" ? (
            <DataTable
              data={filteredProjects}
              columns={ProjectColumns}
              onEditClick={() => {}}
              onDeleteClick={() => {}}
            />
          ) : (
            <GridView data={filteredProjects} />
          )}
        </>
      ),
    },
    {
      label: "Closed",
      content: (
        <>
          <EmptyTabs
            title="No closed Spaces"
            description="Spaces that are closed will appear here."
          />
        </>
      ),
    },
    {
      label: "Archived",
      content: (
        <>
          <EmptyTabs
            title="No archived Spaces"
            description="Spaces that are archived will appear here."
          />
        </>
      ),
    },
  ];

  useEffect(() => {
    let mapOptions = projects.map((project) => ({
      value: project.id,
      label: project.name,
    }));
    // setProjectOptions(mapOptions);
  }, [projects]);

  // Set selected project option from query param on component mount
  useEffect(() => {
    if (projectId && projects.length > 0) {
      const matchedProject = projects.find(
        (project) => project.id === parseInt(projectId)
      );
      if (matchedProject) {
        setSelectedProjectOption(matchedProject);
        dispatch(setCurrentProject(matchedProject));
      }
    }
  }, [projectId, projects, dispatch]);

  useEffect(() => {
    // dispatch(fetchProjects());
  }, [dispatch]);

  const handleAddProject = (newProject: ProjectProps) => {
    dispatch(addProject(newProject));
  };

  useEffect(() => {
    if (selectedProjectOption) {
      projects.filter((project) => {
        if (project.id === selectedProjectOption) {
          setSelectedProject(project);
          dispatch(setCurrentProject(project));
        }
      });
    }
  }, [selectedProjectOption]);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
      >
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Spaces</h2>
          <p className="text-muted-foreground">
            Manage and organize your transcription Spaces
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm rounded-lg p-1 border border-border/50">
            <Button
              size="sm"
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              onClick={() => setViewMode("grid")}
              className="rounded-lg"
            >
              <Grid size={16} className="mr-1" />
              Grid
            </Button>
            <Button
              size="sm"
              variant={viewMode === "table" ? "secondary" : "ghost"}
              onClick={() => setViewMode("table")}
              className="rounded-lg"
            >
              <TableIcon size={16} className="mr-1" />
              Table
            </Button>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="gap-2 bg-background/50 backdrop-blur-sm border-border/50 hover:bg-background/80 transition-all duration-200"
            onClick={() => setIsProjectDialogueOpen(true)}
          >
            <PlusCircle className="w-4 h-4" />
            New Space
          </Button>
        </div>
      </motion.div>

      {/* Search and Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-96">
            <Search
              className="absolute left-3 top-1/2 transform z-10 -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            <Input
              placeholder="Search spaces..."
              className="pl-10 bg-background/50 backdrop-blur-sm border-border/50 focus-visible:ring-primary/20"
              onChange={(e) => debouncedSearch(e.target.value)}
            />
          </div>

          <Popover open={filterOpen} onOpenChange={setFilterOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "shrink-0 bg-background/50 backdrop-blur-sm border-border/50 hover:bg-background/80 transition-all duration-200",
                  filterOpen &&
                    "bg-primary/5 border-primary/50 shadow-sm ring-1 ring-primary/20"
                )}
              >
                <motion.div
                  animate={{ rotate: filterOpen ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  <SlidersHorizontal
                    size={16}
                    className={cn(
                      "text-muted-foreground transition-colors duration-200",
                      filterOpen && "text-primary"
                    )}
                  />
                </motion.div>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-[280px] p-0 bg-background/95 backdrop-blur-xl border border-border/50 shadow-lg"
              sideOffset={8}
              align="end"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="divide-y divide-border/50"
              >
                {/* Header */}
                <div className="p-3 bg-muted/30">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-semibold text-sm">Filter Projects</h4>
                      <p className="text-xs text-muted-foreground">
                        {Object.values(selectedFilters).some(
                          (value) => value !== "all"
                        )
                          ? "Filters applied"
                          : "No filters applied"}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setSelectedFilters({
                          date: "all",
                          status: "all",
                          type: "all",
                        })
                      }
                      className="h-7 px-2 text-xs hover:bg-background/80"
                    >
                      Clear all
                    </Button>
                  </div>
                </div>

                {/* Filter Sections */}
                <div className="p-3 space-y-3">
                  {/* Date Filter */}
                  <div className="space-y-1.5">
                    <Label htmlFor="date" className="text-sm">
                      Date Range
                    </Label>
                    <Select
                      value={selectedFilters.date}
                      onValueChange={(value) =>
                        setSelectedFilters((prev) => ({ ...prev, date: value }))
                      }
                    >
                      <SelectTrigger id="date" className="h-8 text-sm">
                        <SelectValue placeholder="Select date range" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          { label: "All Time", value: "all" },
                          { label: "Last 7 Days", value: "7days" },
                          { label: "Last 30 Days", value: "30days" },
                          { label: "Last 90 Days", value: "90days" },
                        ].map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Status Filter */}
                  <div className="space-y-1.5">
                    <Label htmlFor="status" className="text-sm">
                      Status
                    </Label>
                    <Select
                      value={selectedFilters.status}
                      onValueChange={(value) =>
                        setSelectedFilters((prev) => ({
                          ...prev,
                          status: value,
                        }))
                      }
                    >
                      <SelectTrigger id="status" className="h-8 text-sm">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          { label: "All Status", value: "all" },
                          { label: "In Progress", value: "progress" },
                          { label: "Completed", value: "completed" },
                          { label: "Archived", value: "archived" },
                        ].map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Type Filter */}
                  <div className="space-y-1.5">
                    <Label htmlFor="type" className="text-sm">
                      Type
                    </Label>
                    <Select
                      value={selectedFilters.type}
                      onValueChange={(value) =>
                        setSelectedFilters((prev) => ({ ...prev, type: value }))
                      }
                    >
                      <SelectTrigger id="type" className="h-8 text-sm">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          { label: "All Types", value: "all" },
                          { label: "Audio", value: "audio" },
                          { label: "Video", value: "video" },
                          { label: "Document", value: "document" },
                        ].map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-3 bg-muted/30">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setFilterOpen(false)}
                      className="h-7 px-3 text-xs bg-background/50 border-border/50 hover:bg-background/80 transition-colors"
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setFilterOpen(false)}
                      className="h-7 px-3 text-xs bg-primary/90 hover:bg-primary text-primary-foreground shadow-sm transition-all duration-200"
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </motion.div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex items-center gap-2">
          <CustomTabs />
        </div>
      </motion.div>

      {/* Projects Grid/Table */}
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center py-12"
        >
          <Loader />
        </motion.div>
      ) : projects.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <NoProjectsSection />
        </motion.div>
      ) : filteredProjects.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center justify-center py-12 text-center"
        >
          <p className="text-lg font-medium text-muted-foreground">
            No matching projects found
          </p>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </motion.div>
      ) : viewMode === "table" ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <DataTable
            data={filteredProjects}
            columns={ProjectColumns}
            onEditClick={() => {}}
            onDeleteClick={() => {}}
          />
        </motion.div>
      ) : (
        <GridView data={filteredProjects} />
      )}
      <ProjectDialogue
        onAddProject={(project) => {
          dispatch(addProject(project));
          setIsProjectDialogueOpen(false);
        }}
        onClose={() => setIsProjectDialogueOpen(false)}
        defaultOpen={isProjectDialogueOpen}
      />
    </div>
  );
};

export default ProjectList;
