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
      <main style={{ background: "#0b1623", color: "#e8edf2", minHeight: "100vh" }}>
        <section
          style={{
            paddingTop: "120px",
            paddingBottom: "48px",
            borderBottom: "1px solid #1a2d42",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px" }}>
            <h1
              style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(36px, 5vw, 56px)",
                fontWeight: 600,
                color: "#ffffff",
                lineHeight: 1.1,
                marginBottom: "16px",
              }}
            >
              Practice Intelligence
            </h1>
            <p
              style={{
                fontSize: "18px",
                color: "rgba(232,237,242,0.65)",
                maxWidth: "520px",
                lineHeight: 1.6,
              }}
            >
              Insights for medical practice owners and healthcare investors
            </p>
          </div>
        </section>

        <div
          style={{
            background: "linear-gradient(135deg, #0d2340, #0f2a1e)",
            borderBottom: "1px solid #1a3d56",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "16px 48px" }}>
            <Link
              href="/score"
              style={{
                color: "#23c6a0",
                textDecoration: "none",
                fontWeight: 500,
                fontSize: "15px",
              }}
            >
              Not sure where your practice stands? Get your free Practice Health Score in 3 minutes →
            </Link>
          </div>
        </div>

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 48px 96px" }}>
          {posts.length === 0 ? (
            <p style={{ color: "rgba(232,237,242,0.4)", fontSize: "15px" }}>
              No posts published yet.
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                gap: "24px",
              }}
            >
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  style={{
                    textDecoration: "none",
                    display: "block",
                    background: "#0f1e2e",
                    border: "1px solid #1a2d42",
                    borderRadius: "12px",
                    padding: "28px 32px",
                  }}
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
                        fontWeight: 700,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "#23c6a0",
                      }}
                    >
                      {post.category}
                    </span>
                    <span style={{ color: "rgba(232,237,242,0.25)" }}>·</span>
                    <span style={{ fontSize: "12px", color: "rgba(232,237,242,0.45)" }}>
                      {post.readTime}
                    </span>
                  </div>
                  <h2
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#e8edf2",
                      lineHeight: 1.35,
                      marginBottom: "10px",
                    }}
                  >
                    {post.title}
                  </h2>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "rgba(232,237,242,0.58)",
                      lineHeight: 1.65,
                      marginBottom: "18px",
                    }}
                  >
                    {post.description.length > 150
                      ? `${post.description.slice(0, 150)}…`
                      : post.description}
                  </p>
                  <p style={{ fontSize: "12px", color: "rgba(232,237,242,0.35)" }}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
