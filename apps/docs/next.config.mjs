import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Link",
            value:
              '</docs>; rel="service-doc", </llms.txt>; rel="alternate"; type="text/plain", </sitemap.xml>; rel="sitemap", </.well-known/agent-skills/index.json>; rel="service-desc"; type="application/json"',
          },
        ],
      },
    ];
  },
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
