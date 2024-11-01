"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, FileAudio, Headphones, ChevronRight } from "lucide-react";
// import OnboardingPage from '../onboarding/page'

const onboardingSteps = [
  {
    title: "Record Your Audio",
    description:
      "Use our high-quality audio recording feature to capture your voice clearly.",
    icon: Mic,
  },
  {
    title: "Upload Existing Files",
    description:
      "Already have audio files? Upload them directly for quick transcription.",
    icon: FileAudio,
  },
  {
    title: "Get Accurate Transcripts",
    description:
      "Our AI-powered system delivers precise transcripts in minutes.",
    icon: Headphones,
  },
];

function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F6F8] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-md w-full">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Welcome to TranscribeAI
          </h1>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-4">
                {React.createElement(onboardingSteps[currentStep].icon, {
                  className: "w-10 h-10 text-purple-600",
                })}
                <h2 className="text-xl font-semibold text-gray-700 ml-4">
                  {onboardingSteps[currentStep].title}
                </h2>
              </div>
              <p className="text-gray-600 mb-6">
                {onboardingSteps[currentStep].description}
              </p>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              {onboardingSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentStep ? "bg-purple-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-600 text-white px-6 py-2 rounded-full flex items-center"
              onClick={nextStep}
            >
              {currentStep === onboardingSteps.length - 1
                ? "Get Started"
                : "Next"}
              <ChevronRight className="ml-2 w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnboardingPage;
