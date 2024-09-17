import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Main } from "@/remotion/MyComp/Main";
import {
  CompositionProps,
  defaultMyCompProps,
  DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "@/types/constants";
import { color } from "framer-motion";
import { useMemo, useState } from "react";
import { Player } from "@remotion/player";

const RenderVideo = () => {
  const [outputLocation, setOutputLocation] = useState(null);
  const [isRendering, setIsRendering] = useState(false);

  const [transcriptionEntries, setTranscriptionEntries] = useState([
    { timestamp: "00:00:00,000 --> 00:00:01,000", content: "This is Peter." },
    { timestamp: "00:00:01,000 --> 00:00:02,000", content: "This is Johnny." },
  ]);

  const [textStyle, setTextStyle] = useState({
    fontFamily: "Arial",
    fontSize: 32,
    stroke: "black",
    shadow: "2px 2px 5px gray",
    glow: "white",
  });

  const handleRenderVideo = async () => {
    setIsRendering(true);
    const response = await fetch("http://localhost:8000/render", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        entries: [
          {
            timestamp: "00:00:00,000 --> 00:00:01,000",
            content: "This is Peter.",
          },
          {
            timestamp: "00:00:01,000 --> 00:00:02,000",
            content: "This is Johnny.",
          },
          { timestamp: "00:00:02,000 --> 00:00:03,000", content: "Kenny." },
          { timestamp: "00:00:03,000 --> 00:00:04,000", content: "I'm Joe." },
          {
            timestamp: "00:00:04,000 --> 00:00:28,000",
            content: "I'm going to take a minute to thank you.",
          },
        ],
        text_style: {
          font_family: "Arial",
          font_size: 24,
          stroke: "black",
          shadow: "2px 2px 5px gray",
          glow: "white",
          color: "white",
        },
      }),
    });

    const { output_location } = await response.json();
    console.log("Video rendered at:", output_location);
    setOutputLocation(output_location);
    setIsRendering(false);
  };

  const [text, setText] = useState<string>(defaultMyCompProps.title);

  const inputProps: z.infer<typeof CompositionProps> = useMemo(() => {
    return {
      title: text,
    };
  }, [text]);

  return (
    <div>
      <h1>Podcast Video</h1>
      <div className="max-w-200px">
        <Player
          component={Main}
          inputProps={inputProps}
          durationInFrames={DURATION_IN_FRAMES}
          fps={VIDEO_FPS}
          compositionHeight={VIDEO_HEIGHT}
          compositionWidth={VIDEO_WIDTH}
          style={{ width: "100%" }}
          controls
          autoPlay
          loop
        />
      </div>

      {/* Add controls for editing the transcription and text style here */}
      {isRendering ? (
        <div className="flex flex-col gap-1 items-center justify-center w-full h-full">
          <Loader />
          <p>Rendering...</p>
        </div>
      ) : (
        <Button onClick={handleRenderVideo}>Render Video</Button>
      )}

      {outputLocation && <p>Video rendered at: {outputLocation}</p>}
    </div>
  );
};

export default RenderVideo;
