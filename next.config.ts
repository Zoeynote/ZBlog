import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["substackcdn.com", "substack-post-media.s3.amazonaws.com"]
  }
};

export default nextConfig;
