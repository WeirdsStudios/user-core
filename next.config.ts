import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Next.js 16 generates .next/types/cache-life.d.ts at runtime;
  // tsc --noEmit passes clean, so we skip the redundant build-time check.
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
