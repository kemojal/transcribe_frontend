import { Sequence, AbsoluteFill } from "remotion";

interface TranscriptionEntry {
  timestamp: string;
  content: string;
}

interface TextStyle {
  fontFamily?: string;
  fontSize?: number;
  stroke?: string;
  shadow?: string;
  glow?: string;
  color?: string;
}

interface Props {
  entries: TranscriptionEntry[];
  textStyle: TextStyle;
}

const TranscriptionVideo: React.FC<Props> = ({ entries, textStyle }) => {
  const convertToSeconds = (timestamp: string) => {
    const [hours, minutes, seconds] = timestamp.split(",")[0].split(":");
    return (
      parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseFloat(seconds)
    );
  };

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {entries.map((entry, index) => {
        const start = convertToSeconds(entry.timestamp.split(" --> ")[0]);
        const end = convertToSeconds(entry.timestamp.split(" --> ")[1]);

        return (
          <Sequence
            key={index}
            from={start * 30}
            durationInFrames={(end - start) * 30}
          >
            <div
              style={{
                ...textStyle,
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: textStyle.fontSize || 24,
                fontFamily: textStyle.fontFamily || "Arial",
                color: textStyle.color || "white",
                textShadow: textStyle.shadow || "none",
                WebkitTextStroke: textStyle.stroke || "none",
                filter: textStyle.glow
                  ? `drop-shadow(${textStyle.glow})`
                  : "none",
              }}
            >
              {entry.content}
            </div>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

export default TranscriptionVideo;
