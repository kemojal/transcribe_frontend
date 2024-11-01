import React from "react";
import CustomTabs from "./CustomTabs";
import SideProjectTabs from "./SideProjectTabs";
import AnalyticDetailPage from "@/app/(home)/analytics/detail/page";
import EmptyTabs from "./EmptyTabs";
import ReactMarkdown from "react-markdown";
import Translations from "./Translations";
export const SideTabs = ({
  selectedFile,
  transcriptionEntries,
  currentTranscription,
  transcribeAudio,
  transcribing,
  selectedFileSizeMB,
  selectedFileDuration,
}) => {
  let transcription = selectedFile?.transcriptions[0];
  const tabItems = [
    {
      label: "Transcript",
      content: (
        <SideProjectTabs
          selectedFile={selectedFile}
          transcriptionEntries={transcriptionEntries}
          currentTranscription={currentTranscription}
          transcribeAudio={transcribeAudio}
          transcribing={transcribing}
          selectedFileSizeMB={selectedFileSizeMB}
          selectedFileDuration={selectedFileDuration}
        />
      ),
    },
    {
      label: "Summary",
      content: (
        <>
          {transcription && transcription?.summary_text ? (
            <div className="text-sm prose prose-slate leading-5 h-[660px] overflow-y-auto py-8 px-4  dark:bg-orange-900 !max-w-[100%]">
              <ReactMarkdown
                components={{
                  h2: ({ children }) => (
                    <h2 className="text-sm font-semibold text-black/50 dark:text-white/50 mb-4 pb-2 border-b border-black/10 dark:border-white/10">
                      {children}
                    </h2>
                  ),
                  p: ({ children }) => (
                    <p className="mb-4 text-gray-700 dark:text-gray-300 text-sm leading-6">
                      {children}
                    </p>
                  ),
                  // Custom handling for the bullet points with triple asterisks
                  text: ({ children }) => {
                    if (
                      typeof children === "string" &&
                      children.startsWith("***")
                    ) {
                      const [title, content] = children.substring(3).split(":");
                      return (
                        <div className="mb-2">
                          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                            {title}:
                          </span>
                          <span className="text-gray-700 dark:text-gray-300">
                            {content}
                          </span>
                        </div>
                      );
                    }
                    return children;
                  },
                }}
              >
                {transcription?.summary_text}
              </ReactMarkdown>
              {/* <ReactMarkdown source={transcription?.summary_text} /> */}
              {/* {transcription?.summary_text} */}
            </div>
          ) : (
            <EmptyTabs
              title="No Summary"
              description="This file has no summary."
            />
          )}
        </>
      ),
    },
    {
      label: "Translations",
      content: (
        // <EmptyTabs
        //   title="No translations"
        //   description="The file has no translations. "
        // />
        <Translations />
      ),
    },
    {
      label: "Comments",
      content: (
        <EmptyTabs
          title="No comments"
          description="This file has no comments."
        />
      ),
    },
    {
      label: "Subtitles",
      content: (
        <EmptyTabs
          title="No subtitles"
          description="The file has no subtitles. "
        />
      ),
    },

    // {
    //   label: "Analytics",
    //   content: (
    //     <div className=" h-[660px] overflow-y-auto">
    //       <AnalyticDetailPage />
    //     </div>
    //   ),
    // },
  ];

  return (
    <div>
      <CustomTabs items={tabItems} defaultValue="Transcript" />
    </div>
  );
};
