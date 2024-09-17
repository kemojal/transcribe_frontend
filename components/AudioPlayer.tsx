"use client";
import { useEffect, useRef } from "react";
import { AudioPlayer } from "react-audio-player-component";
export const Player = ({
  src,
  width,
  onTimeUpdate,
}: {
  src: string;
  width: number;
  onTimeUpdate?: (currentTime: number) => void;
}) => {
  const audioRef = useRef(null);

  useEffect(() => {
    const audioElement = audioRef.current;

    const handleTimeUpdate = () => {
      if (onTimeUpdate) {
        onTimeUpdate(audioElement?.currentTime);
      }
    };

    if (audioElement) {
      audioElement?.addEventListener("timeupdate", handleTimeUpdate);
    }

    return () => {
      if (audioElement) {
        audioElement?.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [onTimeUpdate]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = src;
      audioRef.current.load();
    }
  }, [src]);

  return (
    <AudioPlayer
      ref={audioRef}
      src={src}
      minimal={true}
      width={width ? width : 400}
      trackHeight={45}
      barWidth={1}
      gap={1}
      visualise={true}
      backgroundColor="#FFFFFF"
      barColor="#D8D7D8"
      barPlayedColor="#DF8530"
      skipDuration={2}
      showLoopOption={true}
      showVolumeControl={true}
      seekBarColor="#D8D7D8"
      hideSeekBar={true}
      // volumeControlColor="blue"
      // hideSeekBar={true}
      hideTrackKnobWhenPlaying={true}
      onTimeUpdate={onTimeUpdate}
      // onListen = {(currentTime) => console.log(currentTime)}
    />
  );
};
