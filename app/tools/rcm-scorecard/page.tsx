"use client";

import { useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";

type Status = "green" | "yellow" | "red";

interface MetricConfig {
  id: string;
  label: string;
  benchmark: string;
  source: string;
  explanation: string;
  inputType: "number" | "dropdown";
  unit?: string;
  placeholder?: string;
  options?: readonly string[];
}

const CONTRACT_OPTIONS = [
  "Within last year",
  "1–3 years ago",
  "3+ years ago",
  "Never",
] as const;

const METRICS: MetricConfig[] = [
  {
    id: "netCollectionRate",
    label: "Net Collection Rate",
    benchmark: "95%+",
    source: "MGMA 2023",
    explanation:
      "The percentage of allowable charges actually collected after contractual adjustments — one of the most critical indicators of billing effectiveness.",
    inputType: "number",
    unit: "%",
    placeholder: "e.g., 92",
  },
  {
    id: "denialRate",
    label: "Denial Rate",
    benchmark: "Below 5%",
    source: "AAPC",
    explanation:
      "Percentage of claims denied by payers on first submission. High denial rates signal coding errors, eligibility issues, or missing documentation.",
    inputType: "number",
    unit: "%",
    placeholder: "e.g., 7",
  },
  {
    id: "daysInAR",
    label: "Days in A/R",
    benchmark: "Under 30 days",
    source: "MGMA 2023",
    explanation:
      "Average number of days it takes to collect payment after a claim is submitted. Lower is better — high days indicate collection delays.",
    inputType: "number",
    unit: "days",
    placeholder: "e.g., 38",
  },
  {
    id: "cleanClaimRate",
    label: "Clean Claim Rate",
    benchmark: "95%+",
    source: "HFMA",
    explanation:
      "Percentage of claims submitted without errors requiring correction before adjudication. Higher rates reduce rework and accelerate payment.",
    inputType: "number",
    unit: "%",
    placeholder: "e.g., 88",
  },
  {
    id: "firstPassRate",
    label: "First-Pass Resolution Rate",
    benchmark: "90%+",
    source: "HFMA",
    explanation:
      "Percentage of claims fully resolved on first submission — paid, denied, or adjusted without resubmission or follow-up.",
    inputType: "number",
    unit: "%",
    placeholder: "e.g., 85",
  },
  {
    id: "appealRate",
    label: "Appeal Rate on Denials",
    benchmark: "75%+",
    source: "AAPC",
    explanation:
      "Percentage of denied claims your team successfully appeals. A low rate means you're leaving recoverable revenue on the table.",
    inputType: "number",
    unit: "%",
    placeholder: "e.g., 55",
  },
  {
    id: "overheadRatio",
    label: "Overhead Ratio",
    benchmark: "Below 55%",
    source: "MGMA 2023",
    explanation:
      "Total operating costs as a percentage of gross revenue. Practices above 55% overhead often have staffing or billing inefficiencies.",
    inputType: "number",
    unit: "%",
    placeholder: "e.g., 62",
  },
  {
    id: "payerContractReview",
    label: "Payer Contract Last Reviewed",
    benchmark: "Within last year",
    source: "Industry best practice",
    explanation:
      "How recently you've reviewed and renegotiated payer contracts. Stale contracts mean you may be accepting below-market reimbursement rates.",
    inputType: "dropdown",
    options: CONTRACT_OPTIONS,
  },
];

function getStatus(id: string, value: string): Status {
  if (id === "payerContractReview") {
    if (value === "Within last year") return "green";
    if (value === "1–3 years ago") return "yellow";
    return "red";
  }
  const num = parseFloat(value);
  if (isNaN(num)) return "red";
  switch (id) {
    case "netCollectionRate":
      return num >= 95 ? "green" : num >= 85.5 ? "yellow" : "red";
    case "denialRate":
      return num <= 5 ? "green" : num <= 5.5 ? "yellow" : "red";
    case "daysInAR":
      return num <= 30 ? "green" : num <= 33 ? "yellow" : "red";
    case "cleanClaimRate":
      return num >= 95 ? "green" : num >= 85.5 ? "yellow" : "red";
    case "firstPassRate":
      return num >= 90 ? "green" : num >= 81 ? "yellow" : "red";
    case "appealRate":
      return num >= 75 ? "green" : num >= 67.5 ? "yellow" : "red";
    case "overheadRatio":
      return num <= 55 ? "green" : num <= 60.5 ? "yellow" : "red";
    default:
      return "red";
  }
}

const STATUS_CONFIG: Record<
  Status,
  { label: string; color: string; bg: string; border: string }
> = {
  green: {
    label: "On Benchmark",
    color: "#4EAD7A",
    bg: "rgba(45,122,79,0.12)",
    border: "rgba(45,122,79,0.3)",
  },
  yellow: {
    label: "Close to Benchmark",
    color: "#D4973A",
    bg: "rgba(184,120,32,0.12)",
    border: "rgba(184,120,32,0.3)",
  },
  red: {
    label: "Below Benchmark",
    color: "#E07A5F",
    bg: "rgba(184,48,48,0.12)",
    border: "rgba(184,48,48,0.3)",
  },
};

interface LeadData {
  name: string;
  practice: string;
  email: string;
}

interface MetricResult {
  id: string;
  label: string;
  benchmark: string;
  source: string;
  unit?: string;
  value: string;
  status: Status;
}

function formatValue(value: string, unit?: string): string {
  if (!unit) return value;
  if (unit === "%") return `${value}%`;
  if (unit === "days") return `${value} days`;
  return value;
}

export default function RCMScorecardPage() {
  const [step, setStep] = useState(1);
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [lead, setLead] = useState<LeadData>({ name: "", practice: "", email: "" });
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState<MetricResult[]>([]);
  const [overallScore, setOverallScore] = useState(0);
  const [greenCount, setGreenCount] = useState(0);
  const [enteredCount, setEnteredCount] = useState(0);

  const isLeadValid =
    !!lead.name.trim() &&
    !!lead.practice.trim() &&
    !!lead.email.trim() &&
    lead.email.includes("@");

  async function handleSubmit() {
    if (!isLeadValid) return;
    setSubmitting(true);

    const entered = METRICS.filter((m) => inputs[m.id]?.trim());
    const computed: MetricResult[] = entered.map((m) => ({
      id: m.id,
      label: m.label,
      benchmark: m.benchmark,
      source: m.source,
      unit: m.unit,
      value: inputs[m.id],
      status: getStatus(m.id, inputs[m.id]),
    }));
    const green = computed.filter((r) => r.status === "green").length;
    const score =
      computed.length > 0 ? Math.round((green / computed.length) * 100) : 0;

    setResults(computed);
    setGreenCount(green);
    setEnteredCount(computed.length);
    setOverallScore(score);

    try {
      await fetch("/api/rcm-scorecard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead,
          inputs,
          results: computed,
          overallScore: score,
          greenCount: green,
          totalEntered: computed.length,
        }),
      });
    } catch {
      // Email errors don't block results display
    }

    setSubmitting(false);
    setStep(4);
  }

  const fieldStyle: React.CSSProperties = {
    width: "100%",
    padding: "11px 14px",
    borderRadius: "8px",
    border: "1.5px solid var(--stone)",
    background: "var(--stone-light)",
    color: "var(--ink)",
    fontSize: "15px",
    fontFamily: "inherit",
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    color: "var(--ink-mid)",
    fontSize: "12px",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    marginBottom: "6px",
  };

  // ── Step 1: Intro ────────────────────────────────────────────────────────────

  function renderIntro() {
    return (
      <div style={{ textAlign: "center", padding: "8px 0" }}>
        <div
          className="eyebrow"
          style={{ justifyContent: "center", marginBottom: "24px" }}
        >
          <span className="eyebrow-rule"></span>
          Free RCM Assessment
          <span className="eyebrow-rule"></span>
        </div>
        <h1
          style={{
            fontFamily: "var(--serif)",
            color: "var(--ink)",
            fontSize: "clamp(22px, 4vw, 32px)",
            fontWeight: 400,
            margin: "0 0 16px",
            lineHeight: 1.2,
          }}
        >
          How Does Your Practice&apos;s Billing Performance{" "}
          <em style={{ fontStyle: "italic", color: "var(--crimson)" }}>
            Compare?
          </em>
        </h1>
        <p
          style={{
            color: "var(--ink-muted)",
            fontSize: "16px",
            lineHeight: 1.7,
            margin: "0 auto 40px",
            maxWidth: "440px",
          }}
        >
          Enter your current RCM metrics and see how you stack up against MGMA
          and HFMA benchmarks across 8 key indicators.
        </p>
        <button
          type="button"
          onClick={() => setStep(2)}
          className="btn btn-primary"
          style={{ fontSize: "16px", padding: "16px 44px" }}
        >
          Start Scorecard →
        </button>
        <p
          style={{
            color: "var(--ink-faint)",
            fontSize: "12px",
            marginTop: "20px",
          }}
        >
          Free · All fields optional · Results emailed to you
        </p>
      </div>
    );
  }

  // ── Step 2: Metrics Input ────────────────────────────────────────────────────

  function renderMetrics() {
    return (
      <div>
        <div className="eyebrow" style={{ marginBottom: "16px" }}>
          <span className="eyebrow-rule"></span>
          Your RCM Metrics
        </div>
        <h2
          style={{
            fontFamily: "var(--serif)",
            color: "var(--ink)",
            fontSize: "clamp(18px, 3vw, 24px)",
            fontWeight: 400,
            margin: "0 0 6px",
            lineHeight: 1.3,
          }}
        >
          Enter your current performance data
        </h2>
        <p
          style={{
            color: "var(--ink-muted)",
            fontSize: "14px",
            margin: "0 0 28px",
            lineHeight: 1.6,
          }}
        >
          Fill in only the metrics you know — all fields are optional.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {METRICS.map((metric) => (
            <div
              key={metric.id}
              style={{
                background: "var(--stone-light)",
                border: "1px solid var(--stone)",
                borderRadius: "10px",
                padding: "18px 20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: "16px",
                  marginBottom: "12px",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--ink)",
                      marginBottom: "4px",
                    }}
                  >
                    {metric.label}
                    {metric.unit ? (
                      <span
                        style={{
                          fontSize: "12px",
                          color: "var(--ink-faint)",
                          fontWeight: 400,
                          marginLeft: "6px",
                        }}
                      >
                        ({metric.unit})
                      </span>
                    ) : null}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--ink-faint)",
                      lineHeight: 1.55,
                    }}
                  >
                    {metric.explanation}
                  </div>
                </div>
                <div style={{ flexShrink: 0, textAlign: "right" }}>
                  <div
                    style={{
                      fontSize: "10px",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--crimson)",
                      marginBottom: "3px",
                    }}
                  >
                    Benchmark
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "var(--ink-mid)",
                    }}
                  >
                    {metric.benchmark}
                  </div>
                  <div style={{ fontSize: "10px", color: "var(--ink-faint)" }}>
                    {metric.source}
                  </div>
                </div>
              </div>

              {metric.inputType === "dropdown" ? (
                <select
                  value={inputs[metric.id] ?? ""}
                  onChange={(e) =>
                    setInputs((p) => ({ ...p, [metric.id]: e.target.value }))
                  }
                  style={{ ...fieldStyle, cursor: "pointer" }}
                >
                  <option value="">— Select —</option>
                  {metric.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="number"
                  min="0"
                  max="999"
                  step="0.1"
                  placeholder={metric.placeholder}
                  value={inputs[metric.id] ?? ""}
                  onChange={(e) =>
                    setInputs((p) => ({ ...p, [metric.id]: e.target.value }))
                  }
                  style={fieldStyle}
                />
              )}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "28px",
            paddingTop: "20px",
            borderTop: "1px solid var(--stone)",
          }}
        >
          <button
            type="button"
            onClick={() => setStep(1)}
            style={{
              background: "transparent",
              border: "1.5px solid var(--stone)",
              color: "var(--ink-mid)",
              fontSize: "14px",
              fontFamily: "inherit",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            ← Back
          </button>
          <button
            type="button"
            onClick={() => setStep(3)}
            className="btn btn-primary"
            style={{ fontSize: "15px", padding: "12px 28px" }}
          >
            Continue →
          </button>
        </div>
      </div>
    );
  }

  // ── Step 3: Lead Capture ─────────────────────────────────────────────────────

  function renderLeadCapture() {
    return (
      <div>
        <div className="eyebrow" style={{ marginBottom: "14px" }}>
          <span className="eyebrow-rule"></span>
          Almost There
        </div>
        <h2
          style={{
            fontFamily: "var(--serif)",
            color: "var(--ink)",
            fontSize: "clamp(18px, 3vw, 24px)",
            fontWeight: 400,
            margin: "0 0 8px",
            lineHeight: 1.3,
          }}
        >
          Where should we send your scorecard?
        </h2>
        <p
          style={{
            color: "var(--ink-muted)",
            fontSize: "14px",
            margin: "0 0 28px",
            lineHeight: 1.6,
          }}
        >
          Your personalized scorecard will be emailed as a PDF summary.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div>
            <label style={labelStyle}>
              Full Name{" "}
              <span style={{ color: "var(--crimson)" }}>*</span>
            </label>
            <input
              type="text"
              placeholder="Dr. Jane Smith"
              value={lead.name}
              onChange={(e) =>
                setLead((p) => ({ ...p, name: e.target.value }))
              }
              style={fieldStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>
              Practice Name{" "}
              <span style={{ color: "var(--crimson)" }}>*</span>
            </label>
            <input
              type="text"
              placeholder="Atlanta Family Medicine"
              value={lead.practice}
              onChange={(e) =>
                setLead((p) => ({ ...p, practice: e.target.value }))
              }
              style={fieldStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>
              Email Address{" "}
              <span style={{ color: "var(--crimson)" }}>*</span>
            </label>
            <input
              type="email"
              placeholder="jane@yourpractice.com"
              value={lead.email}
              onChange={(e) =>
                setLead((p) => ({ ...p, email: e.target.value }))
              }
              style={fieldStyle}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "28px",
            paddingTop: "20px",
            borderTop: "1px solid var(--stone)",
          }}
        >
          <button
            type="button"
            onClick={() => setStep(2)}
            style={{
              background: "transparent",
              border: "1.5px solid var(--stone)",
              color: "var(--ink-mid)",
              fontSize: "14px",
              fontFamily: "inherit",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            ← Back
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isLeadValid}
            style={{
              background: isLeadValid ? "var(--crimson)" : "var(--stone)",
              color: isLeadValid ? "var(--white)" : "var(--ink-faint)",
              fontSize: "15px",
              fontWeight: 600,
              fontFamily: "inherit",
              padding: "12px 28px",
              borderRadius: "8px",
              border: "none",
              cursor: isLeadValid ? "pointer" : "not-allowed",
              transition: "all 0.15s ease",
            }}
          >
            View My Scorecard →
          </button>
        </div>
      </div>
    );
  }

  // ── Loading ──────────────────────────────────────────────────────────────────

  function renderLoading() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 0",
          gap: "24px",
        }}
      >
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            border: "4px solid var(--stone)",
            borderTopColor: "var(--crimson)",
            animation: "spin 0.85s linear infinite",
          }}
        />
        <p
          style={{
            color: "var(--ink-muted)",
            fontSize: "16px",
            margin: 0,
            textAlign: "center",
            lineHeight: 1.6,
          }}
        >
          Generating your scorecard&hellip;
        </p>
      </div>
    );
  }

  // ── Step 4: Results ──────────────────────────────────────────────────────────

  function renderResults() {
    let summaryMsg = "";
    let scoreColor = "#E07A5F";
    if (enteredCount === 0) {
      summaryMsg = "";
    } else if (overallScore >= 80) {
      summaryMsg =
        "Your billing performance is strong. Let’s make sure it stays that way.";
      scoreColor = "#4EAD7A";
    } else if (overallScore >= 50) {
      summaryMsg =
        "You have clear opportunities to recover revenue. A Diagnostic will show you exactly where.";
      scoreColor = "#D4973A";
    } else {
      summaryMsg =
        "Significant revenue recovery potential exists in your practice. An RCM Fix engagement typically recovers this within 60–90 days.";
    }

    return (
      <div>
        {/* Score header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            className="eyebrow"
            style={{ justifyContent: "center", marginBottom: "20px" }}
          >
            <span className="eyebrow-rule"></span>
            Your RCM Scorecard
            <span className="eyebrow-rule"></span>
          </div>

          {enteredCount > 0 ? (
            <>
              <div
                style={{
                  fontSize: "72px",
                  fontFamily: "var(--serif)",
                  fontWeight: 700,
                  color: scoreColor,
                  lineHeight: 1,
                  marginBottom: "8px",
                }}
              >
                {overallScore}%
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "var(--ink-muted)",
                  marginBottom: "16px",
                }}
              >
                {greenCount} of {enteredCount} metrics meeting benchmark
              </div>
              <div
                style={{
                  background: "var(--stone)",
                  borderRadius: "4px",
                  height: "6px",
                  maxWidth: "280px",
                  margin: "0 auto 20px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${overallScore}%`,
                    background: scoreColor,
                    borderRadius: "4px",
                    transition: "width 1s cubic-bezier(0.4,0,0.2,1)",
                  }}
                />
              </div>
              <p
                style={{
                  color: "var(--ink-mid)",
                  fontSize: "15px",
                  lineHeight: 1.6,
                  maxWidth: "480px",
                  margin: "0 auto",
                }}
              >
                {summaryMsg}
              </p>
            </>
          ) : (
            <p
              style={{
                color: "var(--ink-muted)",
                fontSize: "16px",
                lineHeight: 1.7,
                maxWidth: "420px",
                margin: "0 auto",
              }}
            >
              No metrics were entered. Book a call and we&apos;ll walk through
              your RCM performance together.
            </p>
          )}
        </div>

        {/* Metric result cards */}
        {results.length > 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginBottom: "32px",
            }}
          >
            {results.map((r) => {
              const cfg = STATUS_CONFIG[r.status];
              return (
                <div
                  key={r.id}
                  style={{
                    background: "var(--white)",
                    border: "1px solid var(--stone)",
                    borderLeft: `3px solid ${cfg.color}`,
                    borderRadius: "8px",
                    padding: "16px 20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "var(--ink)",
                        marginBottom: "3px",
                      }}
                    >
                      {r.label}
                    </div>
                    <div style={{ fontSize: "11px", color: "var(--ink-faint)" }}>
                      Benchmark: {r.benchmark} &middot; {r.source}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      flexShrink: 0,
                    }}
                  >
                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          fontSize: "18px",
                          fontWeight: 700,
                          color: "var(--ink)",
                          lineHeight: 1,
                        }}
                      >
                        {formatValue(r.value, r.unit)}
                      </div>
                      <div
                        style={{
                          fontSize: "10px",
                          color: "var(--ink-faint)",
                          marginTop: "2px",
                        }}
                      >
                        Your value
                      </div>
                    </div>
                    <div
                      style={{
                        background: cfg.bg,
                        border: `1.5px solid ${cfg.border}`,
                        borderRadius: "5px",
                        padding: "4px 10px",
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: cfg.color,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {cfg.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* CTA */}
        <div
          style={{
            background: "rgba(184,48,48,0.04)",
            border: "1.5px solid rgba(184,48,48,0.18)",
            borderRadius: "14px",
            padding: "28px 32px",
            textAlign: "center",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--serif)",
              color: "var(--ink)",
              fontSize: "20px",
              fontWeight: 400,
              margin: "0 0 10px",
              lineHeight: 1.4,
            }}
          >
            Get a Full Practice Operational Diagnostic
          </h3>
          <p
            style={{
              color: "var(--ink-muted)",
              fontSize: "14px",
              margin: "0 0 24px",
              lineHeight: 1.6,
            }}
          >
            We&apos;ll walk through your complete RCM performance and identify
            your highest-impact revenue recovery opportunities — no commitment
            required.
          </p>
          <Link
            href="https://calendly.com/dev-harinemanagement/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ fontSize: "15px", padding: "15px 36px" }}
          >
            Book a Free Discovery Call →
          </Link>
        </div>

        <p
          style={{
            color: "var(--ink-faint)",
            fontSize: "12px",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          A copy of your scorecard has been sent to {lead.email}
        </p>
      </div>
    );
  }

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <>
      <Nav />
      <div
        style={{
          minHeight: "100vh",
          background: "var(--stone-light)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "80px",
          paddingBottom: "80px",
          paddingLeft: "16px",
          paddingRight: "16px",
        }}
      >
        <div
          style={{
            background: "var(--white)",
            border: "1px solid var(--stone)",
            borderRadius: "16px",
            padding: "clamp(28px, 5vw, 44px) clamp(20px, 5vw, 40px)",
            width: "100%",
            maxWidth: step === 2 || step === 4 ? "720px" : "600px",
            marginTop: "40px",
            boxShadow: "0 4px 24px rgba(28,20,18,0.07)",
          }}
        >
          {step === 1 && renderIntro()}
          {step === 2 && renderMetrics()}
          {step === 3 && !submitting && renderLeadCapture()}
          {step === 3 && submitting && renderLoading()}
          {step === 4 && renderResults()}
        </div>

        <p
          style={{
            color: "var(--ink-faint)",
            fontSize: "12px",
            marginTop: "28px",
          }}
        >
          <Link
            href="/"
            style={{ color: "var(--ink-faint)", textDecoration: "none" }}
          >
            harinemanagement.com
          </Link>
        </p>
      </div>
      <SiteFooter />
    </>
  );
}
