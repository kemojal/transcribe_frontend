"use client";
import { useState, useEffect, useRef } from "react";
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
} from "lucide-react";
import { formatDate, formatTimestamp, parseTimeToSeconds } from "@/utils";
// import { MetricsEvaluation } from "./Analysis/MetricsEvaluation";
import { OverallScore } from "../Analysis/OverallScore";
import Recommendations from "../Analysis/Recommendations";
import EditableTranscriptionEntries from "./EditableTranscriptionEntries";
import RenderVideo from "./Podcast/RenderVideo";

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

  useEffect(() => {
    if (selectedFile) {
      setCurrentFile(selectedFile);
    }
  }, [selectedFile]);

  useEffect(() => {
    setTranscriptions(transcriptionEntries);
  }, [transcriptionEntries]);

  const [audioPlayer, setAudioPlayer] = useState(null);

  // Add this line
  const audioPlayerRef = useRef(null);

  const metrics = {
    shareability: 10,
    clickability: 15,
    virality: 5,
    engagement: 5,
  };

  const overallScore =
    (metrics.shareability +
      metrics.clickability +
      metrics.virality +
      metrics.engagement) /
    4;

  const recommendations = [
    "Add a Hook: Start with something intriguing or attention-grabbing to capture viewers' interest.",
    "Create a Narrative: Develop a story or message that viewers can relate to or find valuable.",
    "Include a Call-to-Action: Encourage viewers to share, comment, or interact with the content.",
    "Engage Emotionally: Incorporate elements that evoke emotions, whether it's humor, surprise, or inspiration.",
  ];

  const handleContentUpdate = (index, newContent) => {
    const updatedEntries = [...transcriptionEntries];
    updatedEntries[index] = { ...updatedEntries[index], content: newContent };
    setTranscriptions(updatedEntries);
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
    }
  };

  return (
    <div className="pb-20">
      <div className="border-b-[1px] border-gray-200 flex justify-center bg-white flex-col pl-4 py-3 gap-2">
        <div className="flex items-center py-2 border-b-[1px] border-gray-100 justify-between">
          <div
            className="text-gray-800 text-xl border-b-1 font-semibold truncate max-w-[400px]"
            title={selectedFile?.name || "Transcription"}
          >
            {selectedFile?.name || "Transcription"}
          </div>
          <div className="flex items-center justify-end gap-1">
            <Button size={"sm"} variant={"outline"} className="w-10 h-10">
              <span>
                <Download size={16} className="text-gray-600" />
              </span>
            </Button>
            <span>
              <EllipsisVertical size={16} className="text-gray-600" />
            </span>
          </div>
        </div>
        <div className="flex gap-4 text-sm text-gray-500 min-w-[200px]">
          <span className="flex items-center gap-1">
            <Languages size={12} className="text-gray-600" /> English
          </span>
          <span className="py-1 rounded-md text-xs flex items-center gap-1">
            <FileAudio size={12} className="text-gray-600" />{" "}
            {selectedFileSizeMB.toFixed(2)} MB
          </span>
          <span className="py-1 rounded-md flex items-center gap-1 text-xs">
            <Clock size={12} className="text-gray-600" />{" "}
            {selectedFileDuration
              ? `${Math.floor(selectedFileDuration / 60)}:${Math.floor(
                  selectedFileDuration % 60
                )}`
              : "-"}
          </span>
          <span className="rounded-md flex items-center gap-1 text-xs">
            <Clock size={12} className="text-gray-600" />{" "}
            {selectedFile?.created_at
              ? `${formatDate(selectedFile?.created_at)}`
              : "-"}
          </span>
        </div>
      </div>
      <div className="py-4">
        <Tabs defaultValue="transcriptions" className="p-2">
          <TabsList>
            <TabsTrigger
              value="transcriptions"
              className="flex items-center gap-1"
            >
              <span>
                <List className="w-4 h-4" />
              </span>{" "}
              Transcription
            </TabsTrigger>
            <TabsTrigger value="magicai" className="flex items-center gap-1">
              <span>
                <Sparkles className="w-4 h-4" />
              </span>{" "}
              Magic AI
            </TabsTrigger>
            <TabsTrigger value="translate" disabled>
              <span>
                <Languages className="w-4 h-4" />
              </span>{" "}
              Translations
            </TabsTrigger>
            <TabsTrigger
              value="subtitles"
              disabled
              className="flex items-center gap-1"
            >
              <span>
                <Captions className="w-4 h-4" />
              </span>{" "}
              Subtitle
            </TabsTrigger>
          </TabsList>
          <TabsContent value="transcriptions">
            {/* {JSON.stringify(transcriptionEntries)} */}
            {selectedFile && selectedFile?.path && (
              <div>
                <div className="relative flex flex-col w-full h-[500px] bg-white rounded-lg border-[0.5px] border-gray-200 overflow-hidden pb-8">
                  <div className="relative w-full h-[650px] p-4 overflow-auto">
                    {transcriptionEntries && transcriptionEntries.length > 0 ? (
                      <EditableTranscriptionEntries
                        transcriptionEntries={transcriptions}
                        currentPlayingEntry={currentPlayingEntry}
                        handlePlayTimestamp={handlePlayTimestamp}
                        formatTimestamp={formatTimestamp}
                        handleContentUpdate={handleContentUpdate}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full bg-gray-100 rounded-lg text-gray-600">
                        <span>No transcription yet</span>
                        <Button
                          className="mt-4 flex items-center gap-2"
                          variant="outline"
                          disabled={
                            !selectedFile || !selectedFile?.path || transcribing
                          }
                          onClick={() => {
                            if (selectedFile) {
                              transcribeAudio(
                                selectedFile?.project_id,
                                selectedFile?.id
                              );
                            }
                          }}
                        >
                          <Captions size={16} />
                          <span>
                            {transcribing ? "Transcribing..." : "Transcribe"}
                          </span>
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-0 left-0 w-full border-t-[1px] border-gray-200 bg-white flex flex-col items-center gap-2 justify-center py-2">
                    <div className="flex gap-2 items-center text-xs text-gray-600 w-full">
                      <div className="w-full">
                        <div className="w-full flex items-center justify-center">
                          {currentFile && currentFile?.path && (
                            <CustomAudioPlayer
                              src={currentFile?.path}
                              ref={audioPlayerRef}
                              onTimeUpdate={(currentTime) => {
                                if (transcriptionEntries) {
                                  const currentEntry =
                                    transcriptionEntries.find((entry) => {
                                      const [start, end] =
                                        entry.timestamp.split(" --> ");
                                      const startTime =
                                        parseTimeToSeconds(start);
                                      const endTime = parseTimeToSeconds(end);
                                      return (
                                        currentTime >= startTime &&
                                        currentTime < endTime
                                      );
                                    });
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
                  </div>
                </div>
                <div className="flex justify-between p-2 text-gray-600 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-[1px] h-4 bg-gray-200" />
                    <span className="flex items-center gap-1">
                      <span>
                        <Clock size={16} className="text-gray-600" />
                      </span>{" "}
                      Total Duration
                    </span>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          <TabsContent value="magicai">
            <div className="py-4 flex flex-col gap-4">
              <div className="flex flex-col">
                {/* <span className="text-gray-600 text-sm">Metrics</span> */}
                {/* <MetricsEvaluation metrics={metrics} /> */}
              </div>
              {/* <div className="flex flex-col">
                <span className="text-gray-600 text-sm">Overall Score</span>
                <OverallScore score={overallScore} />
              </div> */}
              {/* <div className="flex flex-col">
                <span className="text-gray-600 text-sm">Recommendations</span>
                <Recommendations recommendations={recommendations} />
              </div> */}
              <RenderVideo />
            </div>
          </TabsContent>
          <TabsContent value="translate">
            <div>Translation content coming soon.</div>
          </TabsContent>
          <TabsContent value="subtitles">
            <div>Subtitle content coming soon.</div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SideProjectTabs;
