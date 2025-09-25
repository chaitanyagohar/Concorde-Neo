/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add this 'images' block
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;