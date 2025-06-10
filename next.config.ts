import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [new URL('https://cdn.dummyjson.com/**')],
  },
  compress: false,
};

export default nextConfig;
