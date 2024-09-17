import { NextRequest, NextResponse } from "next/server";
import { renderMedia } from "@remotion/renderer";
import path from "path";

export const POST = async (req: NextRequest) => {
  const { entries, textStyle } = await req.json(); // Extract entries and style from request body

  try {
    const outputLocation = path.join(
      process.cwd(),
      "out",
      "transcription-video.mp4"
    );

    // Call renderMedia to render the video
    await renderMedia({
      composition: "TranscriptionVideo",
      serveUrl: "http://localhost:3000/remotion", // Serve your composition
      codec: "h264",
      outputLocation,
      inputProps: {
        entries,
        textStyle,
      },
    });

    return NextResponse.json({ outputLocation });
  } catch (error) {
    console.error("Error rendering video:", error);
    return NextResponse.json(
      { error: "Failed to render video" },
      { status: 500 }
    );
  }
};
