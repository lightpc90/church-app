/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "instagram.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.cdninstagram.com", // Allows any CDN subdomain
        pathname: "/**", // Matches all paths
      },
    ],
  },
};

export default nextConfig;
