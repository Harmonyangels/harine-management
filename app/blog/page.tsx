import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Practice Intelligence Blog | Harine Management",
  description:
    "Benchmarks, billing analytics, and operational intelligence for medical practice owners and healthcare investors.",
  alternates: { canonical: "https://harinemanagement.com/blog" },
  openGraph: {
    title: "Practice Intelligence Blog | Harine Management",
    description:
      "Benchmarks, billing analytics, and operational intelligence for medical practice owners and healthcare investors.",
    url: "https://harinemanagement.com/blog",
    images: [{ url: "/og-image.jpg" }],
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <Nav />

      {/* Hero */}
      <section style={{ background: "var(--stone-light)", paddingTop: "64px" }}>
        <div className="container" style={{ paddingTop: "80px", paddingBottom: "64px" }}>
          <div className="eyebrow" style={{ marginBottom: "20px" }}>
            <span className="eyebrow-rule"></span>
            Practice Intelligence
          </div>
          <h1
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 400,
              color: "var(--ink)",
              lineHeight: 1.1,
              marginBottom: "20px",
            }}
          >
            Insights for<br />
            <em style={{ fontStyle: "italic", color: "var(--crimson)" }}>medical practices.</em>
          </h1>
          <p
            style={{
              fontSize: "18px",
              fontWeight: 300,
              color: "var(--ink-muted)",
              maxWidth: "520px",
              lineHeight: 1.65,
            }}
          >
            Benchmarks, billing analytics, and operational intelligence for practice owners and healthcare investors.
          </p>
        </div>
      </section>

      {/* CTA banner */}
      <div style={{ background: "var(--crimson)", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
        <div className="container" style={{ paddingTop: "14px", paddingBottom: "14px" }}>
          <Link
            href="/score"
            style={{
              color: "rgba(255,255,255,0.9)",
              textDecoration: "none",
              fontWeight: 500,
              fontSize: "15px",
            }}
          >
            Not sure where your practice stands? Get your free Practice Health Score in 3 minutes →
          </Link>
        </div>
      </div>

      {/* Posts grid */}
      <section style={{ background: "var(--white)", padding: "64px 0 96px" }}>
        <div className="container">
          {posts.length === 0 ? (
            <p style={{ color: "var(--ink-muted)", fontSize: "15px" }}>No posts published yet.</p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "24px",
              }}
            >
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="blog-card"
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "14px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 600,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "var(--crimson)",
                      }}
                    >
                      {post.category}
                    </span>
                    <span style={{ color: "var(--ink-faint)" }}>·</span>
                    <span style={{ fontSize: "12px", color: "var(--ink-faint)" }}>
                      {post.readTime}
                    </span>
                  </div>
                  <h2
                    style={{
                      fontFamily: "var(--serif)",
                      fontSize: "20px",
                      fontWeight: 500,
                      color: "var(--ink)",
                      lineHeight: 1.25,
                      marginBottom: "12px",
                    }}
                  >
                    {post.title}
                  </h2>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: 300,
                      color: "var(--ink-muted)",
                      lineHeight: 1.65,
                      marginBottom: "20px",
                    }}
                  >
                    {post.description.length > 150
                      ? `${post.description.slice(0, 150)}…`
                      : post.description}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <p style={{ fontSize: "12px", color: "var(--ink-faint)" }}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "var(--crimson)",
                      }}
                    >
                      Read →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
