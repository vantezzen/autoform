import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: "/docs/:path*.md",
        destination: "/docs.mdx/:path*",
      },
    ];
  },
};

export default withMDX(config);
