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
import { bytesToMegabytes, formatDate } from "@/utils";
import SideProjectTabs from "@/components/SideProjecTabs/SideProjectTabs";
import ContinousLoader from "@/components/ContinousLoader";
import FileItem from "@/components/File/FileItem";
import FileUploader from "@/components/File/FileUploader";
import FileList from "@/components/File/FileList";
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";


import { FileProps } from "@/types/interfaces";

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
  // const dispatch = useAppDispatch();
  const router = useRouter();
  const [project, setProject] = useState<any>(null);
  const [files, setFiles] = useState<any[]>([]);

  const [fileDurations, setFileDurations] = useState<{ [key: string]: number }>(
    {}
  );
  const [fileSizes, setFileSizes] = useState<{ [key: string]: number }>({});

  const [acceptedFiles, setAcceptedFiles] = useState<any[]>([]);

  const [transcriptionEntries, setTranscriptionEntries] = useState<any[]>([]);

  const [currentTranscription, setCurrentTranscription] = useState(null);

  const [selectedFile, setSelectedFile] = useState<FileProps | null>(null);
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
  const handleFilterSelect = (filterTypeFilter: string) => {
    // Implement filtering logic here
    // console.log("Selected filter:", filterTypeFilter);
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

  const handleFileClick = (file: FileProps) => {
    
    if (file) {
      setSelectedFile(file);
      setSelectedFileSize(fileSizes[file.id] || 0);
      const entries = parseTranscriptionText(
        file?.transcriptions[0]?.transcription_text || ""
      );
      setTranscriptionEntries(entries);
    }
  };



  // const { projects, loading, error } = useAppSelector(
  //   (state: RootState) => state.files
  // );

  

  // const handleSelectProject = (id: number) => {
  //   dispatch(selectProject(id));
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

  const transcribeAudio = async (projectId: number, fileId: number) => {
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
                workspaces
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

        <div className=" w-full">
          <div className="py-4 rounded relative w-full">
            <ResizablePanelGroup direction="horizontal" className="gap-4 ">
              <ResizablePanel
                defaultSize={40}
                minSize={20}
                className=" flex flex-col gap-1 px-2"
              >
                <div className="flex items-center justify-between border-b-[0.5px] border-gray-200 pb-2 ">
                  {/* <h2 className="font-medium">Files</h2> */}
                  {files && files.length > 0 ? (
                    <div>
                      <div className="flex items-center gap-1 py-3 flex-wrap gap-2">
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
              </ResizablePanel>
              <ResizableHandle withHandle />

              <ResizablePanel defaultSize={60} className="">
                <SideProjectTabs
                  selectedFile={selectedFile}
                  transcriptionEntries={transcriptionEntries}
                  currentTranscription={currentTranscription}
                  transcribeAudio={transcribeAudio}
                  transcribing={transcribing}
                  selectedFileSizeMB={selectedFileSize}
                  selectedFileDuration={selectedFileDuration}
                />
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
