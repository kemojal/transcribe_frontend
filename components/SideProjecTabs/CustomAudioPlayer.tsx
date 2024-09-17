import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Play, Pause } from "lucide-react";

const CustomAudioPlayer = forwardRef(
  ({ src, width = 400, onTimeUpdate, onPlay }, ref) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const stopTimeRef = useRef(null);

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

    return (
      <div
        className="px-6 rounded-xl w-full"
        style={{ width: width ? width : "100%" }}
      >
        <audio
          ref={audioRef}
          controls
          onTimeUpdate={() =>
            onTimeUpdate && onTimeUpdate(audioRef.current.currentTime)
          }
        />
        {/* <div className="flex items-center space-x-4 py-1">
          <button
            onClick={togglePlayPause}
            className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-indigo-600" />
            ) : (
              <Play className="w-4 h-4 text-indigo-600" />
            )}
          </button>
          <div className="w-full flex items-center gap-1">
            <div
              className="w-full h-2 bg-indigo-200 rounded-full cursor-pointer min-w-[200px]"
              onClick={handleSeek}
            >
              <div
                className="h-full bg-black rounded-full"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs font-medium mt-2">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
);

export default CustomAudioPlayer;
