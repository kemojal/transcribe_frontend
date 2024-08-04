"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import ProjectTable from "./tables/ProjectTable";
import { DataTable } from "./tables/DataTable";
import { ProjectColumns } from "./tables/columns";
import { Button } from "@/components/ui/button";
import { ProjectDialogue } from "./ProjectDialogue";

const ProjectList = () => {
  const router = useRouter();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/projects", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProjects(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="container px-4 py-8 mx-auto">
        <div className="flex items-center justify-between bg-white">
          <h1 className="text-lg text-sm">Projects</h1>
          {/* <Button>New Project</Button> */}
          <ProjectDialogue />
        </div>

        <div className="grid gap-4 mt-2">
          <DataTable data={projects} columns={ProjectColumns} />
        </div>
      </div>
      {/* {JSON.stringify(projects)} */}
      {/* <ProjectTable projects={projects} /> */}
    </div>
  );
};

export default ProjectList;
