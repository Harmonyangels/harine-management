import { INTERNAL_LINKS } from "@/data/internalLinks";

const BASE_URL = "https://harinemanagement.com";

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Split raw MDX source into alternating safe / protected segments.
 *
 * Protected (never rewritten):
 *   - Fenced code blocks  ```…```
 *   - Inline code  `…`
 *   - Existing markdown links  [label](url)
 *   - ATX headings  ## …
 *   - Bare URLs  https://…
 *   - HTML tags  <…>
 */
function tokenize(body: string): Array<{ text: string; safe: boolean }> {
  // Order matters — more specific patterns first.
  const PROTECTED =
    /```[\s\S]*?```|`[^`\n]+`|\[[^\]]*\]\([^)]*\)|^#{1,6} [^\n]+|https?:\/\/\S+|<[^>]+>/gm;

  const segments: Array<{ text: string; safe: boolean }> = [];
  let last = 0;
  let m: RegExpExecArray | null;
  const re = new RegExp(PROTECTED.source, PROTECTED.flags);

  while ((m = re.exec(body)) !== null) {
    if (m.index > last) {
      segments.push({ text: body.slice(last, m.index), safe: true });
    }
    segments.push({ text: m[0], safe: false });
    last = re.lastIndex;
  }
  if (last < body.length) {
    segments.push({ text: body.slice(last), safe: true });
  }
  return segments;
}

/**
 * Wrap the first occurrence of each keyword in `links` with a Markdown link,
 * skipping protected regions (headings, existing links, code, bare URLs, HTML).
 *
 * Idempotent: if a link to the same destination URL already exists anywhere in
 * the raw content, that keyword is skipped so it is never double-linked.
 *
 * @param content  Full raw MDX file content (including frontmatter).
 * @param links    Keyword → path map (defaults to INTERNAL_LINKS).
 */
export function autoLink(
  content: string,
  links: Record<string, string> = INTERNAL_LINKS
): string {
  // Strip frontmatter so it is never touched.
  const fmMatch = content.match(/^---\n[\s\S]*?\n---\n/);
  const frontmatter = fmMatch ? fmMatch[0] : "";
  const body = content.slice(frontmatter.length);

  // Collect URLs already present as link destinations so we never double-link.
  const alreadyLinked = new Set<string>(
    [...body.matchAll(/\]\((https?:\/\/[^)]+)\)/g)].map((m) => m[1])
  );

  // Longest keywords first — prevents "revenue" matching inside "revenue cycle".
  const sorted = Object.entries(links).sort(
    ([a], [b]) => b.length - a.length
  );

  const segments = tokenize(body);

  for (const [keyword, path] of sorted) {
    const destination = `${BASE_URL}${path}`;

    // Skip if this destination is already linked anywhere in the body.
    if (alreadyLinked.has(destination)) continue;

    const re = new RegExp(`\\b${escapeRegex(keyword)}\\b`, "i");

    for (const seg of segments) {
      if (!seg.safe) continue;
      const hit = re.exec(seg.text);
      if (hit) {
        // Insert link around the exact matched text, preserving original casing.
        seg.text =
          seg.text.slice(0, hit.index) +
          `[${hit[0]}](${destination})` +
          seg.text.slice(hit.index + hit[0].length);
        alreadyLinked.add(destination); // prevent a second link in later segments
        break; // first occurrence only
      }
    }
  }

  return frontmatter + segments.map((s) => s.text).join("");
}
