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

const ProjectList = () => {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASEURL}/projects`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 3000,
        });
        setIsLoading(false);
        console.log("Project response status = ", response.status);
        console.log("Project response projects = ", response);
        setProjects(response.data);
      } catch (error) {
        if (error.code === "ECONNABORTED") {
          console.error("Request timed out:", error.message);
        } else {
          setIsLoading(false);
          console.error(
            "Error fetching projects:",
            error.response || error.message || error
          );
        }
      }
      setIsLoading(false);
    };
    fetchProjects();
  }, []);

  const addProject = (newProject) => {
    setProjects((prevProjects) => [...prevProjects, newProject]);
  };

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto p-8 bg-white">
        <div className="flex  rounded-tr-xl rounded-tl-xl p-4 bg-gradient-to-b from-blue-50 to-white ">
          <h1 className="text-xl font-extrabold text-gray-800 mb-8 tracking-tight">
            What are you creating today?
          </h1>
        </div>

        <div className="bg-white rounded-xl  p-4 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-700">Projects</h2>
            <div className="flex items-center gap-4">
              <ProjectDialogue onAddProject={addProject} />
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
              <DataTable data={projects} columns={ProjectColumns} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
