import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { specialties, getSpecialtyBySlug } from "@/data/specialties";
import { BOOK_CALL_HREF, BOOK_CALL_LABEL } from "@/lib/contact";
import {
  CORE_BUILD_PRICE,
  CORE_BUILD_PRICE_FIVE_PLUS,
  DIAGNOSTIC_FOUNDING,
  DIAGNOSTIC_LIST_PRICE,
  RETAINER_PRICE,
} from "@/lib/offer";

export async function generateStaticParams() {
  return specialties.map((s) => ({ slug: s.slug }));
}

function specialtyDescription(title: string) {
  return `${title} for outpatient groups on athenahealth or eClinicalWorks. Export the reports you already run, drop them in SharePoint, and Power BI dashboards refresh.`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const specialty = getSpecialtyBySlug(slug);
  if (!specialty) return {};

  const description = specialtyDescription(specialty.title);

  return {
    title: { absolute: `${specialty.metaTitle}` },
    description,
    alternates: { canonical: `/specialties/${slug}` },
    openGraph: {
      title: specialty.metaTitle,
      description,
      url: `https://harinemanagement.com/specialties/${slug}`,
    },
  };
}

export default async function SpecialtyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const specialty = getSpecialtyBySlug(slug);
  if (!specialty) notFound();

  const description = specialtyDescription(specialty.title);
  const related = specialties.filter((s) => s.slug !== slug).slice(0, 3);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://harinemanagement.com/specialties/${slug}#service`,
    name: specialty.title,
    description,
    serviceType: "Healthcare Reporting",
    provider: {
      "@type": "Organization",
      "@id": "https://harinemanagement.com/#organization",
      name: "Harine Management LLC",
      url: "https://harinemanagement.com",
    },
    url: `https://harinemanagement.com/specialties/${slug}`,
  };

  return (
    <>
      <JsonLd schema={serviceSchema} />
      <Nav />

      <section className="service-hero">
        <div className="service-hero-inner">
          <div className="eyebrow faint">
            <span className="eyebrow-rule"></span>
            {specialty.shortTitle}
          </div>
          <h1>{specialty.title}</h1>
          <p className="service-subhead">
            For outpatient groups on athenahealth or eClinicalWorks that are still rebuilding reports in Excel. Export the reports you already run, drop them into SharePoint, and the Power BI dashboards refresh when a new file lands.
          </p>
        </div>
      </section>

      <section className="service-section">
        <div className="service-section-inner prose-narrow body-copy">
          <h2 className="service-section-title">The same workflow</h2>
          <p>Your team downloads the standard reports from athenahealth or eClinicalWorks, the same way you do today. The files go into a SharePoint folder as they are. Power BI transforms them. Power Automate triggers a refresh whenever a new file lands.</p>
          <p>There is no IT project, no integration with the EMR, and no EMR-vendor fee. The dashboards do not update on their own if nobody exported a file.</p>
        </div>
      </section>

      <section className="service-section" style={{ background: "var(--stone-light)" }}>
        <div className="service-section-inner">
          <h2 className="service-section-title">What the dashboards cover</h2>
          <ul className="deliverables-list">
            <li>Practice dashboard: patients seen by location and visit type, month-over-month and year-over-year volume, cancellations by reason</li>
            <li>Provider dashboard: patients seen per day, new patients in the month, work RVUs against the benchmarks you already set</li>
            <li>Billing views: charges billed, paid, and denied, with denial reasons, charges by billed code, and AR and adjustments. These views are part of the build and are not described as finished.</li>
          </ul>
          <p className="body-copy" style={{ marginTop: "20px" }}>
            Core Build {CORE_BUILD_PRICE}, or {CORE_BUILD_PRICE_FIVE_PLUS} for five or more locations. Retainer {RETAINER_PRICE}.
          </p>
        </div>
      </section>

      <section className="service-cta">
        <div className="service-cta-inner">
          <h2>Book a 30-minute call.</h2>
          <p>
            Reporting Diagnostic is {DIAGNOSTIC_LIST_PRICE}. {DIAGNOSTIC_FOUNDING}.
          </p>
          <a href={BOOK_CALL_HREF} target="_blank" rel="noopener noreferrer" className="btn btn-white">{BOOK_CALL_LABEL}</a>
        </div>
      </section>

      {related.length > 0 && (
        <section className="related-services">
          <div className="related-services-inner">
            <h2>Other outpatient specialties</h2>
            <div className="related-services-grid">
              {related.map((s) => (
                <Link key={s.slug} href={`/specialties/${s.slug}`} className="related-service-card">
                  <div className="related-service-card-title">{s.title}</div>
                  <span className="related-service-card-arrow">Learn more →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </>
  );
}
