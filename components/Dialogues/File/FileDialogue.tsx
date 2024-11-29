import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Upload,
  Mic,
  StopCircle,
  PlayCircle,
  PauseCircle,
  Clock4,
  FileAudio,
  Globe2,
  AudioLines,
  UploadCloud,
  PauseIcon,
  Trash2,
} from "lucide-react";
import { FileDropzone } from "../../FileDropzone";
import { bytesToMegabytes } from "@/utils";
import { useReactMediaRecorder } from "react-media-recorder";
import { ExampleComponent } from "../../ExampleComponent";
import { BASEURL } from "@/constants";
// import { parseBlob } from "audio-metadata";
import { formatDuration } from "@/utils/file";
import { SelectOption } from "@/components/SelectOption";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import GDrivePicker from "./GDrivePicker";
import DropboxChooser from "react-dropbox-chooser";
import DropboxIcon from "@/icons/DropboxIcon";
import { motion, AnimatePresence } from "framer-motion";
import PlayCircleIcon from "@/icons/PlayCircle";
import VolumeHighIcon from "@/icons/VolumeHigh";
import FileUploadIcon from "@/icons/FileUploadIcon";
import AudioUploader from "@/components/AudioUploader";
import { useAppDispatch } from "@/lib/hooks";
import { addFile } from "@/lib/reducers/fileSlice";

// Enhanced background styles with premium effects
const backgroundStyles = `
@keyframes gradientAnimation {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.premium-dialog {
  backdrop-filter: blur(20px);
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.95),
    rgba(255, 255, 255, 0.85)
  );
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.5) inset;
}

.animated-background {
  background: linear-gradient(120deg, 
    rgba(99, 102, 241, 0.08),
    rgba(168, 85, 247, 0.08),
    rgba(236, 72, 153, 0.08)
  );
  background-size: 300% 300%;
  animation: gradientAnimation 15s ease infinite;
}

.hover-scale {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hover-scale:hover {
  transform: scale(1.02);
}

.file-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  box-shadow: 
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06),
    0 0 0 1px rgba(255, 255, 255, 0.5) inset;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.file-card:hover {
  box-shadow: 
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04),
    0 0 0 1px rgba(255, 255, 255, 0.6) inset;
  transform: translateY(-2px);
}

.premium-button {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.2);
}

.premium-button:hover {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  transform: translateY(-1px);
  box-shadow: 
    0 8px 12px -2px rgba(99, 102, 241, 0.3),
    0 0 0 2px rgba(255, 255, 255, 0.1) inset;
}

.premium-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px -1px rgba(99, 102, 241, 0.2);
}

.upload-zone {
  border: 2px dashed rgba(99, 102, 241, 0.3);
  background: rgba(99, 102, 241, 0.03);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.upload-zone:hover {
  border-color: rgba(99, 102, 241, 0.5);
  background: rgba(99, 102, 241, 0.08);
}

.grid-background {
  background-size: 30px 30px;
  background-image: 
    linear-gradient(to right, rgba(99, 102, 241, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(99, 102, 241, 0.05) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
}

.glow-effect {
  position: relative;
}

.glow-effect::before {
  content: '';
  position: absolute;
  inset: -1px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899);
  border-radius: inherit;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.glow-effect:hover::before {
  opacity: 1;
}

.loading-shimmer {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.6) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
`;

export const FileDialogue = ({ id }) => {
  const [submitting, setSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isRecordingFinished, setIsRecordingFinished] = useState(false);
  const [acceptedFiles, setAcceptedFiles] = useState<any[]>([]);
  const [fileMetadata, setFileMetadata] = useState<any[]>([]); // To store metadata for each file
  const [recordedAudio, setRecordedAudio] = useState<File | null>(null); // Recorded audio state
  const [isPlaying, setIsPlaying] = useState(false); // For play/pause
  const audioRef = React.createRef<HTMLAudioElement>();

  const [fileName, setFileName] = useState("");
  const [fileDuration, setFileDuration] = useState("");
  const [fileSize, setFileSize] = useState("");

  const dispatch = useAppDispatch();

  const { startRecording, stopRecording, mediaBlobUrl, status } =
    useReactMediaRecorder({ audio: true });

  const langOptions = [
    { value: "en-US", label: "English" },
    { value: "fr-FR", label: "French" },
    { value: "de-DE", label: "German" },
    { value: "es-ES", label: "Spanish" },
    { value: "it-IT", label: "Italian" },
    { value: "ja-JP", label: "Japanese" },
    { value: "ko-KR", label: "Korean" },
    { value: "pt-BR", label: "Portuguese" },
    { value: "ru-RU", label: "Russian" },
    { value: "zh-CN", label: "Chinese" },
    { value: "pl-PL", label: "Polish" },
    { value: "uk-UA", label: "Ukrainian" },
    { value: "th-TH", label: "Thai" },
    { value: "vi-VN", label: "Vietnamese" },
    { value: "tr-TR", label: "Turkish" },
    { value: "ar-SA", label: "Arabic" },
    { value: "hi-IN", label: "Hindi" },
    { value: "id-ID", label: "Indonesian" },
    { value: "ms-MY", label: "Malay" },
    { value: "nb-NO", label: "Norwegian" },
    { value: "ro-RO", label: "Romanian" },
    { value: "sv-SE", label: "Swedish" },
  ];

  const handleUpload = async (file: File) => {
    // const formData = new FormData();
    // formData.append("file", file);

    // setSubmitting(true);

    // try {
    //   const token = localStorage.getItem("token");
    //   if (!token) {
    //     console.error("No token found");
    //     return;
    //   }

    //   const response = await fetch(`${BASEURL}/projects/${id}/files`, {
    //     method: "POST",
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //     body: formData,
    //   });

    //   if (!response.ok) {
    //     throw new Error("Failed to upload file");
    //   } else {
    //     setAcceptedFiles([]);
    //     setOpen(false);
    //   }

    //   const data = await response.json();
    //   console.log("File uploaded successfully:", data);
    // } catch (error) {
    //   console.error("Error uploading file:", error);
    // }
    try {
      setSubmitting(true);
      await dispatch(addFile({ projectId: id, file })).unwrap();

      // setSubmitting(false);
      // setAcceptedFiles([]);
      // setOpen(false);

      // Optionally, you can show a success message here
    } catch (error) {
      // Optionally, you can show an error message here
      // setSubmitting(false);
      // setSubmitting(false);
      // setAcceptedFiles([]);
      // setOpen(false);
    } finally {
      // setSubmitting(false);
      setAcceptedFiles([]);
      setOpen(false);
    }

    setSubmitting(false);
  };

  const handleRecordingToggle = () => {
    if (isRecording) {
      console.log("Stopping recording...");
      stopRecording();
      console.log("Recording stopped, status:", status);
      setIsRecordingFinished(true);
    } else {
      console.log("Starting recording...");
      startRecording();
      console.log("Recording started, status:", status);
      setIsRecordingFinished(false);
    }
    setIsRecording(!isRecording);
  };

  useEffect(() => {
    const processRecording = async () => {
      console.log("processRecording", mediaBlobUrl, status);
      if (mediaBlobUrl && status === "stopped") {
        const blob = await fetch(mediaBlobUrl).then((res) => res.blob());
        const file = new File([blob], "recorded-audio.wav", {
          type: "audio/wav",
        });
        setRecordedAudio(file);
        setIsRecording(false);
        setIsRecordingFinished(true); // Ensure this flag is set correctly
        // Extract audio metadata
        // const metadata = await parseBlob(blob);
        // setAudioDuration(metadata.duration);
      }
    };

    processRecording();
  }, [mediaBlobUrl, status]);

  useEffect(() => {
    console.log("Recording status changed:", status);
  }, [status]);

  const handleAudioPlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  const deleteAudio = () => {
    setRecordedAudio(null);
    setFileName("");
    setFileDuration("");
    setFileSize("");
    if (audioRef.current) {
      audioRef.current.src = "";
    }
  };

  useEffect(() => {
    const extractMetadata = async () => {
      const metadataArray = await Promise.all(
        acceptedFiles.map(async (file) => {
          const audio = new Audio(URL.createObjectURL(file));
          await new Promise<void>((resolve) => {
            audio.onloadedmetadata = () => {
              resolve();
            };
          });

          const duration = audio.duration;
          return {
            name: file.name,
            size: file.size,
            type: file.type,
            duration: !isNaN(duration)
              ? formatDuration(duration.toFixed(2))
              : "N/A",
            language: "English (US)", // Extract language if applicable or use another method
          };
        })
      );
      setFileMetadata(metadataArray);
    };

    if (acceptedFiles.length > 0) {
      extractMetadata();
    }
  }, [acceptedFiles]);

  useEffect(() => {
    if (!open) {
      setAcceptedFiles([]);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 premium-button text-white px-5 py-2.5 hover-scale glow-effect bg-primary">
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2"
        >
          <CloudArrowUpIcon className="h-4 w-4" />
          <span>Upload</span>
        </motion.span>
      </DialogTrigger>

      <DialogContent
        className={`${
          acceptedFiles.length > 0 ? "sm:max-w-[600px]" : "max-w-3xl"
        } p-0 overflow-hidden rounded-2xl bg-white`}
      >
        <div className="relative">
          <DialogHeader className="p-6 border-b border-gray-100">
            <DialogTitle className="text-2xl font-semibold text-gray-800">
              Upload Audio Files
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Upload your content to transcribe. We support various audio and
              video formats.
            </DialogDescription>
          </DialogHeader>

          <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
            <div className="p-6 space-y-6">
              {acceptedFiles.length > 0 ? (
                fileMetadata.map((fileData, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="file-card group relative overflow-hidden bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <div className="p-4 space-y-3">
                      {/* Header with File Name and Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 min-w-0">
                          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                            <VolumeHighIcon className="w-5 h-5 text-indigo-600" />
                          </div>
                          <h3 className="text-base font-medium text-gray-900 truncate pr-4">
                            {fileData.name}
                          </h3>
                        </div>

                        <div className="flex items-center gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={playAudio}
                            className="rounded-full hover:bg-indigo-50 transition-colors"
                          >
                            <span >
                            {isPlaying ? (
                              <PauseIcon className="w-5 h-5 text-indigo-600" />
                            ) : (
                              <PlayCircleIcon className="w-5 h-5 text-indigo-600" />
                            )}
                            </span>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={deleteAudio}
                            className="p-2 rounded-full hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-5 h-5 text-red-500" />
                          </motion.button>
                        </div>
                      </div>

                      {/* File Metadata */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock4 className="w-4 h-4" />
                          <span>
                            {fileData.duration
                              ? `${fileData.duration}s`
                              : "N/A"}
                          </span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-gray-300" />
                        <div className="flex items-center gap-2 text-gray-600">
                          <FileAudio className="w-4 h-4" />
                          <span>{bytesToMegabytes(fileData.size)} MB</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-gray-300" />
                        <div className="flex items-center gap-2 text-gray-600">
                          <FileAudio className="w-4 h-4" />
                          <span>{fileData.type}</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-gray-300" />
                        <div className="flex items-center gap-2 text-gray-600">
                          <Globe2 className="w-4 h-4" />
                          <span>{fileData.language}</span>
                        </div>
                      </div>

                      {/* Upload Button and Status */}
                      <div className="flex items-center justify-between pt-2">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleUpload(acceptedFiles[index])}
                          disabled={submitting}
                          className="inline-flex items-center px-4 py-2 rounded-xl text-white font-medium bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 disabled:opacity-50 transition-all duration-200 shadow-sm"
                        >
                          <motion.span
                            animate={submitting ? { rotate: 360 } : {}}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="mr-2"
                          >
                            <UploadCloud className="w-4 h-4" />
                          </motion.span>
                          {submitting
                            ? "Processing..."
                            : "Upload to Transcribe"}
                        </motion.button>

                        <div className="text-xs font-medium px-3 py-1 rounded-full bg-indigo-50 text-indigo-600">
                          Ready
                        </div>
                      </div>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </motion.div>
                ))
              ) : (
                <>
                  <FileDropzone setAcceptedFiles={setAcceptedFiles} />

                  {/* Cloud Services Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-700">
                        Import from Cloud Services
                      </h3>
                      <div className="h-[1px] flex-1 bg-gray-100 mx-4" />
                    </div>

                    <div className="flex items-center gap-4">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <GDrivePicker>
                          <div className="w-12 h-12 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex items-center justify-center bg-white hover:bg-gray-50">
                            <svg
                              className="w-6 h-6"
                              viewBox="0 0 87.3 78"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z"
                                fill="#0066da"
                              />
                              <path
                                d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z"
                                fill="#00ac47"
                              />
                              <path
                                d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z"
                                fill="#ea4335"
                              />
                              <path
                                d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z"
                                fill="#00832d"
                              />
                              <path
                                d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z"
                                fill="#2684fc"
                              />
                              <path
                                d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z"
                                fill="#ffba00"
                              />
                            </svg>
                          </div>
                        </GDrivePicker>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <DropboxChooser
                          appKey={"your-uniq-app-key"}
                          success={(files) => onSuccess(files)}
                          cancel={() => onCancel()}
                          multiselect={true}
                          extensions={[".mp4"]}
                        >
                          <div className="w-12 h-12 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex items-center justify-center bg-white hover:bg-gray-50">
                            <svg
                              className="w-6 h-6"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 2L6 6.5L12 11L18 6.5L12 2Z"
                                fill="#0061FF"
                              />
                              <path
                                d="M6 13L12 17.5L18 13L12 8.5L6 13Z"
                                fill="#0061FF"
                              />
                              <path
                                d="M6 19.5L12 24L18 19.5L12 15L6 19.5Z"
                                fill="#0061FF"
                              />
                            </svg>
                          </div>
                        </DropboxChooser>
                      </motion.div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </DialogContent>

      <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(99, 102, 241, 0.3) transparent;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(99, 102, 241, 0.3);
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(99, 102, 241, 0.5);
        }

        .file-card {
          backdrop-filter: blur(8px);
          transition: all 0.2s ease-in-out;
        }

        .file-card:hover {
          transform: translateY(-2px);
        }
      `}</style>
    </Dialog>
  );
};
