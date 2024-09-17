"use client";
import FileList from "@/components/File/FileList";
// import SideProjectTabs from "@/components/SideProjectTabs/SideProjectTabs";
import React, { useState } from "react";

const FilePage = () => {
  const [files, setFiles] = useState<any[]>([]);

  return (
    <div>
      {/* <div className="grid grid-cols-6 grid-rows-1 gap-4 ">
              <FileList
                files={files.filter(
                  (file) =>
                    file.name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) &&
                    (filterTypeFilter === "all" ||
                      (filterTypeFilter === "audio" &&
                        file.path.endsWith(".mp3")) ||
                      (filterTypeFilter === "video" &&
                        file.path.endsWith(".mp4")) ||
                      (filterTypeFilter === "document" &&
                        file.path.endsWith(".pdf")))
                )}
                fileLength={files.length}
                selectedFile={selectedFile}
                fileSizes={fileSizes}
                fileDurations={fileDurations}
                acceptedFiles={acceptedFiles}
                submitting={submitting}
                setAcceptedFiles={setAcceptedFiles}
                handleUpload={handleUpload}
                handleFileClick={handleFileClick}
                bytesToMegabytes={bytesToMegabytes}
              />
              <div className="col-span-4 col-start-3 ">
                <SideProjectTabs
                  selectedFile={selectedFile}
                  transcriptionEntries={transcriptionEntries}
                  currentTranscription={currentTranscription}
                  transcribeAudio={transcribeAudio}
                  transcribing={transcribing}
                  selectedFileSizeMB={selectedFileSize}
                  selectedFileDuration={selectedFileDuration}
                />
              </div>
            </div> */}
      files
    </div>
  );
};

export default FilePage;
