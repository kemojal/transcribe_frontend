import { Button } from "@/components/ui/button";
import { FileMusic, Trash, Clock } from "lucide-react";
import FileItem from "./FileItem";
import FileUploader from "./FileUploader";

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
}

const FileList: FC<FileSectionProps> = ({
  files,
  selectedFile,
  fileSizes,
  fileDurations,
  acceptedFiles,
  submitting,
  setAcceptedFiles,
  handleUpload,
  handleFileClick,
  bytesToMegabytes,
  fileLength,
}) => {
  return (
    <div
      className={`col-span-2 ${
        selectedFile && selectedFile?.path
          ? " border-r-[0.5px] border-gray-200"
          : ""
      } min-h-screen pr-6 py-6 flex flex-col items-center`}
    >
      {files && files.length > 0 ? (
        <div className="w-full flex flex-col gap-1">
          {files.map((file) => {
            const fileSizeMB = fileSizes[file.id] || 0;
            const duration = fileDurations[file.id];

            return (
              <FileItem
                key={file.id}
                file={file}
                selectedFile={selectedFile}
                fileSizeMB={fileSizeMB}
                duration={duration}
                handleFileClick={handleFileClick}
              />
            );
          })}
        </div>
      ) : (
        <FileUploader
          acceptedFiles={acceptedFiles}
          submitting={submitting}
          setAcceptedFiles={setAcceptedFiles}
          handleUpload={handleUpload}
          bytesToMegabytes={bytesToMegabytes}
        />
      )}
    </div>
  );
};

export default FileList;
