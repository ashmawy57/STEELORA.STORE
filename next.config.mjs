/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
  async redirects() {
    return [
      {
        source: "/:locale/about",
        destination: "/:locale",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/",
        permanent: true,
      },
      {
        source: "/:locale/brand-story",
        destination: "/:locale",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

