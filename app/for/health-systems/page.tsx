import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Health System Analytics Consulting",
  description:
    "Analytics infrastructure for health systems and MSOs managing physician practice networks — standardized dashboards across every affiliated practice, updated daily.",
  alternates: {
    canonical: "https://harinemanagement.com/for/health-systems",
  },
  openGraph: {
    title: "Health System Analytics Consulting | Harine Management",
    description:
      "Analytics infrastructure for health systems and MSOs managing physician practice networks — standardized dashboards across every affiliated practice, updated daily.",
    url: "https://harinemanagement.com/for/health-systems",
    images: [{ url: "/og-image.jpg" }],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://harinemanagement.com/for/health-systems#service",
  name: "Health System Analytics Consulting",
  description:
    "Harine Management builds analytics infrastructure for health systems and management services organizations that operate physician practice networks, delivering standardized daily dashboards across every affiliated practice.",
  serviceType: "Healthcare Data Analytics",
  provider: {
    "@type": "Organization",
    "@id": "https://harinemanagement.com/#organization",
    name: "Harine Management",
    url: "https://harinemanagement.com",
  },
  audience: {
    "@type": "Audience",
    audienceType: "Health Systems and Management Services Organizations",
  },
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  url: "https://harinemanagement.com/for/health-systems",
};

const features = [
  {
    title: "Cross-Practice Consolidation",
    desc: "One dashboard for the full practice network — same metric definitions, same daily refresh cadence, across every affiliated site regardless of which EHR each runs.",
  },
  {
    title: "EHR Heterogeneity Support",
    desc: "Connect practices running Athenahealth, eClinicalWorks, or other EHR platforms to a single analytics layer — data is normalized to common definitions before it reaches the dashboard.",
  },
  {
    title: "Provider Network Benchmarking",
    desc: "Every provider in the network compared against MGMA national benchmarks and internal network peers on wRVU productivity, new-to-established ratio, and revenue per visit.",
  },
  {
    title: "Practice-Level Revenue Monitoring",
    desc: "Revenue cycle health by practice — collection rates, AR aging, and denial rates tracked at the individual site level so problems don't hide in network averages.",
  },
  {
    title: "Standardized Network Reporting",
    desc: "Consistent reporting across all affiliated practices in the network — no more reconciling inconsistent spreadsheets submitted on different schedules by different practice managers.",
  },
  {
    title: "Early-Warning KPI Alerts",
    desc: "Threshold alerts fire when any practice's key metrics deteriorate below defined targets — the system flags problems before the practice manager escalates them.",
  },
];

const clients = [
  {
    title: "Health systems operating employed physician practices",
    desc: "Systems that have acquired or employ physician practices across multiple specialties and locations and need consolidated performance visibility across the network without manual reporting from each site.",
  },
  {
    title: "Management services organizations (MSOs)",
    desc: "MSOs that provide administrative, operational, or management services to independent physician practices and need centralized analytics infrastructure to monitor network performance and identify practice-level gaps.",
  },
  {
    title: "Large practice management companies",
    desc: "Organizations that manage multiple physician group practices — often across different EHR platforms — and need standardized reporting that enables genuine apples-to-apples comparison across the portfolio.",
  },
];

const services = [
  {
    href: "/services/practice-analytics-system",
    title: "Practice Analytics System",
    desc: "End-to-end EHR analytics connecting Athenahealth and eClinicalWorks to Power BI executive dashboards — the core infrastructure deployed for each affiliated practice.",
  },
  {
    href: "/services/provider-productivity-analytics",
    title: "Provider Productivity Analytics",
    desc: "Daily wRVU tracking and MGMA benchmarking across every provider in the network — with role-secured individual provider access and network-level cohort views for leadership.",
  },
  {
    href: "/services/revenue-cycle-analytics",
    title: "Revenue Cycle Analytics",
    desc: "AR aging, collection rates, and denial rates by practice and payer — surfaced at the site level so revenue cycle problems at individual practices are visible before they compound network-wide.",
  },
  {
    href: "/specialties/multi-location-practice-analytics",
    title: "Multi-Location Practice Analytics",
    desc: "Cross-location benchmarking, consolidated EHR reporting across heterogeneous platforms, and provider performance comparison across sites on identical metric definitions.",
  },
];

export default function ForHealthSystemsPage() {
  return (
    <>
      <JsonLd schema={serviceSchema} />
      <Nav />

      {/* HERO */}
      <section className="service-hero">
        <div className="service-hero-inner">
          <div className="eyebrow faint">
            <span className="eyebrow-rule"></span>
            For Health Systems &amp; MSOs
          </div>
          <h1>Analytics infrastructure for health systems and practice networks.</h1>
          <p className="service-subhead">
            Consolidated visibility into every affiliated practice — standardized metrics, daily EHR data refresh, and cross-practice benchmarking across the full network.
          </p>

          <div className="definition-block">
            <p>
              Harine Management builds analytics infrastructure for health systems and management services organizations that operate physician practice networks — connecting EHR data across every affiliated practice to a centralized Power BI dashboard with standardized, daily-updated metrics. System leadership gets consolidated visibility into volume, revenue, provider productivity, and operational performance across the full practice network without assembling reports manually.
            </p>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="service-section">
        <div className="service-section-inner">
          <h2 className="service-section-title">The network visibility problem</h2>
          <p>
            Health systems that operate or acquire physician practices rarely have a clean, consolidated view of how those practices are actually performing. Each practice may run a different EHR or a different instance of the same platform. Each submits different spreadsheets to different administrators. And the system-level view is assembled monthly by someone reconciling inconsistent reports from sites that define the same metrics differently.
          </p>
          <br />
          <p>
            By the time network-level leadership sees the performance data, it is three to four weeks old, the metric definitions are inconsistent across practices, and there is no reliable way to identify which practices are underperforming or which operational patterns are driving the variance. Volume problems at an individual site are invisible until they show up in the network's quarterly revenue. Provider productivity gaps accumulate silently across the network until compensation review forces the conversation.
          </p>
          <br />
          <p>
            Harine Management builds the analytics infrastructure that connects every practice in the network to a single source of truth — standardized metric definitions, daily EHR data refresh, and cross-practice benchmarking on identical terms. Network leadership can see every practice, compare every site, and identify every underperformance gap from a single dashboard, without waiting for individual practice managers to submit their own reports.
          </p>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="service-section" style={{ background: "var(--stone-light)" }}>
        <div className="service-section-inner">
          <h2 className="service-section-title">What we build for health systems and MSOs</h2>
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

      {/* STANDARDIZATION NOTE */}
      <section className="service-section">
        <div className="service-section-inner">
          <h2 className="service-section-title">The standardization problem — and how we solve it</h2>
          <p>
            The hardest part of building analytics across a practice network is not extracting the data — it is defining metrics consistently enough that comparisons across sites are meaningful. A collection rate calculated from gross charges at one practice and from adjusted charges at another is not a valid comparison. wRVU productivity that includes administrative encounters at one site and excludes them at another cannot be benchmarked against MGMA data cleanly.
          </p>
          <br />
          <p>
            Harine Management builds each practice&apos;s analytics to a common schema — same metric definitions, same calculation logic, same EHR extraction methodology — so that the numbers that appear in the network dashboard are genuinely comparable. The standardization work happens at the data layer, not in the reporting layer, which means it is durable: when a new practice is added to the network, it adopts the same schema from day one rather than requiring a manual reconciliation effort.
          </p>
          <ul className="deliverables-list" style={{ marginTop: "24px" }}>
            <li>Common wRVU calculation applied uniformly across all practices and EHR platforms</li>
            <li>Consistent payer class mapping: commercial, Medicare, Medicaid, self-pay defined identically across the network</li>
            <li>AR aging buckets calculated from the same date logic regardless of which EHR each site uses</li>
            <li>Collection rate defined as net collections against adjusted charges — not gross — across all practices</li>
            <li>Provider volume counted from completed encounters only — excluding cancelled and no-show appointments</li>
          </ul>
        </div>
      </section>

      {/* WHO WE WORK WITH */}
      <section className="service-section" style={{ background: "var(--stone-light)" }}>
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
            Relevant Services
          </div>
          <h2 style={{ marginTop: "16px" }}>Services deployed across practice networks</h2>
          <div className="related-services-grid" style={{ marginTop: "28px" }}>
            {services.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="related-service-card"
              >
                <div className="related-service-card-title">{s.title}</div>
                <div className="related-service-card-desc">{s.desc}</div>
                <span className="related-service-card-arrow">Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="service-cta">
        <div className="service-cta-inner">
          <h2>Let&apos;s talk about your network.</h2>
          <p>
            Every engagement starts with a conversation about the network — how many practices, which EHR platforms, and what leadership actually needs to see. We&apos;ll tell you exactly what&apos;s possible before any commitment.
          </p>
          <a href="/#contact" className="btn btn-white">Schedule a Discovery Call</a>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
