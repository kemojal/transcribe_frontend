import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileDropzone } from "@/components/FileDropzone";
import ContinousLoader from "@/components/ContinousLoader";
import { handleFileUpload } from "@/utils/api";
import AudioUploader from "../AudioUploader";

const FilePreview = ({ selectedFile }) => {
  const [submitting, setSubmitting] = useState(false);
  const [acceptedFiles, setAcceptedFiles] = useState<any[]>([]);

  const handleUpload = async (file) => {
    setSubmitting(true);
    await handleFileUpload(file);
    setSubmitting(false);
  };

  return (
    <div className="flex flex-col items-center w-full mt-20">
      {acceptedFiles && acceptedFiles.length > 0 ? (
        <div className="relative">
          {acceptedFiles.map((file) => (
            <div
              key={file.name}
              className="flex flex-col items-center justify-center gap-4 mb-4 p-4 border border-gray-200 rounded-lg"
            >
              <div className="w-full mt-3 flex items-center justify-center">
                {/* Render file preview */}
              </div>
              <div className="flex items-center gap-4 w-full">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-800">{file.name}</span>
                  <span className="text-gray-500 bg-gray-100 px-2 py-1 rounded-md text-xs">
                    {file.size}
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
                // <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-200 bg-opacity-50 rounded-lg">
                //   Uploading...
                //   <ContinousLoader />
                // </div>
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-xl opacity-50 w-[calc(100%+24px)] -left-6 -top-6 h-[calc(100%+24px)]">
                  <div className="h-full w-full flex flex-col space-y-2 items-center justify-center">
                    <AudioUploader isSubmitting={submitting} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <FileDropzone setAcceptedFiles={setAcceptedFiles} />
      )}
    </div>
  );
};

export default FilePreview;
