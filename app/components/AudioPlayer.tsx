import { AudioPlayer } from "react-audio-player-component";
export const Player = ({ src }: { src: string }) => {
  return (
    <AudioPlayer
      src={src}
      minimal={true}
      width={300}
      trackHeight={35}
      barWidth={1}
      gap={1}
      visualise={true}
      backgroundColor="#F1F1F1"
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
    />
  );
};
