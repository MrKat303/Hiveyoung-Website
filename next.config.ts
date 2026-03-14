import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'celestinas.cl',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/images/Draws/Asterisk.svg',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
          },
        ],
      },
      {
        source: '/_private/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
          },
        ],
      },
      {
        source: '/images/home/hero.svg',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
          },
        ],
      },
      {
        source: '/images/home/bottom.svg',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
          },
        ],
      },
      {
        source: '/images/Draws/Captar.png',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
          },
        ],
      },
      {
        source: '/images/home/Articular.png',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
          },
        ],
      },
      {
        source: '/images/home/Colaborar.png',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
          },
        ],
      },
      {
        source: '/images/home/Proyectos.png',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/_private/cloudinary/:path*',
        destination: 'https://res.cloudinary.com/:path*',
      },
    ];
  },
};

export default nextConfig;
