"use client";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  AudioLines,
  Captions,
  ChevronLeft,
  ChevronRight,
  CloudUpload,
} from "lucide-react";
import { useEffect, useState } from "react";

const steps = [
  {
    title: "Welcome to AudioScribe",
    description: "Transform your audio into accurate transcripts with ease.",
    icon: <AudioLines className="w-12 h-12 text-primary" />,
    content:
      "Upload or record audio files, use advanced AI transcription, and edit and export with ease.",
    style: "bg-blue-50 ring-1 ring-blue-100",
  },

  {
    title: "Upload Your Audio",
    description: "Get started by uploading your first audio file.",
    icon: <CloudUpload className="w-12 h-12 text-primary" />,
    content:
      "Drag and drop your audio file here or click to browse. We support MP3, WAV, and M4A formats.",
    style: "bg-green-50 ring-1 ring-green-100",
  },
  {
    title: "Customize Transcription",
    description: "Fine-tune your transcription settings.",
    icon: <Captions className="w-12 h-12 text-primary" />,
    content:
      "Choose language, speaker identification, and custom vocabulary for more accurate results.",
    style: "bg-yellow-50 ring-1 ring-yellow-100",
  },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prevStep) => (prevStep + 1) % steps.length); // Cycle through steps
    }, 3000); // Change step every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [steps.length]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e5e8edbd] to-[#cad3e557]">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
      >
        <motion.div className="flex flex-col items-center p-10 space-y-8 ">
          {/* Animated Step Icon */}

          <AnimatePresence mode="wait">
            <div
              className={`${steps[currentStep].style} w-full rounded-3xl flex items-center justify-center`}
            >
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="my-12 p-6 rounded-full bg-blue-100 "
              >
                {steps[currentStep].icon}
              </motion.div>
            </div>
          </AnimatePresence>

          {/* Progress Bar */}
          <div className="w-full bg-gray-50 rounded-full h-1 flex items-center p-[1px]">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${((currentStep + 1) / steps.length) * 100}%`,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="h-[2px] w-full bg-blue-600 rounded-full"
            />
          </div>

          {/* Step Content with AnimatePresence */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex flex-col items-center  text-center"
            >
              <motion.h1
                className="text-2xl font-semibold text-gray-800"
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6, ease: "easeInOut" }}
              >
                {steps[currentStep].title}
              </motion.h1>
              <motion.p
                className="text-lg text-gray-600 mb-4"
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: "easeInOut" }}
              >
                {steps[currentStep].description}
              </motion.p>
              <motion.p
                className="text-sm text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6, ease: "easeInOut" }}
              >
                {steps[currentStep].content}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* Step Indicators with Tooltip */}
          <AnimatePresence mode="wait">
            <motion.div
              className="flex justify-center items-center space-x-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5, ease: "easeInOut" }}
            >
              {steps.map((_, index) => (
                <motion.div
                  key={index}
                  className={`relative group `}
                  onClick={() => setCurrentStep(index)}
                >
                  <motion.button
                    className={`h-3 rounded-full transition-colors duration-300 ${
                      index === currentStep
                        ? " w-6 bg-blue-600 scale-125"
                        : "w-3 bg-gray-300 hover:bg-blue-400"
                    }`}
                    whileHover={{ scale: 1.2 }}
                  />
                  <motion.span className="absolute bottom-8 left-1/2 transform -translate-x-1/2 p-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Step {index + 1}
                  </motion.span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <motion.div
            className="flex justify-between w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`${
                currentStep === 0 ? "opacity-50" : ""
              } bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors duration-300 text-lg py-2 px-6 rounded-full font-semibold`}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              onClick={nextStep}
              disabled={currentStep === steps.length - 1}
              className="bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 text-lg py-2 px-6 rounded-full font-semibold"
            >
              {currentStep === steps.length - 1 ? (
                "Start Transcribing"
              ) : (
                <ChevronRight className="h-5 w-5" />
              )}
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
