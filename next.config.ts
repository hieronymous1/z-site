import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Compress responses
  compress: true,

  // Allow picsum.photos images without next/image (we use <img> directly)
  // Listed here for documentation; no action needed unless migrating to <Image>
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },

  // Strict mode to surface React issues early
  reactStrictMode: true,
};

export default nextConfig;
