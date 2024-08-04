"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Player } from "@/app/components/AudioPlayer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowDownFromLine,
  ArrowDownToLine,
  Captions,
  ChevronLeft,
  ChevronRight,
  Ellipsis,
  Trash,
  Upload,
} from "lucide-react";
import { BASEURL } from "@/constants";
import { ProjectDropdown } from "@/app/components/Dropdowns/ProjectDropdown";
import { FileDialogue } from "@/app/components/Dialogues/FileDialogue";
import { FileDropzone } from "@/app/components/FileDropzone";

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
          const projectResponse = await axios.get(`${BASEURL}/projects/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("projectResponse = ", projectResponse.status);
          //   projectResponse.catch(function (error) {
          //     if (error.response) {
          //       console.log(error.response.data);
          //       console.log(error.response.status);
          //       console.log(error.response.headers);
          //     }
          //   })
          setProject(projectResponse.data);

          const filesResponse = await axios.get(
            `${BASEURL}/projects/${id}/files`,
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
    <div className="min-h-screen bg-white">
      <div className="container px-4 py-8 mx-auto">
        <div className="flex items-center gap-3 ">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1">
              <Link
                className="text-gray-500 hover:text-indigo-800 flex items-center font-medium"
                href="/projects"
              >
                {/* <span>
                <ChevronLeft size={20} />
            </span> */}
                projects
              </Link>
              <span>
                <span>
                  <ChevronRight size={20} />
                </span>
              </span>
              <span className="">{project.name}</span>
            </div>

            <div>
              <ProjectDropdown />
            </div>
          </div>
        </div>
        <div className="p-4 mt-4 bg-white rounded">
          {files && files.length > 0 ? (
            <div className="flex items-center justify-between border-b-1 border-gray-100 pb-2">
              <h2 className="font-medium ">Files</h2>

              <FileDialogue />
            </div>
          ) : (
            <></>
          )}

          {files && files.length > 0 ? (
            <>
              {files.map((file) => (
                <div
                  key={file.id}
                  className="p-2 border-b flex items-center justify-between"
                >
                  <div className=" w-3/4 flex flex-col  gap-1 text-sm">
                    <p>{file.name}</p>
                    <Player src={file.path} />

                    {/* <AudioWave url={file.path} /> */}
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Button
                      variant={"outline"}
                      className="flex items-center gap-2 text-sm"
                    >
                      <span>
                        <Captions size={16} />
                      </span>
                      Transcribe
                    </Button>
                    <Button
                      variant={"outline"}
                      className="flex items-center gap-2 w-8 h-8"
                    >
                      <span>
                        <ArrowDownToLine size={16} />
                      </span>
                      {/* <span>Download</span> */}
                    </Button>
                    <Button
                      variant={"outline"}
                      className="flex items-center gap-2 w-8 h-8"
                    >
                      <span>
                        <Trash size={16} />
                      </span>
                      {/* Remove */}
                    </Button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="flex flex-col items-center w-full mt-20">
              <div className="flex flex-col  items-center justify-center w-full max-w-[800px]">
                <div className="flex flex-col gap-1 w-full text-center pb-4">
                  <span className="text-2xl font-bold">Get started</span>

                  <span className="text-sm flex items-center gap-2">
                    <span className=" font-medium">No file yet</span>
                    Record something, dive into editing or upload files to use
                    in this project.
                  </span>
                </div>

                <div className="w-full">
                  <FileDropzone />
                </div>
                {/* <Button
                onClick={() => router.push(`/projects/${id}/upload`)}
                className="px-4 py-2 mt-4 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700"
              >
                Upload
              </Button> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
