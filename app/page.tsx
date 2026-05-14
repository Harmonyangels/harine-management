import Image from "next/image";
import JsonLd from "@/components/JsonLd";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://harinemanagement.com/#webpage",
  name: "Healthcare Data Analytics for Medical Practices & Investors | Harine Management",
  url: "https://harinemanagement.com",
  description:
    "Harine Management builds AI-enhanced analytics systems for medical practices and private equity firms doing healthcare due diligence. Based in Atlanta, serving practices nationwide.",
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
              Healthcare Data Analytics
            </div>
            <h1 className="hero-title">
              Analytics built<br />for <em>decisions,</em><br />not just reports.
            </h1>
            <p className="hero-sub">
              We take your EHR data and build dashboards your leadership actually opens every morning. Real-time visibility into volume, revenue, and provider performance — without the manual exports.
            </p>
            <div className="hero-actions">
              <a href="https://calendly.com/dev-harinemanagement/30min" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Book a Discovery Call</a>
              <a href="#investors" className="btn btn-secondary">For PE &amp; Investors →</a>
              <a href="/score" className="btn btn-score">Check Your Practice Health Score — Free, 3-minute assessment →</a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="dashboard-mock">
              <div className="dash-topbar">
                <div className="dot dot-red"></div>
                <div className="dot dot-yellow"></div>
                <div className="dot dot-green"></div>
                <div className="dash-brandbar">Harine · Practice Dashboard</div>
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
                    <div className="kpi-delta">↑ 12.4% vs prior</div>
                  </div>
                  <div className="kpi-card">
                    <div className="kpi-label">wRVU / Provider</div>
                    <div className="kpi-value">342.6</div>
                    <div className="kpi-delta">↑ 8.1% YoY</div>
                  </div>
                  <div className="kpi-card">
                    <div className="kpi-label">Collection Rate</div>
                    <div className="kpi-value">94.2%</div>
                    <div className="kpi-delta neutral">Stable</div>
                  </div>
                </div>
                <div className="chart-row">
                  <div className="chart-area">
                    <div className="chart-lbl">Daily Volume — Last 14 Days</div>
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
                    <div className="spark-sub">↑ 3.2% vs last qtr</div>
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
                <div className="badge-text">0 manual exports</div>
                <div className="badge-sub">Data refreshes automatically</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="trust-bar">
        <div className="trust-inner">
          <div className="trust-item">
            <div className="trust-value">0</div>
            <div className="trust-label">Manual exports after<br />going live</div>
          </div>
          <div className="trust-item">
            <div className="trust-value">14</div>
            <div className="trust-label">Days to first<br />live dashboard</div>
          </div>
          <div className="trust-item">
            <div className="trust-value">94%</div>
            <div className="trust-label">Average collection<br />rate across clients</div>
          </div>
          <div className="trust-item">
            <div className="trust-value">+18%</div>
            <div className="trust-label">Average MoM volume<br />visibility improvement</div>
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <section id="services">
        <div className="container">
          <div className="section-header">
            <div className="eyebrow"><span className="eyebrow-rule"></span>What We Build</div>
            <h2 className="section-title">Intelligence systems for<br /><em>medical practices.</em></h2>
            <p className="section-sub">We don&apos;t sell software. We build the data infrastructure your practice needs to run like the business it actually is — and we maintain it.</p>
          </div>
          <div className="services-grid">

            <div className="service-card featured">
              <div className="service-icon crimson">📊</div>
              <div className="service-tag crimson">Flagship Product</div>
              <h3>Practice Analytics System</h3>
              <p>End-to-end analytics infrastructure from your EHR to executive dashboards. Volume, revenue, provider performance, and trend data — in one place, updated daily.</p>
              <ul className="service-list">
                <li>Daily patient volume by provider, location &amp; visit type</li>
                <li>wRVU tracking and provider productivity benchmarks</li>
                <li>MoM and YoY trend analysis built in</li>
                <li>Executive summary view for leadership</li>
              </ul>
              <a href="#contact" className="service-link">See how it works →</a>
            </div>

            <div className="service-card secondary">
              <div className="service-icon terra">💰</div>
              <div className="service-tag terra">Revenue Intelligence</div>
              <h3>Revenue Cycle Analytics</h3>
              <p>Collection rates, AR aging, denial patterns, and payer mix — all the financial signals that tell you if the revenue is real before you feel it in your bank account.</p>
              <ul className="service-list terra">
                <li>AR aging buckets with provider-level drill-down</li>
                <li>Payer mix analysis and reimbursement rate tracking</li>
                <li>Denial pattern identification and trend alerts</li>
                <li>Net revenue per visit by payer and CPT code</li>
              </ul>
              <a href="#contact" className="service-link terra">Learn more →</a>
            </div>

            <div className="service-card tertiary">
              <div className="service-icon ink">🔍</div>
              <div className="service-tag ink">For PE &amp; Investors</div>
              <h3>Acquisition Due Diligence</h3>
              <p>Before you close, you need to know if the revenue is real. We find out. Fast, structured data analysis of target practices — the kind that holds up in a data room.</p>
              <ul className="service-list">
                <li>Historical volume and revenue trend analysis</li>
                <li>Provider concentration and key-person risk</li>
                <li>Payer mix quality and reimbursement trajectory</li>
                <li>Operational benchmarking vs. comparable practices</li>
              </ul>
              <a href="#investors" className="service-link">Built for investors →</a>
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
                Most practices are running on Excel exports, weekly email reports, and gut feel. Your EHR has the data. We just connect it to a dashboard your CMO checks before their first meeting of the day.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '36px' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '14px', color: 'var(--ink-mid)', lineHeight: '1.6' }}>
                  <span style={{ color: 'var(--crimson)', fontWeight: 600, flexShrink: 0, marginTop: '1px' }}>→</span>
                  Works with your existing EHR — no rip-and-replace
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '14px', color: 'var(--ink-mid)', lineHeight: '1.6' }}>
                  <span style={{ color: 'var(--crimson)', fontWeight: 600, flexShrink: 0, marginTop: '1px' }}>→</span>
                  Up and running in 14 days, not 14 weeks
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '14px', color: 'var(--ink-mid)', lineHeight: '1.6' }}>
                  <span style={{ color: 'var(--crimson)', fontWeight: 600, flexShrink: 0, marginTop: '1px' }}>→</span>
                  We manage it — you open it
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '14px', color: 'var(--ink-mid)', lineHeight: '1.6' }}>
                  <span style={{ color: 'var(--crimson)', fontWeight: 600, flexShrink: 0, marginTop: '1px' }}>→</span>
                  Priced for multi-site medical groups, not enterprise health systems
                </li>
              </ul>
              <a href="https://calendly.com/dev-harinemanagement/30min" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Book a Discovery Call</a>
            </div>

            <div>
              <div className="practice-visual">
                <div className="practice-topbar">
                  <div className="practice-tb-brand">Practice Overview</div>
                  <div className="practice-tb-tag">Live · Updated daily</div>
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
                      <span className="name">Dr. Patel, A.</span>
                      <span>312</span>
                      <span>387.4</span>
                      <span className="delta">+14%</span>
                    </div>
                    <div className="pt-row">
                      <span className="name">Dr. Nguyen, T.</span>
                      <span>288</span>
                      <span>342.1</span>
                      <span className="delta">+8%</span>
                    </div>
                    <div className="pt-row">
                      <span className="name">Dr. Williams, K.</span>
                      <span>264</span>
                      <span>298.6</span>
                      <span style={{ fontSize: '10px', color: 'var(--ink-faint)' }}>−2%</span>
                    </div>
                    <div className="pt-row">
                      <span className="name">Dr. Chen, R.</span>
                      <span>241</span>
                      <span>311.8</span>
                      <span className="delta">+5%</span>
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
                We&apos;ve run healthcare businesses. We know what due diligence misses and what a management team can hide in a spreadsheet. Our diligence analytics surface the signals that determine if a practice is worth the price.
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
              <a href="https://calendly.com/dev-harinemanagement/30min" target="_blank" rel="noopener noreferrer" className="btn btn-terra">Talk to Our Team →</a>
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
                <div className="inv-footer">Harine Management LLC · Confidential Diligence Output · April 2026</div>
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
            <h2 className="section-title">From EHR to<br /><em>live dashboard</em><br />in 14 days.</h2>
          </div>
          <div className="steps">
            <div className="step">
              <div className="step-num">01</div>
              <h4>Discovery Call</h4>
              <p>We learn your EHR stack, what metrics matter to your leadership, and what decisions the data needs to support. No sales deck — just the right questions.</p>
            </div>
            <div className="step">
              <div className="step-num">02</div>
              <h4>Data Access &amp; Extraction</h4>
              <p>We connect to your EHR through approved export pipelines. No disruption to clinical operations, no PHI stored on our end. HIPAA-compliant from day one.</p>
            </div>
            <div className="step">
              <div className="step-num">03</div>
              <h4>Build &amp; Configure</h4>
              <p>We build your dashboard in your environment — typically Tableau, Power BI, or Looker depending on what your team already uses. You own the output.</p>
            </div>
            <div className="step">
              <div className="step-num">04</div>
              <h4>Go Live &amp; Maintain</h4>
              <p>We train your team, hand off the dashboard, and maintain the data pipeline. When something breaks or you need a new view, you call us.</p>
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <div className="quote-section">
        <div className="quote-blob"></div>
        <div className="quote-blob2"></div>
        <div className="quote-inner">
          <span className="quote-mark">&ldquo;</span>
          <p className="quote-text">The data was there. We just couldn&apos;t see it. Now our leadership team makes decisions in the Monday standup that used to take three days of back-and-forth with our billing team.</p>
          <div className="quote-attr">CMO, Multi-Site Medical Group · Georgia</div>
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
                We&apos;ve run healthcare businesses.<br />We built the data systems<br />we <em>wished we had.</em>
              </h2>
              <p className="cta-sub">
                Now we build them for you. If you&apos;re a medical group that needs real-time visibility into your practice, or a PE firm that needs to know what you&apos;re buying — let&apos;s have a 30-minute call. No pitch. Just the right conversation.
              </p>
              <div className="cta-actions">
                <a href="https://calendly.com/dev-harinemanagement/30min" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Book a Discovery Call</a>
                <a href="https://calendly.com/dev-harinemanagement/30min" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Book a Free Call</a>
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
