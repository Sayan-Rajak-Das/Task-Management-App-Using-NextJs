import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Ensures React strict mode is enabled
  experimental: {
  },
  webpack: (config) => {
    // Ensures Webpack is being used
    return config;
  },
};

export default nextConfig;
