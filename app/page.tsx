import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";
import { BOOK_CALL_HREF, BOOK_CALL_LABEL, DIAGNOSTIC_PATH } from "@/lib/contact";

export const metadata: Metadata = {
  title: {
    absolute: "Medical Practice Analytics in Atlanta | Harine Management",
  },
  description:
    "Stop rebuilding practice reports in Excel. Power BI dashboards from athenahealth and eClinicalWorks data. Atlanta healthcare consulting. $2,500 diagnostic, done in under a week.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Medical Practice Analytics in Atlanta | Harine Management",
    description:
      "Power BI dashboards for medical practices, from athenahealth and eClinicalWorks. A $2,500 Practice Operational Diagnostic, finished in under a week.",
    url: "https://harinemanagement.com",
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://harinemanagement.com/#webpage",
  name: "Healthcare Data Analytics for Medical Practices & Investors | Harine Management",
  url: "https://harinemanagement.com",
  description:
    "Medical practice analytics in Atlanta. Power BI dashboards from athenahealth and eClinicalWorks, plus a fixed-price operational diagnostic.",
  inLanguage: "en-US",
  publisher: {
    "@type": "Organization",
    "@id": "https://harinemanagement.com/#organization",
    name: "Harine Management",
    url: "https://harinemanagement.com",
  },
};

const practiceAnalyticsSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://harinemanagement.com/#service-practice-analytics",
  name: "Practice Analytics System",
  description:
    "End-to-end analytics infrastructure from your EHR to executive dashboards. Volume, revenue, provider performance, and trend data — in one place, updated daily.",
  serviceType: "Healthcare Data Analytics",
  provider: {
    "@type": "Organization",
    "@id": "https://harinemanagement.com/#organization",
    name: "Harine Management",
    url: "https://harinemanagement.com",
  },
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  url: "https://harinemanagement.com/#services",
};

const revenueCycleSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://harinemanagement.com/#service-revenue-cycle",
  name: "Revenue Cycle Analytics",
  description:
    "Collection rates, AR aging, denial patterns, and payer mix — all the financial signals that tell you if the revenue is real before you feel it in your bank account.",
  serviceType: "Healthcare Revenue Cycle Analytics",
  provider: {
    "@type": "Organization",
    "@id": "https://harinemanagement.com/#organization",
    name: "Harine Management",
    url: "https://harinemanagement.com",
  },
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  url: "https://harinemanagement.com/#services",
};

const dueDiligenceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://harinemanagement.com/#service-due-diligence",
  name: "Acquisition Due Diligence",
  description:
    "Fast, structured data analysis of target medical practices — EHR-level extraction, provider concentration risk, payer mix quality, and deliverable-ready output for PE data rooms.",
  serviceType: "Healthcare Due Diligence Analytics",
  provider: {
    "@type": "Organization",
    "@id": "https://harinemanagement.com/#organization",
    name: "Harine Management",
    url: "https://harinemanagement.com",
  },
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  url: "https://harinemanagement.com/#investors",
};

export default function Home() {
  return (
    <>
      <JsonLd schema={webPageSchema} />
      <JsonLd schema={practiceAnalyticsSchema} />
      <JsonLd schema={revenueCycleSchema} />
      <JsonLd schema={dueDiligenceSchema} />

      {/* NAVIGATION */}
      <Nav />

      {/* HERO */}
      <section className="hero" id="top">
        <div className="hero-blob1"></div>
        <div className="hero-blob2"></div>
        <div className="hero-inner">
          <div>
            <div className="hero-label eyebrow">
              <span className="eyebrow-rule"></span>
              Medical practice analytics · Atlanta
            </div>
            <h1 className="hero-title">
              Stop rebuilding your practice reports in Excel every week.
            </h1>
            <p className="hero-sub">
              Get automated Power BI dashboards from your athenahealth or eClinicalWorks data — volume, collections, and provider productivity, without another spreadsheet.
            </p>
            <div className="hero-actions">
              <Link href={DIAGNOSTIC_PATH} className="btn btn-primary">Start with the $2,500 diagnostic</Link>
              <a href={BOOK_CALL_HREF} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">{BOOK_CALL_LABEL}</a>
            </div>
            <p className="hero-note">
              The diagnostic is a fixed-price review of your reporting, revenue cycle, and operations data. Written findings and a prioritized fix plan, in under a week.
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
                  <div className="dash-greeting">Good Morning — Week 17</div>
                  <div className="dash-heading">Practice Performance</div>
                </div>
                <div className="kpi-grid">
                  <div className="kpi-card">
                    <div className="kpi-label">Volume MTD</div>
                    <div className="kpi-value">2,847</div>
                    <div className="kpi-delta">Sample</div>
                  </div>
                  <div className="kpi-card">
                    <div className="kpi-label">wRVU / Provider</div>
                    <div className="kpi-value">342.6</div>
                    <div className="kpi-delta">Sample</div>
                  </div>
                  <div className="kpi-card">
                    <div className="kpi-label">Reporting time</div>
                    <div className="kpi-value">Minutes</div>
                    <div className="kpi-delta neutral">Was 15–20 hrs</div>
                  </div>
                </div>
                <div className="chart-row">
                  <div className="chart-area">
                    <div className="chart-lbl">Daily volume — recent days</div>
                    <div className="chart-bars">
                      <div className="bar" style={{ height: '55%', background: 'var(--terra-mid)', opacity: 0.5 }}></div>
                      <div className="bar" style={{ height: '70%', background: 'var(--terra)', opacity: 0.6 }}></div>
                      <div className="bar" style={{ height: '60%', background: 'var(--terra-mid)', opacity: 0.5 }}></div>
                      <div className="bar" style={{ height: '80%', background: 'var(--crimson)', opacity: 0.75 }}></div>
                      <div className="bar" style={{ height: '65%', background: 'var(--terra)', opacity: 0.6 }}></div>
                      <div className="bar" style={{ height: '90%', background: 'var(--crimson)', opacity: 0.85 }}></div>
                      <div className="bar" style={{ height: '75%', background: 'var(--terra)', opacity: 0.65 }}></div>
                      <div className="bar" style={{ height: '88%', background: 'var(--crimson)', opacity: 0.8 }}></div>
                      <div className="bar" style={{ height: '70%', background: 'var(--terra-mid)', opacity: 0.55 }}></div>
                      <div className="bar" style={{ height: '95%', background: 'var(--crimson)', opacity: 0.9 }}></div>
                      <div className="bar" style={{ height: '82%', background: 'var(--terra)', opacity: 0.7 }}></div>
                      <div className="bar" style={{ height: '78%', background: 'var(--terra-mid)', opacity: 0.6 }}></div>
                      <div className="bar" style={{ height: '100%', background: 'var(--crimson)', opacity: 0.95 }}></div>
                      <div className="bar" style={{ height: '88%', background: 'var(--terra)', opacity: 0.75 }}></div>
                    </div>
                  </div>
                  <div className="spark-area">
                    <div className="spark-lbl">AR Aging &lt;30d</div>
                    <div className="spark-val">78.3%</div>
                    <div className="spark-sub">Sample figure</div>
                    <div className="spark-line">
                      <svg viewBox="0 0 80 30" fill="none" width="100%">
                        <path d="M0 25 L12 20 L24 22 L36 14 L48 16 L60 8 L72 10 L80 4" stroke="var(--terra-light)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                        <path d="M0 25 L12 20 L24 22 L36 14 L48 16 L60 8 L72 10 L80 4 L80 30 L0 30Z" fill="var(--terra-light)" opacity={0.08} />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hero-badge">
              <div className="badge-icon">⚡</div>
              <div>
                <div className="badge-text">Scheduled refresh</div>
                <div className="badge-sub">Sample layout, not a result</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="trust-bar">
        <div className="trust-inner trust-single">
          <p className="trust-note">
            For one practice, weekly reporting that took a practice manager 15 to 20 hours now takes minutes.
          </p>
          <p className="trust-note-sub">
            Power BI, from athenahealth or eClinicalWorks. Based in Atlanta, working with practices across the Southeast.
          </p>
        </div>
      </div>

      {/* CREDIBILITY STRIP */}
      <div className="expertise-strip">
        <div className="expertise-strip-inner">
          <span className="expertise-strip-label">Works in:</span>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--ink-mid)', background: 'var(--white)', border: '1.5px solid var(--stone)', borderRadius: '999px', padding: '6px 16px' }}>eClinicalWorks (ECW)</span>
            <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--ink-mid)', background: 'var(--white)', border: '1.5px solid var(--stone)', borderRadius: '999px', padding: '6px 16px' }}>Athena Health / AthenaOne</span>
            <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--ink-mid)', background: 'var(--white)', border: '1.5px solid var(--stone)', borderRadius: '999px', padding: '6px 16px' }}>Power BI</span>
            <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--ink-mid)', background: 'var(--white)', border: '1.5px solid var(--stone)', borderRadius: '999px', padding: '6px 16px' }}>Snowflake</span>
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <section id="services">
        <div className="container">
          <div className="section-header">
            <div className="eyebrow"><span className="eyebrow-rule"></span>What we do</div>
            <h2 className="section-title">Start with a diagnostic.<br /><em>Then decide.</em></h2>
            <p className="section-sub">The diagnostic is the way in. Dashboards, revenue cycle work, diligence, and RCM repair are still here if the findings call for them.</p>
          </div>
          <div className="services-grid">

            <div className="service-card featured" id="diagnostic">
              <div className="service-icon crimson">01</div>
              <div className="service-tag crimson">Start here · $2,500</div>
              <h3>Practice Operational Diagnostic</h3>
              <p>A scoped review of your reporting, revenue cycle, and operations data. Written findings and a prioritized fix plan, finished in under a week.</p>
              <ul className="service-list">
                <li>Fixed price, $2,500</li>
                <li>Uses the reports and EHR exports you already have</li>
                <li>Written findings, not a slide deck</li>
                <li>A prioritized list of what to fix first</li>
              </ul>
              <Link href={DIAGNOSTIC_PATH} className="service-link">See the diagnostic →</Link>
            </div>

            <div className="service-card secondary">
              <div className="service-icon terra">02</div>
              <div className="service-tag terra">Dashboards</div>
              <h3>Practice Analytics System</h3>
              <p>Power BI dashboards from your athenahealth or eClinicalWorks data. Volume, revenue, provider productivity, and trends, refreshed on a schedule.</p>
              <ul className="service-list terra">
                <li>Daily patient volume by provider, location, and visit type</li>
                <li>wRVU tracking against the goal you already use</li>
                <li>Month-over-month and year-over-year trends</li>
                <li>One view for the Monday meeting</li>
              </ul>
              <Link href="/services/practice-analytics-system" className="service-link terra">See the dashboard work →</Link>
            </div>

            <div className="service-card tertiary">
              <div className="service-icon ink">03</div>
              <div className="service-tag ink">Revenue cycle</div>
              <h3>Revenue Cycle Analytics</h3>
              <p>Collection rate, AR aging, denial patterns, and payer mix, from the billing data in the EHR, so finance is not waiting on a monthly export.</p>
              <ul className="service-list">
                <li>AR aging by provider and payer</li>
                <li>Payer mix and reimbursement rate tracking</li>
                <li>Denial patterns by CPT code</li>
                <li>Net revenue per visit by payer and code</li>
              </ul>
              <Link href="/services/revenue-cycle-analytics" className="service-link">See revenue cycle analytics →</Link>
            </div>

            <div className="service-card featured">
              <div className="service-icon crimson">04</div>
              <div className="service-tag crimson">For investors</div>
              <h3>Acquisition Due Diligence</h3>
              <p>EHR-level review of a target practice for healthcare investors. Encounter data, not the management summary, written up for the data room.</p>
              <ul className="service-list">
                <li>Volume and revenue trends from encounter data</li>
                <li>Provider concentration and key-person risk</li>
                <li>Payer mix and reimbursement trajectory</li>
                <li>Timeline set to the deal calendar</li>
              </ul>
              <Link href="/services/due-diligence-analytics" className="service-link">See diligence analytics →</Link>
            </div>

            <div className="service-card tertiary">
              <div className="service-icon ink">05</div>
              <div className="service-tag ink">RCM</div>
              <h3>RCM Fix &amp; Revenue Recovery</h3>
              <p>Denials, slow collections, and credentialing gaps. We look for the cause in the eClinicalWorks or athenahealth workflow and work the fix with you. Price is a fixed quote after the diagnostic.</p>
              <a href={BOOK_CALL_HREF} className="service-link" target="_blank" rel="noopener noreferrer">{BOOK_CALL_LABEL} →</a>
            </div>

          </div>
        </div>
      </section>

      {/* FOR PRACTICES */}
      <section className="alt" id="practices">
        <div className="container">
          <div className="split">
            <div>
              <div className="eyebrow" style={{ marginBottom: '20px' }}>
                <span className="eyebrow-rule"></span>For Medical Practices
              </div>
              <h2 className="section-title">
                Your leadership deserves<br />a dashboard they<br /><em>actually open.</em>
              </h2>
              <p style={{ fontSize: '16px', fontWeight: 300, color: 'var(--ink-muted)', lineHeight: '1.75', marginBottom: '28px' }}>
                Most practices are still exporting from the EHR and rebuilding the same workbook every week. The data is already in athenahealth or eClinicalWorks. A dashboard is there so someone can open it instead of rebuilding it.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '36px' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '14px', color: 'var(--ink-mid)', lineHeight: '1.6' }}>
                  <span style={{ color: 'var(--crimson)', fontWeight: 600, flexShrink: 0, marginTop: '1px' }}>→</span>
                  Works with your existing EHR — no rip-and-replace
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '14px', color: 'var(--ink-mid)', lineHeight: '1.6' }}>
                  <span style={{ color: 'var(--crimson)', fontWeight: 600, flexShrink: 0, marginTop: '1px' }}>→</span>
                  athenahealth and eClinicalWorks. No system replacement.
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '14px', color: 'var(--ink-mid)', lineHeight: '1.6' }}>
                  <span style={{ color: 'var(--crimson)', fontWeight: 600, flexShrink: 0, marginTop: '1px' }}>→</span>
                  We manage it — you open it
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '14px', color: 'var(--ink-mid)', lineHeight: '1.6' }}>
                  <span style={{ color: 'var(--crimson)', fontWeight: 600, flexShrink: 0, marginTop: '1px' }}>→</span>
                  Priced for independent and multi-site groups, not a health-system IT project
                </li>
              </ul>
              <a href={BOOK_CALL_HREF} className="btn btn-primary" target="_blank" rel="noopener noreferrer">{BOOK_CALL_LABEL}</a>
            </div>

            <div>
              <div className="practice-visual">
                <div className="practice-topbar">
                  <div className="practice-tb-brand">Practice Overview</div>
                  <div className="practice-tb-tag">Sample layout</div>
                </div>
                <div className="practice-body">
                  <div className="practice-kpi-row">
                    <div className="p-kpi">
                      <div className="p-kpi-lbl">Visits This Month</div>
                      <div className="p-kpi-val">2,847</div>
                      <div className="p-kpi-del">↑ 12.4% vs prior month</div>
                    </div>
                    <div className="p-kpi">
                      <div className="p-kpi-lbl">Avg wRVU / Day</div>
                      <div className="p-kpi-val">48.2</div>
                      <div className="p-kpi-del">↑ 5.1% vs last year</div>
                    </div>
                  </div>
                  <div className="provider-table">
                    <div className="pt-header">
                      <span>Provider</span>
                      <span>Visits</span>
                      <span>wRVU</span>
                      <span>vs Goal</span>
                    </div>
                    <div className="pt-row">
                      <span className="name">Provider A</span>
                      <span>312</span>
                      <span>387.4</span>
                      <span className="delta">Sample</span>
                    </div>
                    <div className="pt-row">
                      <span className="name">Provider B</span>
                      <span>288</span>
                      <span>342.1</span>
                      <span className="delta">Sample</span>
                    </div>
                    <div className="pt-row">
                      <span className="name">Provider C</span>
                      <span>264</span>
                      <span>298.6</span>
                      <span style={{ fontSize: '10px', color: 'var(--ink-faint)' }}>Sample</span>
                    </div>
                    <div className="pt-row">
                      <span className="name">Provider D</span>
                      <span>241</span>
                      <span>311.8</span>
                      <span className="delta">Sample</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOR INVESTORS */}
      <section id="investors">
        <div className="container">
          <div className="split reverse">
            <div>
              <div className="eyebrow terra" style={{ marginBottom: '20px' }}>
                <span className="eyebrow-rule"></span>For PE &amp; Investors
              </div>
              <h2 className="section-title">
                Before you close,<br />know if the <em>revenue<br />is real.</em>
              </h2>
              <p style={{ fontSize: '16px', fontWeight: 300, color: 'var(--ink-muted)', lineHeight: '1.75', marginBottom: '28px' }}>
                Management financials show what the seller prepared. Encounter data shows volume, payer mix, and which providers the revenue depends on. The written report is what goes in the data room.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '36px' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '14px', color: 'var(--ink-mid)', lineHeight: '1.6' }}>
                  <span style={{ color: 'var(--terra)', fontWeight: 600, flexShrink: 0, marginTop: '1px' }}>→</span>
                  EHR-level data extraction — not just what management provides
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '14px', color: 'var(--ink-mid)', lineHeight: '1.6' }}>
                  <span style={{ color: 'var(--terra)', fontWeight: 600, flexShrink: 0, marginTop: '1px' }}>→</span>
                  Provider concentration and single-point-of-failure analysis
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '14px', color: 'var(--ink-mid)', lineHeight: '1.6' }}>
                  <span style={{ color: 'var(--terra)', fontWeight: 600, flexShrink: 0, marginTop: '1px' }}>→</span>
                  Payer mix quality scoring and reimbursement trend projection
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '14px', color: 'var(--ink-mid)', lineHeight: '1.6' }}>
                  <span style={{ color: 'var(--terra)', fontWeight: 600, flexShrink: 0, marginTop: '1px' }}>→</span>
                  Deliverable-ready output that holds up in a data room
                </li>
              </ul>
              <a href={BOOK_CALL_HREF} className="btn btn-terra" target="_blank" rel="noopener noreferrer">{BOOK_CALL_LABEL}</a>
            </div>

            <div>
              <div className="investor-visual">
                <div className="inv-header">
                  <div className="inv-eyebrow">Due Diligence Report · Target Practice</div>
                  <div className="inv-title">Revenue integrity <em>before</em><br />you sign the LOI.</div>
                </div>
                <div className="inv-metrics">
                  <div className="inv-metric">
                    <span className="inv-metric-name">3-Year Revenue Trend</span>
                    <span className="inv-metric-val">+22.4%</span>
                    <span className="inv-metric-flag flag-ok">Healthy</span>
                  </div>
                  <div className="inv-metric">
                    <span className="inv-metric-name">Provider Concentration (Top 1)</span>
                    <span className="inv-metric-val">41%</span>
                    <span className="inv-metric-flag flag-warn">Review</span>
                  </div>
                  <div className="inv-metric">
                    <span className="inv-metric-name">Medicare/Medicaid Mix</span>
                    <span className="inv-metric-val">68%</span>
                    <span className="inv-metric-flag flag-ok">Acceptable</span>
                  </div>
                  <div className="inv-metric">
                    <span className="inv-metric-name">AR Aging &gt;90 Days</span>
                    <span className="inv-metric-val">18.3%</span>
                    <span className="inv-metric-flag flag-risk">Elevated</span>
                  </div>
                  <div className="inv-metric">
                    <span className="inv-metric-name">Avg Net Revenue / Visit</span>
                    <span className="inv-metric-val">$214</span>
                    <span className="inv-metric-flag flag-ok">At Market</span>
                  </div>
                </div>
                <div className="inv-footer">Illustrative sample · not a client engagement</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="alt" id="how-it-works">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
            <div className="eyebrow" style={{ justifyContent: 'center' }}>
              <span className="eyebrow-rule"></span>The Process<span className="eyebrow-rule"></span>
            </div>
            <h2 className="section-title">From the call<br />to a <em>written scope.</em></h2>
          </div>
          <div className="steps">
            <div className="step">
              <div className="step-num">01</div>
              <h4>30-minute call</h4>
              <p>Which EHR you use, what gets rebuilt in Excel, and which decision is stuck. If a diagnostic is the wrong first step, we&apos;ll say so.</p>
            </div>
            <div className="step">
              <div className="step-num">02</div>
              <h4>Minimum-necessary access</h4>
              <p>We ask only for the fields the work needs. Engagements can be done under a business associate agreement. Clinical work is not interrupted.</p>
            </div>
            <div className="step">
              <div className="step-num">03</div>
              <h4>The scoped work</h4>
              <p>A diagnostic, a Power BI dashboard, or a diligence memo. The deliverable and the timing are written down before the work starts. Default tool is Power BI.</p>
            </div>
            <div className="step">
              <div className="step-num">04</div>
              <h4>You keep the output</h4>
              <p>A written report, or a dashboard in your environment. If we build a pipeline, we maintain it. If you need another view, you call.</p>
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <div className="quote-section">
        <div className="quote-blob"></div>
        <div className="quote-blob2"></div>
        <div className="quote-inner">
          <p className="quote-text">For one practice, weekly reporting that took a practice manager 15 to 20 hours now takes minutes.</p>
          <div className="quote-attr">After the weekly Excel rebuild was replaced with a dashboard.</div>
        </div>
      </div>

      {/* CTA */}
      <section className="cta-section" id="contact">
        <div className="container">
          <div className="cta-inner">
            <div className="cta-left">
              <div className="eyebrow" style={{ marginBottom: '20px' }}>
                <span className="eyebrow-rule"></span>Let&apos;s Talk
              </div>
              <h2 className="cta-title">
                Book a 30-minute call.<br />Or start with the<br /><em>$2,500 diagnostic.</em>
              </h2>
              <p className="cta-sub">
                Tell us how reporting works today. The diagnostic covers reporting, revenue cycle, and operations data, and ends with a written findings report and a prioritized fix plan, in under a week.
              </p>
              <div className="cta-actions">
                <a href={BOOK_CALL_HREF} className="btn btn-primary" target="_blank" rel="noopener noreferrer">{BOOK_CALL_LABEL}</a>
                <Link href={DIAGNOSTIC_PATH} className="btn btn-ghost">Read the diagnostic scope</Link>
              </div>
            </div>

            <div className="cta-right">
              <div className="contact-card">
                <div className="contact-icon crimson">✉️</div>
                <div>
                  <div className="contact-label">Email</div>
                  <a href="mailto:dev@harinemanagement.com" className="contact-value">dev@harinemanagement.com</a>
                  <div className="contact-note">Replies within one business day</div>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-icon terra">📞</div>
                <div>
                  <div className="contact-label">Phone</div>
                  <a href="tel:6822563389" className="contact-value">682-256-3389</a>
                  <div className="contact-note">Available Mon–Fri, 9am–6pm ET</div>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-icon crimson">📍</div>
                <div>
                  <div className="contact-label">Location</div>
                  <div className="contact-value" style={{ fontSize: '14px' }}>Atlanta, Georgia</div>
                  <div className="contact-note">Serving practices across the Southeast</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <SiteFooter />
    </>
  );
}
