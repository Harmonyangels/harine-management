import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { services, getServiceBySlug } from "@/data/services";

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical: `https://harinemanagement.com/services/${slug}`,
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `https://harinemanagement.com/services/${slug}`,
      images: [{ url: "/og-image.jpg" }],
    },
  };
}

function buildServiceSchema(slug: string, service: ReturnType<typeof getServiceBySlug>) {
  if (!service) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://harinemanagement.com/services/${slug}#service`,
    name: service.title,
    description: service.metaDescription,
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
    url: `https://harinemanagement.com/services/${slug}`,
  };
}

function buildFaqSchema(slug: string, service: ReturnType<typeof getServiceBySlug>) {
  if (!service) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `https://harinemanagement.com/services/${slug}#faq`,
    mainEntity: service.faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

function getRelatedServices(currentSlug: string, currentAudience: string) {
  const sameAudience = services.filter(
    (s) => s.slug !== currentSlug && s.targetAudience === currentAudience
  );
  const otherAudience = services.filter(
    (s) => s.slug !== currentSlug && s.targetAudience !== currentAudience
  );
  return [...sameAudience, ...otherAudience].slice(0, 3);
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  const serviceSchema = buildServiceSchema(slug, service);
  const faqSchema = buildFaqSchema(slug, service);
  const related = getRelatedServices(slug, service.targetAudience);

  return (
    <>
      {serviceSchema && <JsonLd schema={serviceSchema} />}
      {faqSchema && <JsonLd schema={faqSchema} />}
      <Nav />

      {/* HERO */}
      <section className="service-hero">
        <div className="service-hero-inner">
          <div className="eyebrow faint">
            <span className="eyebrow-rule"></span>
            {service.targetAudience === "practices" ? "For Medical Practices" : "For PE & Investors"}
          </div>
          <h1>{service.heroHeadline}</h1>
          <p className="service-subhead">{service.heroSubheadline}</p>

          <div className="definition-block">
            <p>{service.definitionBlock}</p>
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="service-section">
        <div className="service-section-inner">
          <div className="outcomes-grid">
            {service.outcomes.map((outcome, i) => (
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
          <p>{service.problemStatement}</p>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="service-section">
        <div className="service-section-inner">
          <h2 className="service-section-title">What we build</h2>
          <p>{service.solutionStatement}</p>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="service-section">
        <div className="service-section-inner">
          <h2 className="service-section-title">What you get</h2>
          <ul className="deliverables-list">
            {service.deliverables.map((item, i) => (
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
            {service.faqItems.map((item, i) => (
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
          <a href="/#contact" className="btn btn-white">Schedule a Discovery Call</a>
        </div>
      </section>

      {/* RELATED SERVICES */}
      {related.length > 0 && (
        <section className="related-services">
          <div className="related-services-inner">
            <h2>Related services</h2>
            <div className="related-services-grid">
              {related.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
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
