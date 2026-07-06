import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 100],
  },
  env: {
    NEXT_PUBLIC_BUILD_ID: Date.now().toString(),
  },
};

export default nextConfig;
