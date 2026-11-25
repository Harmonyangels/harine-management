import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { BOOK_CALL_HREF, BOOK_CALL_LABEL } from "@/lib/contact";
import {
  CORE_BUILD_PRICE,
  CORE_BUILD_PRICE_FIVE_PLUS,
  DIAGNOSTIC_CREDIT,
  DIAGNOSTIC_FOUNDING,
  DIAGNOSTIC_LIST_PRICE,
  RETAINER_PRICE,
} from "@/lib/offer";

export const metadata: Metadata = {
  title: "Reporting Diagnostic, Core Build, and Retainer",
  description:
    "Reporting Diagnostic $2,500, free for our first 10 clients. Core Build $8,500, or $9,500 for five or more locations. Retainer $1,000 to $1,250 a month. Book a 30-minute call.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Reporting Diagnostic, Core Build, and Retainer | Harine Management",
    description:
      "Fixed prices for Power BI dashboards built from athenahealth or eClinicalWorks report exports. The diagnostic is free for our first 10 clients.",
    url: "https://harinemanagement.com/services",
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://harinemanagement.com/services#webpage",
  name: "Services and prices | Harine Management",
  url: "https://harinemanagement.com/services",
  description:
    "Reporting Diagnostic, Core Build, and monthly retainer for outpatient practices on athenahealth or eClinicalWorks.",
  inLanguage: "en-US",
  publisher: {
    "@type": "Organization",
    "@id": "https://harinemanagement.com/#organization",
    name: "Harine Management LLC",
  },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd schema={webPageSchema} />
      <Nav />

      <section className="services-index-hero">
        <div className="services-index-hero-inner">
          <div className="eyebrow faint">
            <span className="eyebrow-rule"></span>
            Services
          </div>
          <h1>One offer. Three prices.</h1>
          <p>
            Power BI dashboards for outpatient groups on athenahealth or eClinicalWorks. Your team exports the reports you already run and drops them in SharePoint. There is no IT project and no EMR-vendor integration.
          </p>
        </div>
      </section>

      <div className="services-index-body">
        <div className="services-index-inner">
          <div className="offer-grid">
            <div className="service-card featured">
              <div className="founding-flag">{DIAGNOSTIC_FOUNDING}</div>
              <div className="service-tag crimson">Reporting Diagnostic</div>
              <div className="offer-price">{DIAGNOSTIC_LIST_PRICE}</div>
              <p className="offer-price-note">List price. {DIAGNOSTIC_FOUNDING}.</p>
              <p>A five-day review of your reporting workflow: which reports you run, what gets rebuilt in Excel, and what the dashboards should show first. You get written findings and a recommended build plan.</p>
              <p>{DIAGNOSTIC_CREDIT}</p>
              <Link href="/services/practice-operational-diagnostic" className="service-link">See the diagnostic →</Link>
            </div>

            <div className="service-card secondary">
              <div className="service-tag terra">Core Build</div>
              <div className="offer-price">{CORE_BUILD_PRICE}</div>
              <p className="offer-price-note">{CORE_BUILD_PRICE_FIVE_PLUS} for practices with five or more locations.</p>
              <p>The practice, provider, and billing dashboards, set up on your SharePoint folder, with Power Automate refresh and a walkthrough for your team. Fixed price. Built from a reusable model, not a custom data platform.</p>
              <Link href="/services/practice-analytics-system" className="service-link terra">See the Core Build →</Link>
            </div>

            <div className="service-card tertiary">
              <div className="service-tag ink">Ongoing retainer</div>
              <div className="offer-price" style={{ fontSize: "32px" }}>{RETAINER_PRICE}</div>
              <p className="offer-price-note">After the dashboards are up.</p>
              <p>Up to 5 hours a month for dashboard updates, new views, data-quality checks, and a review call. Additional hours can be scoped if you need more.</p>
            </div>
          </div>

          <div className="services-audience-group" style={{ marginTop: "64px" }}>
            <div className="services-audience-label">The three dashboards</div>
            <div className="services-index-grid">
              <Link href="/services/volume-analytics" className="services-index-card">
                <div className="services-index-card-title">Practice dashboard</div>
                <div className="services-index-card-desc">Patients seen by location and by visit type. Month-over-month and year-over-year volume. Cancellations, broken down by reason.</div>
                <div className="services-index-card-link">See the practice view →</div>
              </Link>
              <Link href="/services/provider-productivity-analytics" className="services-index-card">
                <div className="services-index-card-title">Provider dashboard</div>
                <div className="services-index-card-desc">Patients seen per day by provider. New patients in the month. Work RVUs against the benchmarks you already set.</div>
                <div className="services-index-card-link">See the provider view →</div>
              </Link>
              <Link href="/services/revenue-cycle-analytics" className="services-index-card">
                <div className="services-index-card-title">Billing dashboard</div>
                <div className="services-index-card-desc">Charges billed, paid, and denied, with denial reasons. Charges by billed code. AR and adjustments. These views are part of the build and are not described as finished.</div>
                <div className="services-index-card-link">See the billing view →</div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <section className="service-cta">
        <div className="service-cta-inner">
          <h2>Book a 30-minute call.</h2>
          <p>
            That call is how you claim the Reporting Diagnostic. {DIAGNOSTIC_FOUNDING}. List price {DIAGNOSTIC_LIST_PRICE}.
          </p>
          <a href={BOOK_CALL_HREF} target="_blank" rel="noopener noreferrer" className="btn btn-white">{BOOK_CALL_LABEL}</a>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
