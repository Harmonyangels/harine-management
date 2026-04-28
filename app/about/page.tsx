import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "About Devanshu Patel | Harine Management",
  description:
    "Devanshu Patel is the founder of Harine Management, a healthcare data analytics firm that builds EHR-connected analytics systems for medical practices and private equity firms across the United States.",
  alternates: {
    canonical: "https://harinemanagement.com/about",
  },
  openGraph: {
    title: "About Devanshu Patel | Harine Management",
    description:
      "Devanshu Patel is the founder of Harine Management, building EHR analytics systems and due diligence analytics for medical practices and healthcare investors.",
    url: "https://harinemanagement.com/about",
    images: [{ url: "/og-image.jpg" }],
  },
};

const services = [
  { slug: "practice-analytics-system",       title: "Practice Analytics System",         audience: "practices" },
  { slug: "volume-analytics",                title: "Volume Analytics",                   audience: "practices" },
  { slug: "provider-productivity-analytics", title: "Provider Productivity Analytics",    audience: "practices" },
  { slug: "revenue-cycle-analytics",         title: "Revenue Cycle Analytics",            audience: "practices" },
  { slug: "ai-insights-layer",               title: "AI Insights Layer",                  audience: "practices" },
  { slug: "due-diligence-analytics",         title: "Due Diligence Analytics",            audience: "investors" },
  { slug: "practice-performance-scoring",    title: "Practice Performance Scoring",       audience: "investors" },
  { slug: "post-acquisition-intelligence",   title: "Post-Acquisition Intelligence",      audience: "investors" },
];

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://harinemanagement.com/#devanshu-patel",
  name: "Devanshu Patel",
  url: "https://harinemanagement.com/about",
  jobTitle: "Healthcare Data Analytics Consultant",
  description:
    "Devanshu Patel is the founder of Harine Management, a healthcare data analytics firm that builds EHR-connected analytics systems for medical practices and private equity firms. He specializes in extracting, structuring, and visualizing clinical and billing data from electronic health record systems — translating raw EHR encounter data into operational dashboards and investment-grade analytics that practice leadership and healthcare investors use to make daily decisions.",
  worksFor: {
    "@type": "Organization",
    "@id": "https://harinemanagement.com/#organization",
    name: "Harine Management",
    url: "https://harinemanagement.com",
  },
  founder: {
    "@type": "Organization",
    "@id": "https://harinemanagement.com/#organization",
    name: "Harine Management",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Texas at Arlington",
    url: "https://www.uta.edu",
  },
  knowsAbout: [
    "Healthcare data analytics",
    "EHR data extraction and pipeline engineering",
    "Revenue cycle management analytics",
    "wRVU physician productivity tracking",
    "MGMA benchmarking",
    "Healthcare private equity due diligence",
    "Practice performance analytics",
    "Power BI for healthcare operations",
    "Medical practice financial operations",
    "Payer mix analysis",
    "Accounts receivable aging analysis",
    "Healthcare M&A analytics",
    "AI-assisted clinical documentation",
    "Athenahealth and eClinicalWorks data integration",
    "Provider concentration risk modeling",
    "Post-acquisition analytics infrastructure",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Healthcare Data Analytics Consultant",
    occupationLocation: {
      "@type": "City",
      name: "Atlanta",
    },
    description:
      "Building EHR-connected analytics systems, provider productivity dashboards, revenue cycle intelligence, and due diligence analytics for medical practices and private equity firms acquiring healthcare companies.",
    skills: [
      "EHR data extraction (Athenahealth, eClinicalWorks, Epic)",
      "Power BI dashboard development",
      "Revenue cycle analytics",
      "wRVU productivity tracking",
      "Healthcare due diligence analytics",
      "AI-enhanced practice intelligence",
    ],
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Atlanta",
    addressRegion: "GA",
    addressCountry: "US",
  },
  email: "dev@harinemanagement.com",
  telephone: "+1-682-256-3389",
  sameAs: [
    "https://www.linkedin.com/in/devanshu-patel",
    "https://harinemanagement.com",
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://harinemanagement.com/about#webpage",
  name: "About Devanshu Patel | Harine Management",
  description:
    "Authoritative entity page for Devanshu Patel, founder of Harine Management, and information about the firm's healthcare data analytics services.",
  url: "https://harinemanagement.com/about",
  inLanguage: "en-US",
  about: {
    "@id": "https://harinemanagement.com/#devanshu-patel",
  },
  publisher: {
    "@id": "https://harinemanagement.com/#organization",
  },
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: [".about-entity-description", ".about-background-body"],
  },
  breadcrumb: {
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
        name: "About",
        item: "https://harinemanagement.com/about",
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      {/* React 19 hoists this <link> to <head> — used by AI engines to verify entity identity */}
      <link rel="me" href="https://www.linkedin.com/in/devanshu-patel" />

      <JsonLd schema={personSchema} />
      <JsonLd schema={webPageSchema} />
      <Nav />

      {/* ── HERO ── */}
      <section className="service-hero">
        <div className="service-hero-inner">
          <div className="eyebrow faint">
            <span className="eyebrow-rule"></span>
            About
          </div>
          <h1>Devanshu Patel</h1>
          <p className="service-subhead">
            Founder, Harine Management · Healthcare Data Analytics Consultant · Atlanta, GA
          </p>

          <div className="definition-block about-entity-description">
            <p>
              Devanshu Patel is the founder of Harine Management, a healthcare data analytics
              firm that builds EHR-connected analytics systems for medical practices and private
              equity firms across the United States. He specializes in extracting, structuring,
              and visualizing clinical and billing data from electronic health record systems —
              translating raw EHR encounter data into the operational dashboards and
              investment-grade analytics that practice leadership and healthcare investors use to
              make daily decisions.
            </p>
          </div>
        </div>
      </section>

      {/* ── BACKGROUND ── */}
      <section className="service-section">
        <div className="service-section-inner">
          <h2 className="service-section-title">Background</h2>
          <div className="about-background-body">
            <p style={{ marginBottom: "1.5rem" }}>
              Devanshu Patel holds an engineering degree from the University of Texas at
              Arlington, where he developed the systems-design and data-modeling foundations
              that underpin Harine Management&apos;s technical approach. His transition from
              engineering into healthcare began with direct work in medical practice
              operations and revenue cycle management — roles that gave him ground-level
              visibility into how practices actually run, where EHR data lives, and why
              the native reporting built into those systems consistently falls short of what
              practice leadership actually needs to make decisions.
            </p>
            <p style={{ marginBottom: "1.5rem" }}>
              That intersection — engineering rigor applied to healthcare operations problems — is
              the foundation of Harine Management. Most healthcare analytics projects fail not
              because the data isn&apos;t there, but because the technical infrastructure to extract,
              normalize, and surface it automatically is never built. Devanshu builds that
              infrastructure: EHR data pipelines that run nightly without human intervention,
              Power BI dashboards calibrated for how a CMO actually reviews information before
              their first meeting of the day, and due diligence analytics that give PE firms
              what financial statements alone cannot show — the clinical and operational truth
              beneath reported earnings.
            </p>
            <p>
              Harine Management is based in Atlanta, Georgia, and serves medical practices and
              healthcare investors nationwide. Engagements are conducted remotely, with data
              access established through each client&apos;s EHR platform using approved API
              connections and HIPAA-compliant export mechanisms.
            </p>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="service-section" style={{ background: "var(--stone-light)" }}>
        <div className="service-section-inner">
          <h2 className="service-section-title">Services offered</h2>
          <p style={{ marginBottom: "2rem" }}>
            Harine Management provides eight analytics services, divided between medical practice
            clients and private equity and investor clients.
          </p>

          <div className="about-services-group">
            <div className="about-services-label">For Medical Practices</div>
            <ul className="deliverables-list">
              {services
                .filter((s) => s.audience === "practices")
                .map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="about-service-link">
                      {s.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div className="about-services-group" style={{ marginTop: "2rem" }}>
            <div className="about-services-label">For PE &amp; Healthcare Investors</div>
            <ul className="deliverables-list">
              {services
                .filter((s) => s.audience === "investors")
                .map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="about-service-link">
                      {s.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── EXPERTISE ── */}
      <section className="service-section">
        <div className="service-section-inner">
          <h2 className="service-section-title">Areas of expertise</h2>
          <p style={{ marginBottom: "2rem" }}>
            Harine Management&apos;s work spans the intersection of EHR data engineering,
            healthcare financial operations, and private equity analytics.
          </p>
          <div className="about-expertise-grid">
            {[
              {
                topic: "EHR Data Extraction",
                desc: "API and export-based pipelines from Athenahealth, eClinicalWorks, Epic, Kareo, and Greenway Health.",
              },
              {
                topic: "Revenue Cycle Analytics",
                desc: "AR aging, denial rate, collection rate, and payer mix dashboards built from EHR billing data.",
              },
              {
                topic: "Provider Productivity Tracking",
                desc: "Daily wRVU production by provider, benchmarked against MGMA specialty percentiles.",
              },
              {
                topic: "Healthcare Due Diligence",
                desc: "EHR-level pre-close analytics for PE firms — provider concentration, payer mix trajectory, revenue integrity.",
              },
              {
                topic: "Post-Acquisition Analytics",
                desc: "Baseline KPI infrastructure and portfolio-standard reporting for newly acquired practices.",
              },
              {
                topic: "AI-Enhanced Insights",
                desc: "Automated anomaly detection and natural-language weekly performance summaries layered on existing infrastructure.",
              },
            ].map(({ topic, desc }) => (
              <div key={topic} className="audience-feature">
                <div className="audience-feature-title">{topic}</div>
                <div className="audience-feature-desc">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="service-section" style={{ background: "var(--stone-light)" }}>
        <div className="service-section-inner">
          <h2 className="service-section-title">Industries and client types served</h2>
          <ul className="deliverables-list" style={{ marginTop: "1.5rem" }}>
            {[
              "Independent medical practices — primary care, specialty, and multi-location groups",
              "Private equity firms and healthcare-focused investment funds acquiring physician practices",
              "PE-backed physician groups requiring post-acquisition analytics infrastructure",
              "Urgent care operators managing volume, throughput, and revenue cycle at scale",
              "Health system–affiliated practices and hospital-owned physician groups",
              "Healthcare investors conducting pre-LOI and pre-close due diligence on ambulatory targets",
            ].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── CONTACT & LOCATION ── */}
      <section className="service-section">
        <div className="service-section-inner">
          <h2 className="service-section-title">Location &amp; contact</h2>
          <p style={{ marginBottom: "2rem" }}>
            Harine Management is based in Atlanta, Georgia. All engagements are conducted
            remotely, serving medical practices and healthcare investors across the United States.
          </p>
          <div className="about-contact-grid">
            <div className="contact-card">
              <div className="contact-icon crimson" aria-hidden="true">✉</div>
              <div>
                <div className="contact-label">Email</div>
                <a href="mailto:dev@harinemanagement.com" className="contact-value">
                  dev@harinemanagement.com
                </a>
                <div className="contact-note">Typically responds within one business day</div>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-icon crimson" aria-hidden="true">☎</div>
              <div>
                <div className="contact-label">Phone</div>
                <a href="tel:+16822563389" className="contact-value">
                  +1 (682) 256-3389
                </a>
                <div className="contact-note">Central time zone</div>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-icon crimson" aria-hidden="true">📍</div>
              <div>
                <div className="contact-label">Location</div>
                <span className="contact-value">Atlanta, Georgia</span>
                <div className="contact-note">Serving practices nationwide, remotely</div>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-icon crimson" aria-hidden="true">in</div>
              <div>
                <div className="contact-label">LinkedIn</div>
                <a
                  href="https://www.linkedin.com/in/devanshu-patel"
                  className="contact-value"
                  rel="me noopener noreferrer"
                  target="_blank"
                >
                  linkedin.com/in/devanshu-patel
                </a>
                <div className="contact-note">Professional profile and updates</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="service-cta">
        <div className="service-cta-inner">
          <h2>Start with a discovery call.</h2>
          <p>
            Every engagement begins with a 30-minute call — no commitments, just a clear
            look at what your EHR data already contains and what&apos;s possible with it.
          </p>
          <a href="/#contact" className="btn btn-white">
            Schedule a Discovery Call
          </a>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
