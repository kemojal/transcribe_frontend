import { FC } from "react";
import { Button } from "@/components/ui/button";
import ContinousLoader from "@/components/ContinousLoader";
import { FileDropzone } from "../FileDropzone";

interface FileUploaderProps {
  acceptedFiles: any[];
  submitting: boolean;
  setAcceptedFiles: (files: any[]) => void;
  handleUpload: (file: any) => void;
  bytesToMegabytes: (bytes: number) => number;
}

const FileUploader: FC<FileUploaderProps> = ({
  acceptedFiles,
  submitting,
  setAcceptedFiles,
  handleUpload,
  bytesToMegabytes,
}) => {
  return (
    <div className="flex flex-col items-center w-full mt-20">
      <div className="flex flex-col items-center justify-center w-full max-w-[1200px] text-center">
        <div className="mb-4">
          <span className="text-3xl font-bold text-gray-700">Get started</span>
        </div>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">No file yet</span> Record something,
          dive into editing or upload files to use in this project.
        </p>
        <div className="w-full mt-6">
          {acceptedFiles && acceptedFiles.length > 0 ? (
            <div className="relative">
              {acceptedFiles.map((file) => (
                <div
                  key={file.name}
                  className="flex flex-col items-center justify-center gap-4 mb-4 p-4 border border-gray-200 rounded-lg"
                >
                  {/* preview */}
                  <div className="w-full mt-3 flex items-center justify-center">
                    {file.type.startsWith("audio") ? (
                      <audio controls className="w-full">
                        <source src={file.url} type={file.type} />
                        Your browser does not support the audio element.
                      </audio>
                    ) : file.type.startsWith("video") ? (
                      <video
                        controls
                        className="w-full max-h-[300px] aspect-video max-w-[600px] rounded-3xl"
                      >
                        <source src={file.url} type={file.type} />
                        Your browser does not support the video element.
                      </video>
                    ) : (
                      <p className="text-sm text-gray-600">
                        No preview available
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-4 w-full">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-800">
                        {file.name}
                      </span>
                      <span className="text-gray-500 bg-gray-100 px-2 py-1 rounded-md text-xs">
                        {bytesToMegabytes(file.size).toFixed(2)} MB
                      </span>
                      <span className="text-gray-500 bg-gray-100 px-2 py-1 rounded-md text-xs">
                        {file.type}
                      </span>
                    </div>

                    <Button
                      isLoading={submitting}
                      onClick={() => handleUpload(file)}
                      className="py-1 px-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                      Upload
                    </Button>
                  </div>
                  {submitting && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-200 bg-opacity-50 rounded-lg">
                      Uploading... audio
                      <ContinousLoader />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <FileDropzone setAcceptedFiles={setAcceptedFiles} />
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
