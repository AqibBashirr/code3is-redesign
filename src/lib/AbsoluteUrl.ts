import { SITE_URL } from "./site";

export function getAbsoluteUrl(url?: string | null): string {
  const baseUrl = SITE_URL.endsWith("/") ? SITE_URL.slice(0, -1) : SITE_URL;

  if (!url) return `${baseUrl}/default-blog-og.jpg`;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("//")) return `https:${url}`;

  const cleanPath = url.startsWith("/") ? url : `/${url}`;
  return `${baseUrl}${cleanPath}`;
}
