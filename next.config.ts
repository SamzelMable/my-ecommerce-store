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

  serverExternalPackages: ["@supabase/ssr"],
};

module.exports = nextConfig;