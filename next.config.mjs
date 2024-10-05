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
        hostname: "scontent-los2-1.cdninstagram.com", // another external domain
        pathname: "/**", // specific path if needed
      },
    ],
  },
};

export default nextConfig;
