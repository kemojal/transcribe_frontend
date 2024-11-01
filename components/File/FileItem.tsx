import { AudioLines, MoreVertical } from "lucide-react";
import { formatFileSize } from "@/utils/file";
import { Button } from "@/components/ui/button";
import { FileDropdown } from "../Dropdowns/FileDropDown";
import { formatDate } from "@/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

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

export default function FileItem({
  file,
  selectedFile,
  fileSizeMB,
  duration,
  handleFileClick,
}: FileItemProps) {
  const isSelected = selectedFile?.id === file.id;

  return (
    <Card
      key={file.id}
      className={`transition-all duration-200 cursor-pointer border-[1px]  ${
        isSelected
          ? "bg-primary/5 border-primary shadow-sm"
          : "hover:bg-secondary/50 hover:shadow-xs border-gray-100"
      }`}
    >
      <CardContent className="p-4">
        <motion.div
          className="flex items-center space-x-4"
          onClick={() => handleFileClick(file)}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
              isSelected
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            <AudioLines size={20} />
          </motion.div>
          <div className="flex-grow min-w-0">
            <motion.h3
              className="text-sm font-medium leading-none truncate mb-1"
              title={file.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3 }}
            >
              {file.name}
            </motion.h3>
            <motion.div
              className="flex items-center text-xs text-muted-foreground space-x-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.4 }}
            >
              <span>{formatFileSize(fileSizeMB * 1024 * 1024)}</span>
              <span>•</span>
              <span>{formatDate(file.created_at)}</span>
              <span>•</span>
              <span>
                {Math.floor(duration / 60)}:
                {Math.floor(duration % 60)
                  .toString()
                  .padStart(2, "0")}
              </span>
            </motion.div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge
              variant={isSelected ? "default" : "secondary"}
              className="text-xs"
            >
              {isSelected ? "Selected" : "Audio"}
            </Badge>
            <FileDropdown file={file}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical size={16} />
                <span className="sr-only">Open menu</span>
              </Button>
            </FileDropdown>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}
