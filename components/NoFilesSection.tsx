"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AudioLines,
  Plus,
  Upload,
  X,
  FileText,
  Video,
  Music,
} from "lucide-react";
import { FileDialogue } from "./Dialogues/File/FileDialogue";
import { FileRecordDialogue } from "./Dialogues/File/FileRecordDialogue";
import { motion } from "framer-motion";

export default function NoFilesSection({ projectId }: { projectId: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="flex flex-col items-center justify-center min-h-[400px] p-8 bg-gradient-to-b from-gray-50 to-white rounded-xl shadow-lg">
      <motion.div
        className="relative"
        initial={{ scale: 1 }}
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.3 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <svg
          width="180"
          height="152"
          viewBox="0 0 148 125"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-purple-200"
        >
          <g filter="url(#filter0_d_5_19343)">
            <path
              d="M28.6853 98.9873C24.9799 98.9873 21.9761 95.9835 21.9761 92.2781L21.9761 32.9203C21.9761 29.2149 24.9799 26.2111 28.6853 26.2111L34.7633 26.2111L42.6269 26.2111C44.2203 26.2111 45.6771 27.1107 46.3907 28.5352V28.5352C47.1044 29.9598 48.5612 30.8594 50.1545 30.8594L56.8538 30.8594L66.1526 30.8594L76.6157 30.8594L87.0788 30.8594L101.296 30.8594C105.001 30.8594 108.005 33.8632 108.005 37.5686L108.005 92.2781C108.005 95.9835 105.001 98.9873 101.296 98.9873L28.6853 98.9873Z"
              fill="currentColor"
            />
            <path
              d="M28.6853 98.9873C24.9799 98.9873 21.9761 95.9835 21.9761 92.2781L21.9761 32.9203C21.9761 29.2149 24.9799 26.2111 28.6853 26.2111L34.7633 26.2111L42.6269 26.2111C44.2203 26.2111 45.6771 27.1107 46.3907 28.5352V28.5352C47.1044 29.9598 48.5612 30.8594 50.1545 30.8594L56.8538 30.8594L66.1526 30.8594L76.6157 30.8594L87.0788 30.8594L101.296 30.8594C105.001 30.8594 108.005 33.8632 108.005 37.5686L108.005 92.2781C108.005 95.9835 105.001 98.9873 101.296 98.9873L28.6853 98.9873Z"
              stroke="#CED6E3"
              strokeWidth="1.38748"
            />
          </g>
          <path
            d="M26.1392 98.9873C22.2467 98.9873 19.0196 95.9716 18.7563 92.0879L15.5355 44.5741C15.2458 40.3 18.6346 36.6737 22.9185 36.6737L108.457 36.6737C112.741 36.6737 116.13 40.3 115.84 44.5741L112.62 92.0879C112.356 95.9716 109.129 98.9873 105.237 98.9873L26.1392 98.9873Z"
            fill="#FAFAFA"
          />
          <path
            d="M26.1392 98.9873C22.2467 98.9873 19.0196 95.9716 18.7563 92.0879L15.5355 44.5741C15.2458 40.3 18.6346 36.6737 22.9185 36.6737L108.457 36.6737C112.741 36.6737 116.13 40.3 115.84 44.5741L112.62 92.0879C112.356 95.9716 109.129 98.9873 105.237 98.9873L26.1392 98.9873Z"
            stroke="#CED6E3"
            strokeWidth="1.38748"
          />
          <path
            d="M65.223 81.6276C58.3743 81.6276 52.8223 76.0756 52.8223 69.2269C52.8223 62.3782 58.3743 56.8262 65.223 56.8262C72.0716 56.8262 77.6237 62.3782 77.6237 69.2269C77.6237 76.0756 72.0716 81.6276 65.223 81.6276ZM65.223 79.1475C70.702 79.1475 75.1436 74.7059 75.1436 69.2269C75.1436 63.7479 70.702 59.3063 65.223 59.3063C59.744 59.3063 55.3024 63.7479 55.3024 69.2269C55.3024 74.7059 59.744 79.1475 65.223 79.1475ZM65.223 67.4732L68.7304 63.9657L70.4841 65.7194L66.9767 69.2269L70.4841 72.7343L68.7304 74.488L65.223 70.9806L61.7155 74.488L59.9618 72.7343L63.4693 69.2269L59.9618 65.7194L61.7155 63.9657L65.223 67.4732Z"
            fill="#8095B7"
          />
        </svg>
        <motion.div
          className="absolute inset-0 bg-purple-500 rounded-full opacity-0"
          animate={{ scale: isHovered ? 1.2 : 1, opacity: isHovered ? 0.1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
      <h3 className="mt-8 text-3xl font-bold text-gray-800">No files yet</h3>
      <p className="mt-4 text-lg text-gray-600 text-center max-w-md">
        This project is a blank canvas. Add your first file to get started.
      </p>

      <div className="flex items-center space-x-4 mt-8">
        <FileDialogue id={projectId}>
          <Button
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload file
          </Button>
        </FileDialogue>
        <FileRecordDialogue id={projectId}>
          <Button
            size="lg"
            variant="outline"
            className="border-purple-200 text-purple-600 hover:bg-purple-50"
          >
            <AudioLines className="mr-2 h-4 w-4" />
            Record audio
          </Button>
        </FileRecordDialogue>
      </div>

      <div className="mt-12 grid grid-cols-3 gap-6">
        {["Document", "Video", "Audio"].map((type) => (
          <div key={type} className="flex flex-col items-center">
            {type === "Document" && (
              <FileText className="h-8 w-8 text-purple-500" />
            )}
            {type === "Video" && <Video className="h-8 w-8 text-purple-500" />}
            {type === "Audio" && <Music className="h-8 w-8 text-purple-500" />}
            <span className="mt-2 text-sm font-medium text-gray-600">
              {type}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
