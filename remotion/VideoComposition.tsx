import { Composition } from 'remotion';
import TranscriptionVideo from './TranscriptionVideo';

const sampleTranscription = [
  { timestamp: '00:00:00,000 --> 00:00:01,000', content: 'This is Peter.' },
  { timestamp: '00:00:01,000 --> 00:00:02,000', content: 'This is Johnny.' },
  { timestamp: '00:00:02,000 --> 00:00:03,000', content: 'Kenny.' },
  { timestamp: '00:00:03,000 --> 00:00:04,000', content: "I'm Joe." },
  { timestamp: '00:00:04,000 --> 00:00:28,000', content: 'I’m going to take a minute to thank you.' },
];

export const VideoComposition: React.FC = () => {
  return (
    <Composition
      id="TranscriptionVideo"
      component={TranscriptionVideo}
      durationInFrames={30 * 30} // Adjust this to fit your video length
      fps={30}
      width={1080} // Adjust for vertical video (e.g., 1080x1920 for vertical)
      height={1920}
      defaultProps={{
        entries: sampleTranscription,
        textStyle: {
          fontFamily: 'Arial',
          fontSize: 32,
          color: 'white',
        },
      }}
    />
  );
};
