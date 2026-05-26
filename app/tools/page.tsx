import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Free Tools for Medical Practices | Harine Management",
  description:
    "Free calculators and assessments for medical practice owners — benchmark your RCM metrics, calculate revenue leakage, and get your practice health score.",
  alternates: {
    canonical: "https://harinemanagement.com/tools",
  },
};

const TOOLS = [
  {
    icon: "🏥",
    category: "Assessment",
    categoryClass: "crimson",
    cardClass: "featured",
    title: "Practice Health Check",
    description:
      "Answer 10 questions about your billing, volume, and operations. Get an instant scored analysis with AI-generated recommendations specific to your practice.",
    whatYouGet: "Instant score, personalized report, emailed to you",
    buttonLabel: "Start Free Health Check →",
    buttonClass: "btn-primary",
    href: "/score",
  },
  {
    icon: "💰",
    category: "Calculator",
    categoryClass: "terra",
    cardClass: "secondary",
    title: "Revenue Leakage Calculator",
    description:
      "Enter 4 numbers from your billing reports. See your estimated monthly and annual revenue leakage compared to MGMA benchmarks.",
    whatYouGet: "Dollar estimate of monthly revenue loss, emailed breakdown",
    buttonLabel: "Calculate My Leakage →",
    buttonClass: "btn-terra",
    href: "/tools/revenue-leakage-calculator",
  },
  {
    icon: "📊",
    category: "Benchmarking",
    categoryClass: "ink",
    cardClass: "tertiary",
    title: "RCM Benchmarking Scorecard",
    description:
      "Compare your billing metrics against MGMA and HFMA benchmarks across 8 key indicators. See exactly where you stand and what to fix first.",
    whatYouGet: "Color-coded scorecard, benchmark comparisons, emailed report",
    buttonLabel: "Get My Scorecard →",
    buttonClass: "btn-secondary",
    href: "/tools/rcm-scorecard",
  },
] as const;

function formatDate(date: string): string {
  const [year, month] = date.split("-").map(Number);
  return new Date(year, month - 1, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export default function ToolsPage() {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <>
      <Nav />

      {/* PAGE HEADER */}
      <section className="service-hero">
        <div className="service-hero-inner" style={{ maxWidth: "1200px" }}>
          <div
            className="eyebrow"
            style={{
              color: "rgba(255,255,255,0.55)",
              marginBottom: "20px",
            }}
          >
            <span
              className="eyebrow-rule"
              style={{ background: "rgba(255,255,255,0.4)" }}
            ></span>
            Resources &amp; Tools
          </div>
          <h1>Free Tools &amp; Resources</h1>
          <p className="service-subhead">
            Practical tools for medical practice owners and healthcare investors
            — no signup required to start.
          </p>
        </div>
      </section>

      {/* TOOL CARDS */}
      <section>
        <div className="container">
          <div className="services-grid">
            {TOOLS.map((tool) => (
              <div key={tool.href} className={`service-card ${tool.cardClass}`}>
                <div className={`service-icon ${tool.categoryClass}`}>
                  {tool.icon}
                </div>
                <div className={`service-tag ${tool.categoryClass}`}>
                  {tool.category}
                </div>
                <h3>{tool.title}</h3>
                <p>{tool.description}</p>
                <div style={{ marginBottom: "28px" }}>
                  <div
                    style={{
                      fontSize: "10px",
                      fontWeight: 600,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--ink-faint)",
                      marginBottom: "7px",
                    }}
                  >
                    What you get
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "var(--ink-mid)",
                      lineHeight: 1.55,
                    }}
                  >
                    {tool.whatYouGet}
                  </div>
                </div>
                <Link
                  href={tool.href}
                  className={`btn ${tool.buttonClass}`}
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  {tool.buttonLabel}
                </Link>
              </div>
            ))}
          </div>

          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
              color: "var(--ink-faint)",
              marginTop: "40px",
            }}
          >
            All tools are free. No credit card required. Results are emailed
            instantly.
          </p>
        </div>
      </section>

      {/* FROM THE BLOG */}
      {recentPosts.length > 0 && (
        <section className="alt">
          <div className="container">
            <div className="section-header">
              <div className="eyebrow">
                <span className="eyebrow-rule"></span>From the Blog
              </div>
              <h2 className="section-title">
                Latest from<br />
                <em>the blog.</em>
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "20px",
              }}
            >
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="blog-related-card"
                >
                  <div className="blog-related-tag">{post.category}</div>
                  <div className="blog-related-title">{post.title}</div>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "var(--ink-muted)",
                      margin: 0,
                      lineHeight: 1.6,
                    }}
                  >
                    {post.description}
                  </p>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "var(--ink-faint)",
                      marginTop: "4px",
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                    }}
                  >
                    <span>{formatDate(post.date)}</span>
                    <span style={{ opacity: 0.4 }}>·</span>
                    <span>{post.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "40px" }}>
              <Link href="/blog" className="btn btn-secondary">
                View All Posts →
              </Link>
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </>
  );
}
