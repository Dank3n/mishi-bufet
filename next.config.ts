import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow high-quality encodes (default allowlist is only [75])
    qualities: [75, 90, 95],
    // Extra mid sizes so retina thumbs/grids don’t upscale soft webps
    imageSizes: [64, 96, 128, 256, 384, 512, 640, 750],
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920, 2048, 2560, 3840],
    formats: ["image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
