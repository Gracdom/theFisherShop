/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.bigbuy.eu', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
    ],
  },
  // Excluir frameit y scripts de Prisma del build
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/frameit/**', '**/prisma/import-csv.ts', '**/prisma/seed.ts'],
    }
    return config
  },
  // Excluir scripts de Prisma del build de TypeScript
  typescript: {
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig
