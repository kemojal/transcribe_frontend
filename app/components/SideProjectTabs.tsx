"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Player } from "./AudioPlayer";
import { formatDate } from "@/utils";
import { Captions, Copy, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MetricsEvaluation } from "./Analysis/ MetricsEvaluation";
import { OverallScore } from "./Analysis/OverallScore";
import Recommendations from "./Analysis/Recommendations";

const SideProjectTabs = ({
  selectedFile,
  transcriptionEntries,
  currentTranscription,
  transcribeAudio,
  transcribing,
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
    <Tabs defaultValue="transcriptions" className="w-[450px] p-2">
      <TabsList>
        <TabsTrigger value="transcriptions">Transcription</TabsTrigger>
        
        <TabsTrigger value="magicai">Magic AI</TabsTrigger>
        <TabsTrigger value="translate" disabled>Translations</TabsTrigger>
        <TabsTrigger value="subtitles" disabled>Subtitle</TabsTrigger>
      </TabsList>
      <TabsContent value="transcriptions" className="">
        {selectedFile && selectedFile?.path && (
          <div className="col-span-2 col-start-5 py-4 pl-4">
            <div className="p-4  rounded-lg  border-[0.5px] border-gray-200 bg-gray-50 rounded-lg  mb-4">
              {/* Transcription Header */}
              <div className="text-sm text-gray-800 border-b-1 bg-white font-medium p-4 rounded-lg">
                {selectedFile?.name || "Transcription"}
              </div>
              <div className="mt-2">
                {selectedFile && selectedFile?.path && (
                  <Player src={selectedFile?.path} width={380} />
                )}
              </div>
              <div className="mt-4 text-sm text-gray-600 flex items-center gap-2">
                <span className="block">
                  <span className="font-medium">Duration:</span>{" "}
                  {selectedFile?.duration || 0} seconds
                </span>
                <span className="block">
                  <span className="font-medium">Size:</span>{" "}
                  {selectedFile?.size || 0} bytes
                </span>
                <span className="block">
                  <span className="font-medium">Created:</span>{" "}
                  {formatDate(selectedFile?.created_at)}
                </span>
                {/* Uncomment if needed */}
                {/* <span className="block">
          <span className="font-medium">Modified:</span> {formatDate(selectedFile?.updated_at)}
        </span> */}
              </div>
            </div>

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
                      <div className="mt-1 text-gray-800">{entry.content}</div>
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
          <Button variant="outline" size="sm" className="py-0 h-8 font-medium">
            <Copy className="h-4 w-4 mr-1" />
            Copy
          </Button>
          <Button variant="outline" size="sm" className="py-0 h-8 font-medium">
            <Zap className="h-4 w-4 mr-1" />
            AI
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default SideProjectTabs;
