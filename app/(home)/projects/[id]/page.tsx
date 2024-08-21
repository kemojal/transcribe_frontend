"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Player } from "@/components/AudioPlayer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BASEURL } from "@/constants";
import { ProjectDropdown } from "@/components/Dropdowns/ProjectDropdown";
import { FileDialogue } from "@/components/Dialogues/FileDialogue";
import { FileDropzone } from "@/components/FileDropzone";
import { bytesToMegabytes, formatDate } from "@/utils";
import SideProjectTabs from "@/components/SideProjectTabs";
import ContinousLoader from "@/components/ContinousLoader";
import FileItem from "@/components/File/FileItem";
import FileUploader from "@/components/File/FileUploader";
import FileList from "@/components/File/FileList";


const getAudioDuration = (url: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    const audio = new Audio(url);
    audio.onloadedmetadata = () => {
      resolve(audio.duration); // Duration in seconds
    };
    audio.onerror = () => reject(new Error("Failed to load audio"));
  });
};

const fetchFileSize = async (url: string): Promise<number> => {
  try {
    const response = await axios.get(url, {
      responseType: "blob",
    });
    return response.headers["content-length"] / 1024 / 1024; // Size in MB
  } catch (error) {
    console.error("Error fetching file size:", error);
    return 0; // Return 0 if there's an error
  }
};

// Function to parse the transcription text
const parseTranscriptionText = (text: string) => {
  const regex = /(\d{2}:\d{2}:\d{2},\d{3} --> \d{2}:\d{2}:\d{2},\d{3})\s*(.*)/g;
  const entries = [];
  let match;

  while ((match = regex.exec(text)) !== null) {
    const [fullMatch, timestamp, content] = match;
    entries.push({ timestamp, content });
  }

  return entries;
};

const ProjectDetail = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const router = useRouter();
  const [project, setProject] = useState<any>(null);
  const [files, setFiles] = useState<any[]>([]);

  const [fileDurations, setFileDurations] = useState<{ [key: string]: number }>(
    {}
  );
  const [fileSizes, setFileSizes] = useState<{ [key: string]: number }>({});

  const [acceptedFiles, setAcceptedFiles] = useState<any[]>([]);

  // const [uploadProgress, setUploadProgress] = useState<{
  //   [key: string]: number;
  // }>({});

  //   const transcriptionText =
  //     files?.[0]?.transcriptions?.[0]?.transcription_text || "";

  //   const transcriptionEntries = parseTranscriptionText(transcriptionText);

  const [transcriptionEntries, setTranscriptionEntries] = useState<any[]>([]);

  const [currentTranscription, setCurrentTranscription] = useState(null);

  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [transcribing, setTranscribing] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleFileClick = (file) => {
    // const file = files.find((file: any) => file.id === fileId);
    if (file) {
      setSelectedFile(file);
      //   setTranscriptionText(file.transcriptions?.[0]?.transcription_text || "");
      const entries = parseTranscriptionText(
        file?.transcriptions[0]?.transcription_text || ""
      );
      setTranscriptionEntries(entries);
    }
  };

  // const handleTimeUpdate = (currentTime) => {
  //   if (transcriptionEntries.length > 0) {
  //     const currentEntry = transcriptionEntries.find(
  //       (entry) => currentTime >= entry.start && currentTime <= entry.end
  //     );
  //     setCurrentTranscription(currentEntry);
  //   }
  // };

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
          // console.log("projectResponse = ", projectResponse.status);
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
          setSelectedFile(filesResponse.data[0]);
          const entries = parseTranscriptionText(
            filesResponse?.data[0]?.transcriptions[0]?.transcription_text || ""
          );
          setTranscriptionEntries(entries);

          // Fetch durations for each file
          const durations = await Promise.all(
            filesResponse.data.map(async (file: any) => {
              const duration = await getAudioDuration(file.path);
              return { id: file.id, duration };
            })
          );

          const durationMap = durations.reduce(
            (acc: any, { id, duration }: any) => {
              acc[id] = duration;
              return acc;
            },
            {}
          );
          setFileDurations(durationMap);

          // Fetch file sizes for each file
          const sizes = await Promise.all(
            filesResponse.data.map(async (file: any) => {
              const size = await fetchFileSize(file.path);
              return { id: file.id, size };
            })
          );

          const sizeMap = sizes.reduce((acc: any, { id, size }: any) => {
            acc[id] = size;
            return acc;
          }, {});
          setFileSizes(sizeMap);
        } catch (error) {
          console.error(error);
        }
      };

      fetchProject();
    }
  }, [id]);

  //   useEffect(() => {
  //     if (selectedFile) {
  //       handleFileClick(selectedFile);
  //     }
  //   }, [selectedFile]);

  if (!project) {
    return <div>Loading...</div>;
  }

  const transcribeAudio = async (projectId, fileId) => {
    setTranscribing(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }

      const response = await axios.post(
        `${BASEURL}/projects/${projectId}/files/${fileId}/transcriptions/`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("response = ", response);
      if (response.status === 200) {
        alert("Transcription created successfully");
        setTranscribing(false);
      }
      console.log("Transcription created successfully", response.data);
    } catch (error) {
      console.error(
        "Error during transcription:",
        error.response || error.message
      );
    }
  };

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }
      const response = await fetch(`${BASEURL}/projects/${id}/files`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      } else {
        // setOpen(false);
      }

      console.log("responseXXX = ", response);

      const data = await response.json();
      console.log("File uploaded successfully:", data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }

    setSubmitting(false);
  };

  return (
    <div className="min-h-screen ">
      <div className="container px-4 pb-8 mx-auto  ">
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
        <div className="flex w-full">
          <div className="py-4  rounded relative w-full">
            {files && files.length > 0 ? (
              <div className="flex items-center justify-between border-b-[0.5px] border-gray-200 pb-2">
                <h2 className="font-medium ">Files</h2>

                <FileDialogue id={id} />
              </div>
            ) : (
              <></>
            )}

            <div className="grid grid-cols-6  grid-rows-1 gap-0 ">
              <FileList
                files={files}
                selectedFile={selectedFile}
                fileSizes={fileSizes}
                fileDurations={fileDurations}
                acceptedFiles={acceptedFiles}
                submitting={submitting}
                setAcceptedFiles={setAcceptedFiles}
                handleUpload={handleUpload}
                handleFileClick={handleFileClick}
                bytesToMegabytes={bytesToMegabytes}
              />

              <div className="col-span-4 col-start-3">
                <SideProjectTabs
                  selectedFile={selectedFile}
                  transcriptionEntries={transcriptionEntries}
                  currentTranscription={currentTranscription}
                  transcribeAudio={transcribeAudio}
                  transcribing={transcribing}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
