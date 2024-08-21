import { Button } from "@/components/ui/button";
import { FileMusic, Trash, Clock } from "lucide-react";
import FileItem from "./FileItem";

const FileList = ({ files, selectedFile, setSelectedFile }) => {
  return (
    <div className="py-4 rounded relative w-full">
      {files && files.length > 0 ? (
        <div className="flex items-center justify-between border-b-[0.5px] border-gray-200 pb-2">
          <h2 className="font-medium">Files</h2>
        </div>
      ) : (
        <></>
      )}
      <div className="grid grid-cols-6 gap-0">
        <div
          className={`${
            selectedFile?.path
              ? "col-span-2 border-r-[0.5px] border-gray-200"
              : "col-span-6"
          } min-h-screen pr-6 py-6 flex flex-col items-center`}
        >
          {files && files.length > 0 ? (
            <div className="w-full flex flex-col gap-1">
              {files.map((file) => (
                <div key={file.id} onClick={() => setSelectedFile(file)}>
                  <FileItem file={file} selectedFile={selectedFile} />
                </div>
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileList;
