"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DataTable } from "./tables/DataTable";
import { ProjectColumns } from "./tables/columns";
import { Button } from "@/components/ui/button";
import { ProjectDialogue } from "./Dialogues/ProjectDialogue";
import { Input } from "@/components/ui/input";
import Loader from "./Loader";
import type { ProjectProps } from "@/types/interfaces";
import { Box, Search } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  fetchProjects,
  addProject,
  setCurrentProject,
} from "@/lib/reducers/ProjectSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProjectList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const [selectedProjectOption, setSelectedProjectOption] =
    useState<ProjectProps | null>(null);

  const dispatch = useAppDispatch();
  const { projects, currentProject, isLoading } = useAppSelector(
    (state) => state.project
  );
  const [selectedProject, setSelectedProject] = useState<ProjectProps | null>(
    null
  );

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
      projects.filter((project) => {
        if (project.id === selectedProjectOption) {
          setSelectedProject(project);
          dispatch(setCurrentProject(project));
        }
      });
    }
  }, [selectedProjectOption, projects, dispatch]);

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-8">
        <div className="relative flex-1 max-w-2xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search for people, tags, folders, Spaces, and Looms"
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

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Browse Spaces</h1>
        <Button
          onClick={() =>
            document
              .querySelector<HTMLButtonElement>("[data-new-project]")
              ?.click()
          }
          className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          New Space
        </Button>
      </div>

      <Tabs defaultValue="open" className="mb-6">
        <TabsList>
          <TabsTrigger value="open">Open</TabsTrigger>
          <TabsTrigger value="closed">Closed</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="relative bg-background rounded-lg">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
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

      {/* Hidden button for opening the new project dialog */}
      <div className="hidden">
        <ProjectDialogue data-new-project onAddProject={handleAddProject} />
      </div>
    </div>
  );
}
