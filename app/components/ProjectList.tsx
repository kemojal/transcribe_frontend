"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

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
    <div className="min-h-screen bg-gray-100">
      <div className="container px-4 py-8 mx-auto">
        <h1 className="text-3xl font-bold text-center">Projects</h1>
        <div className="grid gap-4 mt-8">
          {projects.map((project: any) => (
            <div key={project.id} className="p-4 bg-white rounded shadow-md">
              <h2 className="text-xl font-bold">{project.name}</h2>
              <button
                onClick={() => router.push(`/projects/${project.id}`)}
                className="px-4 py-2 mt-4 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700"
              >
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
