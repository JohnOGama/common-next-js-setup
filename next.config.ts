import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,

  compiler: {
    removeConsole: process.env.NEXT_PUBLIC_ENV === "prod",
  },

  experimental: {
    optimizePackageImports: ["lucide-react", "@heroicons/react"],
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sample.hostname.com",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },

  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
