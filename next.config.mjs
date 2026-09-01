/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  experimental: {
    outputFileTracingIncludes: {
      "/**": ["./prisma/**/*"],
    },
  },
};

export default nextConfig;

