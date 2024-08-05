/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '*.supabase.co',
          port: '',
          pathname: '/storage/v1/object/public/uploads/posts/**',
        },
        {
          protocol: 'https',
          hostname: '*.supabase.co',
          port: '',
          pathname: '/storage/v1/object/public/uploads/landing/**',
        },
      ],
    },
    transpilePackages: ["geist"],
  }

