// lib/formatDate.ts

export function formatDate(dateString: string): string {
  if (!dateString) return "";

  const date = new Date(dateString);

  // You can customize the format here!
  // Options: "numeric", "2-digit", "narrow", "short", "long"
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);

  // Example output: "Oct 25, 2025"
}
