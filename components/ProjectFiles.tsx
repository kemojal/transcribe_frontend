"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Player } from "@/components/AudioPlayer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Box,
  Boxes,
  ChevronRight,
  CloudUpload,
  FileUpIcon,
  Mic,
  Video,
} from "lucide-react";
import { BASEURL } from "@/constants";
import { ProjectDropdown } from "@/components/Dropdowns/ProjectDropdown";
import { FileDialogue } from "@/components/Dialogues/File/FileDialogue";
import { FileDropzone } from "@/components/FileDropzone";
import { bytesToMegabytes, formatDate, parseTranscriptionText } from "@/utils";
import SideProjectTabs from "@/components/SideProjecTabs/SideProjectTabs";
import ContinousLoader from "@/components/ContinousLoader";
import FileItem from "@/components/File/FileItem";
import FileUploader from "@/components/File/FileUploader";
import FileList from "@/components/File/FileList";
import { Input } from "@/components/ui/input";

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
// const parseTranscriptionText = (text: string) => {
//   const regex = /(\d{2}:\d{2}:\d{2},\d{3} --> \d{2}:\d{2}:\d{2},\d{3})\s*(.*)/g;
//   const entries = [];
//   let match;

//   while ((match = regex.exec(text)) !== null) {
//     const [fullMatch, timestamp, content] = match;
//     entries.push({ timestamp, content });
//   }

//   return entries;
// };

const ProjectFiles = ({ id }: { id: string }) => {
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
  const [selectedFileSize, setSelectedFileSize] = useState(0);
  const [selectedFileDuration, setSelectedFileDuration] = useState(0);
  const [transcribing, setTranscribing] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterTypeFilter, setFilterTypeFilter] = useState("all");

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to toggle filter dropdown
  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  // Function to apply filter based on selection
  const handleFilterSelect = (filterTypeFilter) => {
    // Implement filtering logic here
    console.log("Selected filter:", filterTypeFilter);
    setFilterTypeFilter(filterTypeFilter);
    setFilterOpen(false); // Close dropdown after selection
  };

  // Filter and search logic
  const filteredFiles = files.filter((file) => {
    const matchesSearch = file.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterTypeFilter === "all" || file.type === filterTypeFilter;
    return matchesSearch && matchesFilter;
  });

  const AddFileOptions = [
    {
      title: <FileDialogue id={id} />,
      description:
        "Convert any audio file (mp3, mp4, wav, aac, m4a, webm,...) or video file to text",
      icon: <FileUpIcon size={28} strokeWidth={1} />,
      onClick: () => {
        // setOpen(true);
      },
    },
    {
      title: "Record Audio",
      description:
        "Convert any audio file (mp3, mp4, wav, aac, m4a, webm,...) or video file to text",
      icon: <Mic size={28} strokeWidth={1} />,
      onClick: () => {
        // setOpen(true);
      },
    },
    {
      title: "Audio from Youtube or Cloud",
      description:
        "Transcribe audio or video from Youtube link or any cloud storage (Google Drive, One Drive, Dropbox).",
      icon: (
        <CloudUpload
          size={28}
          className="text-muted-foreground "
          strokeWidth={1}
        />
      ),
      onClick: () => {
        // setOpen(true);
      },
    },
    {
      title: "Smart Meeting Recorder",
      description:
        "Connect your calendar or share URL to automatically record and transcribe meetings.",
      icon: <Video size={28} strokeWidth={1} />,
      onClick: () => {
        // setOpen(true);
      },
    },
  ];

  const handleFileClick = (file) => {
    // const file = files.find((file: any) => file.id === fileId);
    if (file) {
      setSelectedFile(file);
      setSelectedFileSize(fileSizes[file.id] || 0);
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
          setSelectedFileSize(fileSizes[filesResponse.data[0].id] || 0);
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
          setSelectedFileDuration(durationMap[filesResponse.data[0].id] || 0);

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

      const data = await response.json();
    } catch (error) {
      console.error("Error uploading file:", error);
    }

    setSubmitting(false);
  };

  return (
    <div className="min-h-screen  w-full">
      <div className="w-full px-4 pb-8 mx-auto">
        <div className="flex items-center gap-3 ">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1">
              <Link
                className="text-gray-500 hover:text-indigo-800 flex items-center font-medium"
                href="/projects"
              >
                <span className="mr-1">
                  <Boxes size={16} strokeWidth={1} />
                </span>
                spaces
              </Link>
              <span>
                <span>
                  <ChevronRight size={20} />
                </span>
              </span>
              <span className="flex items-center gap-1">
                <span className="mr-1">
                  <Box size={16} strokeWidth={1} />
                </span>
                {project.name}
              </span>
            </div>

            <div>
              <ProjectDropdown />
            </div>
          </div>
        </div>

        {/* <div className="grid grid-cols-4 gap-4 pt-6">
          {AddFileOptions.map((option) => (
            <div
              key={option.title}
              className="flex flex-col items-center gap-4 border border-gray-200 hover:border-gray-300 p-0 rounded-lg shadow-xs  transition-shadow duration-300 ease-in-out overflow-hidden cursor-pointer "
            >
              <div className="w-full flex items-center justify-center bg-gray-50  p-6">
                {option.icon}
              </div>
              <div className="flex flex-col  items-center px-4 pb-4">
                <h2 className="text-lg font-semibold text-gray-600 border-b-[0.5px] border-gray-50 w-full pb-1 text-center">
                  {option.title}
                </h2>
                <p className="text-xs text-muted-foreground text-center pt-1">
                  {option.description}
                </p>
              </div>
            </div>
          ))}
        </div> */}

        <div className=" w-full">
          <div className="py-4 rounded relative w-full">
            <div className="grid grid-cols-6 grid-rows-1 gap-4 ">
              <div className="col-span-2 flex flex-col gap-1">
                <div className="flex items-center justify-between border-b-[0.5px] border-gray-200 pb-2 border-r-[0.5px] border-gray-200">
                  {/* <h2 className="font-medium">Files</h2> */}
                  {files && files.length > 0 ? (
                    <div>
                      <div className="flex items-center gap-1 py-3">
                        {/* Search Input */}
                        <div className="relative flex-grow max-w-6xl z-50 min-w-[310px]">
                          <input
                            type="text"
                            placeholder="Search files..."
                            className=" w-full py-2 px-4 rounded-md border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                        {/* Filter Dropdown */}
                        <div className="relative z-50">
                          {/* <Button
                            size={"sm"}
                            disabled
                            className="flex items-center px-4 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 text-sm"
                            onClick={() => setFilterOpen(!filterOpen)}
                          >
                            Filter
                            <ChevronRight size={16} className="ml-2" />
                          </Button> */}
                          {/* Dropdown Menu */}
                          {filterOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                              <a
                                href="#"
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                onClick={() => setFilterTypeFilter("all")}
                              >
                                All Files
                              </a>
                              <a
                                href="#"
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                onClick={() => setFilterTypeFilter("audio")}
                              >
                                Audio Files
                              </a>
                              <a
                                href="#"
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                onClick={() => setFilterTypeFilter("video")}
                              >
                                Video Files
                              </a>
                              <a
                                href="#"
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                onClick={() => setFilterTypeFilter("document")}
                              >
                                Documents
                              </a>
                            </div>
                          )}
                        </div>
                        <FileDialogue id={id} />
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <FileList
                  files={files.filter(
                    (file) =>
                      file.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) &&
                      (filterTypeFilter === "all" ||
                        (filterTypeFilter === "audio" &&
                          file.path.endsWith(".mp3")) ||
                        (filterTypeFilter === "video" &&
                          file.path.endsWith(".mp4")) ||
                        (filterTypeFilter === "document" &&
                          file.path.endsWith(".pdf")))
                  )}
                  fileLength={files.length}
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
              </div>

              <div className="col-span-4 col-start-3 ">
                <SideProjectTabs
                  selectedFile={selectedFile}
                  transcriptionEntries={transcriptionEntries}
                  currentTranscription={currentTranscription}
                  transcribeAudio={transcribeAudio}
                  transcribing={transcribing}
                  selectedFileSizeMB={selectedFileSize}
                  selectedFileDuration={selectedFileDuration}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectFiles;
