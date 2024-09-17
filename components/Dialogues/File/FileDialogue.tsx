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
} from "lucide-react";
import { FileDropzone } from "../../FileDropzone";
import { bytesToMegabytes } from "@/utils";
import { useReactMediaRecorder } from "react-media-recorder";
import { ExampleComponent } from "../../ExampleComponent";
import { BASEURL } from "@/constants";
import { parseBlob } from "audio-metadata";
import { formatDuration } from "@/utils/file";
import { SelectOption } from "@/components/SelectOption";

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
        setOpen(false);
      }

      const data = await response.json();
      console.log("File uploaded successfully:", data);
    } catch (error) {
      console.error("Error uploading file:", error);
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
            language: "English (United States)", // Extract language if applicable or use another method
          };
        })
      );
      setFileMetadata(metadataArray);
    };

    if (acceptedFiles.length > 0) {
      extractMetadata();
    }
  }, [acceptedFiles]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 ">
        <span>
          <Upload className="mr-2 h-4 w-4" />
        </span>
        Upload
      </DialogTrigger>

      <DialogContent className="overflow-hidden pt-8 px-0 pb-0 bg-[#FAFAFA]">
        <DialogHeader className="border-b-1 border-gray-200">
          <DialogTitle className=" flex items-center gap-2 px-4">
            <span>
              <AudioLines className="mr-1 h-5 w-5" />
            </span>

            {acceptedFiles.length > 0
              ? "Upload Files to transcribe"
              : " Upload Audio files"}
          </DialogTitle>
          {acceptedFiles.length <= 0 && (
            <DialogDescription className="border-b-[1px] border-gray-50  py-4 px-4">
              Upload your content to transcribe.supports several audio and video
              formats.
              <br />
              <span className="text-xs">
                Supported file formats: MP3, MP4, WAV, AAC, M4A, WEBM, FLAC,
                OPUS, AVI, M4V, MPEG, MOV, OGV, MPG, WMV, OGM, OGG, AU, WMA,
                AIFF, OGA
              </span>
            </DialogDescription>
          )}
        </DialogHeader>

        {!isRecording && !isRecordingFinished ? (
          <div className="flex flex-col  justify-center w-full h-full  opacity-90">
            {acceptedFiles && acceptedFiles.length > 0 ? (
              // <div>
              //   <div className="flex items-center">
              //     {acceptedFiles.map((file) => (
              //       <div
              //         key={file.name}
              //         className="flex items-center gap-2 justify-between w-full"
              //       >
              //         {file.type}
              //         <div className="flex items-center gap-2">
              //           <span>{file.name}</span>
              //           <span className="text-gray-500 bg-gray-100 px-2 py-1 rounded-md text-xs">
              //             {bytesToMegabytes(file.size)} MB
              //           </span>
              //           <span className="text-gray-500 bg-gray-100 px-2 py-1 rounded-md text-xs">
              //             {file.type}
              //           </span>
              //         </div>
              //         <Button onClick={() => handleUpload(acceptedFiles[0])}>
              //           Upload
              //         </Button>
              //       </div>
              //     ))}
              //   </div>
              // </div>
              <div className="px-4">
                <div className="px-4"></div>
                {fileMetadata.map((fileData, index) => (
                  <div
                    key={index}
                    className="flex  flex-col  gap-2 justify-between w-full mb-4"
                  >
                    <div className="font-bold text-lg  border-b-[1px] border-gray-50 pb-4 flex items-center gap-2">
                      <span>
                        <AudioLines className="mr-1 h-5 w-5" />
                      </span>
                      {fileData.name}
                    </div>
                    <div className="flex items-center  gap-2 space-x-1 pb-4">
                      <span className="text-gray-500  px-2 rounded-md text-xs flex items-center">
                        <span>
                          <Globe2 className="mr-1 h-5 w-5" />
                        </span>
                        {bytesToMegabytes(fileData.size)} MB
                      </span>
                      <span className="text-gray-500  px-2 rounded-md text-xs flex items-center">
                        <span>
                          <FileAudio className="mr-2 h-4 w-4" />
                        </span>
                        {fileData.type}
                      </span>
                      <span className="text-gray-500  px-2 rounded-md text-xs flex items-center">
                        <span>
                          <Clock4 className="mr-2 h-4 w-4" />
                        </span>
                        {fileData.duration ? `${fileData.duration} s` : "N/A"}
                      </span>
                    </div>
                    <div className="text-gray-500  rounded-md  flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span>
                          <Globe2 className="mr-1 h-5 w-5" />
                        </span>
                        {/* {fileData.language} */}
                        <SelectOption
                          placeholder={fileData.language}
                          options={langOptions}
                        />
                      </div>
                      <div>
                        {/* <SelectOption
                          placeholder={"change"}
                          options={langOptions}
                        /> */}
                        {/* <Button
                          size={"sm"}
                          className="text-xs"
                          variant={"outline"}
                        >
                          Change
                        </Button> */}
                      </div>
                    </div>

                    <div className="pt-4 w-full flex items-center bg-white rounded-md">
                      <Button
                        onClick={() => handleUpload(acceptedFiles[index])}
                        className="w-auto"
                      >
                        <span>
                          <UploadCloud className="mr-2 h-4 w-4" />
                        </span>
                        Upload to transcribe
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : recordedAudio ? (
              // Recorded audio preview after stopping recording
              <div className="flex items-center gap-2 justify-between w-full">
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
                      <PauseCircle className="mr-2 h-4 w-4" />
                    ) : (
                      <PlayCircle className="mr-2 h-4 w-4" />
                    )}
                    {isPlaying ? "Pause" : "Play"}
                  </Button>
                  <Button onClick={() => handleUpload(recordedAudio)}>
                    Upload Recording
                  </Button>
                </div>
              </div>
            ) : (
              <div className="pt-4 pb-12 px-4">
                <FileDropzone setAcceptedFiles={setAcceptedFiles} />
              </div>
            )}

            {/* {!isRecordingFinished && (
              <Button className="mt-4" onClick={handleRecordingToggle}>
                <Mic className="mr-2 h-4 w-4" />
                {isRecording ? "Stop Recording" : "Record Audio"}
              </Button>
            )} */}
          </div>
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

        {/* <ExampleComponent /> */}

        {submitting && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-xl opacity-50">
            Uploading... audio
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
