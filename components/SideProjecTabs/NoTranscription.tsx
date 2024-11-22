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
  onTranscriptionComplete,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isTranscribingError, setIsTranscribingError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useAppDispatch();
  const { toast } = useToast();

  //   const handleTranscribe = () => {
  //     transcribeAudio(selectedFile);
  //   };

  const handleTranscribeFile = async (file: FileProps, projectId: string) => {
    setIsTranscribing(true);
    setIsTranscribingError(false);
    setErrorMessage("");
    try {
      const result = await dispatch(
        addTranscription({
          projectId,
          file,
          transcription: {}, // Add an empty object or initial transcription data
        })
      ).unwrap();
      if (onTranscriptionComplete) {
        onTranscriptionComplete(result);
      }

      toast({
        title: "Transcription created successfully",
      });
    } catch (error) {
      console.error("Error transcribing file:", error);
      console.error("Error transcribing file:", error);
      setErrorMessage(
        error?.message || "Failed to create transcription. Please try again."
      );

      setIsTranscribingError(true);
      toast({
        title: "Transcription failed",
        description:
          error?.message || "An error occurred while transcribing the file.",
        variant: "destructive",
      });
    } finally {
      setIsTranscribing(false);
      setIsTranscribing(false);
      setProgress(0);
    }
  };

  // useEffect(() => {
  //   if (isTranscribing) {
  //     // Simulate progress for demo purposes
  //     const interval = setInterval(() => {
  //       setProgress((prev) => (prev < 100 ? prev + 10 : 100));
  //     }, 1000);
  //     return () => clearInterval(interval);
  //   }
  //   setProgress(0);
  // }, [isTranscribing]);
  useEffect(() => {
    let intervalId;
    if (isTranscribing) {
      intervalId = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(intervalId);
            return prev;
          }
          return prev + 5;
        });
      }, 1000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isTranscribing]);

  const handleRetry = () => {
    setIsTranscribingError(false);
    setErrorMessage("");
    if (selectedFile) {
      handleTranscribeFile(selectedFile, selectedFile?.project_id);
    }
  };

  return (
    <motion.div
      className="relative w-full h-[32rem] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-150 via-gray-100 to-gray-50"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-soft-light"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 via-transparent to-transparent"></div>
      <div className="relative h-full flex flex-col items-center justify-center p-8 text-gray-100">
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
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Captions className="w-20 h-20 mb-6 text-blue-400 drop-shadow-lg" />
              </motion.div>
              <h2 className="text-xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                No transcription yet
              </h2>
              <p className="text-gray-300 mb-8 text-center max-w-md text-sm leading-relaxed">
                Transform your audio into text with just a click. Our AI-powered
                transcription is ready when you are.
              </p>
              <Button
                className="group relative overflow-hidden rounded-full px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!selectedFile || !selectedFile?.path || isTranscribing}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => {
                  if (selectedFile) {
                    handleTranscribeFile(selectedFile, selectedFile?.project_id)
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
                <span className="relative flex items-center gap-3 text-lg font-semibold">
                  <Captions size={22} />
                  <span>Start Transcription</span>
                </span>
              </Button>
            </motion.div>
          ) : isTranscribing ? (
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
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <AudioLines className="w-20 h-20 mb-6 text-blue-400 drop-shadow-lg" />
              </motion.div>
              <h2 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                Transcribing...
              </h2>
              <p className="text-gray-300 text-center max-w-md text-lg leading-relaxed mb-8">
                Our AI is working its magic. Your transcription will be ready
                shortly.
              </p>
              <motion.div
                className="mb-8 h-3 w-64 bg-gray-700 rounded-full overflow-hidden shadow-inner"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                aria-label="Transcription progress"
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "linear" }}
                />
              </motion.div>
              {cancelTranscription && (
                <Button
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg font-semibold"
                  onClick={cancelTranscription}
                >
                  Cancel Transcription
                </Button>
              )}
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
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <XCircle className="w-20 h-20 mb-6 text-red-400 drop-shadow-lg" />
              </motion.div>
              <h2 className="text-3xl font-bold mb-3 text-red-500">Error</h2>
              <p className="text-gray-300 mb-8 text-center max-w-md text-lg leading-relaxed">
                {errorMessage ||
                  "Something went wrong during transcription. Please try again."}
              </p>
              <Button
                className="group relative overflow-hidden rounded-full px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={isTranscribing}
                onClick={handleRetry}
              >
                <span className="relative flex items-center gap-3 text-lg font-semibold">
                  <Captions size={22} />
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
