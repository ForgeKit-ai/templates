/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  // For better static export compatibility
  trailingSlash: true,
  // Enable compression
  compress: true,
}

module.exports = nextConfig