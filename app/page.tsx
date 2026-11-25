import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";
import { BOOK_CALL_HREF, BOOK_CALL_LABEL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL } from "@/lib/contact";
import {
  CORE_BUILD_PRICE,
  CORE_BUILD_PRICE_FIVE_PLUS,
  DIAGNOSTIC_CREDIT,
  DIAGNOSTIC_FOUNDING,
  DIAGNOSTIC_LIST_PRICE,
  RETAINER_PRICE,
} from "@/lib/offer";

export const metadata: Metadata = {
  title: {
    absolute: "Power BI Dashboards for Medical Practices | Harine Management",
  },
  description:
    "Stop rebuilding practice reports in Excel. Export athenahealth or eClinicalWorks reports into SharePoint, and Power BI dashboards refresh. Reporting Diagnostic $2,500, free for our first 10 clients. Core Build $8,500.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Power BI Dashboards for Medical Practices | Harine Management",
    description:
      "Power BI dashboards for multi-location outpatient practices on athenahealth or eClinicalWorks. No IT project. Reporting Diagnostic $2,500, free for our first 10 clients.",
    url: "https://harinemanagement.com",
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://harinemanagement.com/#webpage",
  name: "Power BI Dashboards for Medical Practices | Harine Management",
  url: "https://harinemanagement.com",
  description:
    "Power BI dashboards for multi-location outpatient practices on athenahealth or eClinicalWorks. Reports are exported as they are today and dropped into SharePoint.",
  inLanguage: "en-US",
  publisher: {
    "@type": "Organization",
    "@id": "https://harinemanagement.com/#organization",
    name: "Harine Management",
    url: "https://harinemanagement.com",
  },
};

const offerSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://harinemanagement.com/#core-build",
  name: "Core Build",
  description:
    "Three Power BI dashboards for an outpatient practice, set up on the practice's SharePoint folder, with a Power Automate refresh when a new report file lands. Fixed price: $8,500, or $9,500 for practices with five or more locations.",
  serviceType: "Healthcare Reporting",
  provider: {
    "@type": "Organization",
    "@id": "https://harinemanagement.com/#organization",
    name: "Harine Management LLC",
    url: "https://harinemanagement.com",
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Southeast United States",
  },
  url: "https://harinemanagement.com/#pricing",
  offers: [
    {
      "@type": "Offer",
      name: "Reporting Diagnostic",
      price: "2500",
      priceCurrency: "USD",
      description:
        "List price $2,500. Free for our first 10 clients. A five-day review of the reporting workflow, with written findings and a recommended build plan.",
      url: "https://calendly.com/dev-harinemanagement/30min",
    },
    {
      "@type": "Offer",
      name: "Core Build",
      price: "8500",
      priceCurrency: "USD",
      description:
        "$8,500, or $9,500 for practices with five or more locations. Three Power BI dashboards, SharePoint folder, and Power Automate refresh.",
      url: "https://calendly.com/dev-harinemanagement/30min",
    },
  ],
};

export default function Home() {
  return (
    <>
      <JsonLd schema={webPageSchema} />
      <JsonLd schema={offerSchema} />

      <Nav />

      <section className="hero" id="top">
        <div className="hero-blob1"></div>
        <div className="hero-blob2"></div>
        <div className="hero-inner">
          <div>
            <div className="hero-label eyebrow">
              <span className="eyebrow-rule"></span>
              Power BI dashboards · Atlanta
            </div>
            <h1 className="hero-title">
              Stop rebuilding your practice reports in Excel every week.
            </h1>
            <p className="hero-sub wide">
              If you run three or more locations on athenahealth or eClinicalWorks, you already have the reports. Export them, drop them into a SharePoint folder, and your Power BI dashboards refresh — volume, providers, and billing, without an IT project or an EMR-vendor integration.
            </p>
            <div className="hero-actions">
              <a href={BOOK_CALL_HREF} className="btn btn-primary" target="_blank" rel="noopener noreferrer">{BOOK_CALL_LABEL}</a>
              <a href="#how-it-works" className="btn btn-secondary">See how the workflow works</a>
            </div>
            <p className="hero-note">
              Reporting Diagnostic is {DIAGNOSTIC_LIST_PRICE}. {DIAGNOSTIC_FOUNDING}. Based in Atlanta. Work is done under a signed business associate agreement.
            </p>
          </div>

          <div className="hero-visual">
            <div className="dashboard-mock">
              <div className="dash-topbar">
                <div className="dot dot-red"></div>
                <div className="dot dot-yellow"></div>
                <div className="dot dot-green"></div>
                <div className="dash-brandbar">Sample layout · not a client result</div>
              </div>
              <div className="dash-body">
                <div className="dash-title-row">
                  <div className="dash-greeting">Practice dashboard</div>
                  <div className="dash-heading">Volume by location</div>
                </div>
                <div className="kpi-grid">
                  <div className="kpi-card">
                    <div className="kpi-label">Visits</div>
                    <div className="kpi-value">Sample</div>
                    <div className="kpi-delta neutral">By location</div>
                  </div>
                  <div className="kpi-card">
                    <div className="kpi-label">wRVU</div>
                    <div className="kpi-value">Sample</div>
                    <div className="kpi-delta neutral">By provider</div>
                  </div>
                  <div className="kpi-card">
                    <div className="kpi-label">Billing</div>
                    <div className="kpi-value">Views</div>
                    <div className="kpi-delta neutral">From your exports</div>
                  </div>
                </div>
                <div className="chart-row">
                  <div className="chart-area">
                    <div className="chart-lbl">Illustrative volume bars</div>
                    <div className="chart-bars">
                      <div className="bar" style={{ height: "55%", background: "var(--terra-mid)", opacity: 0.5 }}></div>
                      <div className="bar" style={{ height: "70%", background: "var(--terra)", opacity: 0.6 }}></div>
                      <div className="bar" style={{ height: "60%", background: "var(--terra-mid)", opacity: 0.5 }}></div>
                      <div className="bar" style={{ height: "80%", background: "var(--crimson)", opacity: 0.75 }}></div>
                      <div className="bar" style={{ height: "65%", background: "var(--terra)", opacity: 0.6 }}></div>
                      <div className="bar" style={{ height: "90%", background: "var(--crimson)", opacity: 0.85 }}></div>
                      <div className="bar" style={{ height: "75%", background: "var(--terra)", opacity: 0.65 }}></div>
                      <div className="bar" style={{ height: "88%", background: "var(--crimson)", opacity: 0.8 }}></div>
                      <div className="bar" style={{ height: "70%", background: "var(--terra-mid)", opacity: 0.55 }}></div>
                      <div className="bar" style={{ height: "95%", background: "var(--crimson)", opacity: 0.9 }}></div>
                      <div className="bar" style={{ height: "82%", background: "var(--terra)", opacity: 0.7 }}></div>
                      <div className="bar" style={{ height: "78%", background: "var(--terra-mid)", opacity: 0.6 }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hero-badge">
              <div className="badge-icon">↓</div>
              <div>
                <div className="badge-text">Refreshes when a file lands</div>
                <div className="badge-sub">Sample layout, not a result</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="expertise-strip">
        <div className="expertise-strip-inner">
          <span className="expertise-strip-label">Works with:</span>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {["athenahealth", "eClinicalWorks", "SharePoint", "Power BI", "Power Automate"].map((name) => (
              <span key={name} style={{ fontSize: "12px", fontWeight: 500, color: "var(--ink-mid)", background: "var(--white)", border: "1.5px solid var(--stone)", borderRadius: "999px", padding: "6px 16px" }}>{name}</span>
            ))}
          </div>
        </div>
      </div>

      <section id="problem">
        <div className="container">
          <div className="section-header">
            <div className="eyebrow"><span className="eyebrow-rule"></span>The problem</div>
            <h2 className="section-title">The reports are in the EHR.<br />The work is still in Excel.</h2>
          </div>
          <div className="prose-narrow body-copy">
            <p>Most practice and billing managers already know which reports to run. The problem is what happens next. To see volume by location, visit mix, cancellations, provider productivity, or denials, someone has to run several reports, copy the data into Excel, and rebuild the same workbook.</p>
            <p>In a group with five or more locations, that can take hours every week. By the time the file is ready, the data is already about two weeks behind, and a new week of numbers is waiting.</p>
            <p>Native EHR report libraries are not the same thing as a dashboard leadership can open on Monday. They were not built to compare locations, track providers against the benchmarks you already use, or show denials and AR without another round of spreadsheets.</p>
            <p>You should not need a new EMR, a hospital IT team, or a paid interface from the vendor to fix this.</p>
            <p className="audience-line">Groups with three or more locations can use this. The weekly rebuild is usually most painful at five or more. The Core Build is {CORE_BUILD_PRICE}, or {CORE_BUILD_PRICE_FIVE_PLUS} for practices with five or more locations.</p>
          </div>
        </div>
      </section>

      <section className="alt" id="how-it-works">
        <div className="container">
          <div className="section-header" style={{ textAlign: "center", maxWidth: "640px", marginLeft: "auto", marginRight: "auto" }}>
            <div className="eyebrow" style={{ justifyContent: "center" }}>
              <span className="eyebrow-rule"></span>How it works<span className="eyebrow-rule"></span>
            </div>
            <h2 className="section-title">Export. Drop.<br />The dashboards refresh.</h2>
          </div>
          <div className="steps steps-3">
            <div className="step">
              <div className="step-num">01</div>
              <h4>Export the reports you already run</h4>
              <p>Your team downloads the standard reports from athenahealth or eClinicalWorks, the same way you do today. No new fields, no reformatting, no cleanup in Excel.</p>
            </div>
            <div className="step">
              <div className="step-num">02</div>
              <h4>Drop the files into SharePoint, as is</h4>
              <p>Nothing gets manipulated first. The files go into a folder in your Microsoft 365 environment.</p>
            </div>
            <div className="step">
              <div className="step-num">03</div>
              <h4>The dashboards refresh</h4>
              <p>Power BI pulls those files, transforms them, and updates the dashboards. Power Automate triggers a refresh whenever a new file lands.</p>
            </div>
          </div>
          <p className="body-copy" style={{ textAlign: "center", maxWidth: "640px", margin: "48px auto 0" }}>
            That is the entire workflow on your side. There is no IT project, no integration with the EMR, and no EMR-vendor fee.
          </p>
        </div>
      </section>

      <section id="dashboards">
        <div className="container">
          <div className="section-header">
            <div className="eyebrow"><span className="eyebrow-rule"></span>What you get</div>
            <h2 className="section-title">Three dashboards.<br />One place to look.</h2>
            <p className="section-sub">Built in Power BI, using the reports you already export.</p>
          </div>
          <div className="dash-grid">
            <div className="service-card featured">
              <div className="service-tag crimson">Practice</div>
              <h3>Practice dashboard</h3>
              <p>Patients seen by location and by visit type. Month-over-month and year-over-year volume. Cancellations, broken down by reason.</p>
            </div>
            <div className="service-card secondary">
              <div className="service-tag terra">Provider</div>
              <h3>Provider dashboard</h3>
              <p>Patients seen per day by provider. New patients in the month. Work RVUs against the benchmarks you already set.</p>
            </div>
            <div className="service-card tertiary">
              <div className="service-tag ink">Billing</div>
              <h3>Billing dashboard</h3>
              <p>Charges billed, paid, and denied, with denial reasons. Charges by billed code. AR and adjustments. These views are part of the build. They are not described here as a finished product.</p>
            </div>
          </div>
          <p className="body-copy" style={{ maxWidth: "720px", marginTop: "36px" }}>
            The first engagement maps the reports you already use, builds the data model, and stands up these three views. After that, a monthly retainer covers updates, questions, and a regular review.
          </p>
        </div>
      </section>

      <section className="alt" id="proof">
        <div className="container">
          <div className="section-header">
            <div className="eyebrow"><span className="eyebrow-rule"></span>Proof</div>
            <h2 className="section-title">What this looked like<br />for one practice.</h2>
          </div>
          <div className="prose-narrow body-copy">
            <p>For a multi-location outpatient practice on athenahealth, weekly reporting that took a practice manager 15 to 20 hours now takes about 5 minutes: export the usual reports, drop them in the folder, and open the dashboards. That practice now uses a volume dashboard (visits by provider, location, and visit type, with daily, weekly, and monthly trends) and a work RVU dashboard for provider productivity, including wRVU per provider. Additional billing views from the same engagement — charges, collections, and the remaining financial comparisons — are still being built.</p>
            <p>
              <Link href="/case-study" className="service-link">Read the anonymized case study →</Link>
            </p>
          </div>
        </div>
      </section>

      <section id="pricing">
        <div className="container">
          <div className="section-header">
            <div className="eyebrow"><span className="eyebrow-rule"></span>The offer</div>
            <h2 className="section-title">Start with a diagnostic.<br /><em>Free for our first 10 clients.</em></h2>
            <p className="section-sub">Three fixed prices. The diagnostic list price stays {DIAGNOSTIC_LIST_PRICE}. The first 10 clients do not pay it. Book a 30-minute call to claim that.</p>
          </div>
          <div className="offer-grid">
            <div className="service-card featured">
              <div className="founding-flag">{DIAGNOSTIC_FOUNDING}</div>
              <div className="service-tag crimson">Reporting Diagnostic</div>
              <div className="offer-price">{DIAGNOSTIC_LIST_PRICE}</div>
              <p className="offer-price-note">List price. {DIAGNOSTIC_FOUNDING}.</p>
              <p>A five-day review of your reporting workflow: which reports you run, what gets rebuilt in Excel, and what the dashboards should show first. You get written findings and a recommended build plan.</p>
              <p>{DIAGNOSTIC_CREDIT}</p>
              <a href={BOOK_CALL_HREF} className="service-link" target="_blank" rel="noopener noreferrer">{BOOK_CALL_LABEL} →</a>
            </div>

            <div className="service-card secondary">
              <div className="service-tag terra">Core Build</div>
              <div className="offer-price">{CORE_BUILD_PRICE}</div>
              <p className="offer-price-note">{CORE_BUILD_PRICE_FIVE_PLUS} for practices with five or more locations.</p>
              <p>The three Power BI dashboards above, set up on your SharePoint folder, with Power Automate refresh and a walkthrough for your team. Fixed price. Built from a reusable model, not a custom data platform.</p>
              <Link href="/services/practice-analytics-system" className="service-link terra">See the Core Build →</Link>
            </div>

            <div className="service-card tertiary">
              <div className="service-tag ink">Ongoing retainer</div>
              <div className="offer-price" style={{ fontSize: "32px" }}>{RETAINER_PRICE}</div>
              <p className="offer-price-note">After the dashboards are up.</p>
              <p>Up to 5 hours a month for dashboard updates, new views, data-quality checks, and a review call. Additional hours can be scoped if you need more.</p>
              <a href={BOOK_CALL_HREF} className="service-link" target="_blank" rel="noopener noreferrer">{BOOK_CALL_LABEL} →</a>
            </div>
          </div>
          <div style={{ marginTop: "36px" }}>
            <a href={BOOK_CALL_HREF} className="btn btn-primary" target="_blank" rel="noopener noreferrer">{BOOK_CALL_LABEL}</a>
          </div>
        </div>
      </section>

      <section className="alt" id="privacy">
        <div className="container">
          <div className="section-header">
            <div className="eyebrow"><span className="eyebrow-rule"></span>Your files</div>
            <h2 className="section-title">Your files stay<br />in your SharePoint.</h2>
          </div>
          <div className="prose-narrow body-copy">
            <p>Engagements are done under a signed business associate agreement and a confidentiality agreement. We ask only for the reports and fields the work needs. The source files remain in your Microsoft 365 / SharePoint environment. This is not a clinical system change, and it does not interrupt patient care.</p>
          </div>
        </div>
      </section>

      <section className="cta-section" id="contact">
        <div className="container">
          <div className="cta-inner">
            <div className="cta-left">
              <div className="eyebrow" style={{ marginBottom: "20px" }}>
                <span className="eyebrow-rule"></span>Let&apos;s look at the files
              </div>
              <h2 className="cta-title">
                If Excel is still the reporting system, let&apos;s look at the files you already export.
              </h2>
              <p className="cta-sub">
                A 30-minute call is enough to see whether the diagnostic is the right first step. Bring the reports you run today. If it is not a fit, we will say so. {DIAGNOSTIC_FOUNDING}. List price {DIAGNOSTIC_LIST_PRICE}.
              </p>
              <div className="cta-actions">
                <a href={BOOK_CALL_HREF} className="btn btn-primary" target="_blank" rel="noopener noreferrer">{BOOK_CALL_LABEL}</a>
              </div>
            </div>

            <div className="cta-right">
              <div className="contact-card">
                <div className="contact-icon crimson">✉️</div>
                <div>
                  <div className="contact-label">Email</div>
                  <a href="mailto:dev@harinemanagement.com" className="contact-value">dev@harinemanagement.com</a>
                  <div className="contact-note">Harine Management LLC</div>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-icon terra">📞</div>
                <div>
                  <div className="contact-label">Phone</div>
                  <a href={CONTACT_PHONE_TEL} className="contact-value">{CONTACT_PHONE_DISPLAY}</a>
                  <div className="contact-note">Monday–Friday, 9 a.m.–6 p.m. ET</div>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-icon crimson">📍</div>
                <div>
                  <div className="contact-label">Location</div>
                  <div className="contact-value" style={{ fontSize: "14px" }}>Atlanta, Georgia</div>
                  <div className="contact-note">A solo practice. Devanshu Patel does the work.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
