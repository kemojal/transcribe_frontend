import { BASEURL } from "@/constants";
import { ProjectDataProps } from "@/types/interfaces";
import axios from "axios";

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const month = date.getMonth() + 1; // Months are zero-based
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}

export function formatFullDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
    timeZoneName: "short",
  };

  return date.toLocaleDateString("en-US", options);
}

export function bytesToMegabytes(bytes: number): number {
  const bytesInOneMegabyte = 1024 * 1024;
  return Math.round((bytes / bytesInOneMegabyte) * 100) / 100;
}

export const formatTimestamp = (timestamp: string) => {
  return timestamp.replace(/,\d{3}/, ""); // Removes the milliseconds part (e.g., ,000)
};

export const parseTimeToSeconds = (timeString: string) => {
  const [hours, minutes, seconds] = timeString.split(":");
  return (
    parseInt(hours) * 3600 +
    parseInt(minutes) * 60 +
    parseFloat(seconds.replace(",", "."))
  );
};

/**
 * Extracts the last MM:SS part from a time string in HH:MM:SS format.
 * @param time - A time string in HH:MM:SS format.
 * @returns The MM:SS part of the time string.
 */
export function extractMMSS(time: string): string {
  // Split the time string by ':'
  const parts = time.split(":");

  // Ensure there are exactly 3 parts
  if (parts.length !== 3) {
    throw new Error("Invalid time format. Expected HH:MM:SS.");
  }

  // Return the last two parts, joined by ':'
  return `${parts[1]}:${parts[2]}`;
}

export const getAudioDuration = (url: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    const audio = new Audio(url);
    audio.onloadedmetadata = () => {
      resolve(audio.duration); // Duration in seconds
    };
    audio.onerror = () => reject(new Error("Failed to load audio"));
  });
};

export const fetchFileSize = async (url: string): Promise<number> => {
  try {
    const response = await axios.get(url, {
      responseType: "blob",
    });
    return response.headers["content-length"] / 1024 / 1024; // Size in MB
  } catch (error) {
    console.error("Error fetching file size:", error);
    return 0; // Return 0 if there's an error
  }
};

// Function to parse the transcription text
export const parseTranscriptionText = (text: string) => {
  const regex = /(\d{2}:\d{2}:\d{2},\d{3} --> \d{2}:\d{2}:\d{2},\d{3})\s*(.*)/g;
  const entries = [];
  let match;

  while ((match = regex.exec(text)) !== null) {
    const [fullMatch, timestamp, content] = match;
    entries.push({ timestamp, content });
  }

  return entries;
};

// export const fetchProjectData = async (id: string) => {
//   const token = localStorage.getItem("token");
//   const projectResponse = await axios.get(`${BASEURL}/projects/${id}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   const filesResponse = await axios.get(`${BASEURL}/projects/${id}/files`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return { project: projectResponse.data, files: filesResponse.data };
// };
export const fetchProjectData = async (
  id: string
): Promise<ProjectDataProps> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }

  const [projectResponse, filesResponse] = await Promise.all([
    axios.get(`${BASEURL}/projects/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    axios.get(`${BASEURL}/projects/${id}/files`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  ]);

  return {
    project: projectResponse.data,
    files: filesResponse.data,
  };
};


