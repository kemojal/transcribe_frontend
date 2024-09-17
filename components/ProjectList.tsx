"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { DataTable } from "./tables/DataTable";
import { ProjectColumns } from "./tables/columns";
import { Button } from "@/components/ui/button";
import { ProjectDialogue } from "./Dialogues/ProjectDialogue";
import { BASEURL } from "@/constants";
import { Input } from "@/components/ui/input";
import Loader from "./Loader";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ProjectProps } from "@/types/interfaces";

import { SelectProjectOption } from "@/components/SelectProjectOption";
import { Box, Boxes, ChevronRight } from "lucide-react";
import { ProjectDropdown } from "@/components/Dropdowns/ProjectDropdown";

// import { DeleteProjectModal } from "./Dialogues/DeleteProjectModal";
// import { EditProjectDialogue } from "./Dialogues/EditProjectDialogue";
import {
  fetchProjects,
  addProject,
  updateProject,
  deleteProject,
  // Project,
} from "@/lib/reducers/ProjectSlice";
import { EditProjectDialogue } from "./Dialogues/EditProjectDialogue";
import { DeleteProjectModal } from "./Dialogues/DeleteProjectModal";
import Link from "next/link";
const ProjectList = () => {
  const router = useRouter();
  // const [projects, setProjects] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [selectedProjectOption, setSelectedProjectOption] =
    useState<ProjectProps | null>(null);

  const handleProjectOptionChange = (project: ProjectProps) => {
    console.log("project", project);
    setSelectedProjectOption(project);
  };

  const dispatch = useAppDispatch();
  const { projects, isLoading, error } = useAppSelector(
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

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleAddProject = (newProject: ProjectProps) => {
    dispatch(addProject(newProject));
  };

  const handleEditClick = (project: ProjectProps) => {
    setSelectedProject(project);
    // setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (project: ProjectProps) => {
    setSelectedProject(project);
    // setIsDeleteModalOpen(true);
  };

  useEffect(() => {
    if (selectedProjectOption) {
      console.log("selectedProjectOption", selectedProjectOption);
      projects.filter((project) => {
        if (project.id === selectedProjectOption) {
          console.log("project", project);
          setSelectedProject(project);
        }
      });
      // setSelectedProject(null);
    }
  }, [selectedProjectOption]);

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto p-0 bg-white">
        <div className="flex  rounded-tr-xl rounded-tl-xl p-4 pb-0 bg-gradient-to-b from-blue-50 to-white ">
          <h1 className="text-xl font-extrabold text-gray-800 mb-8 tracking-tight">
            What are you creating today?
          </h1>
        </div>

        <div className="flex items-center gap-3 ">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1">
              <Link
                className="text-gray-500 hover:text-indigo-800 flex items-center font-medium"
                href="/projects"
              >
                <span className="mr-1">
                  <Boxes size={16} strokeWidth={1} />
                </span>
                workspaces
              </Link>
              <span>
                <span>
                  <ChevronRight size={20} />
                </span>
              </span>

              <SelectProjectOption
                placeholder="Select file"
                options={projOptions}
                onvalueChange={handleProjectOptionChange}
              />
              <div>
                <span className="flex items-center gap-1">
                  <span className="mr-1">
                    <Boxes size={16} strokeWidth={1} />
                  </span>
                  {projOptions?.length}
                </span>
              </div>
            </div>

            <div>
              <ProjectDropdown />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl   mb-6 mt-2 bg-red-500">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-700 flex items-center">
              <span className="mr-1">
                <Box size={16} strokeWidth={1} />
              </span>
              :: {selectedProject && selectedProject.name}
            </h2>
            <div className="flex items-center gap-4">
              <ProjectDialogue onAddProject={handleAddProject} />
              {/* <Input
                placeholder="Search projects..."
                onChange={(e) => {
                  console.log(e.target.value);
                }}
                className="max-w-xs bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              /> */}
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
                onEditClick={handleEditClick}
                onDeleteClick={handleDeleteClick}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
