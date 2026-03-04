const path = require("path");

const nextConfig = {
  webpack: (config) => {
    config.resolve.alias["@config"] = path.resolve(
      __dirname,
      "../../config.js",
    );
    return config;
  },
};

module.exports = nextConfig;
