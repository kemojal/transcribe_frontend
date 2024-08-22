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
const ProjectList = () => {
  const router = useRouter();
  // const [projects, setProjects] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const { projects, isLoading, error } = useAppSelector(
    (state) => state.project
  );
  const [selectedProject, setSelectedProject] = useState<ProjectProps | null>(
    null
  );
  // const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  // const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // const [selectedProject, setSelectedProject] = useState(null);
  // const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  // const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // useEffect(() => {
  //   const fetchProjects = async () => {
  //     setIsLoading(true);
  //     try {
  //       const token = localStorage.getItem("token");
  //       const response = await axios.get(`${BASEURL}/projects`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //         timeout: 3000,
  //       });
  //       setIsLoading(false);
  //       console.log("Project response status = ", response.status);
  //       console.log("Project response projectsXXX = ", response);
  //       setProjects(response.data);
  //     } catch (error) {
  //       if (error.code === "ECONNABORTED") {
  //         console.error("Request timed out:", error.message);
  //       } else {
  //         setIsLoading(false);
  //         console.error(
  //           "Error fetching projects:",
  //           error.response || error.message || error
  //         );
  //       }
  //     }
  //     setIsLoading(false);
  //   };
  //   fetchProjects();
  // }, []);

  // const addProject = (newProject) => {
  //   setProjects((prevProjects) => [...prevProjects, newProject]);
  // };

  // const handleEditClick = (project) => {
  //   setSelectedProject(project);
  //   setIsEditDialogOpen(true);
  // };

  // const handleDeleteClick = (project) => {
  //   setSelectedProject(project);
  //   setIsDeleteModalOpen(true);
  // };

  // const handleUpdateProject = (updatedProject) => {
  //   alert("Project updated");
  //   setProjects((prevProjects) =>
  //     prevProjects.map((project) =>
  //       project.id === updatedProject.id ? updatedProject : project
  //     )
  //   );
  // };

  // const handleDeleteProject = (deletedProjectId) => {
  //   setProjects((prevProjects) =>
  //     prevProjects.filter((project) => project.id !== deletedProjectId)
  //   );
  // };

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

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto p-0 bg-white">
        <div className="flex  rounded-tr-xl rounded-tl-xl p-4 pb-0 bg-gradient-to-b from-blue-50 to-white ">
          <h1 className="text-xl font-extrabold text-gray-800 mb-8 tracking-tight">
            What are you creating today?
          </h1>
        </div>

        <div className="bg-white rounded-xl  px-4 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-700">Projects</h2>
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
        {/* {isEditDialogOpen && selectedProject && (
          <EditProjectDialogue
            project={selectedProject}
            onClose={() => setIsEditDialogOpen(false)}
            onUpdate={handleUpdateProject}
          />
        )}
        {isDeleteModalOpen && selectedProject && (
          <DeleteProjectModal
            project={selectedProject}
            onClose={() => setIsDeleteModalOpen(false)}
            onDelete={handleDeleteProject}
          />
        )} */}
      </div>
    </div>
  );
};

export default ProjectList;
