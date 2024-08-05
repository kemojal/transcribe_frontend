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
  AudioLines,
  CalendarClock,
  Captions,
  ChevronLeft,
  ChevronRight,
  Clock,
  Copy,
  Ellipsis,
  FileMusic,
  Trash,
  Upload,
  Zap,
} from "lucide-react";
import { BASEURL } from "@/constants";
import { ProjectDropdown } from "@/app/components/Dropdowns/ProjectDropdown";
import { FileDialogue } from "@/app/components/Dialogues/FileDialogue";
import { FileDropzone } from "@/app/components/FileDropzone";
import { bytesToMegabytes, formatDate } from "@/utils";
import SideProjectTabs from "@/app/components/SideProjectTabs";

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

  const handleTimeUpdate = (currentTime) => {
    if (transcriptionEntries.length > 0) {
      const currentEntry = transcriptionEntries.find(
        (entry) => currentTime >= entry.start && currentTime <= entry.end
      );
      setCurrentTranscription(currentEntry);
    }
  };

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
            <div className="flex items-center justify-between border-b-[0.5px] border-gray-200 pb-2">
              <h2 className="font-medium ">Files</h2>

              <FileDialogue id={id} />
            </div>
          ) : (
            <></>
          )}

          <div className="grid grid-cols-6  grid-rows-1 gap-0">
            <div
              className={` ${
                selectedFile && selectedFile?.path
                  ? "col-span-4 border-r-[0.5px] border-gray-200"
                  : "col-span-6"
              } min-h-screen pr-6 py-6 flex flex-col items-center`}
            >
              {files && files.length > 0 ? (
                <div className="w-full flex flex-col gap-1">
                  {files.map((file) => {
                    const fileSizeMB = fileSizes[file.id] || 0;
                    const duration = fileDurations[file.id];

                    return (
                      <div
                        key={file.id}
                        className={` px-4 py-2 border-[0.5px] border-gray-200 rounded flex items-center justify-between  cursor-pointer transition-colors duration-200
           flex-wrap gap-2 ${
             selectedFile?.id === file.id
               ? "bg-blue-50 border-blue-300"
               : "hover:bg-gray-100"
           }`}
                        onClick={() => handleFileClick(file)}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex-shrink-0 w-8 h-8  rounded-md flex items-center justify-center text-white border-[0.5px]  shadow-xs
                            ${
                              selectedFile?.id === file.id
                                ? "bg-blue-100 border-blue-300 "
                                : "bg-gray-100 border-gray-300 "
                            }`}
                          >
                            <FileMusic
                              size={14}
                              className={` ${
                                selectedFile?.id === file.id
                                  ? "text-blue-600 "
                                  : "text-gray-600 "
                              }`}
                            />
                          </div>
                          <div className="min-w-[80%] flex  flex items-center gap-2 flex-wrap">
                            <p className="  text-gray-600 text-sm">
                              {file.name}
                            </p>
                            <div className="flex  gap-1 text-sm text-gray-500 min-w-[200px]  xl:ml-5">
                              <span className="bg-gray-200 px-2 py-1 rounded-md text-xs">
                                {fileSizeMB.toFixed(2)} MB
                              </span>
                              <span className="bg-gray-200 px-2 py-1 rounded-md flex items-center gap-1 text-xs">
                                <Clock size={16} className="text-gray-600" />{" "}
                                {duration
                                  ? `${Math.floor(duration / 60)}:${Math.floor(
                                      duration % 60
                                    )}`
                                  : "-"}
                              </span>
                              <span className="bg-gray-200 px-2 py-1 rounded-md flex items-center gap-1 text-xs">
                                <CalendarClock
                                  size={16}
                                  className="text-gray-600"
                                />{" "}
                                {formatDate(file.created_at)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 text-gray-600">
                          <Button
                            variant="outline"
                            size={"sm"}
                            className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors text-xs text-muted-foreground border-gray-100 h-8 gap-2 "
                          >
                            <ArrowDownToLine size={14} />
                            Download
                          </Button>
                          <Button
                            variant="outline"
                            className="flex items-center justify-center p-2 rounded-md hover:bg-gray-100 transition-colors h-8"
                          >
                            <Trash size={14} />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center w-full mt-20">
                  <div className="flex flex-col items-center justify-center w-full max-w-[800px] text-center">
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-gray-700">
                        Get started
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">No file yet</span> Record
                      something, dive into editing or upload files to use in
                      this project.
                    </p>
                    <div className="w-full mt-6">
                      {acceptedFiles && acceptedFiles.length > 0 ? (
                        <div className="relative">
                          {acceptedFiles.map((file) => (
                            <div
                              key={file.name}
                              className="flex items-center justify-between gap-4 mb-4 p-4 border border-gray-200 rounded-lg shadow-sm"
                            >
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-gray-800">
                                  {file.name}
                                </span>
                                <span className="text-gray-500 bg-gray-100 px-2 py-1 rounded-md text-xs">
                                  {bytesToMegabytes(file.size).toFixed(2)} MB
                                </span>
                                <span className="text-gray-500 bg-gray-100 px-2 py-1 rounded-md text-xs">
                                  {file.type}
                                </span>
                              </div>
                              <Button
                                onClick={() => handleUpload(file)}
                                className="py-1 px-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                              >
                                Upload
                              </Button>
                              {submitting && (
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 rounded-lg">
                                  Uploading... audio
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <FileDropzone setAcceptedFiles={setAcceptedFiles} />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

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
  );
};

export default ProjectDetail;
