import { FileMusic, Trash, Clock, Mic, AlarmClock } from "lucide-react";
import { formatFileSize } from "@/utils/file";
import { Button } from "@/components/ui/button";
import { FileDropdown } from "../Dropdowns/FileDropDown";
import { formatDate } from "@/utils";

interface FileItemProps {
  file: {
    id: string;
    name: string;
    created_at: string;
  };
  selectedFile: any;
  fileSizeMB: number;
  duration: number;
  handleFileClick: (file: any) => void;
}

const FileItem = ({
  file,
  selectedFile,
  fileSizeMB,
  duration,
  handleFileClick,
}: FileItemProps) => {
  return (
    <div
      key={file.id}
      className={`px-4 py-2 border-[0.5px] border-gray-50 rounded-xl flex items-center justify-between cursor-pointer transition-colors duration-200
        flex-wrap gap-2 ${
          selectedFile?.id === file.id
            ? "bg-blue-50 border-blue-300 ring-shadow ring-[1px] border-gray-200 ring-offset-1"
            : "hover:bg-gray-100"
        }`}
      onClick={() => handleFileClick(file)}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center text-white border-[0.5px]
          ${
            selectedFile?.id === file.id
              ? "bg-blue-100 border-blue-300"
              : "bg-gray-100 border-gray-300"
          }`}
        >
          <Mic
            size={14}
            className={`${
              selectedFile?.id === file.id ? "text-blue-600" : "text-gray-600"
            }`}
          />
        </div>
        <div className="min-w-[80%] flex flex-col flex gap-2 flex-wrap">
          <p
            className="text-gray-600 font-bold truncate max-w-[200px]"
            title={file.name}
          >
            {file.name}
          </p>
          <div className="flex gap-2 text-sm text-gray-500  divide-x">
            <span className=" py-1  flex items-center gap-1">
              <FileMusic size={16} className="text-gray-600" />{" "}
              {fileSizeMB.toFixed(2)} MB
            </span>
            <span className=" py-1  flex items-center gap-1 p-2">
              <AlarmClock size={16} className="text-gray-600" />{" "}
              {duration
                ? `${Math.floor(duration / 60)}:${Math.floor(duration % 60)}`
                : "-"}
            </span>
            <span className=" py-1  flex items-center gap-1 pl-2">
              <Clock size={16} className="text-gray-600" />{" "}
              {formatDate(file.created_at)}
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-2 text-gray-600">
        {/* <Button
          variant="outline"
          className="flex items-center justify-center p-2 rounded-md hover:bg-gray-100 transition-colors h-8"
        >
          <Trash size={14} />
        </Button> */}
        <FileDropdown file={file} />
      </div>
    </div>
  );
};

export default FileItem;
