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
  Ellipsis,
  FileMusic,
  Trash,
  Upload,
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

  const [currentTranscription, setCurrentTranscription] = useState({});

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

          <div className="grid grid-cols-6  grid-rows-1 gap-4">
            <div className={` ${selectedFile && selectedFile?.path ? "col-span-4 border-r-[0.5px] border-gray-200" : "col-span-6 "}  min-h-screen pr-4 py-4 flex flex-col items-center gap-1`}>
              {files && files.length > 0 ? (
                <>
                  {files.map((file) => {
                    // Calculate file size in MB
                    // const fileSizeMB = bytesToMegabytes(file.size);
                    const fileSizeMB = fileSizes[file.id] || 0;

                    // Get audio duration from state
                    const duration = fileDurations[file.id];

                    return (
                      <div
                        key={file.id}
                        className={`p-2 border-b-[0.5px] border-gray-100 flex items-center justify-between hover:bg-gray-50 rounded-xl cursor-pointer w-full
                        ${
                          selectedFile?.id === file.id
                            ? "bg-blue-200 border-gray-100 border-[0.5px]"
                            : ""
                        }`}
                        onClick={() => handleFileClick(file)}
                      >
                        {/* <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100">
                          <FileMusic size={30} />
                        </div> */}
                        <div className=" w-3/4 flex flex-col ml-2">
                          <p className="font-medium text-lg">{file.name}</p>
                          {/* <Player src={file.path} /> */}

                          <div className="flex items-center gap-2">
                            <span className="text-gray-500 text-xs p-1 rounded flex items-center gap-1">
                              {fileSizeMB.toFixed(2)}MB
                            </span>
                            <span className="text-gray-500 text-xs p-1 rounded flex items-center gap-1">
                              <span>
                                <Clock size={16} />{" "}
                              </span>

                              {duration
                                ? `${Math.floor(duration / 60)}:${Math.floor(
                                    duration % 60
                                  )}`
                                : "-"}
                            </span>

                            <span className="text-gray-500 text-xs p-1 rounded flex items-center gap-1">
                              <span>
                                <CalendarClock size={16} />{" "}
                              </span>
                              : {formatDate(file.created_at)}
                            </span>
                            {/* <span className="text-gray-500 text-xs p-1 rounded">
                          updated:{" "}
                          {file && file?.updated_at
                            ? formatDate(file.updated_at)
                            : "-"}
                        </span> */}
                          </div>

                          {/* <AudioWave url={file.path} /> */}
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          {/* <Button
                            variant={"outline"}
                            className="flex items-center gap-2 text-sm"
                          >
                            <span>
                              <Captions size={16} />
                            </span>
                            Transcribe
                          </Button> */}
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
                    );
                  })}
                </>
              ) : (
                <div className="flex flex-col items-center w-full mt-20">
                  <div className="flex flex-col  items-center justify-center w-full max-w-[800px]">
                    <div className="flex flex-col gap-1 w-full text-center pb-4">
                      <span className="text-2xl font-bold">Get started</span>

                      <span className="text-sm flex items-center gap-2">
                        <span className=" font-medium">No file yet</span>
                        Record something, dive into editing or upload files to
                        use in this project.
                      </span>
                    </div>

                    <div className="w-full">
                      {/* <FileDropzone
                        setAcceptedFiles={setAcceptedFiles}
                        //   onAcceptedFiles={handleAcceptedFiles}
                      /> */}
                      {acceptedFiles && acceptedFiles.length > 0 ? (
                        <div>
                          <div className="flex items-center">
                            {acceptedFiles.map((file) => (
                              <div
                                key={file.name}
                                className="flex items-center gap-2 justify-between  w-full relative"
                              >
                                <div className="flex items-center gap-2">
                                  <span className=" ">{file.name}</span>
                                  <span className="text-gray-500 bg-gray-100 px-2 py-1 rounded-md text-xs">
                                    {bytesToMegabytes(file.size)} MB
                                  </span>
                                  <span className="text-gray-500 bg-gray-100 px-2 py-1 rounded-md text-xs">
                                    {file.type}
                                  </span>
                                </div>

                                <Button
                                  onClick={() => {
                                    handleUpload(acceptedFiles[0]);
                                  }}
                                >
                                  Upload
                                </Button>

                                {submitting && (
                                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-xl opacity-50">
                                    Uploading... audio
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
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
              <div className="col-span-2 col-start-5">
                <div className="p-4 border-b-[0.5px] border-gray-100 font-bold ">
                  {/* Transcription */}
                  <div>{selectedFile?.name || "Transcription"}</div>
                  <div>
                    <span className="text-xs font-normal">
                      Duration: {selectedFile?.duration || 0} seconds
                    </span>
                    <span className="text-xs font-normal">
                      Size: {selectedFile?.size || 0} bytes
                    </span>
                    <span className="text-xs font-normal">
                      Created: {formatDate(selectedFile?.created_at)}
                    </span>
                    {/* <span className="text-xs font-normal">
                      modified: {formatDate(selectedFile?.updated_at)}
                    </span> */}
                  </div>
                </div>
                <div className="transcription-container flex flex-col items-center justify-between w-full h-[650px] overflow-hidden relative">
                  <div className=" relative w-full h-[650px]  rounded overflow-auto pb-20 pt-4">
                    {transcriptionEntries && transcriptionEntries.length > 0 ? (
                      transcriptionEntries.map((entry, index) => (
                        <div key={index} className="transcription-entry">
                          <div className="timestamp">{entry.timestamp}</div>
                          <div className="text">{entry.content}</div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center flex flex-col items-center  gap-8 bg-gray-100 py-20 rounded-xl">
                        No transcription yet
                        <Button
                          className="flex items-center gap-2"
                          variant={"outline"}
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
                  {/* {selectedFile?.path} */}

                  <div className="flex bg-gray-100 w-full p-2 rounded absolute bottom-0 left-0 z-10">
                    {selectedFile && selectedFile?.path && (
                      <Player src={selectedFile?.path} width={400} />
                    )}
                  </div>

                  {/* <Player src={selectedFile?.path} /> */}
                  {/* <audio src={selectedFile?.path} /> */}
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
