"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Wand2,
  Languages,
  Users2,
  Check,
  Star,
  Clock,
  FileText,
  Shield,
} from "lucide-react";
import { Button } from "../ui/button";
import { AudioRecorder } from "./AudioRecorder";
import { useRouter } from "next/navigation";

export const HeroSection = () => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });
  const { scrollY } = useScroll();
  const [isHovered, setIsHovered] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  // Premium features rotation
  const features = [
    "Real-time transcription",
    "Speaker diarization",
    "40+ languages",
    "99.9% accuracy",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Enhanced scroll-based animations
  const y = useSpring(useTransform(scrollY, [0, 300], [0, -50]), {
    stiffness: 100,
    damping: 30,
  });

  const opacity = useSpring(useTransform(scrollY, [0, 200], [1, 0.2]), {
    stiffness: 100,
    damping: 30,
  });

  const scale = useSpring(useTransform(scrollY, [0, 300], [1, 0.9]), {
    stiffness: 100,
    damping: 30,
  });

  // Premium floating elements animation
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  // Sophisticated entrance animations
  const containerAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.2,
      },
    },
  };

  const statsData = [
    {
      icon: Languages,
      value: "40+",
      label: "Languages",
      gradient: "from-blue-500 to-purple-500",
    },
    {
      icon: Users2,
      value: "99.9%",
      label: "Accuracy",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Wand2,
      value: "Real-time",
      label: "Processing",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: Clock,
      value: "2.5x",
      label: "Faster",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      icon: FileText,
      value: "100M+",
      label: "Words Processed",
      gradient: "from-indigo-500 to-blue-500",
    },
    {
      icon: Shield,
      value: "Enterprise",
      label: "Security",
      gradient: "from-teal-500 to-cyan-500",
    },
  ];

  const floatingSnippets = [
    "Meeting transcript...",
    "Interview analysis...",
    "Real-time captions...",
    "Multi-speaker detection...",
    "99.9% accuracy...",
    "Enterprise security...",
  ];

  const basePositions = [10, 20, 30, 40, 50, 60, 70, 80, 90];

  // Path animation variants
  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 3, ease: [0.43, 0.13, 0.23, 0.96] },
        opacity: { duration: 1 },
      },
    },
  };

  const particleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: [0, 1, 1, 0],
      scale: [0, 1.2, 1.2, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        delay: i * 0.3,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-background via-background/95 to-background">
      {/* Premium background effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px] [mask-image:radial-gradient(white,transparent_85%)]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-primary/30 opacity-20 blur-3xl" />
      </div>
      <div className="absolute inset-0">
        <div className="absolute -left-4 top-0 h-[1000px] w-[1000px] rounded-full bg-primary/30 opacity-10 blur-3xl" />
        <div className="absolute -right-4 top-0 h-[1000px] w-[1000px] rounded-full bg-secondary/30 opacity-10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-8 px-6 py-24 sm:px-8 md:py-32"
      >
        {/* Premium badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative"
        >
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary to-secondary blur-md" />
          <div className="relative rounded-full border border-primary/20 bg-background/80 px-4 py-1 backdrop-blur-sm">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-sm font-medium text-transparent">
              Enterprise-Grade AI Transcription
            </span>
          </div>
        </motion.div>

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex flex-col items-center gap-6 text-center"
        >
          <h1 className="max-w-4xl bg-gradient-to-b from-foreground to-foreground/80 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
            Transform Speech into
            <span className="relative mx-2 whitespace-nowrap">
              <span className="relative bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Actionable Insights
              </span>
              <motion.svg
                aria-hidden="true"
                viewBox="0 0 418 42"
                className="absolute left-0 top-full h-[0.6em] w-full fill-primary/20"
                preserveAspectRatio="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
              >
                <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
              </motion.svg>
            </span>
            <br />
            with Enterprise AI
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl"
          >
            Experience unparalleled accuracy with our state-of-the-art AI
            transcription engine. Built for enterprise-scale performance,
            security, and reliability.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col gap-4 sm:flex-row sm:gap-6"
          >
            <Button
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300"
              onClick={() => router.push("/register")}
            >
              Start Transcribing
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "100%" }}
                animate={{ x: "-100%" }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "linear",
                }}
              />
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="group border-primary/20 hover:border-primary/40 transition-colors duration-300"
            >
              View Enterprise Plans
              <motion.span
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              >
                →
              </motion.span>
            </Button>
          </motion.div>
        </motion.div>

        {/* Audio recorder with enhanced styling */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="w-full max-w-4xl  mx-auto px-2 sm:px-4 lg:px-0 relative"
        >
          <AudioRecorder
            onRecordingComplete={(blob) => console.log(blob)}
            isRecording={isRecording}
            setIsRecording={setIsRecording}
          />
        </motion.div> */}

        {/* Enhanced stats display */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.1, duration: 0.8 }}
          className="w-full grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-8 mt-4 sm:mt-12 px-2 sm:px-4 lg:px-0 relative min-h-[300px]"
        >
          <svg
            className="absolute inset-0 w-full h-full -z-10 overflow-visible pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="pathGradient" gradientUnits="userSpaceOnUse">
                <stop
                  offset="0%"
                  stopColor="var(--primary)"
                  stopOpacity="0.5"
                />
                <stop
                  offset="50%"
                  stopColor="var(--primary)"
                  stopOpacity="0.8"
                />
                <stop
                  offset="100%"
                  stopColor="var(--secondary)"
                  stopOpacity="0.5"
                />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="1" result="coloredBlur" />
                <feComposite
                  in="SourceGraphic"
                  in2="coloredBlur"
                  operator="over"
                />
              </filter>
              <filter id="particleGlow">
                <feGaussianBlur stdDeviation="0.5" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 1   0 0 0 0 1   0 0 0 0 1  0 0 0 0.6 0"
                />
              </filter>
            </defs>

            {/* Grid pattern */}
            <pattern
              id="grid"
              x="0"
              y="0"
              width="33.33"
              height="33.33"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 33.33 0 L 0 0 0 33.33"
                fill="none"
                stroke="url(#pathGradient)"
                strokeWidth="0.3"
                opacity="0.3"
              />
            </pattern>
            <rect width="100" height="100" fill="url(#grid)" opacity="0.2" />

            {/* Connection lines */}
            {[0, 1, 2].map((row) => (
              <motion.path
                key={`h${row}`}
                d={`M 10 ${25 + row * 25} H 90`}
                stroke="url(#pathGradient)"
                strokeWidth="0.4"
                strokeLinecap="round"
                fill="none"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
                filter="url(#glow)"
              />
            ))}
            {[0, 1, 2].map((col) => (
              <motion.path
                key={`v${col}`}
                d={`M ${20 + col * 30} 15 V 85`}
                stroke="url(#pathGradient)"
                strokeWidth="0.4"
                strokeLinecap="round"
                fill="none"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
                filter="url(#glow)"
              />
            ))}

            {/* Intersection points */}
            {Array.from({ length: 9 }, (_, i) => (
              <motion.circle
                key={`point${i}`}
                cx={20 + (i % 3) * 30}
                cy={25 + Math.floor(i / 3) * 25}
                r="0.8"
                fill="var(--primary)"
                variants={particleVariants}
                custom={i}
                initial="hidden"
                animate="visible"
                filter="url(#particleGlow)"
              />
            ))}
          </svg>

          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              animate={floatingAnimation}
              custom={index}
              whileHover={{ scale: 1.05 }}
              className="flex space-x-2 md:space-x-0 md:flex-col items-center justify-center md:justify-start p-3 sm:p-4 lg:p-5 rounded-lg sm:rounded-xl bg-gradient-to-b from-background/80 to-background/40 border border-primary/10 backdrop-blur-sm hover:border-primary/20 transition-all duration-300"
            >
              <motion.div
                className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center bg-gradient-to-r ${stat.gradient} bg-opacity-10 mb-2 sm:mb-3`}
              >
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
              </motion.div>

              <div className="flex flex-col  items-start">
                <span className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm lg:text-base text-muted-foreground text-center mt-1">
                  {stat.label}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating text snippets */}
        {floatingSnippets.map((text, i) => (
          <motion.div
            key={text}
            className="pointer-events-none select-none absolute left-0 text-primary/20 whitespace-nowrap text-sm sm:text-base font-medium"
            animate={{
              x: ["0%", "100%"],
              y: [
                basePositions[i % basePositions.length],
                basePositions[i % basePositions.length] + 50,
                basePositions[i % basePositions.length],
              ],
            }}
            transition={{
              x: {
                duration: 25 + i * 5,
                repeat: Infinity,
                ease: "linear",
              },
              y: {
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            style={{
              top: `${i * 15 + 5}%`,
              left: `-${text.length * 8}px`,
            }}
          >
            <p className="opacity-50 hover:opacity-75 transition-opacity duration-300  text-sm">
              {text}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Enhanced floating transcription snippets - Hidden on mobile */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden sm:block">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              y: 100,
              x: Math.random() * window.innerWidth - window.innerWidth / 2,
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: [-50, -300 - i * 50],
              x: [
                Math.random() * 400 - 200,
                Math.random() * 400 - 200,
                Math.random() * 400 - 200,
              ],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut",
            }}
            className="absolute bottom-0 left-1/2 p-3 rounded-lg bg-gradient-to-r from-background/80 to-background/40 border border-primary/10 backdrop-blur-sm"
          >
            <p className="text-sm text-muted-foreground whitespace-nowrap">
              {floatingSnippets[i]}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
