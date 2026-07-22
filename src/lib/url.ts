import { SITE_URL } from "@/lib/site";

/**
 * Safely converts any URL (relative or absolute) into a fully qualified absolute URL.
 *
 * @param url - The raw URL string from your CMS or database
 * @param customFallback - Optional fallback path (e.g., "/custom-og.jpg")
 * @returns A guaranteed absolute URL string starting with https://
 */
export function getAbsoluteUrl(
  url?: string | null,
  customFallback?: string,
): string {
  // 1. Ensure our base URL never has a trailing slash to prevent double-slashes
  const baseUrl = SITE_URL.endsWith("/") ? SITE_URL.slice(0, -1) : SITE_URL;

  // 2. Define the fallback logic
  const defaultFallback = `${baseUrl}/default-blog-og.jpg`;
  const fallback = customFallback
    ? customFallback.startsWith("http")
      ? customFallback
      : `${baseUrl}${customFallback.startsWith("/") ? customFallback : `/${customFallback}`}`
    : defaultFallback;

  // 3. If no URL is provided at all, return the fallback
  if (!url) {
    return fallback;
  }

  // 4. If it's already a full absolute URL, return it as-is
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // 5. If it's a protocol-relative URL (common in some CDNs like Contentful/Sanity)
  if (url.startsWith("//")) {
    return `https:${url}`;
  }

  // 6. Handle standard relative paths
  const cleanPath = url.startsWith("/") ? url : `/${url}`;
  return `${baseUrl}${cleanPath}`;
}
