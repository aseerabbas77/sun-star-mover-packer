import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    webpackBuildWorker: false,
    workerThreads: false,
    cpus: 1,
    turbopackPluginRuntimeStrategy: "workerThreads",
  },
};

export default nextConfig;
