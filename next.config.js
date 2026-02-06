/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb'
    }
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'utfs.io' },
      { protocol: 'https', hostname: 'images.unsplash.com' }
    ]
  },
  // PWA Configuration
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Ensure service worker can be loaded
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
