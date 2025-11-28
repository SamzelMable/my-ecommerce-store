// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["@supabase/ssr"],
  },
};

module.exports = nextConfig;