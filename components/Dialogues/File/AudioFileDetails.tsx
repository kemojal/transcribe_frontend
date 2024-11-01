import AudioUploader from "@/components/AudioUploader";
import { Button } from "@/components/ui/button";
import PlayCircleIcon from "@/icons/PlayCircle";
import VolumeHighIcon from "@/icons/VolumeHigh";
import { PauseIcon } from "@heroicons/react/24/outline";

import { PlayCircle, Trash2, UploadCloud } from "lucide-react";

const AudioFileDetails = ({
  fileName,
  duration,
  fileSize,
  onPlay,
  onDelete,
  onUpload,
  isPlaying,
  submitting,
}) => (
  <div className="flex w-full items-center justify-between space-y-2 p-4 border rounded-lg  relative">
    <div className="space-y-2">
      <h3 className="text-lg font-semibold flex items-center space-x-1">
        <span>
          <VolumeHighIcon className="w-6 h-6" />
        </span>
        <span>{fileName}</span>
      </h3>
      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
        <p className="flex items-center space-x-2 ">
          <span>{duration}</span>
        </p>
        <span>|</span>
        <p className="flex items-center space-x-2">
          <span>{fileSize}</span>
        </p>
      </div>
    </div>

    <div className="flex space-x-1 items-center text-muted-foreground">
      <Button
        variant={"ghost"}
        size={"sm"}
        onClick={onPlay}
        className="hover:bg-muted/20 hover:text-primary"
      >
        {isPlaying ? (
          <PauseIcon className="w-6 h-6" />
        ) : (
          <PlayCircleIcon className="w-6 h-6" />
        )}
        {/* {isPlaying ? "Pause" : "Play"} */}
      </Button>
      <Button
        className="hover:bg-muted/20 hover:text-primary"
        variant={"ghost"}
        size={"sm"}
        onClick={onDelete}
      >
        <Trash2 className="w-6 h-6" />
      </Button>
      <Button
        className="hover:bg-muted/20 hover:text-primary"
        variant={"ghost"}
        size={"sm"}
        onClick={onUpload}
      >
        <UploadCloud
          className={`w-6 h-6 ${submitting ? "animate-bounce" : ""}`}
        />
      </Button>
    </div>
    
  </div>
);

export default AudioFileDetails;
