import React, { useState } from "react";
import { AlarmClock, Play, Check, X, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

const EditableTranscriptionEntries = ({
  transcriptionEntries,
  currentPlayingEntry,
  handlePlayTimestamp,
  formatTimestamp,
  handleContentUpdate,
}) => {
  const [editingEntryIndex, setEditingEntryIndex] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  const startEditing = (index, content) => {
    setEditingEntryIndex(index);
    setEditedContent(content);
  };

  const cancelEditing = () => {
    setEditingEntryIndex(null);
    setEditedContent("");
  };

  const saveEdit = (index) => {
    handleContentUpdate(index, editedContent);
    setEditingEntryIndex(null);
    setEditedContent("");
  };

  return (
    <>
      {transcriptionEntries.map((entry, index) => {
        return (
          <div
            key={index}
            className={`transcription-entry py-2 px-1 flex flex-col ${
              currentPlayingEntry === entry
                ? "bg-blue-50 border-l-[1px] border-blue-500 text-blue-500"
                : "bg-white text-gray-500"
            } shadow-xs`}
          >
            <div className="w-full flex items-center gap-2 border-b-[0.5px] border-gray-100 pb-2">
              <div className="flex items-center gap-1 font-light text-sm">
                <AlarmClock size={16} />
                <span>
                  {formatTimestamp(entry.timestamp.split(" --> ")[0])}
                </span>
                <span className="mx-2">-</span>
                <AlarmClock size={16} />
                <span>
                  {formatTimestamp(entry.timestamp.split(" --> ")[1])}
                </span>
              </div>
              <Button
                size="icon"
                variant="outline"
                className="w-6 h-6 bg-gray-500 text-white"
                onClick={() => {
                  handlePlayTimestamp(entry.timestamp);
                }}
              >
                {currentPlayingEntry === entry ? (
                  <Pause size={10} className="text-white" />
                ) : (
                  <Play size={10} />
                )}
              </Button>
            </div>
            <div className="w-full font-normal text-sm pt-1">
              {editingEntryIndex === index ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="flex-grow p-1 border rounded"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => saveEdit(index)}
                  >
                    <Check size={16} className="text-green-500" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={cancelEditing}>
                    <X size={16} className="text-red-500" />
                  </Button>
                </div>
              ) : (
                <div
                  onClick={() => startEditing(index, entry.content)}
                  className="cursor-text hover:bg-gray-100 p-1 rounded"
                >
                  {entry.content}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default EditableTranscriptionEntries;
