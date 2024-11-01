import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useInterval } from "react-use";
import WaveSurfer from "wavesurfer.js";
import {
  Mic,
  Square,
  Play,
  Trash2,
  Upload,
  Pause,
  Volume2,
  Info,
} from "lucide-react";

export default function AudioRecorder({ projectId }: { projectId: string }) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<Blob | null>(null);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [fileInfo, setFileInfo] = useState<{
    size: string;
    format: string;
  } | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const waveformRef = useRef<WaveSurfer | null>(null);
  const waveformContainerRef = useRef<HTMLDivElement>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    if (recordedAudio && waveformContainerRef.current) {
      const wavesurfer = WaveSurfer.create({
        container: waveformContainerRef.current,
        waveColor: "#4F46E5",
        progressColor: "#818CF8",
        cursorColor: "#C7D2FE",
        barWidth: 2,
        barRadius: 3,
        responsive: true,
        height: 60,
      });

      waveformRef.current = wavesurfer;

      const audioURL = URL.createObjectURL(recordedAudio);
      wavesurfer.load(audioURL);
      audioRef.current = new Audio(audioURL);
      audioRef.current.addEventListener("ended", () => setIsPlaying(false));

      // Get file info
      const size = (recordedAudio.size / 1024 / 1024).toFixed(2) + " MB";
      const format = recordedAudio.type;
      setFileInfo({ size, format });

      return () => {
        URL.revokeObjectURL(audioURL);
        audioRef.current?.removeEventListener("ended", () =>
          setIsPlaying(false)
        );
        wavesurfer.destroy();
      };
    }
  }, [recordedAudio]);

  useInterval(
    () => {
      setDuration((prev) => prev + 1);
    },
    isRecording ? 1000 : null
  );

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable
      );
      mediaRecorderRef.current.addEventListener("stop", handleStop);
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setDuration(0);
    } catch (error) {
      console.error("Error accessing the microphone", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleDataAvailable = (event: BlobEvent) => {
    if (event.data.size > 0) {
      chunksRef.current.push(event.data);
    }
  };

  const handleStop = () => {
    const blob = new Blob(chunksRef.current, { type: "audio/webm" });
    setRecordedAudio(blob);
    chunksRef.current = [];
  };

  const playAudio = () => {
    if (audioRef.current && waveformRef.current) {
      waveformRef.current.play();
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current && waveformRef.current) {
      waveformRef.current.pause();
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const deleteAudio = () => {
    setRecordedAudio(null);
    setFileInfo(null);
    setDuration(0);
    if (audioRef.current) {
      audioRef.current.src = "";
    }
    if (waveformRef.current) {
      waveformRef.current.empty();
    }
  };

  const uploadAudio = async () => {
    if (!recordedAudio) return;

    const formData = new FormData();
    formData.append("file", recordedAudio, "recording.webm");

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await fetch(`/api/projects/${projectId}/audio`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        console.log("Audio uploaded successfully");
        deleteAudio(); // Clear the recorded audio after upload
      } else {
        console.error("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading audio:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center p-6 max-w-md mx-auto"
    >
      <Card className="w-full bg-white shadow-xl rounded-xl overflow-hidden">
        <CardContent className="p-6 flex items-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Audio Recorder
          </h2>
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg font-semibold text-gray-700">
              Duration: {duration}s
            </p>
            {fileInfo && (
              <div className="flex items-center text-sm text-gray-500">
                <Info className="w-4 h-4 mr-1" />
                <span>{fileInfo.size}</span>
                <span className="mx-1">|</span>
                <span>{fileInfo.format}</span>
              </div>
            )}
          </div>
          <div className="flex justify-center mb-6">
            <AnimatePresence mode="wait">
              {isRecording ? (
                <motion.div
                  key="recording"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    onClick={stopRecording}
                    className="bg-red-500 hover:bg-red-600 text-white rounded-full p-4"
                  >
                    <Square className="w-6 h-6" />
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="not-recording"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    onClick={startRecording}
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4"
                  >
                    <Mic className="w-6 h-6" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {recordedAudio && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center"
              >
                <div ref={waveformContainerRef} className="w-full mb-4" />
                <div className="flex space-x-4 mb-4">
                  <Button
                    onClick={isPlaying ? pauseAudio : playAudio}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5" />
                    )}
                  </Button>
                  <Button
                    onClick={deleteAudio}
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                  <Button
                    onClick={uploadAudio}
                    className="bg-purple-500 hover:bg-purple-600 text-white"
                  >
                    <Upload className="w-5 h-5 mr-2" /> Upload
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}
