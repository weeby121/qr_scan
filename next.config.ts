import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Crucial for GitHub Pages static export
  output: 'export', // Specifies that Next.js should produce a static HTML export

  // IMPORTANT: Replace 'your-repository-name' with the actual name of your GitHub repository.
  // Example: If your repo is 'my-digital-cards', basePath should be '/my-digital-cards'
  basePath: '/qr_scan', // Base path for the application
  assetPrefix: '/qr_scan/', // Prefix for assets (JS, CSS, images)

  images: {
    unoptimized: true, // Disable Next.js Image Optimization for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'quickchart.io',
        port: '',
        pathname: '/qr/**',
      }
    ],
  },
};

export default nextConfig;