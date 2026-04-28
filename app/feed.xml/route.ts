import { getAllPosts } from "@/lib/blog";

const SITE_URL = "https://harinemanagement.com";
const FEED_URL = `${SITE_URL}/feed.xml`;

function xmlEscape(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildRSS(): string {
  const posts = getAllPosts();

  const items = posts
    .map((post) => {
      const pubDate = new Date(post.date).toUTCString();
      const url = `${SITE_URL}/resources/${post.slug}`;
      return `    <item>
      <title>${xmlEscape(post.title)}</title>
      <link>${url}</link>
      <description>${xmlEscape(post.description)}</description>
      <author>dev@harinemanagement.com (${xmlEscape(post.author)})</author>
      <pubDate>${pubDate}</pubDate>
      <guid isPermaLink="true">${url}</guid>
      <category>${xmlEscape(post.category)}</category>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Harine Management</title>
    <link>${SITE_URL}</link>
    <description>Practical perspectives on healthcare data analytics, revenue cycle management, PE due diligence, and AI in clinical operations.</description>
    <language>en-US</language>
    <managingEditor>dev@harinemanagement.com (Devanshu Patel)</managingEditor>
    <webMaster>dev@harinemanagement.com (Devanshu Patel)</webMaster>
    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;
}

export function GET() {
  return new Response(buildRSS(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
