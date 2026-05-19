import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const securityHeaders = [
  { key: "X-Robots-Tag", value: "index, follow" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self)",
  },
];

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  images: {
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },

  async redirects() {
    return [
      // Canonical domain — redirect www and Vercel preview URL to production
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.harinemanagement.com" }],
        destination: "https://harinemanagement.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "harine-management.vercel.app" }],
        destination: "https://harinemanagement.com/:path*",
        permanent: true,
      },

      // Legacy WordPress entry points — 301 permanent redirect to home
      { source: "/index.php",        destination: "/", statusCode: 301 },
      { source: "/index.php/:path*", destination: "/", statusCode: 301 },
    ];
  },
};

// Turbopack requires plugin names as strings, not function references
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm", "remark-frontmatter"],
    rehypePlugins: ["rehype-highlight"],
  },
});

export default withMDX(nextConfig);
