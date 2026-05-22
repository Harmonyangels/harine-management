import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";

const ROOT = process.cwd();

// Load .env.local so the script works without pre-exporting env vars
(function loadEnvLocal() {
  const envFile = path.join(ROOT, ".env.local");
  if (!fs.existsSync(envFile)) return;
  for (const line of fs.readFileSync(envFile, "utf-8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    if (key && !process.env[key]) process.env[key] = val;
  }
})();

// This sanitization step exists because Claude API responses sometimes contain
// MDX-invalid syntax and must be cleaned before writing.
function sanitizeMdx(content: string): string {
  // 1. Strip HTML comments
  content = content.replace(/<!--[\s\S]*?-->/g, "");

  // 2. Remove DOCTYPE/html/head/body tags
  content = content.replace(/<!DOCTYPE[^>]*>/gi, "");
  content = content.replace(/<\/?(html|head|body)\b[^>]*>/gi, "");

  // 3. Close unclosed SVG blocks — Claude sometimes hits max_tokens mid-element,
  //    leaving the SVG open so MDX mis-parses subsequent headings as inside the tag.
  const svgOpenCount = (content.match(/<svg[\s>]/gi) || []).length;
  const svgCloseCount = (content.match(/<\/svg>/gi) || []).length;
  if (svgOpenCount > svgCloseCount) {
    // Remove any trailing truncated tag (a < that never reaches its closing >)
    content = content.trimEnd().replace(/\n\s*<[^>\n]*$/, "");
    content = content.trimEnd() + "\n</svg>\n";
  }

  // 4. Ensure a blank line before and after every markdown heading
  content = content.replace(/([^\n])\n(#{1,6} )/g, "$1\n\n$2");
  content = content.replace(/(#{1,6} [^\n]+)\n([^\n])/g, "$1\n\n$2");

  // 5. In prose lines (outside HTML/SVG blocks, not starting with <),
  //    escape bare < that would confuse the MDX parser, and escape
  //    unbalanced { } that MDX would interpret as broken JSX expressions.
  const lines = content.split("\n");
  let blockDepth = 0;
  let inFrontmatter = false;
  const out: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trimStart();

    if (i === 0 && trimmed === "---") { inFrontmatter = true; out.push(line); continue; }
    if (inFrontmatter) {
      out.push(line);
      if (trimmed === "---") inFrontmatter = false;
      continue;
    }

    const tagOpens = (trimmed.match(/<(?:svg|div|section|article|header|footer|nav|table)\b/gi) || []).length;
    const tagCloses = (trimmed.match(/<\/(?:svg|div|section|article|header|footer|nav|table)>/gi) || []).length;
    blockDepth = Math.max(0, blockDepth + tagOpens - tagCloses);

    if (blockDepth === 0 && !trimmed.startsWith("<") && trimmed !== "") {
      let prose = line;
      // Escape bare < not starting an HTML/JSX/MDX tag
      prose = prose.replace(/<(?![a-zA-Z/!])/g, "&lt;");
      // Escape unbalanced { } (MDX treats them as JSX expression boundaries)
      const braceOpens = (prose.match(/\{/g) || []).length;
      const braceCloses = (prose.match(/\}/g) || []).length;
      if (braceOpens !== braceCloses) {
        prose = prose.replace(/\{/g, "&#123;").replace(/\}/g, "&#125;");
      }
      out.push(prose);
    } else {
      out.push(line);
    }
  }

  return out.join("\n");
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

interface SitemapPage {
  url: string;
  title: string;
  topics: string[];
}
interface SitemapPost {
  url: string;
  title: string;
  slug: string;
  date: string;
}
interface Sitemap {
  pages: SitemapPage[];
  blog: SitemapPost[];
}

async function main(): Promise<void> {
  const topic = process.argv[2];
  if (!topic) {
    console.error('Usage: npx ts-node scripts/generate-post.ts "<topic>"');
    process.exit(1);
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("Error: ANTHROPIC_API_KEY environment variable is not set.");
    process.exit(1);
  }

  const client = new Anthropic({ apiKey });

  // Read skill file as system prompt
  const skillPath = path.join(ROOT, "skills", "healthcare-blog.md");
  if (!fs.existsSync(skillPath)) {
    console.error(`Error: skill file not found at ${skillPath}`);
    process.exit(1);
  }
  const systemPrompt = fs.readFileSync(skillPath, "utf-8");

  // Read sitemap for internal link context
  const sitemapPath = path.join(ROOT, "data", "sitemap.json");
  if (!fs.existsSync(sitemapPath)) {
    console.error(`Error: sitemap.json not found at ${sitemapPath}`);
    process.exit(1);
  }
  const sitemap: Sitemap = JSON.parse(fs.readFileSync(sitemapPath, "utf-8"));

  const today = new Date().toISOString().split("T")[0];

  console.log(`\nGenerating blog post: "${topic}"`);
  console.log(`Date: ${today}\n`);

  const linkContext = sitemap.pages
    .map((p) => `- ${p.url} (${p.title}): ${p.topics.join(", ")}`)
    .join("\n");

  // ── Step 1: Generate MDX post ──────────────────────────────────────
  console.log("Step 1/2 — Generating MDX post...");

  const postMessage = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4000,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: `Write a complete MDX blog post for Harine Management on this topic: "${topic}"

Available internal pages to link to:
${linkContext}

Output ONLY valid MDX starting with the frontmatter block. Use these exact required frontmatter fields:
---
title: "<SEO-optimized title containing the target keyword>"
description: "<output only the meta description text — no word counts, no annotations; aim for 150-160 characters, must include target keyword, must end with a benefit statement>"
date: "${today}"
category: "<exactly one of: Billing & RCM, Volume & Operations, Revenue Intelligence, PE & Investors, Athena Health>"
slug: "<short SEO slug, 3-6 hyphenated words, target keyword first, omit stop words like what/is/a/for/the/how>"
published: true
targetKeyword: "<primary SEO keyword phrase>"
readTime: "<e.g., 6 min read>"
---

Follow the POST STRUCTURE from the skill file exactly:
1. Hook paragraph with a real benchmark stat and its source
2. The Problem (2–3 paragraphs)
3. The Benchmark section (1–2 paragraphs) — place the exact text [INFOGRAPHIC] on its own line at the end of this section
4. What Good Looks Like (2–3 paragraphs)
5. <ScoreCTA /> on its own line (no surrounding text)
6. How to Improve — numbered list, 3–5 items, bold title, 2 sentences each
7. The Analytics Angle (1–2 paragraphs)
8. <DiscoveryCTA /> on its own line (no surrounding text)

Do not output any explanation or commentary. Output only the MDX file content.`,
      },
    ],
  });

  let rawPost =
    postMessage.content[0].type === "text"
      ? postMessage.content[0].text.trim()
      : "";

  // Strip outer markdown code fences — Claude sometimes wraps MDX in ```mdx...```
  if (rawPost.startsWith("```")) {
    rawPost = rawPost
      .replace(/^```(?:mdx|markdown|yaml)?\s*/i, "")
      .replace(/\s*```\s*$/, "")
      .trim();
  }

  if (!rawPost) {
    throw new Error("Post generation returned empty content.");
  }

  // Extract Claude-generated slug from frontmatter (fallback: slugify topic)
  let slug = slugify(topic);
  const fmMatch = rawPost.match(/^---[\r\n]+([\s\S]*?)[\r\n]+---/);
  if (fmMatch) {
    const slugLine = fmMatch[1].match(/^slug:\s*["']?([a-z0-9][a-z0-9-]*)["']?\s*$/m);
    if (slugLine) slug = slugLine[1];
  }
  console.log(`✓ MDX post generated. Slug: ${slug}\n`);

  // ── Step 2: Generate SVG infographic ──────────────────────────────
  console.log("Step 2/2 — Generating SVG infographic...");

  const svgMessage = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2000,
    messages: [
      {
        role: "user",
        content: `Create a dark-themed SVG infographic for this healthcare blog post topic: "${topic}"

Strict design requirements:
- viewBox="0 0 640 280" width="100%"
- Background rectangle: fill="#0f1e2e" width="640" height="280"
- Primary text: fill="#e8edf2"
- Secondary/label text: fill="#93a8bc"
- Accent / key stat color: fill="#23c6a0"
- Border / divider color: stroke="#1a2d42"
- Font: font-family="system-ui, sans-serif" (no external fonts or images)
- Visualize the KEY benchmark statistic relevant to this topic (bar chart, stat callout, or comparison)
- Display the benchmark number prominently in large text with accent color
- Include the data source (MGMA, HFMA, AAPC, CMS, or AMA) as small-text attribution
- Keep it clean and professional — it appears inline inside a dark-themed blog post

Output ONLY the raw SVG element. No explanation, no markdown fences, no wrapper HTML.`,
      },
    ],
  });

  const svgRaw =
    svgMessage.content[0].type === "text"
      ? svgMessage.content[0].text.trim()
      : "";

  if (!svgRaw) {
    throw new Error("SVG generation returned empty content.");
  }

  // Strip any accidental markdown fences Claude may have added
  const svgContent = svgRaw
    .replace(/^```(?:svg|xml)?\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();

  console.log("✓ SVG infographic generated.\n");

  // ── Assemble final MDX ─────────────────────────────────────────────
  let finalMdx: string;
  if (rawPost.includes("[INFOGRAPHIC]")) {
    finalMdx = rawPost.replace("[INFOGRAPHIC]", svgContent);
  } else {
    // Fallback: insert after the second paragraph break in the body
    const fmClose = rawPost.indexOf("---", 3);
    const bodyStart = fmClose !== -1 ? fmClose + 3 : 0;
    const firstBreak = rawPost.indexOf("\n\n", bodyStart);
    const secondBreak =
      firstBreak !== -1 ? rawPost.indexOf("\n\n", firstBreak + 2) : -1;
    const insertAt = secondBreak !== -1 ? secondBreak : firstBreak;

    if (insertAt !== -1) {
      finalMdx =
        rawPost.slice(0, insertAt + 2) +
        svgContent +
        "\n\n" +
        rawPost.slice(insertAt + 2);
    } else {
      finalMdx = rawPost + "\n\n" + svgContent;
    }
  }

  finalMdx = sanitizeMdx(finalMdx);

  // ── Write MDX file ─────────────────────────────────────────────────
  const outputPath = path.join(ROOT, "content", "blog", `${slug}.mdx`);
  fs.writeFileSync(outputPath, finalMdx, "utf-8");
  console.log(`Post written: ${outputPath}`);

  // ── Update sitemap.json blog array ────────────────────────────────
  sitemap.blog.push({ url: `/blog/${slug}`, title: topic, slug, date: today });
  fs.writeFileSync(
    sitemapPath,
    JSON.stringify(sitemap, null, 2) + "\n",
    "utf-8"
  );
  console.log(`Sitemap updated: ${sitemapPath}\n`);

  console.log(`✓ Done — view at /blog/${slug}`);
}

main().catch((err: unknown) => {
  const msg = err instanceof Error ? err.message : String(err);
  console.error("\n✗ Error:", msg);
  process.exit(1);
});
