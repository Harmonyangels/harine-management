import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { specialties, getSpecialtyBySlug } from "@/data/specialties";

export async function generateStaticParams() {
  return specialties.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const specialty = getSpecialtyBySlug(slug);
  if (!specialty) return {};

  return {
    title: specialty.metaTitle,
    description: specialty.metaDescription,
    alternates: {
      canonical: `/specialties/${slug}`,
    },
    openGraph: {
      title: specialty.metaTitle,
      description: specialty.metaDescription,
      url: `https://harinemanagement.com/specialties/${slug}`,
      images: [{ url: "/og-image.jpg" }],
    },
  };
}

function buildServiceSchema(slug: string, specialty: NonNullable<ReturnType<typeof getSpecialtyBySlug>>) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://harinemanagement.com/specialties/${slug}#service`,
    name: specialty.title,
    description: specialty.metaDescription,
    serviceType: "Healthcare Data Analytics",
    provider: {
      "@type": "Organization",
      "@id": "https://harinemanagement.com/#organization",
      name: "Harine Management",
      url: "https://harinemanagement.com",
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    url: `https://harinemanagement.com/specialties/${slug}`,
  };
}

function buildFaqSchema(slug: string, specialty: NonNullable<ReturnType<typeof getSpecialtyBySlug>>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `https://harinemanagement.com/specialties/${slug}#faq`,
    mainEntity: specialty.faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

function getRelatedSpecialties(currentSlug: string) {
  return specialties.filter((s) => s.slug !== currentSlug).slice(0, 3);
}

export default async function SpecialtyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const specialty = getSpecialtyBySlug(slug);

  if (!specialty) notFound();

  const serviceSchema = buildServiceSchema(slug, specialty);
  const faqSchema = buildFaqSchema(slug, specialty);
  const related = getRelatedSpecialties(slug);

  return (
    <>
      <JsonLd schema={serviceSchema} />
      <JsonLd schema={faqSchema} />
      <Nav />

      {/* HERO */}
      <section className="service-hero">
        <div className="service-hero-inner">
          <div className="eyebrow faint">
            <span className="eyebrow-rule"></span>
            Specialty Analytics
          </div>
          <h1>{specialty.heroHeadline}</h1>
          <p className="service-subhead">{specialty.heroSubheadline}</p>

          <div className="definition-block">
            <p>{specialty.definitionBlock}</p>
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="service-section">
        <div className="service-section-inner">
          <div className="outcomes-grid">
            {specialty.outcomes.map((outcome, i) => (
              <div key={i} className="outcome-item">
                <div className="outcome-value">{outcome.value}</div>
                <div className="outcome-label">{outcome.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="service-section">
        <div className="service-section-inner">
          <h2 className="service-section-title">The problem</h2>
          <p>{specialty.problemStatement}</p>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="service-section">
        <div className="service-section-inner">
          <h2 className="service-section-title">What we build</h2>
          <p>{specialty.solutionStatement}</p>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="service-section">
        <div className="service-section-inner">
          <h2 className="service-section-title">What you get</h2>
          <ul className="deliverables-list">
            {specialty.deliverables.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="service-section">
        <div className="service-section-inner">
          <h2 className="service-section-title">Common questions</h2>
          <div className="faq-list">
            {specialty.faqItems.map((item, i) => (
              <div key={i} className="faq-item">
                <div className="faq-question">{item.question}</div>
                <div className="faq-answer">{item.answer}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="service-cta">
        <div className="service-cta-inner">
          <h2>Ready to see what your EHR data can do?</h2>
          <p>
            Every engagement starts with a 30-minute discovery call. No commitments — just a clear look at what&apos;s possible with your data.
          </p>
          <a href="https://calendly.com/dev-harinemanagement/30min" target="_blank" rel="noopener noreferrer" className="btn btn-white">Schedule a Discovery Call</a>
        </div>
      </section>

      {/* RELATED SPECIALTIES */}
      {related.length > 0 && (
        <section className="related-services">
          <div className="related-services-inner">
            <h2>Other specialties we serve</h2>
            <div className="related-services-grid">
              {related.map((s) => (
                <Link
                  key={s.slug}
                  href={`/specialties/${s.slug}`}
                  className="related-service-card"
                >
                  <div className="related-service-card-title">{s.title}</div>
                  <div className="related-service-card-desc">{s.metaDescription}</div>
                  <span className="related-service-card-arrow">Learn more →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </>
  );
}
