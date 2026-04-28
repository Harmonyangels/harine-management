import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { INTERNAL_LINKS, PAGE_LABELS } from "@/data/internalLinks";

export type PostCategory =
  | "practice-analytics"
  | "revenue-cycle"
  | "due-diligence"
  | "ai-healthcare"
  | "operations";

export const CATEGORY_LABELS: Record<PostCategory, string> = {
  "practice-analytics": "Practice Analytics",
  "revenue-cycle": "Revenue Cycle",
  "due-diligence": "Due Diligence",
  "ai-healthcare": "AI in Healthcare",
  operations: "Operations",
};

export interface Post {
  title: string;
  date: string;
  dateModified?: string;
  slug: string;
  description: string;
  category: PostCategory;
  tags: string[];
  author: string;
  readingTime: string;
}

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
    const { data } = matter(raw);
    return data as Post;
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export interface RelatedService {
  url: string;
  label: string;
  description: string;
}

export function getRelatedServices(slug: string): RelatedService[] {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return [];

  const raw = fs.readFileSync(filePath, "utf-8");
  const { content } = matter(raw);
  const lowerContent = content.toLowerCase();

  const seen = new Set<string>();
  const services: RelatedService[] = [];

  for (const [keyword, url] of Object.entries(INTERNAL_LINKS)) {
    if (seen.has(url)) continue;
    if (lowerContent.includes(keyword.toLowerCase())) {
      const meta = PAGE_LABELS[url];
      if (meta) {
        seen.add(url);
        services.push({ url, label: meta.label, description: meta.description });
      }
    }
  }

  return services;
}

export function getRelatedPosts(
  slug: string,
  tags: string[],
  limit = 3
): Post[] {
  const all = getAllPosts().filter((p) => p.slug !== slug);

  const scored = all.map((p) => ({
    post: p,
    score: p.tags.filter((t) => tags.includes(t)).length,
  }));

  const withMatches = scored
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ post }) => post);

  if (withMatches.length >= limit) return withMatches.slice(0, limit);

  // Fill remaining slots with most recent posts that didn't match by tag
  const fallback = all.filter((p) => !withMatches.includes(p));
  return [...withMatches, ...fallback].slice(0, limit);
}
