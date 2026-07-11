import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {

  reactCompiler: true,

  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 100],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },

  env: {
    NEXT_PUBLIC_BUILD_ID: Date.now().toString(),
  },
};

export default withPayload(nextConfig);
