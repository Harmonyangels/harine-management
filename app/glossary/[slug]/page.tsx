import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import {
  glossaryTerms,
  getTermBySlug,
  getRelatedGlossaryTerms,
} from "@/data/glossary";
import { getServiceBySlug } from "@/data/services";

export const dynamicParams = false;

export function generateStaticParams() {
  return glossaryTerms.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const term = getTermBySlug(slug);
  if (!term) return {};

  return {
    title: `What Is ${term.term}? | Healthcare Analytics Glossary`,
    description: term.shortDefinition,
    alternates: {
      canonical: `/glossary/${slug}`,
    },
    openGraph: {
      title: `${term.term} — Healthcare Analytics Glossary | Harine Management`,
      description: term.shortDefinition,
      url: `https://harinemanagement.com/glossary/${slug}`,
      images: [{ url: "/og-image.jpg" }],
    },
  };
}

export default async function GlossaryTermPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const term = getTermBySlug(slug);
  if (!term) notFound();

  const relatedTerms = getRelatedGlossaryTerms(term.relatedTerms);
  const relatedServices = term.relatedServices
    .map((s) => getServiceBySlug(s))
    .filter(Boolean) as NonNullable<ReturnType<typeof getServiceBySlug>>[];

  const definedTermSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "@id": `https://harinemanagement.com/glossary/${slug}#term`,
    name: term.term,
    description: term.shortDefinition,
    url: `https://harinemanagement.com/glossary/${slug}`,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      "@id": "https://harinemanagement.com/glossary#termset",
      name: "Healthcare Analytics Glossary | Harine Management",
      url: "https://harinemanagement.com/glossary",
    },
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
        name: "Glossary",
        item: "https://harinemanagement.com/glossary",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: term.term,
        item: `https://harinemanagement.com/glossary/${slug}`,
      },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `https://harinemanagement.com/glossary/${slug}#webpage`,
    name: `What Is ${term.term}? | Healthcare Analytics Glossary`,
    description: term.shortDefinition,
    url: `https://harinemanagement.com/glossary/${slug}`,
    inLanguage: "en-US",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".term-short-definition", ".term-full-definition"],
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://harinemanagement.com/#organization",
      name: "Harine Management",
    },
    breadcrumb: {
      "@id": `https://harinemanagement.com/glossary/${slug}#breadcrumb`,
    },
    about: {
      "@id": `https://harinemanagement.com/glossary/${slug}#term`,
    },
  };

  return (
    <>
      <JsonLd schema={definedTermSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={webPageSchema} />
      <Nav />

      {/* HERO */}
      <section className="service-hero">
        <div className="service-hero-inner">
          <div className="eyebrow faint">
            <span className="eyebrow-rule"></span>
            <Link href="/glossary" style={{ color: "inherit", textDecoration: "none" }}>
              Glossary
            </Link>
          </div>
          <h1>{term.term}</h1>

          <div className="definition-block term-short-definition">
            <p>{term.shortDefinition}</p>
          </div>
        </div>
      </section>

      {/* FULL DEFINITION */}
      <section className="service-section">
        <div className="service-section-inner">
          <h2 className="service-section-title">Full definition</h2>
          <p className="term-full-definition">{term.fullDefinition}</p>
        </div>
      </section>

      {/* RELATED TERMS */}
      {relatedTerms.length > 0 && (
        <section className="related-services">
          <div className="related-services-inner">
            <h2>Related terms</h2>
            <div className="related-services-grid">
              {relatedTerms.map((rt) => (
                <Link
                  key={rt.slug}
                  href={`/glossary/${rt.slug}`}
                  className="related-service-card"
                >
                  <div className="related-service-card-title">{rt.term}</div>
                  <div className="related-service-card-desc">
                    {rt.shortDefinition}
                  </div>
                  <span className="related-service-card-arrow">
                    Read definition →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RELATED SERVICES */}
      {relatedServices.length > 0 && (
        <section className="related-services" style={{ background: "var(--white)" }}>
          <div className="related-services-inner">
            <h2>Related services</h2>
            <div className="related-services-grid">
              {relatedServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="related-service-card"
                >
                  <div className="related-service-card-title">{s.title}</div>
                  <div className="related-service-card-desc">
                    {s.metaDescription}
                  </div>
                  <span className="related-service-card-arrow">
                    Learn more →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="service-cta">
        <div className="service-cta-inner">
          <h2>See these metrics in your own data.</h2>
          <p>
            Every engagement starts with a 30-minute discovery call — we&apos;ll look at your EHR and show you exactly where the gaps are.
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
