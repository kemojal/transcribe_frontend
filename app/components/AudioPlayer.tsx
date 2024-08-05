import { AudioPlayer } from "react-audio-player-component";
export const Player = ({ src, width }: { src: string, width: number }) => {
  return (
    <AudioPlayer
      src={src}
      minimal={true}
      width={width ? width : 400}
      trackHeight={25}
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
    />
  );
};
