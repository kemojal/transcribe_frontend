"use client";
import React, { useEffect, useRef, useState } from "react";
import { AlarmClock, Play, Check, X, Pause, Edit2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { extractMMSS, parseTimeToSeconds } from "@/utils";
import { Textarea } from "../ui/textarea";
import { AnimatePresence, motion } from "framer-motion";

const EditableTranscriptionEntries = ({
  transcriptionEntries,
  currentPlayingEntry,
  handlePlayTimestamp,
  formatTimestamp,
  handleContentUpdate,
  currentTime,
  isAudioPlaying,
}) => {
  const [editingEntryIndex, setEditingEntryIndex] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [highlightedWords, setHighlightedWords] = useState([]);

  const entryRefs = useRef([]);

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

  // for highlighting words

  useEffect(() => {
    if (currentPlayingEntry) {
      const [start, end] = currentPlayingEntry.timestamp.split(" --> ");
      const startTime = parseTimeToSeconds(start);
      const endTime = parseTimeToSeconds(end);

      const progress = (currentTime - startTime) / (endTime - startTime);

      const words = currentPlayingEntry.content.split(" ");
      const totalDuration = endTime - startTime;
      const timePerWord = totalDuration / words.length;

      // Ensure currentWordIndex is a valid number, clamped between 0 and words.length - 1
      const currentWordIndex = Math.min(
        Math.floor((currentTime - startTime) / timePerWord),
        words.length - 1
      );

      // Highlight only the current word
      setHighlightedWords([words[currentWordIndex]]);
    } else {
      setHighlightedWords([]);
    }
  }, [currentPlayingEntry, currentTime]);

  // Updated renderHighlightedContent to ensure only one word is highlighted
  const renderHighlightedContent = (content) => {
    const words = content.split(" ");
    return words.map((word, index) => (
      <AnimatePresence key={index}>
        {highlightedWords[0] === word ? ( // Highlight only if it's the exact current word
          <motion.span
            key={index}
            initial={{
              scale: 1,
              paddingLeft: 0,
              paddingRight: 0,
              paddingTop: 0,
              paddingBottom: 0,
              backgroundColor: "transparent",
              fontWeight: "normal",
            }}
            animate={{
              opacity: 1.2,
              scale: 1,
              paddingLeft: 4,
              paddingRight: 4,
              paddingTop: 1,
              paddingBottom: 1,
              borderRadius: 4,
              backgroundColor: "#4192F7",
              color: "white",
              fontWeight: "bold",
              fontSize: 16,
            }}
            transition={{ duration: 0.2, type: "spring" }}
            exit={{
              opacity: 1,
              scale: 1,
              paddingLeft: 0,
              paddingRight: 0,
              paddingTop: 0,
              paddingBottom: 0,
              backgroundColor: "transparent",
              color: "#394150",
              fontWeight: "normal",
            }}
          >
            {word}{" "}
          </motion.span>
        ) : (
          <motion.span
            key={index}
            initial={{
              scale: 1,
              paddingLeft: 0,
              paddingRight: 0,
              paddingTop: 0,
              paddingBottom: 0,
              backgroundColor: "transparent",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              paddingLeft: 0,
              paddingRight: 0,
              paddingTop: 0,
              paddingBottom: 0,
              color: "#394150",
            }}
            transition={{ duration: 0.2, type: "spring" }}
            exit={{
              opacity: 1,
              scale: 1,
              paddingLeft: 0,
              paddingRight: 0,
              paddingTop: 0,
              paddingBottom: 0,
              backgroundColor: "transparent",
            }}
          >
            {word}{" "}
          </motion.span>
        )}
      </AnimatePresence>
    ));
  };

  // Scroll the current playing entry into view
  useEffect(() => {
    if (currentPlayingEntry && entryRefs.current && isAudioPlaying) {
      const currentEntryIndex =
        transcriptionEntries.indexOf(currentPlayingEntry);
      if (entryRefs.current[currentEntryIndex]) {
        entryRefs.current[currentEntryIndex].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [currentPlayingEntry, transcriptionEntries, isAudioPlaying]);

  return (
    <AnimatePresence mode="wait">
      {transcriptionEntries.map((entry, index) => (
        <motion.div
          key={index}
          ref={(el) => (entryRefs.current[index] = el)} // Store ref for each entry
          className={`group transcription-entry py-1 px-1 flex items-center justify-between gap-2  transition-all duration-300 ${
            currentPlayingEntry === entry
              ? "bg-blue-50 border-l-4 border-blue-500"
              : "bg-white hover:bg-gray-50"
          } border-b-[0px] last:border-b-0 border-gray-100 `}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div className="font-normal w-[calc(100%-200px)] flex items-center  text-pretty">
            {editingEntryIndex === index ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex  gap-2 w-full  relative"
              >
                <Textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="w-full p-2 border  focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all"
                  rows={3}
                />
                <div className="flex justify-end gap-2 absolute bottom-0 right-0">
                  <Button
                    size="sm"
                    variant={"ghost"}
                    onClick={cancelEditing}
                    className="text-red-400 hover:text-red-600 hover:bg-transparent"
                  >
                    <X size={14} className="mr-1" />
                    {/* Cancel */}
                  </Button>
                  <Button
                    size="sm"
                    variant={"ghost"}
                    onClick={() => saveEdit(index)}
                    className="text-green-400 hover:text-green-600 hover:bg-transparent"
                  >
                    <Check size={14} className="mr-1" />
                    {/* Save */}
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="group relative flex flex-wrap items-center gap-4 min-w-[500px] cursor-pointer "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <AnimatePresence mode="wait">
                  {currentPlayingEntry === entry && isAudioPlaying ? (
                    <motion.p className="text-gray-700 text-pretty max-w-[calc(100%-100px)]">
                      {renderHighlightedContent(entry.content)}
                    </motion.p>
                  ) : (
                    <motion.p className="text-gray-700 text-pretty max-w-[calc(100%-100px)]">
                      {entry.content}
                    </motion.p>
                  )}
                </AnimatePresence>
                {/* */}
              </motion.div>
            )}
          </motion.div>
          <motion.div className="flex items-center flex-wrap text-xs space-x-2   justify-between opacity-20 group-hover:opacity-100 transition-opacity duration-200 rounded-xl">
            <motion.div
              className={`flex items-center gap-1 text-xs ${
                currentPlayingEntry === entry
                  ? "text-blue-600"
                  : "text-blue-500"
              }`}
            >
              <AlarmClock size={12} />
              <span>
                {extractMMSS(
                  formatTimestamp(entry.timestamp.split(" --> ")[0])
                )}
              </span>
              {/* <span>-</span>
              <span>
                {extractMMSS(
                  formatTimestamp(entry.timestamp.split(" --> ")[1])
                )}
              </span> */}
            </motion.div>

            <div className="max-w-[150px]">
              <Button
                size="sm"
                variant={"ghost"}
                className=" group-hover:opacity-100 transition-opacity duration-200 w-8 h-8"
                onClick={() => startEditing(index, entry.content)}
              >
                <span>
                  <Edit2
                    size={12}
                    className="text-gray-500 hover:text-gray-700"
                  />
                </span>
              </Button>
              <Button
                size="sm"
                variant={"ghost"}
                className=" group-hover:opacity-100 transition-opacity duration-200 w-8 h-8"
                onClick={() => startEditing(index, entry.content)}
                disabled
              >
                <span>
                  <Copy
                    size={12}
                    className="text-gray-500 hover:text-gray-700"
                  />
                </span>
              </Button>
              <Button
                size="sm"
                variant={"ghost"}
                className={` transition-colors duration-200 w-8 h-8 ${
                  currentPlayingEntry === entry
                    ? "text-blue-600 hover:text-blue-700"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => handlePlayTimestamp(entry.timestamp)}
              >
                <span>
                  {currentPlayingEntry === entry ? (
                    <Pause size={12} />
                  ) : (
                    <Play size={12} />
                  )}
                </span>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

export default EditableTranscriptionEntries;
