"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import ProjectTable from "./tables/ProjectTable";
import { DataTable } from "./tables/DataTable";
import { ProjectColumns } from "./tables/columns";
import { Button } from "@/components/ui/button";
import { ProjectDialogue } from "./ProjectDialogue";
import { BASEURL } from "@/constants";
import { Input } from "@/components/ui/input";

const ProjectList = () => {
  const router = useRouter();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASEURL}/projects`, {
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
        <h1 className="mt-2 mb-8 font-inter font-extrabold text-2xl leading-5 tracking-normal">
          What are you creating today?
        </h1>

        <div className="flex flex-row items-center gap-4">
          <Button
            onClick={() => {
              router.push("/projects/new");
            }}
          >
            Plan recording
          </Button>
          <Button
            onClick={() => {
              router.push("/transcriptions/new");
            }}
          >
            New Transcription
          </Button>
        </div>
        <div className="flex items-center justify-between bg-white">
          <h1 className="text-lg text-sm">Projects</h1>
          {/* <Button>New Project</Button> */}
          <div className="flex items-center gap-2">
            <ProjectDialogue />

            <Input
              placeholder="Search"
              onChange={(e) => {
                console.log(e.target.value);
              }}
              className="max-w-xs"
            />
          </div>
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
