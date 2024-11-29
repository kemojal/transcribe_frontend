"use client";

import { Button } from "@/components/ui/button";
import FileAudioIcon from "@/icons/FileAudioIcon";
import { bytesToMegabytes } from "@/utils";
import { FileAudio2, Upload, FileIcon, CheckCircle2 } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineCloudUpload } from "react-icons/ai";

const dropzoneVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  hover: { scale: 1.02 },
};

const iconVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.2,
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

const particleVariants = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0 },
};

export const FileDropzone = ({ setAcceptedFiles }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setAcceptedFiles(acceptedFiles);
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 2000);

    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("File reading was aborted");
      reader.onerror = () => console.log("File reading has failed");
      reader.onload = () => {
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
  });

  return (
    <AnimatePresence>
      <motion.div
        {...getRootProps()}
        variants={dropzoneVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        whileHover="hover"
        className={`
          relative overflow-hidden
          min-h-[300px] w-full
          rounded-2xl
          border-2 border-dashed
          transition-all duration-300 ease-out
          flex flex-col items-center justify-center gap-6
          cursor-pointer
          bg-gradient-to-b from-gray-50 to-white
          ${
            isDragging || isDragActive
              ? "border-indigo-400 bg-indigo-50/30"
              : "border-gray-200 hover:border-indigo-300"
          }
        `}
      >
        <input {...getInputProps()} />

        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              variants={particleVariants}
              className="absolute w-1 h-1 bg-indigo-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Main Upload Icon */}
        <motion.div variants={iconVariants} className="relative">
          <div
            className={`
            w-24 h-24
            rounded-full
            flex items-center justify-center
            ${isDragging || isDragActive ? "bg-indigo-100" : "bg-gray-100"}
          `}
          >
            <AnimatePresence mode="wait">
              {uploadSuccess ? (
                <motion.div
                  key="success"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </motion.div>
              ) : (
                <motion.div
                  key="upload"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="relative"
                >
                  <FileIcon
                    className={`
                    w-10 h-10
                    transition-colors duration-300
                    ${
                      isDragging || isDragActive
                        ? "text-indigo-500"
                        : "text-gray-400"
                    }
                  `}
                  />
                  <motion.div
                    className="absolute -right-1 -bottom-1 bg-indigo-500 rounded-full p-1"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Upload className="w-3 h-3 text-white" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Text Content */}
        <div className="text-center space-y-2 relative z-10">
          <motion.h3
            variants={{
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
            }}
            className="text-lg font-semibold text-gray-700"
          >
            {isDragging || isDragActive
              ? "Drop your files here"
              : "Drag & drop your files here"}
          </motion.h3>
          <motion.p
            variants={{
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0, transition: { delay: 0.1 } },
            }}
            className="text-sm text-gray-500"
          >
            or click to browse
          </motion.p>
          <motion.p
            variants={{
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0, transition: { delay: 0.2 } },
            }}
            className="text-xs text-gray-400 max-w-sm mx-auto mt-4"
          >
            Supports MP3, WAV, M4A, and other audio formats
          </motion.p>
        </div>

        {/* Progress Indicator */}
        {isDragging ||
          (isDragActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-100"
            >
              <motion.div
                className="h-full bg-indigo-500"
                animate={{
                  width: ["0%", "100%"],
                  transition: { duration: 1, repeat: Infinity },
                }}
              />
            </motion.div>
          ))}
      </motion.div>
    </AnimatePresence>
  );
};
