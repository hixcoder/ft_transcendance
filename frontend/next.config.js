/** @type {import('next').NextConfig} */

require("dotenv").config();

const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/public/HomePage",
        permanent: true,
      },
    ];
  },

  // env: {
  //   NEXT_PUBLIC_BACK: `${process.env.BACK_HOST}`,
  // },

  images: {
    domains: ["cdn.intra.42.fr", "localhost"],
  },
};

module.exports = nextConfig;
