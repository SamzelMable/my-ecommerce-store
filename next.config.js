// next.config.js   (must be .js, not .ts or .mjs)

/** @type {import('next').NextConfig} */
const nextConfig = {
  // THIS LINE IS THE MAGIC — forces Vercel to see /orders and every other page
  output: "standalone",

  // Allow your Unsplash product images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  // Correct syntax for Next.js 16+ (this replaces the old experimental key)
  serverExternalPackages: ["@supabase/ssr"],
};

module.exports = nextConfig;