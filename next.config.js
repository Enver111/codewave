/** @type {import('next').NextConfig} */
const nextConfig = {
  // Для создания standalone приложения (важно для Timeweb)
  output: "standalone",

  // Опционально: если нужно изменить папку сборки
  // distDir: 'build',

  // Для лучшей совместимости с некоторыми хостингами
  trailingSlash: true,

  // Настройки изображений
  images: {
    domains: [
      "localhost",
      "hvbyzl0fefqamcq1.public.blob.vercel-storage.com",
      "i.pravatar.cc",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        port: "",
        pathname: "/**",
      },
    ],
  },

  // Настройки безопасности
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.telegram.org; frame-ancestors 'none';",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
