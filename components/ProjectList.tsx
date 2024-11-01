"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DataTable } from "./tables/DataTable";
import { ProjectColumns } from "./tables/columns";
import { Button } from "@/components/ui/button";
import { ProjectDialogue } from "./Dialogues/ProjectDialogue";
import { BASEURL } from "@/constants";
import { Input } from "@/components/ui/input";
import Loader from "./Loader";
import { ProjectProps } from "@/types/interfaces";

import { SelectProjectOption } from "@/components/SelectProjectOption";
import {
  Box,
  Boxes,
  ChevronRight,
  Columns4,
  Grid,
  LogsIcon,
  Rows4,
  Search,
  Table,
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

// GridView component for rendering projects in grid mode
const GridView = ({ data }: { data: ProjectProps[] }) => {
  return (
    <div className="grid grid-cols-4 gap-4 py-4">
      {data.map((project) => (
        <Card className=" h-60 bg-background shadow-xl rounded-3xl p-6 transition-transform transform hover:scale-105" key={project.id}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/10" />
            <div className="h-3 w-28 bg-muted rounded-md" />
          </div>
          <div className="space-y-3">
            <div className="h-3 w-36 bg-muted rounded-md" />
            <div className="h-3 w-full bg-muted rounded-md" />
          </div>
          <div className="flex gap-3 mt-6">
            <div className="h-3 w-10 bg-muted rounded-md" />
            <div className="h-3 w-10 bg-muted rounded-md" />
            <div className="h-3 w-10 bg-muted rounded-md" />
          </div>
          <div  className="bg-white p-4 shadow rounded-lg mt-4">
            <h3 className="text-lg font-semibold">{project.name}</h3>
            {/* You can add more project details here */}
          </div>
        </Card>
      ))}
    </div>
  );
};

const ProjectList = () => {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const currentUrl = window.location.href;
  //     localStorage.setItem("currentUrl", currentUrl);
  //   }
  // }, [router, ]);

  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  // console.log("searchParams = ", searchParams);

  const [selectedProjectOption, setSelectedProjectOption] =
    useState<ProjectProps | null>(null);

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

  const dispatch = useAppDispatch();
  const { projects, currentProject, isLoading, error } = useAppSelector(
    (state) => state.project
  );
  const [selectedProject, setSelectedProject] = useState<ProjectProps | null>(
    null
  );

  const [projOptions, setProjectOptions] = useState<
    { value: number; label: string }[]
  >([]);

  const toggleViewMode = (mode: "table" | "grid") => {
    setViewMode(mode);
  };

  const tabItems = [
    {
      label: "Open",
      content: (
        <>
          {viewMode === "table" ? (
            <DataTable
              data={projects}
              columns={ProjectColumns}
              onEditClick={() => {}}
              onDeleteClick={() => {}}
            />
          ) : (
            <GridView data={projects} />
          )}
        </>
      ),
    },
    {
      label: "Closed",
      content: (
        <>
          <EmptyTabs
            title="No archived Spaces"
            description="Spaces that are archived will appear here."
          />
        </>
      ),
    },
    {
      label: "Archived",
      content: <></>,
    },
  ];

  useEffect(() => {
    let mapOptions = projects.map((project) => ({
      value: project.id,
      label: project.name,
    }));
    setProjectOptions(mapOptions);
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
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleAddProject = (newProject: ProjectProps) => {
    dispatch(addProject(newProject));
  };

  useEffect(() => {
    if (selectedProjectOption) {
      console.log("selectedProjectOption", selectedProjectOption);
      projects.filter((project) => {
        if (project.id === selectedProjectOption) {
          console.log("project", project);
          setSelectedProject(project);
          dispatch(setCurrentProject(project));
        }
      });
      // setSelectedProject(null);
    }
  }, [selectedProjectOption]);

  return (
    <div className="min-h-screen">
      <div className=" mx-auto">
        {projects?.length > 0 && (
          <div className="flex items-center justify-between mb-8">
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />

              <Input
                placeholder="Search spaces, files, transcriptions,..."
                className="pl-10 h-11 rounded-full bg-background"
              />
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="rounded-full">
                Upgrade
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        )}

        <div className=" py-6 mb-6">
          {projects?.length > 0 && (
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-700 flex items-center">
                <Box size={20} className="mr-2" />
                {selectedProject ? selectedProject.name : "Browse Spaces"}
              </h2>
              <div className="flex items-center space-x-4">
                <ProjectDialogue onAddProject={handleAddProject} />
              </div>
            </div>
          )}

          <div className="relative">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
                <Loader />
              </div>
            ) : (
              <>
                {projects?.length > 0 ? (
                  <CustomTabs
                    items={tabItems}
                    defaultValue="Open"
                    endTabItem={
                      <div className="flex justify-end space-x-2">
                        {/* Buttons to toggle view mode */}
                        <Button
                          className="h-6 w-6 rounded  border-gray-50"
                          size={"sm"}
                          variant={viewMode === "table" ? "default" : "outline"}
                          onClick={() => toggleViewMode("table")}
                        >
                          <span>
                            <LogsIcon size={12} />
                          </span>
                        </Button>
                        <Button
                          className="h-6 w-6 rounded  border-gray-50"
                          size={"sm"}
                          variant={viewMode === "grid" ? "default" : "outline"}
                          onClick={() => toggleViewMode("grid")}
                        >
                          <span>
                            <Columns4 size={12} />
                          </span>
                        </Button>
                      </div>
                    }
                  />
                ) : (
                  <div className="flex items-center justify-center">
                    <NoProjectsSection
                      addProjectButton={
                        <ProjectDialogue onAddProject={handleAddProject} />
                      }
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
