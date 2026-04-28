/**
 * apply-autolinks.mjs
 *
 * Run once with: node scripts/apply-autolinks.mjs
 *
 * Reads every .mdx file in content/blog/, wraps the first unprotected
 * occurrence of each keyword with its internal Markdown link, then writes
 * the file back. Idempotent: skips keywords whose destination URL is
 * already present as a link target in the file.
 */

import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = join(__dirname, "..", "content", "blog");
const BASE_URL = "https://harinemanagement.com";

// ── Keyword map (longest first to prevent subset collisions) ──────────────────
const INTERNAL_LINKS = [
  ["urgent care analytics", "/specialties/urgent-care-analytics"],
  ["practice analytics",    "/services/practice-analytics-system"],
  ["multi-location",        "/specialties/multi-location-practice-analytics"],
  ["revenue cycle",         "/services/revenue-cycle-analytics"],
  ["due diligence",         "/services/due-diligence-analytics"],
  ["collection rate",       "/services/revenue-cycle-analytics"],
  ["AI insights",           "/services/ai-insights-layer"],
  ["AR aging",              "/services/revenue-cycle-analytics"],
  ["wRVU",                  "/services/provider-productivity-analytics"],
];

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Split body text into protected / safe segments.
 * Protected: fenced code, inline code, existing links, headings, bare URLs, HTML tags.
 */
function tokenize(body) {
  const PROTECTED =
    /```[\s\S]*?```|`[^`\n]+`|\[[^\]]*\]\([^)]*\)|^#{1,6} [^\n]+|https?:\/\/\S+|<[^>]+>/gm;

  const segments = [];
  let last = 0;
  let m;
  const re = new RegExp(PROTECTED.source, PROTECTED.flags);

  while ((m = re.exec(body)) !== null) {
    if (m.index > last) segments.push({ text: body.slice(last, m.index), safe: true });
    segments.push({ text: m[0], safe: false });
    last = re.lastIndex;
  }
  if (last < body.length) segments.push({ text: body.slice(last), safe: true });
  return segments;
}

function applyAutoLinks(content) {
  // Isolate frontmatter so it is never touched.
  const fmMatch = content.match(/^---\n[\s\S]*?\n---\n/);
  const frontmatter = fmMatch ? fmMatch[0] : "";
  const body = content.slice(frontmatter.length);

  // Destination URLs already present as link targets → never double-link.
  const alreadyLinked = new Set(
    [...body.matchAll(/\]\((https?:\/\/[^)]+)\)/g)].map((m) => m[1])
  );

  const segments = tokenize(body);

  for (const [keyword, path] of INTERNAL_LINKS) {
    const destination = `${BASE_URL}${path}`;
    if (alreadyLinked.has(destination)) continue;

    const re = new RegExp(`\\b${escapeRegex(keyword)}\\b`, "i");

    for (const seg of segments) {
      if (!seg.safe) continue;
      const hit = re.exec(seg.text);
      if (hit) {
        seg.text =
          seg.text.slice(0, hit.index) +
          `[${hit[0]}](${destination})` +
          seg.text.slice(hit.index + hit[0].length);
        alreadyLinked.add(destination);
        break;
      }
    }
  }

  return frontmatter + segments.map((s) => s.text).join("");
}

// ── Main ─────────────────────────────────────────────────────────────────────
const files = readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
let changed = 0;

for (const file of files) {
  const filePath = join(BLOG_DIR, file);
  const original = readFileSync(filePath, "utf-8");
  const updated = applyAutoLinks(original);

  if (updated !== original) {
    writeFileSync(filePath, updated, "utf-8");
    console.log(`  linked: ${file}`);
    changed++;
  } else {
    console.log(`  skipped (no changes): ${file}`);
  }
}

console.log(`\nDone — ${changed} of ${files.length} files updated.`);
