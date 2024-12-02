/** @type {import('next').NextConfig} */

import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: true, //process.env.NODE_ENV === "development",
  register: true,
  scope: "/app",
  sw: "sw.js",
  runtimeCaching: {
    options:{
      cacheableResponse: {
        statuses: [200, 302],
      },
    }
  }
  
});


const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // {
      //   protocol: "https",
      //   hostname: "instagram.com",
      //   pathname: "/**",
      // },
      {
        protocol: "https",
        hostname: "**.cdninstagram.com", // Allows any CDN subdomain
        pathname: "/**", // Matches all paths
      },
      {
        protocol: "https",
        hostname: "**.fbcdn.net", // Facebook CDNs may also serve images
        pathname: "/**",
      },
    ],
  },
};

export default withPWA(nextConfig);;
