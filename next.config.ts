import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/**",
        search: "",
      },
      {
        pathname: "/teams-my/iG.png",
        search: "?v=20260518",
      },
    ],
  },
};

export default nextConfig;
