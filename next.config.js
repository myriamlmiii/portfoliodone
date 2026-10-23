const fs = require("fs");
const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  compress: true,
  poweredByHeader: false,
  async headers() {
    const csp = "base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'";
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "Permissions-Policy", value: "camera=(), geolocation=(), payment=(), usb=(), microphone=(self)" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        ],
      },
    ];
  },
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
