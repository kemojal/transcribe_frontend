"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { BASEURL } from "@/constants";

const ProjectForm = () => {
  const router = useRouter();
  const [name, setName] = useState("");

  const handleCreateProject = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${BASEURL}/projects`,
        {
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      router.push("/projects");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Create Workspace</h2>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Create Workspace
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <button
            onClick={handleCreateProject}
            className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700"
          >
            Create Workspace
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;
