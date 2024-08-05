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

  const transcribeAudio = async (projectId: number, fileId: number) => {
    setTranscribing(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BASEURL}/projects/${id}/files/${fileId}/transcriptions/`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response = ", response);
    } catch (error) {
      console.error(error);
    }
    setTranscribing(false);
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

          <div className="grid grid-cols-6  grid-rows-1 gap-1">
            <div
              className={` ${
                selectedFile && selectedFile?.path
                  ? "col-span-4 border-r-[1px] border-gray-300"
                  : "col-span-6"
              } min-h-screen pr-6 py-6 flex flex-col items-center gap-1`}
            >
              {files && files.length > 0 ? (
                <div className="w-full flex flex-col gap-4">
                  {files.map((file) => {
                    const fileSizeMB = fileSizes[file.id] || 0;
                    const duration = fileDurations[file.id];

                    return (
                      <div
                        key={file.id}
                        className={` p-4 border-[0.5px] border-gray-200 rounded-lg flex items-center justify-between hover:bg-gray-100 cursor-pointer transition-colors duration-200
            ${
              selectedFile?.id === file.id ? "bg-blue-50 border-blue-300" : ""
            }`}
                        onClick={() => handleFileClick(file)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                            <FileMusic size={24} className="text-gray-600" />
                          </div>
                          <div className="min-w-[80%] flex  gap-2 flex items-center gap-2">
                            <p className="font-semibold  text-gray-800">
                              {file.name}
                            </p>
                            <div className="flex  gap-1 text-sm text-gray-500 min-w-[200px] bg-red-t00 ">
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
                            className="flex items-center justify-center p-2 rounded-md hover:bg-gray-100 transition-colors"
                          >
                            <ArrowDownToLine size={16} />
                            Download
                          </Button>
                          <Button
                            variant="outline"
                            className="flex items-center justify-center p-2 rounded-md hover:bg-gray-100 transition-colors"
                          >
                            <Trash size={16} />
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

            {selectedFile && selectedFile?.path && (
              <div className="col-span-2 col-start-5 py-4 pl-4">
                <div className="p-4 rounded-lg  border border-gray-200 bg-gray-50 rounded-lg  mb-6">
                  {/* Transcription Header */}
                  <div className="text-lg font-semibold text-gray-800">
                    {selectedFile?.name || "Transcription"}
                  </div>
                  <div className="mt-2">
                    {selectedFile?.path && (
                      <Player src={selectedFile?.path} width={380} />
                    )}
                  </div>
                  <div className="mt-4 text-sm text-gray-600 flex items-center gap-2">
                    <span className="block">
                      <span className="font-medium">Duration:</span>{" "}
                      {selectedFile?.duration || 0} seconds
                    </span>
                    <span className="block">
                      <span className="font-medium">Size:</span>{" "}
                      {selectedFile?.size || 0} bytes
                    </span>
                    <span className="block">
                      <span className="font-medium">Created:</span>{" "}
                      {formatDate(selectedFile?.created_at)}
                    </span>
                    {/* Uncomment if needed */}
                    {/* <span className="block">
          <span className="font-medium">Modified:</span> {formatDate(selectedFile?.updated_at)}
        </span> */}
                  </div>
                </div>

                <div className="relative flex flex-col w-full h-[550px] bg-white rounded-lg  border border-gray-200 overflow-hidden pb-8">
                  <div className="relative w-full h-[650px] p-4 overflow-auto">
                    {transcriptionEntries && transcriptionEntries.length > 0 ? (
                      transcriptionEntries.map((entry, index) => (
                        <div
                          key={index}
                          className={`transcription-entry p-4 mb-2 rounded-lg ${
                            currentTranscription &&
                            currentTranscription?.start === entry.start
                              ? "bg-yellow-100 border-l-4 border-yellow-500"
                              : "bg-gray-50"
                          } shadow-xs`}
                        >
                          <div className="text-xs text-gray-500">
                            {entry.timestamp}
                          </div>
                          <div className="mt-1 text-gray-800">
                            {entry.content}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full bg-gray-100 rounded-lg text-gray-600 py-20">
                        <span>No transcription yet</span>
                        <Button
                          className="mt-4 flex items-center gap-2"
                          variant="outline"
                          disabled={
                            !selectedFile || !selectedFile?.path || transcribing
                          }
                          onClick={() => {
                            if (selectedFile) {
                              transcribeAudio(
                                selectedFile?.project_id,
                                selectedFile?.id
                              );
                            }
                          }}
                        >
                          <Captions size={16} />
                          <span>
                            {transcribing ? "Transcribing..." : "Transcribe"}
                          </span>
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="absolute bottom-0 left-0 w-full border-t-[1px] border-gray-200 bg-gray-50 flex flex-col items-center gap-2 p-2">
                    <div className="flex gap-2 items-center text-xs text-gray-600 py-2 border-t-[1px] border-gray-200 bg-gray-100 rounded-t-lg w-full">
                      <Button
                        variant="outline"
                        size="sm"
                        className="py-0 h-8 font-medium"
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="py-0 h-8 font-medium"
                      >
                        <Zap className="h-4 w-4 mr-1" />
                        AI
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
