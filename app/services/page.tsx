import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { services, getServicesByAudience } from "@/data/services";

export const metadata: Metadata = {
  title: "Medical Practice Analytics Services",
  description:
    "Power BI dashboards for medical practices, athenahealth reporting, revenue cycle analytics, and a $2,500 operational diagnostic. Atlanta healthcare consulting.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Medical Practice Analytics Services | Harine Management",
    description:
      "Power BI dashboards for medical practices, athenahealth reporting, and a $2,500 Practice Operational Diagnostic. Based in Atlanta.",
    url: "https://harinemanagement.com/services",
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

const practiceServices = getServicesByAudience("practices").filter(
  (service) => service.slug !== "practice-operational-diagnostic"
);
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
          <h1>Medical practice analytics, starting with a diagnostic.</h1>
          <p>
            Power BI dashboards from athenahealth and eClinicalWorks, revenue cycle analytics, and diligence for healthcare investors. The diagnostic is the first step.
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
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--crimson)' }}>$2,500 fixed</span>
                  <span style={{ fontSize: '10px', fontWeight: 500, background: 'rgba(184,48,48,0.08)', color: 'var(--crimson)', border: '1px solid rgba(184,48,48,0.15)', borderRadius: '20px', padding: '3px 10px', letterSpacing: '0.06em' }}>Under a week</span>
                </div>
                <div className="services-index-card-desc">A scoped review of reporting, revenue cycle, and operations data. You get a written findings report and a prioritized fix plan. Work can be done under a BAA.</div>
                <Link href="/services/practice-operational-diagnostic" className="services-index-card-link">See the diagnostic →</Link>
              </div>

              <div className="services-index-card">
                <div className="services-index-card-title">RCM Fix &amp; Revenue Recovery</div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--crimson)', margin: '6px 0 14px' }}>Fixed quote after the diagnostic</div>
                <div className="services-index-card-desc">Denial review, credentialing gaps, and payer contract questions, worked in eClinicalWorks and athenahealth. Scope and price are confirmed on the call.</div>
                <a href="https://calendly.com/dev-harinemanagement/30min" target="_blank" rel="noopener noreferrer" className="services-index-card-link">Book a 30-minute call →</a>
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
            Book a 30-minute call at dev@harinemanagement.com. The diagnostic is $2,500 and finished in under a week.
          </p>
          <a href="https://calendly.com/dev-harinemanagement/30min" target="_blank" rel="noopener noreferrer" className="btn btn-white">Book a 30-minute call</a>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
