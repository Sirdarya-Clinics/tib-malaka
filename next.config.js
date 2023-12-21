/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "sirdaryo-tibmalaka.uz"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
