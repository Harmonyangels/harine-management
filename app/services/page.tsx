import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { services, getServicesByAudience } from "@/data/services";

export const metadata: Metadata = {
  title: "Healthcare Analytics Services",
  description:
    "Explore Harine Management's full suite of healthcare data analytics services for medical practices and private equity firms — from EHR pipelines to acquisition due diligence.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Healthcare Analytics Services | Harine Management",
    description:
      "EHR analytics, revenue cycle visibility, provider productivity reporting, and PE due diligence — built for medical practices and healthcare investors.",
    url: "https://harinemanagement.com/services",
    images: [{ url: "/og-image.jpg" }],
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://harinemanagement.com/services#webpage",
  name: "Healthcare Analytics Services | Harine Management",
  url: "https://harinemanagement.com/services",
  description:
    "Full suite of healthcare data analytics services for medical practices and private equity firms.",
  inLanguage: "en-US",
  publisher: {
    "@type": "Organization",
    "@id": "https://harinemanagement.com/#organization",
    name: "Harine Management",
  },
  hasPart: services.map((s) => ({
    "@type": "Service",
    "@id": `https://harinemanagement.com/services/${s.slug}#service`,
    name: s.title,
    url: `https://harinemanagement.com/services/${s.slug}`,
  })),
};

const practiceServices = getServicesByAudience("practices");
const investorServices = getServicesByAudience("investors");

export default function ServicesPage() {
  return (
    <>
      <JsonLd schema={webPageSchema} />
      <Nav />

      <section className="services-index-hero">
        <div className="services-index-hero-inner">
          <div className="eyebrow faint">
            <span className="eyebrow-rule"></span>
            What We Build
          </div>
          <h1>Healthcare analytics services, end to end.</h1>
          <p>
            From daily EHR pipelines to pre-close due diligence — every service is designed to give the right people the right data at the right time.
          </p>
        </div>
      </section>

      <div className="services-index-body">
        <div className="services-index-inner">

          <div className="services-audience-group">
            <div className="services-audience-label">Operations &amp; Advisory</div>
            <div className="services-index-grid">

              <div className="services-index-card">
                <div className="services-index-card-title">Practice Operational Diagnostic</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '6px 0 14px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--crimson)' }}>$1,500–$3,000 flat</span>
                  <span style={{ fontSize: '10px', fontWeight: 500, background: 'rgba(184,48,48,0.08)', color: 'var(--crimson)', border: '1px solid rgba(184,48,48,0.15)', borderRadius: '20px', padding: '3px 10px', letterSpacing: '0.06em' }}>3–5 day turnaround</span>
                </div>
                <div className="services-index-card-desc">We review your existing reports, identify revenue leakage, flag workflow problems, and hand you a written findings summary with prioritized next steps. No dashboard required.</div>
                <a href="/score" className="services-index-card-link">Learn more →</a>
              </div>

              <div className="services-index-card">
                <div className="services-index-card-title">RCM Fix &amp; Revenue Recovery</div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--crimson)', margin: '6px 0 14px' }}>$3,000–$8,000</div>
                <div className="services-index-card-desc">Hands-on denial analysis, credentialing gap review, payer contract assessment, and remediation support. Delivered by billing specialists with direct eClinicalWorks and Athena Health experience.</div>
                <a href="/score" className="services-index-card-link">Learn more →</a>
              </div>

              <div className="services-index-card">
                <div className="services-index-card-title">Turnkey Practice Startup</div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--crimson)', margin: '6px 0 14px' }}>$10,000–$25,000</div>
                <div className="services-index-card-desc">Full operational launch package for new practices or new locations. Covers EMR configuration, payer credentialing, hiring templates, billing workflow build, and staff training framework.</div>
                <a href="https://calendly.com/dev-harinemanagement/30min" target="_blank" rel="noopener noreferrer" className="services-index-card-link">Learn more →</a>
              </div>

            </div>
          </div>

          <div className="services-audience-group">
            <div className="services-audience-label">For Medical Practices</div>
            <div className="services-index-grid">
              {practiceServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="services-index-card"
                >
                  <div className="services-index-card-title">{service.title}</div>
                  <div className="services-index-card-desc">{service.metaDescription}</div>
                  <div className="services-index-card-link">Learn more →</div>
                </Link>
              ))}
            </div>
          </div>

          <div className="services-audience-group">
            <div className="services-audience-label">For PE &amp; Investors</div>
            <div className="services-index-grid">
              {investorServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="services-index-card"
                >
                  <div className="services-index-card-title">{service.title}</div>
                  <div className="services-index-card-desc">{service.metaDescription}</div>
                  <div className="services-index-card-link">Learn more →</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="service-cta">
        <div className="service-cta-inner">
          <h2>Not sure which service fits?</h2>
          <p>
            Most engagements start with a 30-minute discovery call. We&apos;ll look at what&apos;s in your EHR and tell you exactly what&apos;s possible before any commitment.
          </p>
          <a href="https://calendly.com/dev-harinemanagement/30min" target="_blank" rel="noopener noreferrer" className="btn btn-white">Schedule a Discovery Call</a>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
