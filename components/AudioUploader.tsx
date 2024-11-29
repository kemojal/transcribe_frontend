import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Waveform } from "@/components/ui/waveform";
import { FileAudio, CheckCircle, Upload, Loader2 } from "lucide-react";

const backgroundStyles = `
  .premium-gradient {
    background: linear-gradient(
      135deg,
      rgba(99, 102, 241, 0.1) 0%,
      rgba(168, 85, 247, 0.1) 50%,
      rgba(236, 72, 153, 0.1) 100%
    );
  }

  .progress-track {
    background: linear-gradient(
      90deg,
      rgba(99, 102, 241, 0.2) 0%,
      rgba(168, 85, 247, 0.2) 50%,
      rgba(236, 72, 153, 0.2) 100%
    );
  }

  .progress-indicator {
    background: linear-gradient(
      90deg,
      #6366f1 0%,
      #8b5cf6 50%,
      #ec4899 100%
    );
  }

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  .shimmer {
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    background-size: 200% 100%;
    animation: shimmer 2s infinite;
  }

  .wave-container {
    position: relative;
    height: 60px;
    width: 100%;
    overflow: hidden;
    border-radius: 12px;
  }

  .wave {
    position: absolute;
    background: linear-gradient(
      180deg,
      rgba(99, 102, 241, 0.3) 0%,
      rgba(99, 102, 241, 0.1) 100%
    );
    width: 200%;
    height: 100%;
    animation: wave 3s infinite linear;
  }

  @keyframes wave {
    0% { transform: translateX(0) scaleY(1); }
    50% { transform: translateX(-25%) scaleY(0.8); }
    100% { transform: translateX(-50%) scaleY(1); }
  }
`;

const AudioUploader = ({ isSubmitting }: { isSubmitting: boolean }) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);

  const stages = [
    "Preparing audio...",
    "Analyzing format...",
    "Optimizing quality...",
    "Almost there...",
  ];

  useEffect(() => {
    if (isSubmitting) {
      setUploadProgress(0);
      setUploadComplete(false);
      setCurrentStage(0);

      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setUploadComplete(true);
            return 100;
          }
          return prev + 1;
        });
      }, 50);

      const stageInterval = setInterval(() => {
        setCurrentStage((prev) => (prev + 1) % stages.length);
      }, 2000);

      return () => {
        clearInterval(progressInterval);
        clearInterval(stageInterval);
      };
    }
  }, [isSubmitting]);

  return (
    <>
      <style>{backgroundStyles}</style>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-md mx-auto"
        >
          <div className="premium-gradient rounded-2xl p-8 backdrop-blur-lg border border-white/10 shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                  {uploadComplete ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <FileAudio className="w-6 h-6 text-indigo-500" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {uploadComplete ? "Upload Complete" : "Uploading Audio"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {uploadComplete
                      ? "Ready for processing"
                      : stages[currentStage]}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Progress Section */}
            <div className="space-y-6">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{uploadProgress}% complete</span>
                  <span>{uploadComplete ? "Done" : "Uploading..."}</span>
                </div>
                <div className="relative h-2 rounded-full overflow-hidden progress-track">
                  <motion.div
                    className="absolute top-0 left-0 h-full progress-indicator"
                    initial={{ width: "0%" }}
                    animate={{ width: `${uploadProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute top-0 left-0 w-full h-full shimmer" />
                </div>
              </div>

              {/* Waveform Visualization */}
              <div className="wave-container bg-indigo-50/50">
                <div className="wave" />
                <div className="wave" style={{ animationDelay: "-1.5s" }} />
              </div>

              {/* Processing Steps */}
              <div className="grid grid-cols-4 gap-2">
                {stages.map((stage, index) => (
                  <motion.div
                    key={stage}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`h-1 rounded-full ${
                      index <= currentStage ? "bg-indigo-500" : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-center"
            >
              {uploadComplete ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="inline-flex items-center gap-2 text-green-500"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Ready for transcription</span>
                </motion.div>
              ) : (
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-sm text-gray-500"
                >
                  Please keep this window open
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Background Decoration */}
          <div className="absolute -inset-4 -z-10 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-50" />
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default AudioUploader;
