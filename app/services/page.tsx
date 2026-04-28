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
    canonical: "https://harinemanagement.com/services",
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
          <a href="/#contact" className="btn btn-white">Schedule a Discovery Call</a>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
