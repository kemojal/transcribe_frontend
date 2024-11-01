import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FileDropzone } from "../FileDropzone";
import AudioRecorder from "../AudioRecorder";
import {
  CloudArrowUpIcon,
  XMarkIcon,
  DocumentIcon,
  VideoCameraIcon,
  MusicalNoteIcon,
} from "@heroicons/react/24/outline";
import NoFilesSection from "../NoFilesSection";
import GDrivePicker from "../Dialogues/File/GDrivePicker";

interface FileUploaderProps {
  acceptedFiles: File[];
  submitting: boolean;
  setAcceptedFiles: (files: File[]) => void;
  handleUpload: (file: File) => void;
  bytesToMegabytes: (bytes: number) => number;
}

export default function FileUploader({
  acceptedFiles,
  submitting,
  setAcceptedFiles,
  handleUpload,
  bytesToMegabytes,
}: FileUploaderProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isRecordingOrHasAudio, setIsRecordingOrHasAudio] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen flex py-12 justify-center"
    >
      {/* <motion.div
        className="absolute inset-0 z-0"
        animate={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
        }}
      /> */}
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="backdrop-blur-lg bg-white bg-opacity-30 rounded-3xl border border-white border-opacity-20"
        >
          {/* <h2 className="text-4xl font-bold text-gray-800 mb-2 text-center">
             Get Started
          </h2>
          <p className="text-gray-600 mb-10 text-center text-lg">
            Upload a file or record audio to begin your project.
          </p> */}
          {/* <div className="grid grid-cols-1 gap-8 w-full">
            {!isRecordingOrHasAudio && (
              <AnimatePresence mode="wait">
                {acceptedFiles.length > 0 ? (
                  <motion.div
                    key="file-preview"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FilePreview
                      file={acceptedFiles[0]}
                      bytesToMegabytes={bytesToMegabytes}
                      handleUpload={handleUpload}
                      removeFile={() => setAcceptedFiles([])}
                      submitting={submitting}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="file-dropzone"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FileDropzone setAcceptedFiles={setAcceptedFiles} />
                  </motion.div>
                )}
              </AnimatePresence>
            )}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <AudioRecorder
                projectId="example-project-id"
                setIsRecordingOrHasAudio={setIsRecordingOrHasAudio}
              />
            </motion.div>
          </div> */}
          <NoFilesSection />
        </motion.div>
      </div>
    </motion.div>
  );
}

function FilePreview({
  file,
  bytesToMegabytes,
  handleUpload,
  removeFile,
  submitting,
}) {
  const getFileIcon = (type: string) => {
    if (type.startsWith("audio")) return MusicalNoteIcon;
    if (type.startsWith("video")) return VideoCameraIcon;
    return DocumentIcon;
  };

  const FileIcon = getFileIcon(file.type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white bg-opacity-50 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white border-opacity-20"
    >
      
      <div className="mb-6">
        {file.type.startsWith("audio") ? (
          <div className="bg-indigo-50 rounded-xl p-4">
            <audio controls className="w-full">
              <source src={URL.createObjectURL(file)} type={file.type} />
              Your browser does not support the audio element.
            </audio>
          </div>
        ) : file.type.startsWith("video") ? (
          <div className="bg-indigo-50 rounded-xl p-4">
            <video
              controls
              className="w-full max-h-[300px] aspect-video rounded-xl object-cover"
            >
              <source src={URL.createObjectURL(file)} type={file.type} />
              Your browser does not support the video element.
            </video>
          </div>
        ) : (
          <div className="flex items-center justify-center h-48 bg-indigo-50 rounded-xl">
            <FileIcon className="w-16 h-16 text-indigo-400" />
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-gray-800 text-lg">{file.name}</p>
          <p className="text-sm text-gray-500">
            {bytesToMegabytes(file.size).toFixed(2)} MB • {file.type}
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => handleUpload(file)}
            disabled={submitting}
            className="bg-indigo-600 hover:bg-indigo-700 text-white transition-colors duration-200 flex items-center gap-2"
          >
            <CloudArrowUpIcon className="w-5 h-5" />
            {submitting ? "Uploading..." : "Upload"}
          </Button>
          <Button
            onClick={removeFile}
            variant="outline"
            className="border-indigo-200 text-indigo-600 hover:bg-indigo-50 transition-colors duration-200"
          >
            <XMarkIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
      {submitting && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Progress value={33} className="mt-6" />
        </motion.div>
      )}
    </motion.div>
  );
}
