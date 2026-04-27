import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  output: 'export', // Required for GitHub Pages static deployment
  images: {
    unoptimized: true, // Required for static export as GitHub Pages doesn't have an Image Optimization API
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'c.tenor.com',
      },
      {
        protocol: 'https',
        hostname: 'thumbs.gfycat.com',
      },
      {
        protocol: 'https',
        hostname: 'pa1.narvii.com',
      }
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
