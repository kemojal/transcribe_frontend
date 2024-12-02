"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Player } from "@/components/AudioPlayer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  AudioLines,
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
import {
  bytesToMegabytes,
  fetchFileSize,
  fetchProjectData,
  formatDate,
  getAudioDuration,
  parseTranscriptionText,
} from "@/utils";
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

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  fetchFiles,
  addFile,
  deleteFile,
  editFile,
  getFileById,
} from "@/lib/reducers/fileSlice";
import {
  fetchProjectDetail,
  updateProjectName,
} from "@/lib/reducers/projectDetailSlice";
import Loader from "@/components/Loader";
import { SideTabs } from "@/components/SideProjecTabs/tabs";
import { FileRecordDialogue } from "@/components/Dialogues/File/FileRecordDialogue";
import TableDropdown from "@/components/Dropdowns/TableDropdown";
import Searchbar from "@/components/Searchbar";

// import { fetchProjectDetails } from "@/utils/api";
// import { fetchProject, updateProjectName } from './projectSlice';

const ProjectDetail = ({ params }: { params: { id: string } }) => {
  const id = params.id;

  const dispatch = useAppDispatch();

  const project = useAppSelector((state) => state.projectDetail.data);
  const {
    data: files,
    fetchStatus,

    status,
    error,
  } = useAppSelector((state) => state.files);

  // const { data, isLoading, isError, error } = useProjectData(id);

  // const dispatch = useAppDispatch();
  const router = useRouter();
  // const [project, setProject] = useState<any>(null);
  // const [files, setFiles] = useState<any[]>([]);

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

  const [isEditingName, setIsEditingName] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");

  const searchParams = useSearchParams();
  const currentFileId = searchParams.get("file_id");

  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchProjectDetail(id));
      dispatch(fetchFiles(id));
    }
  }, [id, dispatch]);

  // useEffect(() => {
  //   if (currentFileId) {
  //     dispatch(getFileById(id, currentFileId));
  //   }
  // }, [currentFileId]);
  useEffect(() => {
    // console.log("Files:", files);
    // console.log("Current File ID:", currentFileId);

    if (files.length > 0) {
      if (currentFileId) {
        // If file_id is present, find the corresponding file
        const filteredFile = files.find((file) => file.id === currentFileId);

        if (filteredFile) {
          setSelectedFile(filteredFile);
          setSelectedFileSize(fileSizes[filteredFile.id] || 0);
          const entries = parseTranscriptionText(
            filteredFile.transcriptions[0]?.transcription_text || ""
          );
          setTranscriptionEntries(entries);
        } else {
          console.warn("No matching file found for file_id:", currentFileId);
        }
      } else {
        // Default to the first file if no file_id is present
        const defaultFile = files[0];
        if (defaultFile) {
          setSelectedFile(defaultFile);
          setSelectedFileSize(fileSizes[defaultFile.id] || 0);
          const entries = parseTranscriptionText(
            defaultFile.transcriptions[0]?.transcription_text || ""
          );
          setTranscriptionEntries(entries);
          router.push(`/projects/${id}?file_id=${defaultFile.id}`);
        }
      }
    }
  }, [files, currentFileId, router]);

  const handleSaveProjectName = () => {
    if (project && newProjectName !== project.name) {
      dispatch(updateProjectName({ id, name: newProjectName }));
    }
    setIsEditingName(false);
  };

  useEffect(() => {
    if (project) {
      setNewProjectName(project.name);
    }
  }, [project]);

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

  const handleFileClick = (file: FileProps) => {
    if (file) {
      setSelectedFile(file);
      setSelectedFileSize(fileSizes[file.id] || 0);
      const entries = parseTranscriptionText(
        file?.transcriptions[0]?.transcription_text || ""
      );
      setTranscriptionEntries(entries);
      router.push(`/projects/${id}?file_id=${file.id}`);
    }
  };

  if (!project) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader />
      </div>
    );
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

  const handleUpload = async (file: FileProps) => {
    setSubmitting(true);
    try {
      await dispatch(
        addFile({ projectId: file.project_id.toString(), file })
      ).unwrap();

      setSubmitting(false);

      // Optionally, you can show a success message here
    } catch (error) {
      console.error("Error uploading file:", error);
      // Optionally, you can show an error message here
      setSubmitting(false);
    }
  };

  if (error) return <div>{error.message}</div>;

  if (status === "loading") return <Loader />;

  return (
    <div className="min-h-screen  w-full">
      <div className="w-full px-4 pb-8 mx-auto">
        <div className="flex items-center gap-3 ">
          <div className="flex items-center justify-between w-full border-b-[1px] pb-1 border-gray-100">
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
              <TableDropdown item={project} />
              {/* <ProjectDropdown /> */}
            </div>
          </div>
        </div>

        <div className=" w-full">
          <div className="py-4 rounded relative w-full">
            {files && files.length > 0 ? (
              <ResizablePanelGroup direction="horizontal" className="gap-0">
                <ResizablePanel
                  defaultSize={60}
                  minSize={40}
                  className=" flex flex-col gap-1 px-0 "
                >
                  <div className="flex items-center justify-between border-b-[0.5px] border-gray-200 pb-2 ">
                    {/* <h2 className="font-medium">Files</h2> */}
                    {files && files.length > 0 ? (
                      <div className="w-full flex items-center">
                        <div className="flex items-center gap-1 py-3 gap-2 w-full pr-2">
                          {/* Search Input */}
                          <Searchbar
                            isExpanded={isSearchExpanded}
                            setIsExpanded={setIsSearchExpanded}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                          />

                          {!isSearchExpanded && (
                            <div className="flex items-center gap-2" >
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
                                      onClick={() =>
                                        setFilterTypeFilter("audio")
                                      }
                                    >
                                      Audio Files
                                    </a>
                                    <a
                                      href="#"
                                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                      onClick={() =>
                                        setFilterTypeFilter("video")
                                      }
                                    >
                                      Video Files
                                    </a>
                                    <a
                                      href="#"
                                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                      onClick={() =>
                                        setFilterTypeFilter("document")
                                      }
                                    >
                                      Documents
                                    </a>
                                  </div>
                                )}
                              </div>

                              <FileDialogue id={id} />
                              <FileRecordDialogue id={id} />
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <>loading files...</>
                    )}
                  </div>
                  {/* {JSON.stringify(filesX)} */}
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
                    acceptedFiles={acceptedFiles}
                    submitting={submitting}
                    setAcceptedFiles={setAcceptedFiles}
                    handleUpload={handleUpload}
                    handleFileClick={handleFileClick}
                    fetchStatus={fetchStatus}
                    // handleDeleteFile={handleDeleteFile}
                    // handleEditFile={handleEditFile}
                    bytesToMegabytes={bytesToMegabytes}
                  />
                </ResizablePanel>
                <ResizableHandle withHandle />

                <ResizablePanel defaultSize={40} minSize={40} className="px-4">
                  <SideTabs
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
            ) : (
              <FileUploader
                projectId={id}
                acceptedFiles={acceptedFiles}
                submitting={submitting}
                setAcceptedFiles={setAcceptedFiles}
                handleUpload={handleUpload}
                bytesToMegabytes={bytesToMegabytes}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
