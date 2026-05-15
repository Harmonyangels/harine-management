import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { getAllLegacyPosts } from "@/lib/blog";
import type { PostCategory } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Practical perspectives on healthcare data analytics, revenue cycle management, PE due diligence, and AI in clinical operations — from the team at Harine Management.",
  alternates: {
    canonical: "https://harinemanagement.com/resources",
  },
  openGraph: {
    title: "Resources | Harine Management",
    description:
      "Practical perspectives on healthcare analytics, revenue cycle, due diligence, and AI — from Harine Management.",
    url: "https://harinemanagement.com/resources",
    images: [{ url: "/og-image.jpg" }],
  },
};

const CATEGORY_LABELS: Record<PostCategory, string> = {
  "practice-analytics": "Practice Analytics",
  "revenue-cycle": "Revenue Cycle",
  "due-diligence": "Due Diligence",
  "ai-healthcare": "AI in Healthcare",
  operations: "Operations",
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": "https://harinemanagement.com/resources#webpage",
  name: "Resources | Harine Management",
  url: "https://harinemanagement.com/resources",
  description:
    "Practical perspectives on healthcare data analytics, revenue cycle management, PE due diligence, and AI in clinical operations.",
  inLanguage: "en-US",
  publisher: {
    "@type": "Organization",
    "@id": "https://harinemanagement.com/#organization",
    name: "Harine Management",
  },
};

export default function ResourcesPage() {
  const posts = getAllLegacyPosts();

  return (
    <>
      <JsonLd schema={webPageSchema} />
      <Nav />

      <section className="services-index-hero">
        <div className="services-index-hero-inner">
          <div className="eyebrow faint">
            <span className="eyebrow-rule"></span>
            Resources
          </div>
          <h1>Healthcare analytics, examined.</h1>
          <p>
            Practical perspectives on EHR data, revenue cycle, due diligence, and AI — written for practice operators and healthcare investors.
          </p>
        </div>
      </section>

      <div className="services-index-body">
        <div className="services-index-inner">
          <div className="services-index-grid">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/resources/${post.slug}`}
                className="services-index-card"
              >
                <div className="eyebrow faint" style={{ marginBottom: "0.5rem", fontSize: "0.75rem" }}>
                  {CATEGORY_LABELS[post.category]}
                  <span style={{ marginLeft: "1rem", opacity: 0.6 }}>{post.readingTime}</span>
                </div>
                <div className="services-index-card-title">{post.title}</div>
                <div className="services-index-card-desc">{post.description}</div>
                <div className="services-index-card-link">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  {" · "}
                  {post.author}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <section className="service-cta">
        <div className="service-cta-inner">
          <h2>Want to talk through your data?</h2>
          <p>
            Every engagement starts with a 30-minute discovery call — no commitments, just a clear look at what&apos;s possible with your EHR data.
          </p>
          <a href="https://calendly.com/dev-harinemanagement/30min" target="_blank" rel="noopener noreferrer" className="btn btn-white">Schedule a Discovery Call</a>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
