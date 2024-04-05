/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      allowedOrigins: ['app.localhost:3000']
    }
  },
  images: {
    dangerouslyAllowSVG: true,
    domains: [
      'ha3zldst15jisuvj.public.blob.vercel-storage.com',
      'public.blob.vercel-storage.com',
      'img.clerk.com',
      'res.cloudinary.com',
      'images.unsplash.com',
      'cdn.pixabay.com',
      'pbs.twimg.com',
      'abs.twimg.com',
      'dresume.vercel.app',
      'dresume.me',
      'utfs.io',
      'images.clerk.dev',
      'illustrations.popsy.co',
      'api.producthunt.com',
      'avatars.githubusercontent.com',
      'cdn.jsdelivr.net'
    ]
  }
}

module.exports = nextConfig
