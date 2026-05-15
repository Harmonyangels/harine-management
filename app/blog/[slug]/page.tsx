import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";
import ScoreCTA from "@/components/blog/ScoreCTA";
import DiscoveryCTA from "@/components/blog/DiscoveryCTA";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";

const mdxComponents = { ScoreCTA, DiscoveryCTA };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.frontmatter.title} | Harine Management`,
    description: post.frontmatter.description,
    alternates: {
      canonical: `https://harinemanagement.com/blog/${slug}`,
    },
    openGraph: {
      title: `${post.frontmatter.title} | Harine Management`,
      description: post.frontmatter.description,
      images: [{ url: "/og-image.jpg" }],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.frontmatter.category, slug);
  const formattedDate = new Date(post.frontmatter.date).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <>
      <Nav />
      <main style={{ background: "#0b1623", color: "#e8edf2", minHeight: "100vh" }}>
        <header
          style={{
            paddingTop: "100px",
            paddingBottom: "48px",
            borderBottom: "1px solid #1a2d42",
          }}
        >
          <div style={{ maxWidth: "780px", margin: "0 auto", padding: "0 48px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#23c6a0",
                }}
              >
                {post.frontmatter.category}
              </span>
              <span style={{ color: "rgba(232,237,242,0.3)" }}>·</span>
              <span style={{ fontSize: "12px", color: "rgba(232,237,242,0.45)" }}>
                {post.frontmatter.readTime}
              </span>
            </div>
            <h1
              style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 600,
                color: "#ffffff",
                lineHeight: 1.2,
                marginBottom: "24px",
              }}
            >
              {post.frontmatter.title}
            </h1>
            <p style={{ fontSize: "13px", color: "rgba(232,237,242,0.45)" }}>
              Devanshu Patel · Harine Management · {formattedDate}
            </p>
          </div>
        </header>

        <article style={{ maxWidth: "780px", margin: "0 auto", padding: "48px 48px 0" }}>
          <div className="blog-prose">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>
        </article>

        {related.length > 0 && (
          <section
            style={{
              maxWidth: "780px",
              margin: "48px auto 0",
              padding: "48px 48px 0",
              borderTop: "1px solid #1a2d42",
            }}
          >
            <h2
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#e8edf2",
                marginBottom: "24px",
              }}
            >
              Related reading
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "16px",
              }}
            >
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  style={{
                    textDecoration: "none",
                    background: "#0f1e2e",
                    border: "1px solid #1a2d42",
                    borderRadius: "10px",
                    padding: "20px 24px",
                    display: "block",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#23c6a0",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    {r.category}
                  </span>
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "#e8edf2",
                      lineHeight: 1.35,
                      display: "block",
                      marginBottom: "10px",
                    }}
                  >
                    {r.title}
                  </span>
                  <span style={{ fontSize: "12px", color: "#23c6a0" }}>Read more →</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section style={{ maxWidth: "780px", margin: "48px auto 0", padding: "0 48px 80px" }}>
          <div
            style={{
              background: "linear-gradient(135deg, #0d2340, #0f2a1e)",
              border: "1px solid #1a3d56",
              borderRadius: "12px",
              padding: "36px 40px",
            }}
          >
            <h2
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "#ffffff",
                marginBottom: "12px",
                lineHeight: 1.3,
              }}
            >
              Ready to see what your EHR data can actually do?
            </h2>
            <p
              style={{
                fontSize: "15px",
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.6,
                marginBottom: "22px",
              }}
            >
              Book a free 30-minute discovery call. We&apos;ll look at your specific EHR
              setup and show you what a live dashboard would look like for your practice.
            </p>
            <a
              href="https://calendly.com/dev-harinemanagement/30min"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                background: "linear-gradient(135deg, #1a6fa8, #23c6a0)",
                color: "#ffffff",
                fontWeight: 600,
                fontSize: "15px",
                padding: "12px 24px",
                borderRadius: "8px",
                textDecoration: "none",
              }}
            >
              Book a Free 30-Min Call →
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
