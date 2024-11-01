"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UploadCloud,
  Sparkles,
  DownloadCloud,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { BackgroundBeamsWithCollision } from "@/effects/background-beams-with-collision";

const steps = [
  {
    id: 1,
    icon: UploadCloud,
    title: "Upload Your Audio",
    description: "Start by uploading your audio files in any popular format.",
    gif: "/test.gif",
    bg: "bg-primary",
    ring: "ring-primary",
    text: "text-accent",
  },
  {
    id: 2,
    icon: Sparkles,
    title: "AI Transcribes for You",
    description: "Our AI models process your audio to create accurate text.",
    gif: "/transcribe.gif",
    bg: "bg-secondary",
    ring: "ring-secondary",
    text: "text-secondary-content",
  },
  {
    id: 3,
    icon: DownloadCloud,
    title: "Download and Edit",
    description:
      "Review, download, and make edits to your transcript as needed.",
    gif: "/download.gif",
    bg: "bg-tertiary",
    ring: "ring-tertiary",
    text: "text-tertiary-content",
  },
];

export default function Component() {
  const [selectedStep, setSelectedStep] = useState(steps[0]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 1);
      } else {
        setProgress(0);
        setSelectedStep((prevStep) => {
          const nextStepId = (prevStep.id % steps.length) + 1;
          return steps.find((step) => step.id === nextStepId) || steps[0];
        });
      }
    }, 100);

    return () => clearInterval(interval);
  }, [progress]);

  const handleStepChange = (direction: "next" | "prev") => {
    setProgress(0);
    setSelectedStep((prevStep) => {
      const newStepId =
        direction === "next"
          ? (prevStep.id % steps.length) + 1
          : ((prevStep.id - 2 + steps.length) % steps.length) + 1;
      return steps.find((step) => step.id === newStepId) || steps[0];
    });
  };

  // <BackgroundBeamsWithCollision>
  return (
    <section className="w-full py-20 bg-gradient-to-b from-[#010102] to-white text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }} // custom easing for smoothness
        >
          See how it works
        </motion.h2>
        <div className="relative">
          <div className="flex justify-between items-center mb-8 max-w-xs mx-auto">
            <button
              onClick={() => handleStepChange("prev")}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
              aria-label="Previous step"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>

            <div className="flex items-center space-x-2 bg-gray-100 p-4 rounded-3xl">
              {steps.map((step, index) => (
                <AnimatePresence mode="wait" key={step.id}>
                  <motion.div
                    className="relative"
                    whileHover={{
                      scale: 1.1,
                      rotate: [0, 5, -5, 0], // A premium hover effect with rotation
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 20,
                    }}
                  >
                    <motion.div
                      className={`rounded-full ${
                        step.id === selectedStep.id
                          ? "w-12 h-3 bg-gray-200 overflow-hidden"
                          : "w-3 h-3 " +
                            (index < steps.indexOf(selectedStep)
                              ? "bg-blue-600"
                              : "bg-gray-300")
                      }`}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                        duration: 0.5,
                      }}
                    >
                      {step.id === selectedStep.id && (
                        <motion.div
                          className="h-full bg-[#171E2B] transition-all ease-linear"
                          style={{ width: `${progress}%` }}
                          initial={{ width: "0%" }}
                          animate={{ width: `${progress}%` }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 20,
                          }}
                        />
                      )}
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              ))}
            </div>
            <button
              onClick={() => handleStepChange("next")}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
              aria-label="Next step"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Step content */}
          <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-gray-900 to-gray-800">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedStep.id}
                className="p-8 h-full flex flex-col justify-between"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{
                  duration: 0.6,
                  ease: [0.43, 0.13, 0.23, 0.96],
                }}
              >
                <motion.img
                  src={selectedStep.gif}
                  alt={selectedStep.title}
                  className="w-full h-auto rounded-lg shadow-xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              </motion.div>
            </AnimatePresence>
            <div
              className={`absolute inset-0 bg-gradient-to-r ${selectedStep.bg} opacity-20 transition-opacity duration-500`}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[80%] bg-gradient-to-t from-[#191F2D] dark:from-background" />
            <div className="absolute  left-0 bottom-0 h-full w-full rounded-tr-xl rounded-br-xl pointer-events-none absolute inset-y-0 left-0  bg-gradient-to-r from-[#191F2D] via-[#171E2B] to-[#191f2d0] dark:from-background flex flex-col items-start justify-start">
              <div className=" bg-gradient-to-r from-[#191F2D]  to-transparent max-w-5xl h-full flex flex-col items-center justify-center p-8 rounded-tr-xl rounded-br-xl space-y-8">
                {/* <div className="w-full h-64 rounded-xl bg-red-500 flex items-center justify-center">
                  icon
                </div> */}
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold text-white max-w-sm">
                    {selectedStep.title}
                  </h3>
                  <p className="text-lg text-gray-300 max-w-sm">
                    {selectedStep.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
// {/* </BackgroundBeamsWithCollision> */}
