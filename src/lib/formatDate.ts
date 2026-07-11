// lib/formatDate.ts

export function formatDate(
  dateString: string,
  showTime: boolean = false,
): string {
  if (!dateString) return "";

  const date = new Date(dateString);

  // Default options: Date only
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  // If showTime is true, add the time properties to the options object
  if (showTime) {
    options.hour = "numeric";
    options.minute = "2-digit";
    options.hour12 = true;
  }

  return new Intl.DateTimeFormat("en-US", options).format(date);
}
