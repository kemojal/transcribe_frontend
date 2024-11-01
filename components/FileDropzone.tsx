"use client";
import { Button } from "@/components/ui/button";
import FileAudioIcon from "@/icons/FileAudioIcon";
import { bytesToMegabytes } from "@/utils";
import { FileAudio2, Upload } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineCloudUpload } from "react-icons/ai";

export const FileDropzone = ({ setAcceptedFiles }) => {
  // const [files, setFiles] = useState<any[]>([]);

  const onDrop = useCallback((acceptedFiles) => {
    //   console.log("acceptedFiles = ", acceptedFiles);
    // setFiles(acceptedFiles);

    setAcceptedFiles(acceptedFiles);
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);

        //   if (onAcceptedFiles && typeof onAcceptedFiles === "function") {
        //     onAcceptedFiles(acceptedFiles);
        //     console.log("onAcceptedFilesXXX = ", onAcceptedFiles);
        //   }
      };
      reader.readAsArrayBuffer(file);
      // onAcceptedFiles(acceptedFiles);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <AnimatePresence>
      <div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
        {...getRootProps()}
        className="group relative box-border outline-none  m-0 cursor-pointer align-middle appearance-none  transition-all ease-out duration-100 shadow-none select-none flex-shrink-0 text-none  text-sm leading-relaxed p-0 bg-gray-100 hover:bg-primary/20 hover:text-white active:bg-primary active:text-white  rounded-lg flex flex-col gap-2 flex-grow  h-[163px] items-center justify-center pb-6 border-[1px] border-dashed border-dashed border-gray-300 ring-2 ring-offset-2 ring-transparent hover:ring-primary/50"
      >
        <input {...getInputProps()} />
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4 }}
          className="w-40 h-40 rounded-full  flex items-center justify-center "
        >
          <span className="bg-[#E5E7EB] group-hover:bg-[#ffffff36] rounded-3xl  w-14 h-14 flex items-center justify-center">
            {/* <FileAudioIcon
              size={20}
              strokeWidth={1}
              className="text-gray-400"
            /> */}
            <AiOutlineCloudUpload size={80} className="text-gray-500 group-hover:text-white w-8 h-8" />
          </span>
        </motion.div>

        <p className="font-semibold">Select files or Drag & drop</p>
        <span className="text-xs text-muted-foreground group-hover:text-white/50">
          Works best on talking head videos at least 5 mins long.
        </span>
      </div>
    </AnimatePresence>
  );
};
