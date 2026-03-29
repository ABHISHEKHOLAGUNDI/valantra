import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Phase 25: Award Winning Criteria Caching & Compiling Optimization
  output: "export",
  images: {
    unoptimized: true,
  },
  compress: true,
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  }
};

export default nextConfig;
