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
