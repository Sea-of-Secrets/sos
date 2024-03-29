/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "http://j10a710.p.ssafy.io:3000/:path*",
      },
    ];
  },
  // async headers() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       headers: [
  //         { key: "Access-Control-Allow-Credentials", value: "false" },
  //         {
  //           key: "Access-Control-Allow-Origin",
  //           value: "*",
  //         },
  //         {
  //           key: "Access-Control-Allow-Methods",
  //           value: "GET, POST, OPTIONS",
  //         },
  //         {
  //           key: "Access-Control-Allow-Headers",
  //           value:
  //             "Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date",
  //         },
  //       ],
  //     },
  //   ];
  // },
};

export default nextConfig;
