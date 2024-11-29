"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Mic, Brain, FileText, AudioWaveform } from "lucide-react";

const HowItWorksSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const steps = [
    {
      icon: <Mic className="h-6 w-6" />,
      title: "Record or Upload",
      description: "Start by recording audio or uploading your file",
      qualityScore: 98,
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      icon: <AudioWaveform className="h-6 w-6" />,
      title: "Audio Processing",
      description: "Advanced noise reduction and enhancement",
      qualityScore: 95,
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI Analysis",
      description: "State-of-the-art speech recognition",
      qualityScore: 97,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Transcription",
      description: "Get accurate text with timestamps",
      qualityScore: 99,
      gradient: "from-pink-500 to-rose-500",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/95 to-background/90" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:16px] sm:bg-[size:32px]" />

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -mr-20 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -mb-20 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed px-4">
            Experience our streamlined transcription process powered by
            cutting-edge AI technology
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto relative">
          {/* Mobile Steps List */}
          <div className="block sm:hidden space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex items-center p-4 md:p-6 rounded-xl ${
                  activeStep === index
                    ? `bg-gradient-to-r ${step.gradient} bg-opacity-10`
                    : "bg-background/40"
                } border border-primary/10 backdrop-blur-sm hover:border-primary/20 transition-colors duration-300`}
              >
                <motion.div
                  animate={{
                    scale: activeStep === index ? 1.1 : 1,
                    opacity: activeStep === index ? 1 : 0.7,
                  }}
                  transition={{ duration: 0.3 }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                    activeStep === index
                      ? `bg-gradient-to-r ${step.gradient} shadow-lg shadow-primary/20`
                      : "bg-background border border-primary/20"
                  }`}
                >
                  {step.icon}
                </motion.div>
                <div className="flex-1">
                  <h3 className="font-semibold text-base text-foreground mb-0.5">
                    {step.title}
                  </h3>
                  <p className="text-sm text-foreground/80">
                    {step.description}
                  </p>
                </div>
                {activeStep === index && (
                  <div className="ml-2 px-2 py-1 rounded-full bg-background/95 backdrop-blur-sm border border-primary/10">
                    <span className="text-xs font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {step.qualityScore}%
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Desktop Pipeline Visualization */}
          <div className="hidden sm:block relative mb-24">
            {/* Container to match steps width */}
            <div className="relative max-w-5xl mx-auto px-4 md:px-8">
              {/* Steps container */}
              <div className="relative z-10 flex justify-between items-center">
                {/* Premium progress line with layered effects - positioned relative to first and last step */}
                <div className="absolute z-0 top-[38px] md:top-[46px] left-[calc(8%+8px)] right-[calc(8%+8px)] -z-10">
                  {/* Base layer */}
                  <div className="absolute inset-0 h-[2px] bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 blur-sm" />
                  {/* Glow effect */}
                  <div className="absolute inset-0 h-[1px] bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20" />
                  {/* Active progress */}
                  <motion.div
                    className="absolute z-0 h-[2px] bg-gradient-to-r from-primary/80 via-secondary to-primary/80"
                    style={{
                      width: `${((activeStep + 1) / steps.length) * 100}%`,
                      filter: "drop-shadow(0 0 4px rgba(var(--primary), 0.3))",
                    }}
                    initial={{ width: "0%" }}
                    animate={{
                      width: `${((activeStep + 1) / steps.length) * 100}%`,
                    }}
                    transition={{
                      duration: 0.8,
                      ease: [0.4, 0.0, 0.2, 1],
                    }}
                  />
                </div>

                {steps.map((step, index) => (
                  <div
                    key={step.title}
                    className="relative z--10 flex-1 flex flex-col items-center"
                  >
                    {/* Icon container */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{
                        duration: 0.8,
                        delay: index * 0.15,
                        ease: [0.4, 0.0, 0.2, 1],
                      }}
                      onMouseEnter={() => setHoveredStep(index)}
                      onMouseLeave={() => setHoveredStep(null)}
                      className="relative z-20" // Increased z-index to appear above line
                    >
                      <motion.div
                        animate={{
                          scale:
                            activeStep === index
                              ? 1.1
                              : hoveredStep === index
                              ? 1.05
                              : 1,
                          opacity:
                            activeStep === index || hoveredStep === index
                              ? 1
                              : 0.85,
                        }}
                        transition={{
                          duration: 0.4,
                          ease: [0.4, 0.0, 0.2, 1],
                        }}
                        className={`
                          w-16 h-16 md:w-20 md:h-20 rounded-full 
                          flex items-center justify-center 
                          transition-all duration-500
                          ${
                            activeStep === index
                              ? `bg-gradient-to-r ${step.gradient} shadow-lg shadow-primary/20 ring-2 ring-primary/20 ring-offset-2 ring-offset-background`
                              : "bg-white relative z-50  border-2 border-primary/20"
                          }
                        `}
                      >
                        <motion.div
                          animate={{
                            scale: activeStep === index ? 1.1 : 1,
                          }}
                          transition={{ duration: 0.3 }}
                          className={`
                            ${
                              activeStep === index
                                ? "text-white"
                                : "text-foreground "
                            } 
                            w-8 h-8 md:w-10 md:h-10 
                            flex items-center justify-center 
                            transition-colors duration-500
                          `}
                        >
                          {step.icon}
                        </motion.div>
                      </motion.div>

                      {/* Enhanced quality score indicator */}
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.9 }}
                        animate={
                          hoveredStep === index
                            ? { opacity: 1, y: 0, scale: 1 }
                            : { opacity: 0, y: -10, scale: 0.9 }
                        }
                        transition={{
                          duration: 0.3,
                          ease: [0.4, 0.0, 0.2, 1],
                        }}
                        className="absolute -top-20 left-1/2 -translate-x-1/2 bg-background/95 backdrop-blur-md px-4 py-2 rounded-full border border-primary/20 shadow-lg"
                      >
                        <span className="text-sm md:text-base font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                          {step.qualityScore}% Accuracy
                        </span>
                      </motion.div>
                    </motion.div>

                    {/* Content with enhanced animation */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{
                        duration: 0.6,
                        delay: 0.3 + index * 0.15,
                        ease: [0.4, 0.0, 0.2, 1],
                      }}
                      className="mt-8 text-center max-w-[200px] mx-auto"
                    >
                      <h3 className="font-semibold text-base md:text-lg text-foreground mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
