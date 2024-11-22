"use client";

import React, { useRef, useState, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions";
import TimelinePlugin from "wavesurfer.js/dist/plugins/timeline";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Play,
  Pause,
  ZoomIn,
  ZoomOut,
  Volume2,
  SkipBack,
  SkipForward,
  Repeat,
  Scissors,
  Undo,
  Redo,
  Trash2,
  ChevronFirst,
  ChevronLast,
  Maximize2,
  Minimize2,
} from "lucide-react";

export default function PremiumAudioEditor({ audioUrl = "/sample.wav" }) {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(50);
  const [activeRegion, setActiveRegion] = useState<any>(null);
  const [undoStack, setUndoStack] = useState<any[]>([]);
  const [redoStack, setRedoStack] = useState<any[]>([]);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const initializeWaveSurfer = async () => {
      if (!waveformRef.current) return;

      try {
        setIsLoading(true);
        setError(null);

        if (wavesurfer.current) {
          wavesurfer.current.destroy();
        }

        wavesurfer.current = WaveSurfer.create({
          container: waveformRef.current,
          waveColor: "rgba(79, 70, 229, 0.3)",
          progressColor: "rgba(79, 70, 229, 0.8)",
          cursorColor: "#6366f1",
          height: 128,
          normalize: true,
          responsive: true,
          fillParent: true,
          pixelRatio: 1,
          minPxPerSec: zoomLevel,
          plugins: [
            RegionsPlugin.create(),
            TimelinePlugin.create({
              container: "#timeline",
              primaryFontColor: "#4B5563",
              secondaryFontColor: "#9CA3AF",
              primaryColor: "#6366f1",
              secondaryColor: "#E5E7EB",
            }),
          ],
        });

        wavesurfer.current.on("ready", () => {
          setIsLoading(false);
          setDuration(wavesurfer.current!.getDuration());
        });

        wavesurfer.current.on("error", (err) => {
          setError("Failed to load audio");
          setIsLoading(false);
        });

        wavesurfer.current.on("play", () => setIsPlaying(true));
        wavesurfer.current.on("pause", () => setIsPlaying(false));
        wavesurfer.current.on("loading", (percent: number) =>
          setLoadingProgress(percent)
        );
        wavesurfer.current.on("audioprocess", (currentTime: number) =>
          setCurrentTime(currentTime)
        );

        wavesurfer.current.on("region-created", (region) => {
          if (activeRegion) {
            activeRegion.remove();
          }
          setActiveRegion(region);
        });

        wavesurfer.current.on("region-update-end", (region) => {
          setActiveRegion(region);
        });

        await wavesurfer.current.load(audioUrl);
      } catch (err) {
        setError("Failed to initialize audio player");
        setIsLoading(false);
      }
    };

    initializeWaveSurfer();

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }
    };
  }, [audioUrl, zoomLevel]);

  useEffect(() => {
    if (wavesurfer.current) {
      wavesurfer.current.setVolume(volume);
    }
  }, [volume]);

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  const handleZoomIn = () => {
    if (wavesurfer.current) {
      const newZoomLevel = zoomLevel * 1.2;
      setZoomLevel(newZoomLevel);
      wavesurfer.current.zoom(50 * newZoomLevel);
    }
  };

  const handleZoomOut = () => {
    if (wavesurfer.current) {
      const newZoomLevel = zoomLevel / 1.2;
      setZoomLevel(newZoomLevel);
      wavesurfer.current.zoom(50 * newZoomLevel);
    }
  };

  const handleZoomChange = (value: number[]) => {
    setZoomLevel(value[0]);
    if (wavesurfer.current) {
      wavesurfer?.current?.zoom(value[0]);
    }
  };

  const togglePlayPause = () => {
    if (wavesurfer.current) {
      wavesurfer.current.playPause();
    }
  };

  const toggleLoop = () => {
    setIsLooping(!isLooping);
    if (wavesurfer.current && activeRegion) {
      activeRegion.setLoop(!isLooping);
    }
  };

  const seekForward = () => {
    if (wavesurfer.current) {
      const currentTime = wavesurfer.current.getCurrentTime();
      wavesurfer.current.seekTo(
        (currentTime + 5) / wavesurfer.current.getDuration()
      );
    }
  };

  const seekBackward = () => {
    if (wavesurfer.current) {
      const currentTime = wavesurfer.current.getCurrentTime();
      const newTime = Math.max(0, currentTime - 5);
      wavesurfer.current.seekTo(newTime / wavesurfer.current.getDuration());
    }
  };

  const seekStart = () => {
    if (wavesurfer.current) {
      wavesurfer.current.seekTo(0);
    }
  };

  const seekEnd = () => {
    if (wavesurfer.current) {
      wavesurfer.current.seekTo(1);
    }
  };

  const clearSelection = () => {
    if (activeRegion) {
      const audioState = wavesurfer.current?.getDecodedData();
      setUndoStack([...undoStack, { type: "clear", data: audioState }]);
      setRedoStack([]);
      activeRegion.remove();
      setActiveRegion(null);
    }
  };

  const cutSelection = () => {
    if (activeRegion && wavesurfer.current) {
      const audioState = wavesurfer.current.getDecodedData();
      setUndoStack([
        ...undoStack,
        { type: "cut", data: audioState, region: activeRegion },
      ]);
      setRedoStack([]);

      const start = Math.floor(activeRegion.start * audioState.sampleRate);
      const end = Math.ceil(activeRegion.end * audioState.sampleRate);

      for (let channel = 0; channel < audioState.numberOfChannels; channel++) {
        const channelData = audioState.getChannelData(channel);
        channelData.copyWithin(start, end);
      }

      wavesurfer.current.loadDecodedBuffer(audioState);
      activeRegion.remove();
      setActiveRegion(null);
    }
  };

  const undo = () => {
    if (undoStack.length > 0) {
      const lastAction = undoStack[undoStack.length - 1];
      setRedoStack([
        ...redoStack,
        { type: lastAction.type, data: wavesurfer.current?.getDecodedData() },
      ]);
      setUndoStack(undoStack.slice(0, -1));

      if (wavesurfer.current) {
        wavesurfer.current.loadDecodedBuffer(lastAction.data);
        if (lastAction.type === "cut" && lastAction.region) {
          wavesurfer.current.addRegion(lastAction.region);
          setActiveRegion(lastAction.region);
        }
      }
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const nextAction = redoStack[redoStack.length - 1];
      setUndoStack([
        ...undoStack,
        { type: nextAction.type, data: wavesurfer.current?.getDecodedData() },
      ]);
      setRedoStack(redoStack.slice(0, -1));

      if (wavesurfer.current) {
        wavesurfer.current.loadDecodedBuffer(nextAction.data);
      }
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <TooltipProvider>
      <div className="bg-gradient-to-br from-indigo-50 to-white shadow-lg rounded-xl p-1 max-w-6xl mx-auto border border-indigo-100">
        <div className="w-full relative bg-white rounded overflow-hidden shadow-md mb-4">
          <div ref={waveformRef} className="w-full h-32" />
          <div id="timeline" className="w-full h-8" />
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-10">
              <div className="text-indigo-600 font-medium text-lg">
                Loading audio... {loadingProgress}%
              </div>
            </div>
          )}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-10">
              <div className="text-red-500 font-medium text-lg">{error}</div>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mb-4 px-6">
          <div className="text-sm font-medium text-gray-500">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
          <div className="flex items-center space-x-2">
            <Tooltip >
              <TooltipTrigger asChild>
                <Button
                  onClick={toggleFullscreen}
                  size="sm"
                  variant="outline"
                  className="h-8 w-8"
                >
                  <span>
                    {isFullscreen ? (
                      <Minimize2 size={14} />
                    ) : (
                      <Maximize2 size={14} />
                    )}
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="text-xs text-muted-foreground">
                <p>{isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-6 ">
          {/* Playback Controls */}
          <div className="flex items-center justify-center space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={seekStart}
                  size="sm"
                  variant="outline"
                  className="h-8 w-8"
                >
                  <span>
                    <ChevronFirst size={14} />
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="text-xs text-muted-foreground">
                <p>Go to Start</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={seekBackward}
                  size="sm"
                  variant="outline"
                  className="h-8 w-8"
                >
                  <span>
                    <SkipBack size={14} />
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="text-xs text-muted-foreground">
                <p>Skip Backward</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={togglePlayPause}
                  className="h-10 w-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full"
                  size="sm"
                >
                  <span>
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="text-xs text-muted-foreground">
                <p>{isPlaying ? "Pause" : "Play"}</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={seekForward}
                  size="sm"
                  variant="outline"
                  className="h-8 w-8"
                >
                  <span>
                    <SkipForward size={14} />
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="text-xs text-muted-foreground">
                <p>Skip Forward</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={seekEnd}
                  size="sm"
                  variant="outline"
                  className="h-8 w-8"
                >
                  <span>
                    <ChevronLast size={14} />
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="text-xs text-muted-foreground">
                <p>Go to End</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={toggleLoop}
                  size="sm"
                  variant="outline"
                  className={`h-8 w-8 ${isLooping ? "bg-indigo-100" : ""}`}
                >
                  <span>
                    <Repeat size={14} />
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="text-xs text-muted-foreground">
                <p>{isLooping ? "Disable Loop" : "Enable Loop"}</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Edition Controls */}
          <div className="flex items-center justify-center space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={undo}
                  size="sm"
                  variant="outline"
                  className="h-8 w-8"
                  disabled={undoStack.length === 0}
                >
                  <span>
                    <Undo size={14} />
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="text-xs text-muted-foreground">
                <p>Undo</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={redo}
                  size="sm"
                  variant="outline"
                  className="h-8 w-8"
                  disabled={redoStack.length === 0}
                >
                  <span>
                    <Redo size={14} />
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="text-xs text-muted-foreground">
                <p>Redo</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={cutSelection}
                  size="sm"
                  variant="outline"
                  className="h-8 w-8"
                  disabled={!activeRegion}
                >
                  <span>
                    <Scissors size={14} />
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="text-xs text-muted-foreground">
                <p>Cut Selection</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={clearSelection}
                  size="sm"
                  variant="outline"
                  className="h-8 w-8"
                  disabled={!activeRegion}
                >
                  <span>
                    <Trash2 size={14} />
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="text-xs text-muted-foreground">
                <p>Clear Selection</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Volume and Zoom Controls */}
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-700">
              <Volume2 size={14} />
              <Slider
                min={0}
                max={1}
                step={0.01}
                value={[volume]}
                onValueChange={handleVolumeChange}
                className="w-24"
              />
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={handleZoomOut}
                    size="sm"
                    variant="outline"
                    className="h-8 w-8"
                    // disabled={!activeRegion}
                  >
                    <span>
                      <ZoomOut size={14} />
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="text-xs text-muted-foreground">
                  <p>Zoom Out</p>
                </TooltipContent>
              </Tooltip>

              <Slider
                min={10}
                max={200}
                step={1}
                value={[zoomLevel]}
                onValueChange={handleZoomChange}
                className="w-24"
              />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={handleZoomIn}
                    size="sm"
                    variant="outline"
                    className="h-8 w-8"
                  >
                    <span>
                      <ZoomIn size={14} />
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="text-xs text-muted-foreground">
                  <p>Zoom In</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
