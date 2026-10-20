const fs = require("fs");
const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  compress: true,
  serverExternalPackages: ["msedge-tts"],
  images: { qualities: [75, 90] },
  // Lets the hero know at build time whether a real clip exists, so it never probes for a missing file.
  env: {
    NEXT_PUBLIC_HERO_VIDEO: fs.existsSync(path.join(__dirname, "public", "video", "hero.mp4")) ? "1" : "",
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

module.exports = nextConfig;
