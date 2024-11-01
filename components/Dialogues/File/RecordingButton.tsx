import React, { useState, useEffect } from "react";
import { Mic, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import StopIcon from "@/icons/StopIcon";

export default function RecordingButton({
  isRecording,
  handleRecordingToggle,
  time,
  setTime,
}) {
  const [levels, setLevels] = useState(Array(40).fill(0.3));

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
        setLevels((prevLevels) =>
          prevLevels.map(() => Math.random() * 0.8 + 0.2)
        );
      }, 100);
    } else {
      setLevels(Array(20).fill(0.3));
    }
    return () => clearInterval(interval);
  }, [isRecording, setTime]);

  const formatTime = (timeInTenths) => {
    const minutes = Math.floor(timeInTenths / 600);
    const seconds = Math.floor((timeInTenths % 600) / 10);
    const tenths = timeInTenths % 10;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${tenths}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center"
    >
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={handleRecordingToggle}
          className={`mb-6 w-16 h-16 rounded-full transition-all duration-300 ease-in-out relative ${
            isRecording
              ? "bg-red-500 hover:bg-red-600"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          aria-label={isRecording ? "Stop recording" : "Start recording"}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isRecording ? "square" : "mic"}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center w-full h-full"
            >
              {isRecording ? (
                <StopIcon />
              ) : (
                <Mic className="w-8 h-8 text-white" />
              )}
            </motion.div>
            {isRecording && (
              <>
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-red-500/50"
                  initial={{ opacity: 0, scale: 1.2 }}
                  animate={{ opacity: [0, 0.5, 0], scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    // border: "2px solid #0000001",
                    pointerEvents: "none",
                  }}
                />
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-red-500/20"
                  initial={{ opacity: 0, scale: 1.4 }}
                  animate={{ opacity: [0, 0.2, 0], scale: [1, 1.4, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    // border: "2px solid #0000001",
                    pointerEvents: "none",
                  }}
                />
              </>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>
      <motion.div
        className="flex space-x-1 mb-6 h-5 w-72 rounded-full overflow-hidden items-center justify-center"
        initial={{ scaleX: 0.8 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {levels.map((level, index) => (
          <motion.div
            key={index}
            className="w-[1px] rounded-full"
            style={{
              height: "100%",
              backgroundColor: isRecording
                ? `hsl(${index * 18}, 100%, 50%)`
                : "rgb(75, 85, 99)",
            }}
            initial={{ scaleY: 0.3 }}
            animate={{ scaleY: level }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          />
        ))}
      </motion.div>
      <motion.div
        className=" font-mono  text-gray-800 px-4 py-2 rounded-full shadow-inner"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {formatTime(time)}
      </motion.div>

      <motion.div
        className=" mt-4 text-xs text-muted-foreground pb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Record Audio, and upload it to get started. (30 seconds max)
      </motion.div>
      {isRecording && (
        <motion.div
          className="absolute inset-0 rounded-3xl bg-black/10"
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: [0, 0.5, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            // border: "2px solid #0000001",
            pointerEvents: "none",
          }}
        />
      )}
    </motion.div>
  );
}
