"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Square, Loader2 } from "lucide-react";
import { Button } from "../ui/button";

interface AudioRecorderProps {
  onRecordingComplete: (blob: Blob) => void;
}

export const AudioRecorder: React.FC<AudioRecorderProps> = ({
  onRecordingComplete,
}) => {
  const [recordingTime, setRecordingTime] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const animationFrameId = useRef<number>();
  const analyserNode = useRef<AnalyserNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContext = useRef<AudioContext | null>(null);
  const analyser = useRef<AnalyserNode | null>(null);
  const timerInterval = useRef<NodeJS.Timeout>();

  // Timer functions
  const startTimer = () => {
    setRecordingTime(0);
    timerInterval.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
      setRecordingTime(0);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopTimer();
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  // Handle recording state changes
  useEffect(() => {
    if (isRecording) {
      startTimer();
      drawVisualization();
    } else {
      stopTimer();
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isRecording]);

  // Get microphone permission
  useEffect(() => {
    const getMicrophonePermission = async () => {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setPermission(true);
        setStream(streamData);

        // Set up audio context and analyser
        const audioCtx = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
        const analyserNodeInstance = audioCtx.createAnalyser();
        analyserNodeInstance.fftSize = 256;

        const source = audioCtx.createMediaStreamSource(streamData);
        source.connect(analyserNodeInstance);

        audioContext.current = audioCtx;
        analyser.current = analyserNodeInstance;

        // Start visualization immediately if recording
        if (isRecording) {
          drawVisualization();
        }
      } catch (err) {
        console.error("Error accessing microphone:", err);
      }
    };

    if (!permission) {
      getMicrophonePermission();
    }
  }, [permission]);

  const startRecording = async () => {
    try {
      const streamData = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      const mediaRecorderInstance = new MediaRecorder(streamData);
      audioChunks.current = [];

      mediaRecorderInstance.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      mediaRecorderInstance.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
        onRecordingComplete(audioBlob);
      };

      // Set up new audio context and analyser if needed
      if (!audioContext.current || !analyser.current) {
        const audioCtx = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
        const analyserNodeInstance = audioCtx.createAnalyser();
        analyserNodeInstance.fftSize = 256;

        const source = audioCtx.createMediaStreamSource(streamData);
        source.connect(analyserNodeInstance);

        audioContext.current = audioCtx;
        analyser.current = analyserNodeInstance;
      }

      mediaRecorder.current = mediaRecorderInstance;
      mediaRecorderInstance.start();
      setIsRecording(true);
      setRecordingTime(0);
      drawVisualization();
    } catch (err) {
      console.error("Error starting recording:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== "inactive") {
      mediaRecorder.current.stop();
      mediaRecorder.current.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
      setRecordingTime(0);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    }
  };

  const handleRecordingClick = async () => {
    if (!permission) {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setPermission(true);
      } catch (err) {
        console.error("Error getting permission:", err);
        return;
      }
    }

    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const drawVisualization = () => {
    if (!canvasRef.current || !analyser.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const bufferLength = analyser.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (!ctx || !analyser.current) return;

      analyser.current.getByteFrequencyData(dataArray);

      // Clear the canvas
      ctx.clearRect(0, 0, width, height);

      // Premium gradient background
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, "rgba(147, 51, 234, 0.05)");
      gradient.addColorStop(0.5, "rgba(124, 58, 237, 0.05)");
      gradient.addColorStop(1, "rgba(147, 51, 234, 0.05)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw frequency bars
      const barWidth = (width / bufferLength) * 2.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const percent = dataArray[i] / 255;
        const barHeight = height * percent * 0.7;

        // Premium bar gradient
        const barGradient = ctx.createLinearGradient(
          0,
          height - barHeight,
          0,
          height
        );
        barGradient.addColorStop(0, "rgba(147, 51, 234, 0.8)");
        barGradient.addColorStop(1, "rgba(124, 58, 237, 0.4)");

        ctx.fillStyle = barGradient;

        // Rounded bars
        const roundedBar = Math.min(barWidth * 0.8, barHeight / 2);
        ctx.beginPath();
        ctx.moveTo(x + roundedBar, height - barHeight);
        ctx.lineTo(x + barWidth - roundedBar, height - barHeight);
        ctx.quadraticCurveTo(
          x + barWidth,
          height - barHeight,
          x + barWidth,
          height - barHeight + roundedBar
        );
        ctx.lineTo(x + barWidth, height - roundedBar);
        ctx.quadraticCurveTo(
          x + barWidth,
          height,
          x + barWidth - roundedBar,
          height
        );
        ctx.lineTo(x + roundedBar, height);
        ctx.quadraticCurveTo(x, height, x, height - roundedBar);
        ctx.lineTo(x, height - barHeight + roundedBar);
        ctx.quadraticCurveTo(
          x,
          height - barHeight,
          x + roundedBar,
          height - barHeight
        );
        ctx.fill();

        // Glow effect
        if (percent > 0.5) {
          ctx.shadowColor = "rgba(147, 51, 234, 0.3)";
          ctx.shadowBlur = 15;
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        x += barWidth + 1;
      }

      if (isRecording) {
        animationFrameId.current = requestAnimationFrame(draw);
      }
    };

    draw();
  };

  return (
    <div className="w-full max-w-[calc(100%-2rem)] sm:max-w-md md:max-w-4xl mx-auto p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-b from-background/80 to-background/40 border border-primary/10 backdrop-blur-sm hover:border-primary/20 transition-colors duration-300">
      <div className="flex flex-col gap-4">
        <div className="relative w-full aspect-[3/1] min-h-[100px] rounded-lg overflow-hidden">
          {/* Premium glass effect background */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-secondary/5 backdrop-blur-sm" />

          <canvas
            ref={canvasRef}
            width={300}
            height={100}
            className="absolute inset-0 w-full h-full"
          />

          {/* Recording indicator */}
          {isRecording && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute top-2 right-2 flex items-center gap-2 px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-primary/20"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-red-500"
              />
              <span className="text-xs font-medium text-primary">
                {formatTime(recordingTime)}
              </span>
            </motion.div>
          )}
        </div>

        <div className="flex justify-center">
          <motion.button
            onClick={handleRecordingClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative group p-4 rounded-full transition-all duration-300 ${
              isRecording
                ? "bg-red-500/10 hover:bg-red-500/20"
                : "bg-primary/10 hover:bg-primary/20"
            }`}
          >
            <motion.div
              className={`absolute inset-0 rounded-full ${
                isRecording ? "animate-ping bg-red-500/30" : ""
              }`}
            />
            <motion.div
              animate={isRecording ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {isRecording ? (
                <Square className="w-6 h-6 text-red-500" />
              ) : (
                <Mic className="w-6 h-6 text-primary" />
              )}
            </motion.div>
          </motion.button>
        </div>
      </div>
    </div>
  );
};
