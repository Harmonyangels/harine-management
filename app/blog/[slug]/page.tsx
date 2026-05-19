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
      canonical: `/blog/${slug}`,
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
      <main style={{ background: "var(--white)", minHeight: "100vh" }}>

        {/* Post header */}
        <header
          style={{
            background: "var(--stone-light)",
            paddingTop: "64px",
            borderBottom: "1px solid var(--stone)",
          }}
        >
          <div style={{ maxWidth: "780px", margin: "0 auto", padding: "64px 48px 48px" }}>
            <div
              className="eyebrow"
              style={{ marginBottom: "20px" }}
            >
              <span className="eyebrow-rule"></span>
              {post.frontmatter.category}
              <span style={{
                color: "var(--ink-faint)",
                fontWeight: 400,
                letterSpacing: "0.01em",
                textTransform: "none",
                fontSize: "12px",
              }}>
                · {post.frontmatter.readTime}
              </span>
            </div>
            <h1
              style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 400,
                color: "var(--ink)",
                lineHeight: 1.15,
                marginBottom: "24px",
              }}
            >
              {post.frontmatter.title}
            </h1>
            <p style={{
              fontSize: "13px",
              color: "var(--ink-faint)",
              fontWeight: 400,
              letterSpacing: "0.01em",
            }}>
              Devanshu Patel · Harine Management · {formattedDate}
            </p>
          </div>
        </header>

        {/* Article body */}
        <article style={{ maxWidth: "780px", margin: "0 auto", padding: "48px 48px 0" }}>
          <div className="blog-prose">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>
        </article>

        {/* Related reading */}
        {related.length > 0 && (
          <section
            style={{
              maxWidth: "780px",
              margin: "48px auto 0",
              padding: "48px 48px 0",
              borderTop: "1px solid var(--stone)",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--serif)",
                fontSize: "22px",
                fontWeight: 500,
                color: "var(--ink)",
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
                  className="blog-related-card"
                >
                  <span className="blog-related-tag">{r.category}</span>
                  <span className="blog-related-title">{r.title}</span>
                  <span className="service-link">Read more →</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <section style={{ maxWidth: "780px", margin: "48px auto 0", padding: "0 48px 80px" }}>
          <div
            style={{
              background: "var(--white)",
              borderLeft: "1px solid var(--stone)",
              borderRight: "1px solid var(--stone)",
              borderBottom: "1px solid var(--stone)",
              borderTop: "3px solid var(--crimson)",
              borderRadius: "10px",
              padding: "36px 40px",
            }}
          >
            <div className="eyebrow" style={{ marginBottom: "16px" }}>
              <span className="eyebrow-rule"></span>
              Let&apos;s Talk
            </div>
            <h2
              style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(20px, 3vw, 26px)",
                fontWeight: 400,
                color: "var(--ink)",
                lineHeight: 1.25,
                marginBottom: "12px",
              }}
            >
              Ready to see what your EHR data can actually do?
            </h2>
            <p
              style={{
                fontSize: "15px",
                color: "var(--ink-muted)",
                lineHeight: 1.7,
                marginBottom: "24px",
                maxWidth: "520px",
              }}
            >
              Book a free 30-minute discovery call. We&apos;ll look at your specific EHR
              setup and show you what a live dashboard would look like for your practice.
            </p>
            <a
              href="https://calendly.com/dev-harinemanagement/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
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
