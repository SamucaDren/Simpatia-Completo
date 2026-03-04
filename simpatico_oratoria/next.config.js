/** @type {import('next').NextConfig} */
const isExport = process.env.EXPORT === "true";

const nextConfig = {
  output: "export",
  assetPrefix: "./",
  images: { unoptimized: true },
  experimental: {
    optimizePackageImports: ["@next/font"],
  },
};

module.exports = nextConfig;
