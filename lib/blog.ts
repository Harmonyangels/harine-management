import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { INTERNAL_LINKS, PAGE_LABELS } from "@/data/internalLinks";

// ── LEGACY TYPES — used by /resources/ pages ──────────────────────────

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

export function getAllLegacyPosts(): Post[] {
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

export function getLegacyPostBySlug(slug: string): Post | undefined {
  return getAllLegacyPosts().find((p) => p.slug === slug);
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

export function getRelatedLegacyPosts(
  slug: string,
  tags: string[],
  limit = 3
): Post[] {
  const all = getAllLegacyPosts().filter((p) => p.slug !== slug);
  const scored = all.map((p) => ({
    post: p,
    score: p.tags.filter((t) => tags.includes(t)).length,
  }));
  const withMatches = scored
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ post }) => post);
  if (withMatches.length >= limit) return withMatches.slice(0, limit);
  const fallback = all.filter((p) => !withMatches.includes(p));
  return [...withMatches, ...fallback].slice(0, limit);
}

// ── NEW BLOG TYPES — used by /blog/ pages ─────────────────────────────

export type BlogCategory =
  | "Billing & RCM"
  | "Volume & Operations"
  | "Revenue Intelligence"
  | "PE & Investors"
  | "Athena Health";

export interface BlogPost {
  title: string;
  description: string;
  date: string;
  category: BlogCategory;
  slug: string;
  published: boolean;
  targetKeyword: string;
  readTime: string;
}

export function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  const posts = files
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
      const { data } = matter(raw);
      return data as BlogPost;
    })
    .filter((p) => p.published === true);
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(
  slug: string
): { frontmatter: BlogPost; content: string } | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = data as BlogPost;
  if (!frontmatter.published) return null;
  return { frontmatter, content };
}

export function getRelatedPosts(
  category: BlogCategory,
  currentSlug: string
): BlogPost[] {
  return getAllPosts()
    .filter((p) => p.category === category && p.slug !== currentSlug)
    .slice(0, 3);
}
