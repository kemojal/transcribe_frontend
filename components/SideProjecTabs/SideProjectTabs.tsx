"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import CustomAudioPlayer from "./CustomAudioPlayer";
import {
  AlarmClock,
  Play,
  Captions,
  Languages,
  Clock,
  FileAudio,
  EllipsisVertical,
  Download,
  List,
  Sparkles,
  Calendar,
  Check,
  Globe,
  Tags,
  Trash,
  DownloadCloud,
  Search,
  Copy,
  FileDown,
  CloudDownload,
  X,
  ScrollTextIcon,
} from "lucide-react";
import {
  formatDate,
  formatTimestamp,
  mergeTranscriptionEntries,
  parseTimeToSeconds,
  parseTranscriptionText,
} from "@/utils";
import { OverallScore } from "../Analysis/OverallScore";
import Recommendations from "../Analysis/Recommendations";
import EditableTranscriptionEntries from "./EditableTranscriptionEntries";
import RenderVideo from "./Podcast/RenderVideo";
import { TranscriptionDropdown } from "../Dropdowns/TranscriptionDropdown";
import { ShareDialog } from "../Dialogues/ShareDialogue";
import AudioLoader from "../AudioLoader";
import { useSearchParams } from "next/navigation";
import NoTranscription from "./NoTranscription";
import { FileProps } from "@/types/interfaces";
import { deleteTranscription } from "@/lib/reducers/fileSlice";
import { useAppDispatch } from "@/lib/hooks";
import { Input } from "../ui/input";
import SearchNotFound from "../SearchNotFound";
import Searchbar from "../Searchbar";
import DeleteButton from "../DeleteButton";
import AudioEditor from "../AudioEditor";

const SideProjectTabs = ({
  selectedFile,
  transcriptionEntries,
  currentTranscription,
  transcribeAudio,
  transcribing,
  selectedFileSizeMB,
  selectedFileDuration,
}) => {
  const [currentFile, setCurrentFile] = useState(null);
  const [currentPlayingEntry, setCurrentPlayingEntry] = useState(null);
  const [transcriptions, setTranscriptions] = useState(
    [] || transcriptionEntries
  );

  const [currentTime, setCurrentTime] = useState(0); //to see which word is highlighted
  const audioPlayerRef = useRef(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isAudioPaused, setIsAudioPaused] = useState(false);
  const [isAudioLoading, setIsAudioLoading] = useState(false);

  const searchParams = useSearchParams();
  const currentFileId = searchParams.get("current_file_id");

  const [filteredTranscriptions, setFilteredTranscriptions] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const [copied, setCopied] = useState(false);

  const dispatch = useAppDispatch();

  const tabItems = [
    {
      label: "Activity",
      content: <div>Activity content goes here</div>,
    },
    {
      label: "Transcript",
      content: <div>Transcript content goes here</div>,
    },
  ];

  const handleCopy = async () => {
    const text = filteredTranscriptions
      .map((entry) => `${entry.content}`)
      .join("\n");
    await navigator.clipboard.writeText(text).then(
      () => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      },
      (err) => {
        console.error("Failed to copy text: ", err);
        setCopied(false);
      }
    );
  };

  useEffect(() => {
    if (selectedFile) {
      setCurrentFile(selectedFile);
    }
  }, [selectedFile]);

  useEffect(() => {
    setTranscriptions(transcriptionEntries);
  }, [transcriptionEntries]);

  // Filter transcription entries based on the search term
  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = transcriptionEntries.filter((entry) =>
        entry.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTranscriptions(filtered);
    } else {
      setFilteredTranscriptions(transcriptionEntries);
    }
  }, [searchTerm, transcriptionEntries]);

  const handleContentUpdate = (index, newContent) => {
    const updatedEntries = [...transcriptionEntries];
    updatedEntries[index] = { ...updatedEntries[index], content: newContent };
    setFilteredTranscriptions(updatedEntries as never[]);
    console.log("Updated entries = ", updatedEntries);
    const mergedEntries = mergeTranscriptionEntries(updatedEntries);
    console.log("Merged entries = ", mergedEntries);
  };

  const handlePlayTimestamp = (timestamp: string) => {
    if (audioPlayerRef.current) {
      const [start, end] = timestamp.split(" --> ");
      const [startHours, startMinutes, startSeconds] = start.split(":");
      const [endHours, endMinutes, endSeconds] = end.split(":");

      const startSecondsTotal =
        parseInt(startHours) * 3600 +
        parseInt(startMinutes) * 60 +
        parseFloat(startSeconds.replace(",", "."));

      const endSecondsTotal =
        parseInt(endHours) * 3600 +
        parseInt(endMinutes) * 60 +
        parseFloat(endSeconds.replace(",", "."));

      audioPlayerRef?.current?.seekTo(startSecondsTotal, endSecondsTotal);
      setIsAudioLoading(true);
    }
  };

  const onDeleteTranscription = async (file: FileProps) => {
    if (file && file?.transcriptions.length > 0) {
      try {
        await dispatch(
          deleteTranscription({
            projectId: file?.project_id?.toString(),
            fileId: file?.id?.toString(),
            transcriptionId: file?.transcriptions[0]?.id?.toString(),
          })
        ).unwrap();

        const updatedFile = {
          ...file,
          transcriptions: file.transcriptions.filter(
            (t) => t.id !== file.transcriptions[0]?.id
          ),
        };

        console.log("Deleted transcription and updated file");

        setTranscriptions(updatedFile?.transcriptions);
        setFilteredTranscriptions(updatedFile?.transcriptions);
        setCurrentFile(updatedFile);
      } catch (error) {
        console.error("Error deleting transcription:", error);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="pb-20 overflow-hidden  relative"
    >
      {/* <div className="fixed bottom-0 left-0 z-50 w-full h-[100%] bg-white flex flex-col items-center justify-center">
        <AudioEditor audioUrl={selectedFile?.path} />
      </div> */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="border-b-[1px] border-gray-100 flex justify-center bg-white flex-col pl-4 pb-1 gap-0"
      >
        <div className="flex items-center py-1 border-b-[1px] border-gray-50 justify-between">
          <motion.div
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            className="text-gray-800 text-sm border-b-1 font-semibold truncate max-w-[400px]"
            title={selectedFile?.name || "Transcription"}
          >
            {selectedFile?.name || "Transcription"}
          </motion.div>
          <motion.div
            initial={{ x: 20 }}
            animate={{ x: 0 }}
            className="flex items-center justify-end gap-1"
          >
            {/* <span>
              <EllipsisVertical
                size={16}
                className="text-gray-600 cursor-pointer hover:text-gray-800 transition-colors"
              />
            </span> */}
          </motion.div>
        </div>
      </motion.div>
      <div className="pt-2 pb-4 h-[calc(100%-60px)]">
        {selectedFile && selectedFile?.path && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-[calc(100%-80px)]"
          >
            <div className="relative flex flex-col w-full h-[700px] overflow-hidden pb-8">
              <div className="relative w-full h-[calc(100%-80px)] overflow-auto ">
                <AnimatePresence>
                  {transcriptions && transcriptions.length > 0 ? (
                    <>
                      <div className="flex items-center justify-between gap-2  px-0 pt-2 pb-4 pr-2 border-b-0 border-gray-200 px-1">
                        <Searchbar
                          isExpanded={isSearchExpanded}
                          setIsExpanded={setIsSearchExpanded}
                          searchQuery={searchTerm}
                          setSearchQuery={setSearchTerm}
                        />
                        {!isSearchExpanded && (
                          <motion.div
                            initial={{ opacity: 0, x: -2 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -2 }}
                            className="flex space-x-2"
                          >
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleCopy}
                              className="border-gray-100 hover:bg-gray-100 transition-colors space-x-1"
                            >
                              {copied ? (
                                <Check size={14} />
                              ) : (
                                <Copy size={14} />
                              )}
                            </Button>

                            <DeleteButton
                              selectedFile={selectedFile}
                              onDeleteTranscription={onDeleteTranscription}
                            />
                            <ShareDialog />
                            <TranscriptionDropdown file={selectedFile} />
                          </motion.div>
                        )}
                      </div>
                      {filteredTranscriptions &&
                      filteredTranscriptions.length > 0 ? (
                        <motion.div
                          key="transcription"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-sm py-4"
                        >
                          <EditableTranscriptionEntries
                            //transcriptionEntries={transcriptions}
                            transcriptionEntries={filteredTranscriptions}
                            currentPlayingEntry={currentPlayingEntry}
                            handlePlayTimestamp={handlePlayTimestamp}
                            formatTimestamp={formatTimestamp}
                            handleContentUpdate={handleContentUpdate}
                            currentTime={currentTime}
                            isAudioPlaying={isAudioPlaying}
                          />
                        </motion.div>
                      ) : (
                        <SearchNotFound />
                      )}
                    </>
                  ) : (
                    <NoTranscription
                      selectedFile={selectedFile}
                      transcribing={transcribing}
                      transcribeAudio={transcribeAudio}
                      onTranscriptionComplete={(newTranscription) => {
                        console.log(
                          "new transcription = ",
                          newTranscription.transcription
                        );
                        const entries = parseTranscriptionText(
                          newTranscription?.transcription?.transcription_text
                        );
                        setTranscriptions((prevTranscriptions) => [
                          ...prevTranscriptions,
                          ...entries,
                        ]);
                        setFilteredTranscriptions((prevFiltered) => [
                          ...prevFiltered,
                          ...entries,
                        ]);
                      }}
                    />
                  )}
                </AnimatePresence>
              </div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="absolute bottom-0 left-0 w-full border-t-[1px] border-gray-200 bg-white flex flex-col items-center gap-2 justify-center py-2"
              >
                <div className="flex gap-2 items-center text-xs text-gray-600 w-full">
                  <div className="w-full">
                    <div className="w-full flex items-center justify-center fixed bottom-0 left-0">
                      {currentFile && currentFile?.path && (
                        <CustomAudioPlayer
                          src={currentFile?.path}
                          ref={audioPlayerRef}
                          isPlaying={isAudioPlaying}
                          setIsPlaying={setIsAudioPlaying}
                          // isAudioMuted={isMuted}
                          isPaused={isAudioPaused}
                          onTimeUpdate={(currentTime) => {
                            setCurrentTime(currentTime);

                            if (transcriptionEntries) {
                              const currentEntry = transcriptionEntries.find(
                                (entry) => {
                                  const [start, end] =
                                    entry.timestamp.split(" --> ");
                                  const startTime = parseTimeToSeconds(start);
                                  const endTime = parseTimeToSeconds(end);
                                  return (
                                    currentTime >= startTime &&
                                    currentTime < endTime
                                  );
                                }
                              );
                              if (
                                currentEntry &&
                                currentEntry !== currentPlayingEntry
                              ) {
                                setCurrentPlayingEntry(currentEntry);
                              }
                            }
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SideProjectTabs;
