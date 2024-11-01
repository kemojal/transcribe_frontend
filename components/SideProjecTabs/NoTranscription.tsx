"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Captions, AudioLines, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/lib/hooks";
import { addTranscription } from "@/lib/reducers/fileSlice";
import { useToast } from "../ui/use-toast";
import { FileProps } from "@/types/interfaces";

export default function NoTranscription({
  selectedFile = null,
  transcribing = false,
  transcribeAudio,
  cancelTranscription,
  transcriptionError = false,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isTranscribingError, setIsTranscribingError] = useState(false);
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  //   const handleTranscribe = () => {
  //     transcribeAudio(selectedFile);
  //   };

  const handleTranscribeFile = async (file: FileProps, projectId: string) => {
    setIsTranscribing(true);
    try {
      await dispatch(
        addTranscription({
          projectId,
          file,
          transcription: {}, // Add an empty object or initial transcription data
        })
      ).unwrap();

      toast({
        title: "Transcription created successfully",
      });
    } catch (error) {
      console.error("Error transcribing file:", error);

      setIsTranscribingError(true);
      // Handle error (e.g., show error toast)
    } finally {
      setIsTranscribing(false);
    }
  };

  useEffect(() => {
    if (isTranscribing) {
      // Simulate progress for demo purposes
      const interval = setInterval(() => {
        setProgress((prev) => (prev < 100 ? prev + 10 : 100));
      }, 1000);
      return () => clearInterval(interval);
    }
    setProgress(0);
  }, [isTranscribing]);

  return (
    <motion.div
      className="relative w-full h-96 rounded-xl overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="relative h-full flex flex-col items-center justify-center p-8 text-gray-200">
        <AnimatePresence mode="wait">
          {!isTranscribing && !isTranscribingError ? (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              <Captions className="w-16 h-16 mb-4 text-blue-400" />
              <h2 className="text-2xl font-bold mb-2">No Transcription Yet</h2>
              <p className="text-gray-400 mb-6 text-center max-w-md">
                Transform your audio into text with just a click. Our AI-powered
                transcription is ready when you are.
              </p>
              <Button
                className="group relative overflow-hidden rounded-full px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300"
                disabled={!selectedFile || !selectedFile?.path || transcribing}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => {
                  if (selectedFile) {
                    // transcribeAudio(selectedFile.project_id, selectedFile.id);
                    handleTranscribeFile(
                      selectedFile,
                      selectedFile?.project_id
                    );
                  }
                }}
                aria-label="Start transcription"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600"
                  initial={{ x: "100%" }}
                  animate={{ x: isHovered ? "0%" : "100%" }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative flex items-center gap-2">
                  <Captions size={18} />
                  <span>Start Transcription</span>
                </span>
              </Button>
            </motion.div>
          ) : transcribing && !transcriptionError ? (
            <motion.div
              key="transcribing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <AudioLines className="w-16 h-16 mb-4 text-blue-400" />
              </motion.div>
              <h2 className="text-2xl font-bold mb-2">Transcribing...</h2>
              <p className="text-gray-400 text-center max-w-md">
                Our AI is working its magic. Your transcription will be ready
                shortly.
              </p>
              <motion.div
                className="mt-8 h-2 w-48 bg-gray-700 rounded-full overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                aria-label="Transcription progress"
              >
                <motion.div
                  className="h-full bg-blue-500"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "linear" }}
                />
              </motion.div>
              <Button
                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full"
                onClick={cancelTranscription}
              >
                Cancel Transcription
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              <XCircle className="w-16 h-16 mb-4 text-red-400" />
              <h2 className="text-2xl font-bold mb-2 text-red-500">Error</h2>
              <p className="text-gray-400 mb-6 text-center max-w-md">
                Oops! Something went wrong during transcription. Please try
                again.
              </p>
              <Button
                className="group relative overflow-hidden rounded-full px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300"
                disabled={transcribing}
                onClick={() => {
                  if (selectedFile) {
                    transcribeAudio(selectedFile.project_id, selectedFile.id);
                  }
                }}
              >
                <span className="relative flex items-center gap-2">
                  <Captions size={18} />
                  <span>Retry Transcription</span>
                </span>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
