import type { Metadata } from "next";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { BOOK_CALL_HREF, BOOK_CALL_LABEL } from "@/lib/contact";
import { DIAGNOSTIC_FOUNDING, DIAGNOSTIC_LIST_PRICE } from "@/lib/offer";

export const metadata: Metadata = {
  title: { absolute: "Case Study | Harine Management" },
  description:
    "A multi-location outpatient practice on athenahealth cut weekly reporting from 15 to 20 hours to about 5 minutes. Anonymized. Volume and work RVU dashboards are in use. Billing views are still being built.",
  alternates: { canonical: "/case-study" },
  openGraph: {
    title: "Case Study | Harine Management",
    description:
      "Weekly reporting that took 15 to 20 hours now takes about 5 minutes. Anonymized outpatient practice on athenahealth.",
    url: "https://harinemanagement.com/case-study",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How a multi-location outpatient practice cut weekly reporting from 15–20 hours to about 5 minutes",
  description:
    "Anonymized case study. A multi-location outpatient practice on athenahealth. No practice name or location is published.",
  author: {
    "@type": "Person",
    name: "Devanshu Patel",
    url: "https://harinemanagement.com/about",
  },
  publisher: {
    "@type": "Organization",
    name: "Harine Management LLC",
    url: "https://harinemanagement.com",
  },
  mainEntityOfPage: "https://harinemanagement.com/case-study",
};

export default function CaseStudyPage() {
  return (
    <>
      <JsonLd schema={articleSchema} />
      <Nav />

      <section className="service-hero">
        <div className="service-hero-inner">
          <div className="eyebrow faint">
            <span className="eyebrow-rule"></span>
            Case study
          </div>
          <h1>How a multi-location outpatient practice cut weekly reporting from 15–20 hours to about 5 minutes.</h1>
          <p className="service-subhead">
            A multi-location outpatient practice on athenahealth. The practice is not named.
          </p>
        </div>
      </section>

      <section className="service-section">
        <div className="service-section-inner prose-narrow body-copy">
          <h2 className="service-section-title">The practice</h2>
          <p>A multi-location outpatient practice on athenahealth. Like many groups its size, the practice already had plenty of reports in the EHR. What it did not have was a single, current view of how the practice was performing.</p>
        </div>
      </section>

      <section className="service-section" style={{ background: "var(--stone-light)" }}>
        <div className="service-section-inner prose-narrow body-copy">
          <h2 className="service-section-title">The problem</h2>
          <p>Operational and financial data lived in athenahealth, but getting it into a form leadership could use meant exporting multiple standard reports and rebuilding them in Excel every week.</p>
          <p>Typical questions took several reports to answer:</p>
          <ul className="deliverables-list">
            <li>How many patients were seen, by location and by visit type?</li>
            <li>How does volume compare month over month and year over year?</li>
            <li>How is each provider performing?</li>
            <li>What is happening on the billing side — charges, payments, denials, and AR?</li>
          </ul>
          <p>For a practice manager, that work added up to 15 to 20 hours every week. By the time the workbook was finished, the numbers were already going stale, and a new week&apos;s data was waiting.</p>
          <p>The practice did not want an IT project, a vendor integration, or new fees from the EMR company.</p>
        </div>
      </section>

      <section className="service-section">
        <div className="service-section-inner prose-narrow body-copy">
          <h2 className="service-section-title">The approach</h2>
          <p>The workflow was built around reports the practice already knows how to run.</p>
          <ul className="deliverables-list">
            <li><strong>Export.</strong> A staff member downloads the standard athenahealth reports the practice already uses. No reformatting. No copy-and-paste into a new spreadsheet.</li>
            <li><strong>Drop.</strong> Those files go, as is, into a SharePoint folder.</li>
            <li><strong>Refresh.</strong> Power BI pulls the files from that folder, transforms them, and updates the dashboards. Power Automate triggers a refresh whenever a new file lands.</li>
          </ul>
          <p>There is no custom interface with the EMR, no IT project on the practice side, and no EMR-vendor integration fee. The files stay in the practice&apos;s own SharePoint. Harine signs a business associate agreement and a confidentiality agreement, and access is limited to what the work requires.</p>
        </div>
      </section>

      <section className="service-section" style={{ background: "var(--stone-light)" }}>
        <div className="service-section-inner prose-narrow body-copy">
          <h2 className="service-section-title">Dashboards built</h2>
          <p>Two Power BI dashboards are in use.</p>
          <h3 style={{ fontFamily: "var(--serif)", fontSize: "22px", fontWeight: 500, margin: "28px 0 12px" }}>Volume dashboard</h3>
          <ul className="deliverables-list">
            <li>Visits by provider, location, and visit type</li>
            <li>Daily, weekly, and monthly trends</li>
          </ul>
          <h3 style={{ fontFamily: "var(--serif)", fontSize: "22px", fontWeight: 500, margin: "28px 0 12px" }}>Work RVU / provider productivity dashboard</h3>
          <p>This dashboard is in use, including the provider-level wRVU comparisons:</p>
          <ul className="deliverables-list">
            <li>Work RVUs</li>
            <li>wRVU per provider, so leadership can compare provider productivity side by side</li>
          </ul>
          <p>The rest of that phase is still in progress and is not finished: a charges dashboard, a collections dashboard, and the remaining provider and location financial comparisons, along with month-over-month and year-over-year growth measures on those financial views.</p>
        </div>
      </section>

      <section className="service-section">
        <div className="service-section-inner prose-narrow body-copy">
          <h2 className="service-section-title">The result</h2>
          <p>Weekly reporting that took a practice manager 15 to 20 hours now takes about 5 minutes: export the usual reports, drop them in the folder, and open the dashboards.</p>
          <p>Leadership can review volume by location, provider, and visit type, and compare work RVUs by provider, without waiting on a manual workbook. The practice did not have to change EMRs, hire an internal analyst, or buy an add-on from the EHR vendor.</p>
        </div>
      </section>

      <section className="service-cta">
        <div className="service-cta-inner">
          <h2>Book a 30-minute call.</h2>
          <p>
            Bring the reports you run today. {DIAGNOSTIC_FOUNDING}. List price {DIAGNOSTIC_LIST_PRICE}.
          </p>
          <a href={BOOK_CALL_HREF} target="_blank" rel="noopener noreferrer" className="btn btn-white">{BOOK_CALL_LABEL}</a>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
