"use client";

import { useEffect } from "react";

// Define the expected shape of the API response
interface VersionResponse {
  version?: string;
}

export default function VersionChecker(): null {
  useEffect(() => {
    const currentVersion = process.env.NEXT_PUBLIC_BUILD_ID;

    // Check for a new deployment every 5 minutes (300,000 ms)
    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/version", { cache: "no-store" });
        if (!res.ok) return;

        const data = (await res.json()) as VersionResponse;

        if (data.version && data.version !== currentVersion) {
          window.location.reload();
        }
      } catch (error) {
        // Fail silently if the user temporarily loses internet connection
      }
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  return null; // This component remains completely invisible
}
