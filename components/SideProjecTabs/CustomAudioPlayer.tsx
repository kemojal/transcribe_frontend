import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  Play,
  Pause,
  Rewind,
  FastForward,
  RotateCcw,
  RotateCw,
  CircleEllipsis,
} from "lucide-react";
import { Button } from "../ui/button";
import { AudioPulse } from "../Dialogues/File/AudioPulse";

const CustomAudioPlayer = forwardRef(
  (
    {
      src,
      width = 400,
      isPlaying,
      setIsPlaying,
      isPaused,
      onTimeUpdate,
      onPlay,
    },
    ref
  ) => {
    const audioRef = useRef(null);
    // const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const stopTimeRef = useRef(null);

    const speedOptions = [0.25, 0.5, 0.75, 1, 2];
    const [selectedSpeed, setSelectedSpeed] = useState(1);
    const [showOptions, setShowOptions] = useState(false);

    useImperativeHandle(ref, () => ({
      seekTo: (startSeconds, endSeconds) => {
        if (audioRef.current) {
          audioRef.current.currentTime = startSeconds;
          stopTimeRef.current = endSeconds;
          audioRef.current.play();
          setIsPlaying(true);
        }
      },
      stop: () => {
        if (audioRef.current) {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      },
    }));

    useEffect(() => {
      if (audioRef.current) {
        const audioElement = audioRef.current;
        const handleTimeUpdate = () => {
          setCurrentTime(audioElement.currentTime);
          setDuration(audioElement.duration);
          if (onTimeUpdate) {
            onTimeUpdate(audioElement.currentTime);
          }
          if (
            stopTimeRef.current &&
            audioElement.currentTime >= stopTimeRef.current
          ) {
            audioElement.pause();
            setIsPlaying(false);
            stopTimeRef.current = null;
          }
        };
        audioElement.addEventListener("timeupdate", handleTimeUpdate);
        audioElement.addEventListener("play", () => onPlay && onPlay());
        return () => {
          audioElement.removeEventListener("timeupdate", handleTimeUpdate);
          audioElement.removeEventListener("play", () => onPlay && onPlay());
        };
      }
    }, [onTimeUpdate, onPlay]);

    useEffect(() => {
      if (audioRef.current) {
        audioRef.current.src = src;
        audioRef.current.load();
      }
    }, [src]);

    const togglePlayPause = () => {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    };

    const handleSeek = (e) => {
      const newTime =
        (e.nativeEvent.offsetX / e.currentTarget.clientWidth) * duration;
      audioRef.current.currentTime = newTime;
    };

    const formatTime = (time) => {
      if (isNaN(time) || time === Infinity || time < 0) return "00:00";
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
      )}`;
    };

    const handleRewind = () => {
      if (audioRef.current) {
        audioRef.current.currentTime = Math.max(
          audioRef.current.currentTime - 10,
          0
        );
      }
    };

    const handleFastForward = () => {
      if (audioRef.current) {
        audioRef.current.currentTime = Math.min(
          audioRef.current.currentTime + 10,
          duration
        );
      }
    };

    const handleSpeedChange = (speed) => {
      if (audioRef.current) {
        audioRef.current.playbackRate = speed;
        setSelectedSpeed(speed);
        setShowOptions(false);
      }
    };

    return (
      <div
        className=" rounded-3xl w-screen py-2 relative bg-white "
        // style={{ width: width ? width : "100%" }}
      >
        <div
          className="absolute top-0 left-0 h-full bg-primary/10  pointer-events-none"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
        <audio
          ref={audioRef}
          // controls
          onTimeUpdate={() =>
            onTimeUpdate && onTimeUpdate(audioRef.current.currentTime)
          }
        />
        <div className="flex items-center space-x-8 py-1 w-full px-4">
          <div className="flex items-center space-x-2">
            <Button
              onClick={togglePlayPause}
              className="w-6 h-6 flex items-center justify-center bg-transparent rounded-full shadow-xs  transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2  text-muted-foreground hover:bg-gray-50"
            >
              <span>
                {isPlaying ? (
                  <Pause className="w-4 h-4 " />
                ) : (
                  <Play className="w-4 h-4 " />
                )}
              </span>
            </Button>
            {/* add rewind and fast forward buttons with icons */}
            <Button
              onClick={handleRewind}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              <span>
                <RotateCcw className="w-4 h-4" />
              </span>
            </Button>
            <Button
              onClick={handleFastForward}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              <span>
                <RotateCw className="w-4 h-4" />
              </span>
            </Button>
          </div>

          <div className="flex items-center space-x-8">
            <div className="flex justify-between font-medium">
              <span>{formatTime(currentTime)}</span>
              <span className="px-2 text-xs text-muted-foreground/50">/</span>
              <span>{formatTime(duration)}</span>
            </div>
            {/* add x0.25, x0.5, x0.75, x1, x2 speed */}

            <div className="relative flex items-center z-50">
              <Button
                variant={"outline"}
                size={"sm"}
                className="text-gray-700 text-xs border border-gray-300 rounded-md px-3 py-1.5"
                onClick={() => setShowOptions(!showOptions)}
              >
                {selectedSpeed}x
              </Button>
              {showOptions && (
                <div className="absolute bottom-[42px] left-[-3px]  bg-white border border-gray-300 rounded-md shadow-lg p-1">
                  {speedOptions.map((speed) => (
                    <Button
                      size={"sm"}
                      key={speed}
                      onClick={() => handleSpeedChange(speed)}
                      className={`block px-1 py-1 text-xs text-gray-700 hover:bg-gray-200 w-full flex items-center justify-center ${
                        selectedSpeed === speed
                          ? "bg-blue-100"
                          : "bg-transparent"
                      }`}
                    >
                      {speed}x
                    </Button>
                  ))}
                </div>
              )}
            </div>
            <Button
              variant={"outline"}
              size={"sm"}
              className="border-none hover:bg-transparent"
            >
              <span>
                <CircleEllipsis className="" />
              </span>
            </Button>
          </div>
          <AudioPulse isPlaying={isPlaying} />
        </div>
        <div
          className="w-full h-[1px] bg-gray-500/20 rounded-full cursor-pointer absolute top-0 left-0"
          onClick={handleSeek}
        >
          <div
            className="h-full bg-gray-500/20 rounded-full "
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
        </div>
      </div>
    );
  }
);

export default CustomAudioPlayer;
