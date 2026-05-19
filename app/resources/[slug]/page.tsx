import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import {
  getAllLegacyPosts,
  getLegacyPostBySlug,
  getRelatedLegacyPosts,
  getRelatedServices,
  CATEGORY_LABELS,
} from "@/lib/blog";
import RelatedServices from "@/components/RelatedServices";
import { POST_FAQS } from "@/data/postFaqs";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllLegacyPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getLegacyPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/resources/${slug}`,
    },
    openGraph: {
      title: `${post.title} | Harine Management`,
      description: post.description,
      url: `https://harinemanagement.com/resources/${slug}`,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.dateModified ?? post.date,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getLegacyPostBySlug(slug);

  if (!post) notFound();

  const { default: PostContent } = await import(
    `@/content/blog/${slug}.mdx`
  );

  const related = getRelatedLegacyPosts(slug, post.tags, 3);
  const relatedServices = getRelatedServices(slug);
  const faqItems = POST_FAQS[slug] ?? null;

  const faqSchema = faqItems
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `https://harinemanagement.com/resources/${slug}#faq`,
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }
    : null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `https://harinemanagement.com/resources/${slug}#article`,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.dateModified ?? post.date,
    author: {
      "@type": "Person",
      "@id": "https://harinemanagement.com/#devanshu-patel",
      name: post.author,
      url: "https://harinemanagement.com/about",
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://harinemanagement.com/#organization",
      name: "Harine Management",
      logo: {
        "@type": "ImageObject",
        url: "https://harinemanagement.com/brand-assets/logo.png",
      },
    },
    url: `https://harinemanagement.com/resources/${slug}`,
    keywords: post.tags.join(", "),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://harinemanagement.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Resources",
        item: "https://harinemanagement.com/resources",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://harinemanagement.com/resources/${slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd schema={articleSchema} />
      <JsonLd schema={breadcrumbSchema} />
      {faqSchema && <JsonLd schema={faqSchema} />}
      <Nav />

      <article>
        <header className="service-hero">
          <div className="service-hero-inner">
            <div className="eyebrow faint">
              <span className="eyebrow-rule"></span>
              {CATEGORY_LABELS[post.category]}
            </div>
            <h1>{post.title}</h1>
            <p className="service-subhead">{post.description}</p>
            <div className="definition-block" style={{ fontSize: "0.875rem" }}>
              <p>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                {" · "}
                {post.author}
                {" · "}
                {post.readingTime}
              </p>
            </div>
          </div>
        </header>

        <div className="service-section">
          <div className="service-section-inner prose">
            <PostContent />
          </div>
        </div>

        {post.tags.length > 0 && (
          <div className="service-section">
            <div className="service-section-inner">
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="eyebrow faint"
                    style={{ fontSize: "0.75rem" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </article>

      <RelatedServices services={relatedServices} />

      {related.length > 0 && (
        <section className="related-services">
          <div className="related-services-inner">
            <h2>Related reading</h2>
            <div className="related-services-grid">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/resources/${r.slug}`}
                  className="related-service-card"
                >
                  <div
                    className="eyebrow faint"
                    style={{ fontSize: "0.75rem", marginBottom: "0.5rem" }}
                  >
                    {CATEGORY_LABELS[r.category]}
                  </div>
                  <div className="related-service-card-title">{r.title}</div>
                  <div className="related-service-card-desc">
                    {r.description}
                  </div>
                  <span className="related-service-card-arrow">
                    Read more →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="service-cta">
        <div className="service-cta-inner">
          <h2>Ready to see what your EHR data can do?</h2>
          <p>
            Every engagement starts with a 30-minute discovery call — no
            commitments, just a clear look at what&apos;s possible with your
            data.
          </p>
          <a href="https://calendly.com/dev-harinemanagement/30min" target="_blank" rel="noopener noreferrer" className="btn btn-white">
            Schedule a Discovery Call
          </a>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
