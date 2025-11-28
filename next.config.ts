import type { NextConfig } from "next";

const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@supabase/ssr'],
  },
  // Force dynamic route detection
  output: 'standalone',  // Ensures all routes are scanned
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',  // For your product images
      },
    ],
  },
};

export default nextConfig;
