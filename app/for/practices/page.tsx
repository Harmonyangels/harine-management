import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { getServicesByAudience } from "@/data/services";

export const metadata: Metadata = {
  title: "Healthcare Data Analytics for Medical Practices",
  description:
    "Daily EHR-to-Power BI dashboards for medical practices — patient volume, revenue cycle, provider productivity, and payer mix. No manual exports. No IT staff needed.",
  alternates: {
    canonical: "https://harinemanagement.com/for/practices",
  },
  openGraph: {
    title: "Healthcare Data Analytics for Medical Practices | Harine Management",
    description:
      "Daily EHR-to-Power BI dashboards for medical practices — patient volume, revenue cycle, provider productivity, and payer mix. No manual exports. No IT staff needed.",
    url: "https://harinemanagement.com/for/practices",
    images: [{ url: "/og-image.jpg" }],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://harinemanagement.com/for/practices#service",
  name: "Healthcare Data Analytics for Medical Practices",
  description:
    "Harine Management builds EHR-to-dashboard analytics infrastructure for medical practices — daily-updated Power BI dashboards covering patient volume, revenue cycle, provider productivity, and payer mix without manual exports.",
  serviceType: "Healthcare Data Analytics",
  provider: {
    "@type": "Organization",
    "@id": "https://harinemanagement.com/#organization",
    name: "Harine Management",
    url: "https://harinemanagement.com",
  },
  audience: {
    "@type": "Audience",
    audienceType: "Medical Practices",
  },
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  url: "https://harinemanagement.com/for/practices",
};

const practiceServices = getServicesByAudience("practices");

const features = [
  {
    title: "EHR Data Pipelines",
    desc: "Direct connections to Athenahealth, eClinicalWorks, and other major EHR platforms — no manual exports, no scheduled report runs.",
  },
  {
    title: "Daily Power BI Dashboards",
    desc: "Executive-ready dashboards that refresh every morning before the first meeting of the day — built by Harine Management, maintained ongoing.",
  },
  {
    title: "Provider Productivity Tracking",
    desc: "Individual wRVU production against goal and MGMA benchmarks — daily visibility per provider, not a quarterly surprise at compensation review.",
  },
  {
    title: "Revenue Cycle Monitoring",
    desc: "AR aging, collection rates, and denial rates by payer and CPT code — surfaced in days, not at month-end when the damage is already done.",
  },
  {
    title: "Payer Mix Intelligence",
    desc: "Commercial, Medicare, Medicaid, and self-pay split tracked over time — see mix shifts before they compress margin and reach the income statement.",
  },
  {
    title: "Zero IT Overhead",
    desc: "Harine Management builds and maintains the full data infrastructure. Your team opens the dashboard. That is the entire workflow on the practice side.",
  },
];

const clients = [
  {
    title: "Multi-location medical groups with 3 or more providers",
    desc: "Groups across multiple sites who are still reconciling location-level performance from spreadsheets and email reports — and whose leadership is making staffing and scheduling decisions on data that is two to three weeks old.",
  },
  {
    title: "Practices making the move from manual EHR exports",
    desc: "Practices where one person runs the reports, exports to Excel, and distributes a summary — and where that workflow is the single point of failure for leadership visibility into the business.",
  },
  {
    title: "Practices entering value-based contracts or PE ownership",
    desc: "Groups whose reimbursement is increasingly tied to quality metrics, provider productivity, and payer mix performance — and who need the data infrastructure to monitor and demonstrate those outcomes.",
  },
];

export default function ForPracticesPage() {
  return (
    <>
      <JsonLd schema={serviceSchema} />
      <Nav />

      {/* HERO */}
      <section className="service-hero">
        <div className="service-hero-inner">
          <div className="eyebrow faint">
            <span className="eyebrow-rule"></span>
            For Medical Practices
          </div>
          <h1>Healthcare data analytics built for medical practices.</h1>
          <p className="service-subhead">
            The data already exists in your EHR. We connect it to a dashboard your CMO checks before their first meeting — and keep it running so your team never has to.
          </p>

          <div className="definition-block">
            <p>
              Harine Management builds data analytics systems for medical practices that connect directly to EHR platforms — including Athenahealth and eClinicalWorks — and deliver executive dashboards updated daily with patient volume, revenue, provider productivity, and payer mix. Every system is built and maintained by Harine Management, requiring no internal data team or IT resources from the practice.
            </p>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="service-section">
        <div className="service-section-inner">
          <h2 className="service-section-title">The data problem every practice has</h2>
          <p>
            Medical practice leadership makes daily operational decisions — scheduling, staffing, capacity planning, provider management — on data that is two to three weeks old, assembled manually by someone who exports from the EHR and pastes it into a spreadsheet. By the time that summary reaches the right desk, the window for corrective action has already closed.
          </p>
          <br />
          <p>
            The EHR contains everything needed to run the practice intelligently. Patient volume by provider and location. Collection rates by payer. AR aging buckets. Provider wRVU production against goal. Denial rates by CPT code. Every signal that matters is in the system — but native EHR reporting is too fragmented, too slow, and too dependent on a person running a report for the information to surface when it is still actionable.
          </p>
          <br />
          <p>
            Harine Management solves the extraction and presentation problem. We connect your EHR to a dashboard your leadership actually opens every morning — and we keep it running on an ongoing basis so the data is always current and the workflow never depends on a single person remembering to pull a report.
          </p>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="service-section" style={{ background: "var(--stone-light)" }}>
        <div className="service-section-inner">
          <h2 className="service-section-title">What we build for practices</h2>
          <div className="audience-features">
            {features.map((f, i) => (
              <div key={i} className="audience-feature">
                <div className="audience-feature-title">{f.title}</div>
                <div className="audience-feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE WORK WITH */}
      <section className="service-section">
        <div className="service-section-inner">
          <h2 className="service-section-title">Who we work with</h2>
          <div className="audience-clients">
            {clients.map((c, i) => (
              <div key={i} className="audience-client">
                <div className="audience-client-title">{c.title}</div>
                <div className="audience-client-desc">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="related-services">
        <div className="related-services-inner">
          <div className="eyebrow">
            <span className="eyebrow-rule"></span>
            Practice Services
          </div>
          <h2 style={{ marginTop: "16px" }}>Services built for medical practices</h2>
          <div className="related-services-grid" style={{ marginTop: "28px" }}>
            {practiceServices.map((s) => (
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

      {/* CTA */}
      <section className="service-cta">
        <div className="service-cta-inner">
          <h2>See what your EHR data can do.</h2>
          <p>
            Every engagement starts with a 30-minute discovery call. We&apos;ll look at what&apos;s in your EHR and show you exactly what a live dashboard would look like for your practice before any commitment.
          </p>
          <a href="https://calendly.com/dev-harinemanagement/30min" target="_blank" rel="noopener noreferrer" className="btn btn-white">Book a Discovery Call</a>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
