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

// CSS for background animation
const backgroundStyles = `
@keyframes gradientAnimation {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.animated-background {
  background: linear-gradient(120deg, #ff7e5f, #feb47b, #86a8e7, #91eac9);
  background-size: 300% 300%;
  animation: gradientAnimation 8s ease infinite;
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
      <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 ">
        <span>
          {/* <Upload className="mr-2 h-4 w-4" /> */}
          <CloudArrowUpIcon className="mr-2 h-4 w-4" />
        </span>
        Upload
      </DialogTrigger>

      <DialogContent
        className={` overflow-hidden pt-8 px-0 pb-0 bg-gradient-to-b from-primary/30 to-[#F3F4F6]  ${
          acceptedFiles.length > 0 ? "sm:max-w-[600px]" : ""
        }`}
      >
        <DialogHeader className="border-b-1 border-gray-200">
          <DialogTitle className=" flex items-center gap-2 px-4">
            <motion.span
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              {/* <AudioLines className="mr-1 h-5 w-5" /> */}
              <span>
                <FileUploadIcon className="w-6 h-6" />
              </span>
            </motion.span>

            {acceptedFiles.length > 0
              ? "Upload Files to transcribe"
              : " Upload Audio files"}
          </DialogTitle>
          {acceptedFiles.length <= 0 && (
            <DialogDescription className="border-b-[1px] border-gray-50  py-4 px-4">
              Upload your content to transcribe.supports several audio and video
              formats.
              <br />
              <span className="text-xs text-muted-foreground">
                Supported file formats: MP3, MP4, WAV, AAC, M4A, WEBM, ...
              </span>
            </DialogDescription>
          )}
        </DialogHeader>

        <AnimatePresence mode="wait">
          {!isRecording && !isRecordingFinished ? (
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col  justify-center w-full h-full  opacity-90 pb-4"
            >
              {acceptedFiles && acceptedFiles.length > 0 ? (
                <div className="px-4">
                  <div className="px-4"></div>
                  {fileMetadata.map((fileData, index) => (
                    <div
                      key={index}
                      className="flex  flex-col  gap-2 justify-between w-full space-y-2 p-4 border rounded-lg"
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-semibold flex items-center space-x-1">
                          <span>
                            <VolumeHighIcon className="w-6 h-6" />
                          </span>
                          <span>{fileData.name}</span>
                        </div>
                        <div className="flex space-x-1 items-center text-muted-foreground">
                          <Button
                            variant={"ghost"}
                            size={"sm"}
                            onClick={playAudio}
                            className="hover:bg-muted/20 hover:text-primary"
                          >
                            {isPlaying ? (
                              <PauseIcon className="w-6 h-6" />
                            ) : (
                              <PlayCircleIcon className="w-6 h-6" />
                            )}
                            {/* {isPlaying ? "Pause" : "Play"} */}
                          </Button>
                          <Button
                            className="hover:bg-muted/20 hover:text-primary"
                            variant={"ghost"}
                            size={"sm"}
                            onClick={deleteAudio}
                          >
                            <Trash2 className="w-6 h-6" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <p className="flex items-center space-x-2 ">
                          <span>
                            {fileData.duration
                              ? `${fileData.duration} s`
                              : "N/A"}
                          </span>
                        </p>
                        <span>|</span>
                        <p className="flex items-center space-x-2">
                          <span>{bytesToMegabytes(fileData.size)} MB</span>
                        </p>
                        <span>|</span>
                        <p className="flex items-center space-x-2">
                          <span>{fileData.type}</span>
                        </p>
                        <span>|</span>
                        <p className="flex items-center space-x-2">
                          <span>{fileData.language}</span>
                        </p>
                      </div>

                      <div className="pt-2 w-full flex items-center ">
                        <Button
                          onClick={() => handleUpload(acceptedFiles[index])}
                          className="w-auto"
                        >
                          <span
                            className={`${submitting ? "animate-bounce" : ""}`}
                          >
                            <UploadCloud className="mr-2 h-4 w-4" />
                          </span>
                          Upload to transcribe
                        </Button>
                        {/* <Button
                          onClick={handleUpload}
                          className="w-auto"
                          disabled={submitting}
                        >
                          <span className="flex items-center">
                            <motion.div
                              animate={
                                submitting ? { rotate: 360 } : { rotate: 0 }
                              }
                              transition={
                                submitting
                                  ? {
                                      repeat: Infinity,
                                      duration: 1,
                                      ease: "linear",
                                    }
                                  : {}
                              }
                            >
                              <UploadCloud className="mr-2 h-4 w-4" />
                            </motion.div>
                            {submitting
                              ? "Uploading..."
                              : "Upload to transcribe"}
                          </span>
                        </Button> */}
                      </div>
                    </div>
                  ))}
                </div>
              ) : recordedAudio ? (
                // Recorded audio preview after stopping recording
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2 justify-between w-full"
                >
                  <div className="flex items-center gap-2">
                    <span>{recordedAudio.name}</span>
                    <span className="text-gray-500 bg-gray-100 px-2 py-1 rounded-md text-xs">
                      {bytesToMegabytes(recordedAudio.size)} MB
                    </span>
                    <span className="text-gray-500 bg-gray-100 px-2 py-1 rounded-md text-xs">
                      {recordedAudio.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <audio src={mediaBlobUrl} controls ref={audioRef}></audio>
                    <Button onClick={handleAudioPlayPause}>
                      {isPlaying ? (
                        <PauseIcon className="mr-2 h-4 w-4" />
                      ) : (
                        <PlayCircleIcon className="mr-2 h-4 w-4" />
                      )}
                      {isPlaying ? "Pause" : "Play"}
                    </Button>
                    <Button onClick={() => handleUpload(recordedAudio)}>
                      Upload Recording
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.3 }}
                  className="pt-4  px-4"
                >
                  <FileDropzone setAcceptedFiles={setAcceptedFiles} />
                </motion.div>
              )}

              {/* {!isRecordingFinished && (
              <Button className="mt-4" onClick={handleRecordingToggle}>
                <Mic className="mr-2 h-4 w-4" />
                {isRecording ? "Stop Recording" : "Record Audio"}
              </Button>
            )} */}
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              {isRecordingFinished ? (
                <div className="flex flex-col items-center justify-center">
                  <div className="text-center mb-4">
                    <span className="font-semibold text-lg">
                      Recording Finished
                    </span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-center mb-4">
                    <span className="font-semibold text-lg">Recording...</span>
                  </div>
                  <Button
                    onClick={handleRecordingToggle}
                    className="bg-red-500 text-white"
                  >
                    <StopCircle className="mr-2 h-4 w-4" />
                    Stop Recording
                  </Button>
                </>
              )}
            </div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {acceptedFiles && acceptedFiles.length === 0 && (
            <div className="space-y-4 px-2 pb-4 text-sm text-muted-foreground border-b-[0.5px] border-gray-500">
              <p>Pick from Cloud </p>

              <div className="flex items-center space-x-2 ">
                <GDrivePicker />
                <DropboxChooser
                  appKey={"your-uniq-app-key"}
                  success={(files) => this.onSuccess(files)}
                  cancel={() => this.onCancel()}
                  multiselect={true}
                  extensions={[".mp4"]}
                >
                  <div className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-background hover:text-accent-foreground w-12 h-12 rounded-xl p-0 border-gray-100 shadow-sm hover:bg-gray-100">
                    <DropboxIcon />
                  </div>
                </DropboxChooser>
                {/* <GDrivePicker /> */}
                {/* <GDrivePicker /> */}
              </div>
            </div>
          )}
        </AnimatePresence>

        {/* <ExampleComponent /> */}

        {submitting && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-xl opacity-50 w-[calc(100%+24px)] -left-6 -top-6 h-[calc(100%+24px)]">
            <div className="h-full w-full flex flex-col space-y-2 items-center justify-center">
              <AudioUploader isSubmitting={submitting} />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
