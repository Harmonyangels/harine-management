import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { getServicesByAudience } from "@/data/services";

export const metadata: Metadata = {
  title: "Private Equity Healthcare Analytics",
  description:
    "Private equity healthcare analytics from Harine Management — EHR-level due diligence surfacing provider risk, payer mix trajectory, and revenue integrity.",
  alternates: {
    canonical: "https://harinemanagement.com/for/investors",
  },
  openGraph: {
    title: "Private Equity Healthcare Analytics | Harine Management",
    description:
      "EHR-level due diligence analytics for PE healthcare acquisitions — provider concentration risk, payer mix trajectory, and revenue integrity from actual practice data.",
    url: "https://harinemanagement.com/for/investors",
    images: [{ url: "/og-image.jpg" }],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://harinemanagement.com/for/investors#service",
  name: "Private Equity Healthcare Analytics",
  description:
    "Harine Management provides private equity firms and healthcare investors with EHR-level data analysis of target medical practices — extracting provider concentration risk, payer mix trajectory, and revenue integrity data that management-provided financials do not contain.",
  serviceType: "Healthcare Due Diligence Analytics",
  provider: {
    "@type": "Organization",
    "@id": "https://harinemanagement.com/#organization",
    name: "Harine Management",
    url: "https://harinemanagement.com",
  },
  audience: {
    "@type": "Audience",
    audienceType: "Private Equity Firms and Healthcare Investors",
  },
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  url: "https://harinemanagement.com/for/investors",
};

const investorServices = getServicesByAudience("investors");

const features = [
  {
    title: "EHR-Level Extraction",
    desc: "Encounter data from the practice's actual EHR — not management summaries, not adjusted financials. The source of truth that generates the revenue.",
  },
  {
    title: "Provider Concentration Analysis",
    desc: "Revenue-at-risk modeling for the top 1, 2, and 3 providers at every target. The risk that almost never appears in a management presentation.",
  },
  {
    title: "Payer Mix Trajectory",
    desc: "24-month payer mix trend from raw EHR billing data — direction and velocity of shift, not just a snapshot at the time of LOI.",
  },
  {
    title: "IC-Ready Deliverables",
    desc: "Structured analytical reports built for data rooms and investment committee presentations. Not raw spreadsheets — finished output your deal team can use.",
  },
  {
    title: "5–10 Business Day Turnaround",
    desc: "Analysis delivered in compressed timelines that fit M&A process schedules. Rush engagements available for time-sensitive situations.",
  },
  {
    title: "Post-Acquisition Infrastructure",
    desc: "Analytics infrastructure ready to go live 30 days post-close — baseline KPIs established before the first board meeting, reporting standardized to portfolio cadence.",
  },
];

const tableRows = [
  {
    miss: "Management-prepared revenue summary",
    surface: "CPT-level revenue by provider, payer, and visit type — from raw encounter records",
  },
  {
    miss: "Stated collection rate",
    surface: "Actual collection rate calculated from billing records, with denial rate by payer and CPT code",
  },
  {
    miss: "Provider headcount and credentials",
    surface: "Individual wRVU production by provider — 24-month trend, not a point-in-time snapshot",
  },
  {
    miss: "Payer mix at time of LOI",
    surface: "Payer mix trajectory over 24 months — direction, rate of shift, and margin implication",
  },
  {
    miss: "AR aging summary (self-reported)",
    surface: "AR aging by provider, payer, and 30/60/90/120+ day bucket — derived directly from the EHR",
  },
  {
    miss: "Total annual visit count",
    surface: "Volume by location, provider, visit type, and day of week — with trend and seasonality",
  },
  {
    miss: "Revenue per provider (blended)",
    surface: "Net revenue per visit by CPT code — adjusted for contractual allowances and write-offs",
  },
  {
    miss: "Provider attrition (as disclosed)",
    surface: "Provider concentration risk — revenue-at-risk if the top 1, 2, or 3 physicians leave",
  },
  {
    miss: "Billing company performance summary",
    surface: "Independent EHR-derived denial rate versus the billing company's own reported performance",
  },
];

export default function ForInvestorsPage() {
  return (
    <>
      <JsonLd schema={serviceSchema} />
      <Nav />

      {/* HERO */}
      <section className="service-hero">
        <div className="service-hero-inner">
          <div className="eyebrow faint">
            <span className="eyebrow-rule"></span>
            For PE &amp; Investors
          </div>
          <h1>Healthcare due diligence analytics for private equity.</h1>
          <p className="service-subhead">
            EHR-level data analysis of target medical practices — provider concentration risk, payer mix trajectory, and revenue integrity from actual encounter data. Delivered in 5 to 10 business days.
          </p>

          <div className="definition-block">
            <p>
              Harine Management provides private equity firms and healthcare investors with EHR-level data analysis of target medical practices — extracting encounter-level volume, revenue trends, provider concentration risk, payer mix trajectory, and AR aging directly from the practice&apos;s EHR rather than from management-provided summaries. The output is structured for data rooms and investment committee presentations and delivered in 5 to 10 business days.
            </p>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="service-section">
        <div className="service-section-inner">
          <h2 className="service-section-title">The due diligence gap in healthcare M&amp;A</h2>
          <p>
            PE firms evaluating medical practices depend primarily on management-provided financials — income statements, AR aging summaries, and stated collection rates that represent what leadership chose to share, not necessarily what the EHR data actually shows. Provider concentration risk — what percentage of revenue walks out the door if one physician retires or leaves — is almost never disclosed in a management presentation in a form that is accurate and auditable.
          </p>
          <br />
          <p>
            Payer mix trajectory — whether the commercial-to-Medicaid ratio has been shifting over the past 24 months, and in which direction — is visible in raw EHR billing data but invisible in a P&amp;L summary. Stated collection rates are often calculated differently than acquirers would calculate them from the same underlying data. And the denial rate your target reports is typically the denial rate their billing company reports about themselves.
          </p>
          <br />
          <p>
            The gap between what a practice reports and what its EHR encounter data actually shows is where deal risk lives. Standard financial due diligence does not reach it.
          </p>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="service-section" style={{ background: "var(--stone-light)" }}>
        <div className="service-section-inner">
          <h2 className="service-section-title">What traditional due diligence misses — and what analytics surfaces</h2>
          <p>
            This is the information gap that EHR-level analysis closes. Every row below represents a real risk category that standard healthcare financial due diligence does not surface from first principles.
          </p>
          <div className="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>What traditional due diligence sees</th>
                  <th>What EHR-level analytics surfaces</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, i) => (
                  <tr key={i}>
                    <td>{row.miss}</td>
                    <td>{row.surface}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="service-section">
        <div className="service-section-inner">
          <h2 className="service-section-title">What we deliver for PE and healthcare investors</h2>
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

      {/* POST-ACQUISITION NOTE */}
      <section className="service-section" style={{ background: "var(--stone-light)" }}>
        <div className="service-section-inner">
          <h2 className="service-section-title">After close: building the measurement layer</h2>
          <p>
            Most medical practice acquisitions close without functioning analytics infrastructure. The practice has been running on tribal knowledge and a relationship with its billing company. Post-close, the PE firm needs operational visibility the practice has never had to provide before.
          </p>
          <br />
          <p>
            Harine Management offers a dedicated post-acquisition service that builds the EHR data pipeline, establishes baseline KPIs, standardizes reporting to portfolio cadence, and stands up early-warning dashboards — targeting operational within 30 days of close. The measurement layer is in place before the first board meeting, giving the value creation plan a baseline to measure against from day one of ownership.
          </p>
          <br />
          <p>
            For firms with multiple healthcare portfolio companies, all holdings can be standardized to the same metric definitions and reporting format — enabling the operations team to review all practices in a single consolidated dashboard.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="related-services">
        <div className="related-services-inner">
          <div className="eyebrow">
            <span className="eyebrow-rule"></span>
            Investor Services
          </div>
          <h2 style={{ marginTop: "16px" }}>Services for PE firms and healthcare investors</h2>
          <div className="related-services-grid" style={{ marginTop: "28px" }}>
            {investorServices.map((s) => (
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
          <h2>Running a process? Let&apos;s talk data.</h2>
          <p>
            Most engagements begin with a 20-minute conversation about the target and the timeline. We will tell you exactly what can be extracted and what the analysis will show before any engagement is confirmed.
          </p>
          <a href="https://calendly.com/dev-harinemanagement/30min" target="_blank" rel="noopener noreferrer" className="btn btn-white">Start the Conversation</a>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
