/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },

  async rewrites() {
    return [
      {
        // api 요청
        source: "/api/:path*",
        // 실제 도달하는 api end point
        destination: "http://localhost:8080/api/:path*",
      },
      {
        // api 요청
        source: "/data/:path*",
        // 실제 도달하는 api end point
        destination: "http://localhost:8080/data/:path*",
      },
    ];
  },

  // HTTP 연결 옵션 추가
  httpAgentOptions: {
    keepAlive: false, // 요청이 끝나면 연결을 닫음
  },
};

module.exports = nextConfig;
