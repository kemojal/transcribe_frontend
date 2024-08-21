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
import { Upload, Mic, StopCircle, PlayCircle, PauseCircle } from "lucide-react";
import { FileDropzone } from "../FileDropzone";
import { bytesToMegabytes } from "@/utils";
import { useReactMediaRecorder } from "react-media-recorder";
import { ExampleComponent } from "../ExampleComponent";
import { BASEURL } from "@/constants";

export const FileDialogue = ({ id }) => {
  const [submitting, setSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isRecordingFinished, setIsRecordingFinished] = useState(false);
  const [acceptedFiles, setAcceptedFiles] = useState<any[]>([]);
  const [recordedAudio, setRecordedAudio] = useState<File | null>(null); // Recorded audio state
  const [isPlaying, setIsPlaying] = useState(false); // For play/pause
  const audioRef = React.createRef<HTMLAudioElement>();

  const { startRecording, stopRecording, mediaBlobUrl, status } =
    useReactMediaRecorder({ audio: true });

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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
        <span>
          <Upload className="mr-2 h-4 w-4" />
        </span>
        Upload
      </DialogTrigger>

      <DialogContent className="overflow-hidden py-8 px-4">
        <DialogHeader className="border-b-1 border-gray-200">
          <DialogTitle>Upload Audio</DialogTitle>
          <DialogDescription>
            Upload your content to transcribe.
          </DialogDescription>
        </DialogHeader>

        {!isRecording && !isRecordingFinished ? (
          <>
            {acceptedFiles && acceptedFiles.length > 0 ? (
              <div>
                <div className="flex items-center">
                  {acceptedFiles.map((file) => (
                    <div
                      key={file.name}
                      className="flex items-center gap-2 justify-between w-full"
                    >
                      {file.type}
                      <div className="flex items-center gap-2">
                        <span>{file.name}</span>
                        <span className="text-gray-500 bg-gray-100 px-2 py-1 rounded-md text-xs">
                          {bytesToMegabytes(file.size)} MB
                        </span>
                        <span className="text-gray-500 bg-gray-100 px-2 py-1 rounded-md text-xs">
                          {file.type}
                        </span>
                      </div>
                      <Button onClick={() => handleUpload(acceptedFiles[0])}>
                        Upload
                      </Button>
                    </div>
                  ))}
                </div>
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
              <FileDropzone setAcceptedFiles={setAcceptedFiles} />
            )}

            {!isRecordingFinished && (
              <Button className="mt-4" onClick={handleRecordingToggle}>
                <Mic className="mr-2 h-4 w-4" />
                {isRecording ? "Stop Recording" : "Record Audio"}
              </Button>
            )}
          </>
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

        <ExampleComponent />

        {submitting && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-xl opacity-50">
            Uploading... audio
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
