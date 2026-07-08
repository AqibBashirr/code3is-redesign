import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

// We dynamically adjust the CSP based on the environment.
// Next.js relies on 'unsafe-eval' and 'unsafe-inline' during development for Fast Refresh (HMR).
// We also only enforce Trusted Types in production to avoid local development friction.
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' ${isProd ? "" : "'unsafe-eval' 'unsafe-inline'"};
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data:;
  font-src 'self' data:;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
${isProd ? "  require-trusted-types-for 'script';" : ""}
`
  .replace(/\s{2,}/g, " ")
  .trim();

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy,
  },
  {
    key: "X-Frame-Options",
    value: "DENY", // Stricter than SAMEORIGIN; completely prevents your site from being iframed
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff", // Prevents the browser from guessing file types (mitigates MIME confusion attacks)
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin", // Protects user privacy by limiting referrer data sent to other sites
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()", // Explicitly blocks access to device hardware
  },
];

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 100],
  },
  reactStrictMode: true,
  async headers() {
    return [
      {
        // Apply these headers to every single route in your application
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  env: {
    NEXT_PUBLIC_BUILD_ID: Date.now().toString(),
  },
};

export default nextConfig;
