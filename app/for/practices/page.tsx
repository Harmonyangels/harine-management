import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { BOOK_CALL_HREF, BOOK_CALL_LABEL } from "@/lib/contact";
import {
  CORE_BUILD_PRICE,
  CORE_BUILD_PRICE_FIVE_PLUS,
  DIAGNOSTIC_FOUNDING,
  DIAGNOSTIC_LIST_PRICE,
  RETAINER_PRICE,
} from "@/lib/offer";

export const metadata: Metadata = {
  title: "Power BI Dashboards for Outpatient Practices",
  description:
    "For independent and physician-owned outpatient groups on athenahealth or eClinicalWorks. Export the reports you already run, drop them in SharePoint, and Power BI dashboards refresh.",
  alternates: { canonical: "/for/practices" },
  openGraph: {
    title: "Power BI Dashboards for Outpatient Practices | Harine Management",
    description:
      "Three or more locations, especially five or more, on athenahealth or eClinicalWorks. No IT project and no EMR-vendor integration.",
    url: "https://harinemanagement.com/for/practices",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://harinemanagement.com/for/practices#service",
  name: "Power BI dashboards for outpatient practices",
  description:
    "Harine Management builds Power BI dashboards from unchanged athenahealth or eClinicalWorks report exports dropped into the practice's SharePoint folder. Power Automate refreshes the dashboards when a new file lands.",
  serviceType: "Healthcare Reporting",
  provider: {
    "@type": "Organization",
    "@id": "https://harinemanagement.com/#organization",
    name: "Harine Management LLC",
    url: "https://harinemanagement.com",
  },
  audience: {
    "@type": "Audience",
    audienceType: "Independent and physician-owned outpatient groups",
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Southeast United States",
  },
  url: "https://harinemanagement.com/for/practices",
};

const steps = [
  {
    title: "Export the reports you already run",
    desc: "Your team downloads the standard reports from athenahealth or eClinicalWorks, the same way you do today. No new fields, no reformatting, no cleanup in Excel.",
  },
  {
    title: "Drop the files into a SharePoint folder, as is",
    desc: "Nothing gets manipulated first. The files go into a folder in your Microsoft 365 environment.",
  },
  {
    title: "The dashboards refresh",
    desc: "Power BI pulls those files, transforms them, and updates the dashboards. Power Automate triggers a refresh whenever a new file lands.",
  },
];

export default function ForPracticesPage() {
  return (
    <>
      <JsonLd schema={serviceSchema} />
      <Nav />

      <section className="service-hero">
        <div className="service-hero-inner">
          <div className="eyebrow faint">
            <span className="eyebrow-rule"></span>
            For outpatient groups
          </div>
          <h1>The reports are already in athenahealth or eClinicalWorks.</h1>
          <p className="service-subhead">
            Export them, drop them into a SharePoint folder, and your Power BI dashboards refresh. No IT project. No EMR-vendor integration.
          </p>
          <div className="definition-block">
            <p>
              Harine Management is a solo healthcare reporting consultancy in Atlanta. Devanshu Patel does the work for independent and physician-owned outpatient groups, typically three or more locations and especially five or more, on athenahealth or eClinicalWorks.
            </p>
          </div>
        </div>
      </section>

      <section className="service-section">
        <div className="service-section-inner">
          <h2 className="service-section-title">Who this is for</h2>
          <p className="body-copy">
            Orthopedics, GI, dermatology, cardiology, pediatrics, urgent care, physical therapy, and women&apos;s health are a natural fit when the group is still rebuilding reports in Excel. Groups with three or more locations can use this. The weekly rebuild is usually most painful at five or more.
          </p>
          <p className="body-copy" style={{ marginTop: "16px" }}>
            This is not a pitch to health-system IT. The workflow is one practice&apos;s own report exports, in that practice&apos;s SharePoint.
          </p>
        </div>
      </section>

      <section className="service-section" style={{ background: "var(--stone-light)" }}>
        <div className="service-section-inner">
          <h2 className="service-section-title">Export. Drop. The dashboards refresh.</h2>
          <div className="audience-features">
            {steps.map((step) => (
              <div key={step.title} className="audience-feature">
                <div className="audience-feature-title">{step.title}</div>
                <div className="audience-feature-desc">{step.desc}</div>
              </div>
            ))}
          </div>
          <p className="body-copy" style={{ marginTop: "28px" }}>
            That is the entire workflow on your side. There is no IT project, no integration with the EMR, and no EMR-vendor fee. The dashboards refresh when a new file lands, not on their own overnight.
          </p>
        </div>
      </section>

      <section className="service-section">
        <div className="service-section-inner">
          <h2 className="service-section-title">What the build includes</h2>
          <ul className="deliverables-list">
            <li>Practice dashboard: patients seen by location and visit type, month-over-month and year-over-year volume, cancellations by reason</li>
            <li>Provider dashboard: patients seen per day, new patients in the month, work RVUs against the benchmarks you already set</li>
            <li>Billing dashboard: charges billed, paid, and denied, with denial reasons, charges by billed code, and AR and adjustments. These views are part of the scope and are not described as finished.</li>
            <li>Core Build {CORE_BUILD_PRICE}, or {CORE_BUILD_PRICE_FIVE_PLUS} for practices with five or more locations</li>
            <li>Retainer {RETAINER_PRICE} for up to 5 hours of updates, questions, and a review call</li>
          </ul>
          <p className="body-copy" style={{ marginTop: "20px" }}>
            <Link href="/case-study" className="service-link">Read the anonymized case study →</Link>
          </p>
        </div>
      </section>

      <section className="service-cta">
        <div className="service-cta-inner">
          <h2>Book a 30-minute call.</h2>
          <p>
            Bring the reports you run today. Reporting Diagnostic is {DIAGNOSTIC_LIST_PRICE}. {DIAGNOSTIC_FOUNDING}.
          </p>
          <a href={BOOK_CALL_HREF} target="_blank" rel="noopener noreferrer" className="btn btn-white">{BOOK_CALL_LABEL}</a>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
