import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'xstzvhebbaltkskjikch.supabase.co',
      },
    ],
  },
};

export default nextConfig;
