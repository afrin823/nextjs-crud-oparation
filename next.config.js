/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com'],
  },
  webpack(config, { isServer }) {
    // Ensure compatibility for server and client-side builds
    if (!isServer) {
      config.resolve.fallback = { fs: false, path: false };
    }

    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };

    return config;
  },
};

module.exports = nextConfig;
