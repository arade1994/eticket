const path = require("path");

module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://eticket.dev/api/:path*",
      },
    ];
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "**/*.module.scss")],
  },
  images: {
    localPatterns: [
      {
        pathname: "/assets/images/**",
        search: "",
      },
    ],
  },
};
