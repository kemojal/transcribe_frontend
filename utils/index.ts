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
