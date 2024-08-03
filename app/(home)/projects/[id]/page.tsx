"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const ProjectDetail = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const router = useRouter();
  const [project, setProject] = useState<any>(null);
  const [files, setFiles] = useState<any[]>([]);

  useEffect(() => {
    if (id) {
      const fetchProject = async () => {
        try {
          const token = localStorage.getItem("token");
          const projectResponse = await axios.get(
            `http://localhost:8000/projects/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setProject(projectResponse.data);

          const filesResponse = await axios.get(
            `http://localhost:8000/projects/${id}/files`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setFiles(filesResponse.data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchProject();
    }
  }, [id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container px-4 py-8 mx-auto">
        <h1 className="text-3xl font-bold text-center">{project.name}</h1>
        <div className="p-4 mt-8 bg-white rounded shadow-md">
          <h2 className="text-xl font-bold">Files</h2>
          {files.map((file) => (
            <div key={file.id} className="p-2 border-b">
              <p>{file.filename}</p>
              <button
                onClick={() => router.push(`/projects/${id}/files/${file.id}`)}
                className="px-4 py-2 mt-2 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700"
              >
                View File
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() => router.push(`/projects/${id}/upload`)}
          className="px-4 py-2 mt-4 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700"
        >
          Upload File
        </button>
      </div>
    </div>
  );
};

export default ProjectDetail;
