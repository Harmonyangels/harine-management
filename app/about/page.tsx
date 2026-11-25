import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { BOOK_CALL_HREF, BOOK_CALL_LABEL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_SCHEMA, CONTACT_PHONE_TEL } from "@/lib/contact";
import {
  CORE_BUILD_PRICE,
  CORE_BUILD_PRICE_FIVE_PLUS,
  DIAGNOSTIC_CREDIT,
  DIAGNOSTIC_FOUNDING,
  DIAGNOSTIC_LIST_PRICE,
  RETAINER_PRICE,
} from "@/lib/offer";

export const metadata: Metadata = {
  title: { absolute: "About Harine Management | Devanshu Patel" },
  description:
    "Harine Management LLC is a solo healthcare reporting consultancy in Atlanta. Devanshu Patel builds Power BI dashboards for outpatient practices on athenahealth or eClinicalWorks.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Harine Management | Devanshu Patel",
    description:
      "Devanshu Patel does the work. Atlanta. Business associate agreements are signed. Monday–Friday, 9 a.m.–6 p.m. ET.",
    url: "https://harinemanagement.com/about",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://harinemanagement.com/#devanshu-patel",
  name: "Devanshu Patel",
  url: "https://harinemanagement.com/about",
  jobTitle: "Founder, Harine Management LLC",
  description:
    "Devanshu Patel is the founder of Harine Management LLC, a solo healthcare reporting consultancy in Atlanta. He builds Power BI dashboards for multi-location outpatient practices on athenahealth or eClinicalWorks from the report exports those practices already run.",
  worksFor: {
    "@type": "Organization",
    "@id": "https://harinemanagement.com/#organization",
    name: "Harine Management LLC",
    url: "https://harinemanagement.com",
  },
  knowsAbout: [
    "Power BI for medical practices",
    "athenahealth reporting",
    "eClinicalWorks reporting",
    "SharePoint and Power Automate refresh",
    "wRVU provider productivity",
    "Outpatient practice reporting",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Atlanta",
    addressRegion: "GA",
    addressCountry: "US",
  },
  email: "dev@harinemanagement.com",
  telephone: CONTACT_PHONE_SCHEMA,
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
    "About Devanshu Patel and Harine Management LLC, a solo healthcare reporting consultancy in Atlanta.",
  url: "https://harinemanagement.com/about",
  inLanguage: "en-US",
  about: { "@id": "https://harinemanagement.com/#devanshu-patel" },
  publisher: { "@id": "https://harinemanagement.com/#organization" },
};

export default function AboutPage() {
  return (
    <>
      <link rel="me" href="https://www.linkedin.com/in/devanshu-patel" />
      <JsonLd schema={personSchema} />
      <JsonLd schema={webPageSchema} />
      <Nav />

      <section className="service-hero">
        <div className="service-hero-inner">
          <div className="eyebrow faint">
            <span className="eyebrow-rule"></span>
            About
          </div>
          <h1>Devanshu Patel</h1>
          <p className="service-subhead">
            Founder, Harine Management LLC · Atlanta, Georgia
          </p>
          <div className="definition-block about-entity-description">
            <p>
              Harine Management LLC is a solo healthcare reporting consultancy in Atlanta. Devanshu Patel does the work. The offer is Power BI dashboards for independent and physician-owned outpatient groups on athenahealth or eClinicalWorks that are still rebuilding reports in Excel.
            </p>
          </div>
        </div>
      </section>

      <section className="service-section">
        <div className="service-section-inner about-background-body">
          <h2 className="service-section-title">The work</h2>
          <p className="body-copy" style={{ marginBottom: "1.25rem" }}>
            A client drops unchanged report exports from athenahealth or eClinicalWorks into a SharePoint folder. Power BI transforms those files into a practice dashboard, a provider dashboard (including work RVUs), and billing views. Power Automate refreshes the dashboards when a new file lands. There is no IT project and no EMR-vendor integration.
          </p>
          <p className="body-copy" style={{ marginBottom: "1.25rem" }}>
            Confirmed EMR experience is athenahealth (athenaOne) and eClinicalWorks. The practice is based in Atlanta and serves outpatient groups in the Southeast. Hours are Monday–Friday, 9 a.m.–6 p.m. ET.
          </p>
          <p className="body-copy">
            Engagements are done under a signed business associate agreement and a confidentiality agreement. We ask only for the reports and fields the work needs. The source files remain in the client&apos;s Microsoft 365 / SharePoint environment.
          </p>
        </div>
      </section>

      <section className="service-section" style={{ background: "var(--stone-light)" }}>
        <div className="service-section-inner">
          <h2 className="service-section-title">Who it is for</h2>
          <p className="body-copy" style={{ marginBottom: "1.25rem" }}>
            Independent and physician-owned outpatient groups, typically three or more locations, especially five or more. Orthopedics, GI, dermatology, cardiology, pediatrics, urgent care, physical therapy, and women&apos;s health are a natural fit.
          </p>
          <ul className="deliverables-list">
            <li>
              <Link href="/services/practice-operational-diagnostic" className="about-service-link">
                Reporting Diagnostic — {DIAGNOSTIC_LIST_PRICE}. {DIAGNOSTIC_FOUNDING}.
              </Link>
            </li>
            <li>
              <Link href="/services/practice-analytics-system" className="about-service-link">
                Core Build — {CORE_BUILD_PRICE}, or {CORE_BUILD_PRICE_FIVE_PLUS} for five or more locations
              </Link>
            </li>
            <li>Retainer — {RETAINER_PRICE}</li>
            <li>
              <Link href="/case-study" className="about-service-link">Anonymized case study</Link>
            </li>
          </ul>
          <p className="body-copy" style={{ marginTop: "1.25rem" }}>{DIAGNOSTIC_CREDIT}</p>
        </div>
      </section>

      <section className="service-section">
        <div className="service-section-inner">
          <h2 className="service-section-title">Location and contact</h2>
          <div className="about-contact-grid">
            <div className="contact-card">
              <div className="contact-icon crimson" aria-hidden="true">✉</div>
              <div>
                <div className="contact-label">Email</div>
                <a href="mailto:dev@harinemanagement.com" className="contact-value">dev@harinemanagement.com</a>
                <div className="contact-note">Harine Management LLC</div>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-icon crimson" aria-hidden="true">☎</div>
              <div>
                <div className="contact-label">Phone</div>
                <a href={CONTACT_PHONE_TEL} className="contact-value">{CONTACT_PHONE_DISPLAY}</a>
                <div className="contact-note">Monday–Friday, 9 a.m.–6 p.m. ET</div>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-icon crimson" aria-hidden="true">📍</div>
              <div>
                <div className="contact-label">Location</div>
                <span className="contact-value">Atlanta, Georgia</span>
                <div className="contact-note">Serving outpatient groups in the Southeast</div>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-icon crimson" aria-hidden="true">in</div>
              <div>
                <div className="contact-label">LinkedIn</div>
                <a href="https://www.linkedin.com/in/devanshu-patel" className="contact-value" rel="me noopener noreferrer" target="_blank">
                  linkedin.com/in/devanshu-patel
                </a>
                <div className="contact-note">Devanshu Patel</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="service-cta">
        <div className="service-cta-inner">
          <h2>Book a 30-minute call.</h2>
          <p>
            {DIAGNOSTIC_FOUNDING}. List price {DIAGNOSTIC_LIST_PRICE}. The call is how you claim it.
          </p>
          <a href={BOOK_CALL_HREF} target="_blank" rel="noopener noreferrer" className="btn btn-white">
            {BOOK_CALL_LABEL}
          </a>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
