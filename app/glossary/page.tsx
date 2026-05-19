import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { glossaryTerms } from "@/data/glossary";

export const metadata: Metadata = {
  title: "Healthcare Analytics Glossary",
  description:
    "Plain-language definitions of 20 healthcare analytics terms — wRVU, AR aging, payer mix, collection rate, EBITDA normalization, and more — written for practice leaders and healthcare investors.",
  alternates: {
    canonical: "/glossary",
  },
  openGraph: {
    title: "Healthcare Analytics Glossary | Harine Management",
    description:
      "Plain-language definitions of the healthcare analytics and revenue cycle terms that practice leaders and PE investors search for most.",
    url: "https://harinemanagement.com/glossary",
    images: [{ url: "/og-image.jpg" }],
  },
};

const termSetSchema = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "@id": "https://harinemanagement.com/glossary#termset",
  name: "Healthcare Analytics Glossary | Harine Management",
  description:
    "Plain-language definitions of healthcare analytics and revenue cycle terms for practice leaders and healthcare investors.",
  url: "https://harinemanagement.com/glossary",
  inLanguage: "en-US",
  publisher: {
    "@type": "Organization",
    "@id": "https://harinemanagement.com/#organization",
    name: "Harine Management",
    url: "https://harinemanagement.com",
  },
  hasDefinedTerm: glossaryTerms.map((t) => ({
    "@type": "DefinedTerm",
    "@id": `https://harinemanagement.com/glossary/${t.slug}#term`,
    name: t.term,
    description: t.shortDefinition,
    url: `https://harinemanagement.com/glossary/${t.slug}`,
  })),
};

// Sort alphabetically for display
const sorted = [...glossaryTerms].sort((a, b) =>
  a.term.localeCompare(b.term)
);

// Group by first letter
const grouped = sorted.reduce<Record<string, typeof sorted>>((acc, term) => {
  const letter = term.term[0].toUpperCase();
  if (!acc[letter]) acc[letter] = [];
  acc[letter].push(term);
  return acc;
}, {});

const letters = Object.keys(grouped).sort();

export default function GlossaryPage() {
  return (
    <>
      <JsonLd schema={termSetSchema} />
      <Nav />

      <section className="services-index-hero">
        <div className="services-index-hero-inner">
          <div className="eyebrow faint">
            <span className="eyebrow-rule"></span>
            Glossary
          </div>
          <h1>Healthcare analytics terms, defined.</h1>
          <p>
            Plain-language definitions of the revenue cycle, productivity, and investment terms that matter most — written to be quoted, not paraphrased.
          </p>
        </div>
      </section>

      <div className="services-index-body">
        <div className="services-index-inner">

          {/* A–Z jump links */}
          <div className="glossary-alpha-nav">
            {letters.map((letter) => (
              <a key={letter} href={`#letter-${letter}`} className="glossary-alpha-link">
                {letter}
              </a>
            ))}
          </div>

          {/* Term groups */}
          {letters.map((letter) => (
            <div key={letter} id={`letter-${letter}`} className="glossary-group">
              <div className="glossary-group-letter">{letter}</div>
              <div className="services-index-grid">
                {grouped[letter].map((term) => (
                  <Link
                    key={term.slug}
                    href={`/glossary/${term.slug}`}
                    className="services-index-card"
                  >
                    <div className="services-index-card-title">{term.term}</div>
                    <div className="services-index-card-desc">{term.shortDefinition}</div>
                    <div className="services-index-card-link">Read definition →</div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="service-cta">
        <div className="service-cta-inner">
          <h2>Put these metrics to work in your practice.</h2>
          <p>
            Every engagement starts with a 30-minute discovery call — we&apos;ll look at your EHR data and show you exactly where the gaps are.
          </p>
          <a href="https://calendly.com/dev-harinemanagement/30min" target="_blank" rel="noopener noreferrer" className="btn btn-white">
            Schedule a Discovery Call
          </a>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
