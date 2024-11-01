import { Button } from "@/components/ui/button";
import { FileMusic, Trash, Clock } from "lucide-react";
import FileItem from "./FileItem";
import FileUploader from "./FileUploader";
import { motion, AnimatePresence } from "framer-motion";

interface FileSectionProps {
  files: any[];
  selectedFile: any;
  fileSizes: Record<string, number>;
  fileDurations: Record<string, number>;
  acceptedFiles: any[];
  submitting: boolean;
  setAcceptedFiles: (files: any[]) => void;
  handleUpload: (file: any) => void;
  handleFileClick: (file: any) => void;
  bytesToMegabytes: (bytes: number) => number;
  fetchStatus: string;
}

const FileList: FC<FileSectionProps> = ({
  files,
  selectedFile,
  acceptedFiles,
  submitting,
  setAcceptedFiles,
  handleUpload,
  handleFileClick,
  bytesToMegabytes,
  fetchStatus,
  // handleDeleteFile,
  // handleEditFile,
  fileLength,
  height,
}) => {
  return (
    <div
      className={` ${
        height ? height : "h-[calc(100vh-154px)]"
      } overflow-x-hidden overflow-y-auto ${
        selectedFile && selectedFile?.path ? " " : ""
      }   py-6 flex flex-col items-center`}
    >
      {files && files.length > 0 ? (
        <AnimatePresence mode="wait">
          <motion.div className="w-full flex flex-col gap-1 pr-2 pb-12">
            {files?.map((file) => {
              return (
                <FileItem
                  key={file.id}
                  file={file}
                  selectedFile={selectedFile}
                  fileSizeMB={file.size}
                  duration={file.duration}
                  handleFileClick={handleFileClick}
                />
              );
            })}
          </motion.div>
        </AnimatePresence>
      ) : (
        <FileUploader
          acceptedFiles={acceptedFiles}
          submitting={submitting}
          setAcceptedFiles={setAcceptedFiles}
          handleUpload={handleUpload}
          bytesToMegabytes={bytesToMegabytes}
        />
      )}

      {fetchStatus === "loading" && <div>Adding file</div>}
    </div>
  );
};

export default FileList;
