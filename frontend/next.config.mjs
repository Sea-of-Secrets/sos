/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
  async headers() {
    return [
      {
        headers: [
          // { key: "Access-Control-Allow-Credentials", value: "false" },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          // {
          //   key: "Access-Control-Allow-Methods",
          //   value: "GET,POST",
          // },
          // {
          //   key: "Access-Control-Allow-Headers",
          //   value:
          //     "Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date",
          // },
        ],
      },
    ];
  },
};

export default nextConfig;
