import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Upload,
  Mic,
  PlayCircle,
  PauseCircle,
  Trash2,
  UploadCloud,
  StopCircle,
} from "lucide-react";
import { BASEURL } from "@/constants";
import MicDefaultIcon from "@/icons/MicDefault";
import MicOnIcon from "@/icons/MicOn";
import RecordingButton from "./RecordingButton";
import AudioFileDetails from "./AudioFileDetails";
import { useAppDispatch } from "@/lib/hooks";
import { addFile } from "@/lib/reducers/fileSlice";
import AudioUploader from "@/components/AudioUploader";
import { motion } from "framer-motion";
import { BsFillRecordFill, BsRecordCircleFill } from "react-icons/bs";

export const FileRecordDialogue = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [time, setTime] = useState(0);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileDuration, setFileDuration] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  //   uploading
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);

  useEffect(() => {
    if (submitting) {
      setUploadProgress(0);
      setUploadComplete(false);
      let progress = 0;

      const uploadInterval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);

        if (progress >= 100) {
          clearInterval(uploadInterval);
          setUploadComplete(true);
        }
      }, 300);
    }
  }, [submitting]);

  const dispatch = useAppDispatch();

  // Function to format the current date and time
  const getFormattedFileName = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const time = now.toTimeString().split(" ")[0]; // Get HH:MM:SS

    return `recording-${day}-${month}-${time}.mp3`;
  };

  const handleRecordingToggle = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.addEventListener(
          "dataavailable",
          handleDataAvailable
        );
        mediaRecorderRef.current.addEventListener("stop", handleStop);
        mediaRecorderRef.current.start();
        setIsRecording(true);
        setTime(0);
      } catch (error) {
        console.error("Error accessing the microphone", error);
      }
    }
  };

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      chunksRef.current.push(event.data);
    }
  };

  const handleStop = async () => {
    const blob = new Blob(chunksRef.current, { type: "audio/webm" });

    setRecordedAudio(blob);
    chunksRef.current = [];

    setFileName(getFormattedFileName()); // Use the formatted file name
    setFileDuration(formatTime(time));
    setFileSize(formatFileSize(blob.size));
  };

  useEffect(() => {
    if (recordedAudio) {
      const audioURL = URL.createObjectURL(recordedAudio);
      audioRef.current = new Audio(audioURL);
      audioRef.current.addEventListener("ended", () => setIsPlaying(false));

      return () => {
        URL.revokeObjectURL(audioURL);
        audioRef.current?.removeEventListener("ended", () =>
          setIsPlaying(false)
        );
      };
    }
  }, [recordedAudio]);

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

  const uploadAudio = async () => {
    if (!recordedAudio) return;

    setSubmitting(true);

    try {
      await handleUpload(recordedAudio);
      setOpen(false);
      deleteAudio();
    } catch (error) {
      console.error("Error uploading file:", error);
    }

    setSubmitting(false);
  };

  const handleUpload = async (file: File) => {
    try {
      setSubmitting(true);
      const renamedFile = new File([file], fileName, {
        type: file.type,
        lastModified: file.lastModified,
      });
      await dispatch(addFile({ projectId: id, file: renamedFile })).unwrap();
      // Optionally, you can show a success message here
    } catch (error) {
    } finally {
      // setSubmitting(false);
      setOpen(false);
      setSubmitting(false);
    }
  };

  const formatTime = (timeInTenths: number) => {
    const minutes = Math.floor(timeInTenths / 600);
    const seconds = Math.floor((timeInTenths % 600) / 10);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + " KB";
    else return (bytes / 1048576).toFixed(2) + " MB";
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex items-center justify-center gap-1 max-w-[120px] border-[1px] border-gray-300 rounded-md py-2 px-4 text-red-500 hover:bg-gray-100 p-2 rounded-xl text-sm font-normal">
        {/* <Button> */}
        {/* <span>
          <BsRecordCircleFill color="#ff0000" className="mr-2 " />{" "}
        </span> */}
        <span>
          <BsFillRecordFill color="#ff0000" className="" />{" "}
        </span>
        Record
        {/* </Button> */}
      </DialogTrigger>
      <DialogContent className={`${recordedAudio ? "sm:max-w-[600px]" : ""}`}>
        <DialogHeader>
          <DialogTitle className="py-4">
            {recordedAudio
              ? "Upload the recorded audio"
              : "Record audio to transcribe"}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center py-4">
          {recordedAudio ? (
            <div className="relative rounded-xl w-full">
              <AudioFileDetails
                fileName={fileName}
                duration={fileDuration}
                fileSize={fileSize}
                onPlay={playAudio}
                onDelete={deleteAudio}
                onUpload={uploadAudio}
                isPlaying={isPlaying}
                submitting={submitting}
              />
              {submitting && (
                <div className="w-full mt-3 text-muted-foreground">
                  <div className="flex items-center justify-between mb-2">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>

                  <motion.div
                    className="h-3 bg-blue-500 rounded-xl"
                    initial={{ width: "0%" }}
                    animate={{ width: `${uploadProgress}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </div>
              )}
            </div>
          ) : (
            <RecordingButton
              handleRecordingToggle={handleRecordingToggle}
              isRecording={isRecording}
              time={time}
              setTime={setTime}
            />
          )}
          {/* {submitting && <p>Uploading...</p>} */}
        </div>
      </DialogContent>
    </Dialog>
  );
};
