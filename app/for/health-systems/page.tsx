import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";
import { BOOK_CALL_HREF, BOOK_CALL_LABEL } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Outpatient groups, not health-system IT",
  description:
    "Harine Management works with independent and physician-owned outpatient groups on athenahealth or eClinicalWorks. This is not a health-system IT engagement.",
  alternates: { canonical: "/for/health-systems" },
  robots: { index: false, follow: true },
};

export default function ForHealthSystemsPage() {
  return (
    <>
      <Nav />
      <section className="service-hero">
        <div className="service-hero-inner">
          <div className="eyebrow faint">
            <span className="eyebrow-rule"></span>
            Outpatient groups
          </div>
          <h1>This work is for independent outpatient practices.</h1>
          <p className="service-subhead">
            Harine Management does not pitch health-system IT. The workflow is a practice&apos;s own athenahealth or eClinicalWorks report exports, dropped into that practice&apos;s SharePoint folder.
          </p>
          <p className="body-copy" style={{ marginTop: "28px" }}>
            <Link href="/for/practices" className="service-link">See the practice offer →</Link>
          </p>
        </div>
      </section>
      <section className="service-cta">
        <div className="service-cta-inner">
          <h2>Book a 30-minute call.</h2>
          <p>If you run an outpatient group and Excel is still the reporting system, bring the reports you already export.</p>
          <a href={BOOK_CALL_HREF} target="_blank" rel="noopener noreferrer" className="btn btn-white">{BOOK_CALL_LABEL}</a>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
