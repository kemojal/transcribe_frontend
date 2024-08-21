"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Player } from "./AudioPlayer";
import { formatDate } from "@/utils";
import {
  Captions,
  Clock,
  Copy,
  Languages,
  List,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MetricsEvaluation } from "./Analysis/ MetricsEvaluation";
import { OverallScore } from "./Analysis/OverallScore";
import Recommendations from "./Analysis/Recommendations";
import { TranscriptionDropdown } from "./Dropdowns/TranscriptionDropdown";

const SideProjectTabs = ({
  selectedFile,
  transcriptionEntries,
  currentTranscription,
  transcribeAudio,
  transcribing,
  selectedFileSizeMB,
  selectedFileDuration,
}) => {
  // ai part

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

  return (
    <div className="pb-20">
      <div
        className="
      border-b-[1px] border-gray-200 flex justify-center bg-white flex-col pl-4 py-3 gap-2"
      >
        <div className="flex items-center py-2 border-b-[1px] border-gray-100">
          <div
            className=" text-gray-800 text-sm border-b-1 font-semibold  truncate max-w-[400px] border-b-1"
            title={selectedFile?.name || "Transcription"}
          >
            {selectedFile?.name || "Transcription"}
          </div>
        </div>
        <div className="flex gap-1 text-sm text-gray-500 min-w-[200px]">
          <span className="bg-gray-100 px-2 py-1 rounded-md text-xs">
            {selectedFileSizeMB.toFixed(2)} MB
          </span>
          <span className="bg-gray-100 px-2 py-1 rounded-md flex items-center gap-1 text-xs">
            <Clock size={16} className="text-gray-600" />{" "}
            {selectedFileDuration
              ? `${Math.floor(selectedFileDuration / 60)}:${Math.floor(
                  selectedFileDuration % 60
                )}`
              : "-"}
          </span>
          <span className="bg-gray-100 rounded-md flex items-center gap-1 text-xs">
            <Clock size={16} className="text-gray-600" />{" "}
            {selectedFile?.created_at
              ? `${formatDate(selectedFile?.created_at)}`
              : "-"}
          </span>
        </div>
        <div>end part</div>
        <div className="p-0  bg-white rounded-lg  border-[0.5px] border-gray-200 bg-gray-50 rounded-lg  mb-4">
          <div className="">
            {selectedFile && selectedFile?.path && (
              <Player src={selectedFile?.path} width={380} />
            )}
          </div>
        </div>
      </div>

      <div className="py-4">
        <Tabs defaultValue="transcriptions" className=" p-2">
          <TabsList>
            <TabsTrigger
              value="transcriptions"
              className="flex items-center gap-1"
            >
              <span>
                <List className="w-4 h-4" />
              </span>
              Transcription
            </TabsTrigger>

            <TabsTrigger value="magicai" className="flex items-center gap-1">
              <span>
                <Sparkles className="w-4 h-4" />
              </span>
              Magic AI
            </TabsTrigger>
            <TabsTrigger value="translate" disabled>
              <span>
                <Languages className="w-4 h-4" />
              </span>
              Translations
            </TabsTrigger>
            <TabsTrigger
              value="subtitles"
              disabled
              className="flex items-center gap-1"
            >
              <span>
                <Captions className="w-4 h-4" />
              </span>
              Subtitle
            </TabsTrigger>
          </TabsList>
          <TabsContent value="transcriptions" className="">
            {selectedFile && selectedFile?.path && (
              <div className=" ">
                <div className="relative flex flex-col w-full h-[550px] bg-white rounded-lg  border-[0.5px] border-gray-200 overflow-hidden pb-8">
                  <div className="relative w-full h-[650px] p-4 overflow-auto">
                    {transcriptionEntries && transcriptionEntries.length > 0 ? (
                      transcriptionEntries.map((entry, index) => (
                        <div
                          key={index}
                          className={`transcription-entry p-4 mb-2 rounded-lg ${
                            currentTranscription &&
                            currentTranscription?.start === entry.start
                              ? "bg-yellow-100 border-l-4 border-yellow-500"
                              : "bg-gray-50"
                          } shadow-xs`}
                        >
                          <div className="text-xs text-gray-500">
                            {entry.timestamp}
                          </div>
                          <div className="mt-1 text-gray-800">
                            {entry.content}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full bg-gray-100 rounded-lg text-gray-600 ">
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

                  <div className="absolute bottom-0 left-0 w-full border-t-[1px] border-gray-200 bg-gray-50 flex flex-col items-center gap-2 p-2">
                    <div className="flex gap-2 items-center text-xs text-gray-600 py-2 border-t-[1px] border-gray-200 bg-gray-100 rounded-t-lg w-full">
                      {/* <Button
                    variant="outline"
                    size="sm"
                    className="py-0 h-8 font-medium text-xs"
                  >
                    <Copy className=" mr-1" size={15} />
                    Copy
                  </Button> */}
                      <TranscriptionDropdown />
                      <Button
                        variant="outline"
                        size="sm"
                        className="py-0 h-8 font-medium text-xs"
                      >
                        <Zap className="mr-1" size={15} />
                        AI
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          <TabsContent value="magicai">
            <div className="py-4 flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                <h1>Content Evaluation Report</h1>
                <MetricsEvaluation metrics={metrics} />
                <OverallScore score={overallScore} />
                <Recommendations recommendations={recommendations} />
              </div>
            </div>
            <div className="flex gap-2 items-center text-xs text-gray-600 py-2 border-t-[1px] border-gray-200 bg-gray-100 rounded-t-lg w-full">
              <Button
                variant="outline"
                size="sm"
                className="py-0 h-8 font-medium"
              >
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="py-0 h-8 font-medium"
              >
                <Zap className="h-4 w-4 mr-1" />
                AI
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SideProjectTabs;
