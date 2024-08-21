import { FileMusic, Trash, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatFileSize } from "@/utils/file";

const FileItem = ({ file, selectedFile }) => {
  return (
    <div
      className={`px-4 py-2 border-[0.5px] border-gray-200 rounded flex items-center justify-between cursor-pointer transition-colors duration-200 flex-wrap gap-2 ${
        selectedFile?.id === file.id
          ? "bg-blue-50 border-blue-300"
          : "hover:bg-gray-100"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center text-white border-[0.5px] ${
            selectedFile?.id === file.id
              ? "bg-blue-100 border-blue-300"
              : "bg-gray-100 border-gray-300"
          }`}
        >
          <FileMusic
            size={14}
            className={`${
              selectedFile?.id === file.id ? "text-blue-600" : "text-gray-600"
            }`}
          />
        </div>
        <div className="min-w-[80%] flex items-center gap-2 flex-wrap">
          <p className="text-gray-600 text-sm">{file.name}</p>
          <div className="flex gap-1 text-sm text-gray-500 min-w-[200px] xl:ml-5">
            <span className="bg-gray-200 px-2 py-1 rounded-md text-xs">
              {formatFileSize(file.size)} MB
            </span>
            <span className="bg-gray-200 px-2 py-1 rounded-md flex items-center gap-1 text-xs">
              <Clock size={16} className="text-gray-600" /> {file.duration}
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-2 text-gray-600">
        <Button
          variant="outline"
          className="flex items-center justify-center p-2 rounded-md hover:bg-gray-100 transition-colors h-8"
        >
          <Trash size={14} />
        </Button>
      </div>
    </div>
  );
};

export default FileItem;
