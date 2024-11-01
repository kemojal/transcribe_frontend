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
import { Box, Boxes, ChevronRight, Search } from "lucide-react";
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
const ProjectList = () => {
  const router = useRouter();

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
        <div className="flex items-center justify-between mb-8">
          <div className="relative flex-1 max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            
            <Input placeholder="Search spaces..." className="pl-10 h-11 rounded-full bg-background"/>
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
        <div className=" p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-700 flex items-center">
              <Box size={20} className="mr-2" />
              {selectedProject ? selectedProject.name : "Browse Spaces"}
            </h2>
            <div className="flex items-center space-x-4">
              <ProjectDialogue onAddProject={handleAddProject} />
            </div>
          </div>
          <div className="relative">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
                <Loader />
              </div>
            ) : (
              <DataTable
                data={projects}
                columns={ProjectColumns}
                onEditClick={() => {}}
                onDeleteClick={() => {}}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
