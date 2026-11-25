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
import { getServiceBySlug, isListedService } from "@/data/services";

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
  const relatedServices = term.relatedServices.flatMap((slugName) => {
    const service = getServiceBySlug(slugName);
    return service && isListedService(service) ? [service] : [];
  });

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
            Book a 30-minute call. The Reporting Diagnostic is $2,500, and free for our first 10 clients.
          </p>
          <a href="https://calendly.com/dev-harinemanagement/30min" target="_blank" rel="noopener noreferrer" className="btn btn-white">
            Book a 30-minute call
          </a>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
