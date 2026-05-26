"use client";

import { useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";

// ─── types ────────────────────────────────────────────────────────────────────

interface Inputs {
  monthlyGrossCharges: string;
  netCollectionRate: string;
  denialRate: string;
  daysInAR: string;
}

interface Lead {
  name: string;
  practice: string;
  email: string;
}

interface Results {
  benchmarkCollectionLoss: number;
  denialRevenueAtRisk: number;
  arStatus: "green" | "yellow" | "red";
  totalMonthlyLeakage: number;
  annualLeakage: number;
}

// ─── helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function calculateLeakage(inputs: Inputs): Results {
  const gross = parseFloat(inputs.monthlyGrossCharges) || 0;
  const collRate = parseFloat(inputs.netCollectionRate) || 0;
  const denRate = parseFloat(inputs.denialRate) || 0;
  const days = parseFloat(inputs.daysInAR) || 0;

  const benchmarkCollectionLoss = Math.max(0, gross * (0.95 - collRate / 100));
  const denialRevenueAtRisk = gross * (denRate / 100) * 0.6;
  const arStatus: Results["arStatus"] =
    days <= 30 ? "green" : days <= 45 ? "yellow" : "red";
  const totalMonthlyLeakage = benchmarkCollectionLoss + denialRevenueAtRisk;
  const annualLeakage = totalMonthlyLeakage * 12;

  return {
    benchmarkCollectionLoss,
    denialRevenueAtRisk,
    arStatus,
    totalMonthlyLeakage,
    annualLeakage,
  };
}

const AR_CONFIG = {
  green: {
    label: "On Benchmark",
    color: "#4EAD7A",
    bg: "rgba(45,122,79,0.1)",
    note: "≤ 30 days",
  },
  yellow: {
    label: "Monitor Closely",
    color: "#D4973A",
    bg: "rgba(184,120,32,0.1)",
    note: "31–45 days",
  },
  red: {
    label: "Needs Attention",
    color: "#E07A5F",
    bg: "rgba(196,84,58,0.1)",
    note: "> 45 days",
  },
} as const;

// ─── shared input styles ──────────────────────────────────────────────────────

const fieldStyle: React.CSSProperties = {
  width: "100%",
  padding: "13px 16px",
  borderRadius: "9px",
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
  fontSize: "13px",
  fontWeight: 500,
  marginBottom: "7px",
};

const helperStyle: React.CSSProperties = {
  fontSize: "12px",
  fontStyle: "italic",
  color: "var(--terra)",
  opacity: 0.85,
  marginTop: "5px",
};

// ─── main component ───────────────────────────────────────────────────────────

export default function RevenueLeakageCalculator() {
  const [step, setStep] = useState(1);
  const [inputs, setInputs] = useState<Inputs>({
    monthlyGrossCharges: "",
    netCollectionRate: "",
    denialRate: "",
    daysInAR: "",
  });
  const [lead, setLead] = useState<Lead>({
    name: "",
    practice: "",
    email: "",
  });
  const [results, setResults] = useState<Results | null>(null);

  // ── validation ────────────────────────────────────────────────────────────

  function canGoForward(): boolean {
    if (step === 2) {
      const g = parseFloat(inputs.monthlyGrossCharges);
      const c = parseFloat(inputs.netCollectionRate);
      const d = parseFloat(inputs.denialRate);
      const a = parseFloat(inputs.daysInAR);
      return (
        inputs.monthlyGrossCharges !== "" &&
        g > 0 &&
        inputs.netCollectionRate !== "" &&
        !isNaN(c) &&
        c >= 0 &&
        c <= 100 &&
        inputs.denialRate !== "" &&
        !isNaN(d) &&
        d >= 0 &&
        inputs.daysInAR !== "" &&
        a > 0
      );
    }
    if (step === 3) {
      return (
        lead.name.trim() !== "" &&
        lead.practice.trim() !== "" &&
        lead.email.trim() !== "" &&
        lead.email.includes("@")
      );
    }
    return true;
  }

  // ── navigation ────────────────────────────────────────────────────────────

  function handleForward() {
    if (!canGoForward()) return;
    if (step === 3) {
      const computed = calculateLeakage(inputs);
      setResults(computed);
      setStep(4);
      // Fire-and-forget — email failure does not block the results display
      fetch("/api/revenue-leakage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lead, inputs, results: computed }),
      }).catch(() => undefined);
    } else {
      setStep((s) => s + 1);
    }
  }

  const showProgress = step === 2 || step === 3;
  const progressPct = step === 2 ? 50 : 100;
  const showBack = step === 2 || step === 3;
  const showForward = step === 2 || step === 3;
  const forwardLabel = step === 3 ? "See My Results →" : "Continue →";

  // ── step 1: intro ─────────────────────────────────────────────────────────

  function renderIntro() {
    return (
      <div style={{ textAlign: "center", padding: "8px 0" }}>
        <div
          className="eyebrow"
          style={{ justifyContent: "center", marginBottom: "20px" }}
        >
          <span className="eyebrow-rule"></span>
          Revenue Analysis Tool
          <span className="eyebrow-rule"></span>
        </div>

        <h1
          style={{
            fontFamily: "var(--serif)",
            color: "var(--ink)",
            fontSize: "clamp(22px, 4vw, 34px)",
            fontWeight: 400,
            margin: "0 0 16px",
            lineHeight: 1.2,
          }}
        >
          Find Out How Much Revenue
          <br />
          <em style={{ fontStyle: "italic", color: "var(--crimson)" }}>
            Your Practice Is Losing
          </em>
        </h1>

        <p
          style={{
            color: "var(--ink-muted)",
            fontSize: "16px",
            lineHeight: 1.7,
            margin: "0 0 40px",
            maxWidth: "420px",
            marginInline: "auto",
          }}
        >
          Enter 4 numbers from your billing reports. We&apos;ll calculate your
          estimated monthly revenue leakage in under 60 seconds.
        </p>

        <button
          type="button"
          onClick={() => setStep(2)}
          className="btn btn-primary"
          style={{ fontSize: "16px", padding: "16px 44px" }}
        >
          Begin →
        </button>

        <p
          style={{
            color: "var(--ink-faint)",
            fontSize: "13px",
            marginTop: "20px",
          }}
        >
          Free · No credit card required · Instant results
        </p>
      </div>
    );
  }

  // ── step 2: inputs ────────────────────────────────────────────────────────

  function renderInputs() {
    return (
      <div>
        <div className="eyebrow" style={{ marginBottom: "14px" }}>
          <span className="eyebrow-rule"></span>
          Your Billing Data
        </div>
        <h2
          style={{
            fontFamily: "var(--serif)",
            color: "var(--ink)",
            fontSize: "clamp(18px, 3vw, 24px)",
            fontWeight: 400,
            margin: "0 0 28px",
            lineHeight: 1.3,
          }}
        >
          Enter your four key metrics
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label style={labelStyle}>
              Monthly Gross Charges ($){" "}
              <span style={{ color: "var(--crimson)" }}>*</span>
            </label>
            <input
              type="number"
              min="0"
              step="1000"
              placeholder="150000"
              value={inputs.monthlyGrossCharges}
              onChange={(e) =>
                setInputs((p) => ({
                  ...p,
                  monthlyGrossCharges: e.target.value,
                }))
              }
              style={fieldStyle}
            />
            <p style={{ ...helperStyle, color: "var(--ink-faint)", opacity: 1 }}>
              Enter total dollar amount, e.g. 150000 for $150,000
            </p>
          </div>

          <div>
            <label style={labelStyle}>
              Net Collection Rate (%){" "}
              <span style={{ color: "var(--crimson)" }}>*</span>
            </label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              placeholder="92"
              value={inputs.netCollectionRate}
              onChange={(e) =>
                setInputs((p) => ({ ...p, netCollectionRate: e.target.value }))
              }
              style={fieldStyle}
            />
            <p style={helperStyle}>Industry benchmark: 95%+</p>
          </div>

          <div>
            <label style={labelStyle}>
              Current Denial Rate (%){" "}
              <span style={{ color: "var(--crimson)" }}>*</span>
            </label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              placeholder="8"
              value={inputs.denialRate}
              onChange={(e) =>
                setInputs((p) => ({ ...p, denialRate: e.target.value }))
              }
              style={fieldStyle}
            />
            <p style={helperStyle}>Industry benchmark: below 5%</p>
          </div>

          <div>
            <label style={labelStyle}>
              Average Days in A/R{" "}
              <span style={{ color: "var(--crimson)" }}>*</span>
            </label>
            <input
              type="number"
              min="0"
              step="1"
              placeholder="42"
              value={inputs.daysInAR}
              onChange={(e) =>
                setInputs((p) => ({ ...p, daysInAR: e.target.value }))
              }
              style={fieldStyle}
            />
            <p style={helperStyle}>Industry benchmark: under 30 days</p>
          </div>
        </div>
      </div>
    );
  }

  // ── step 3: lead capture ──────────────────────────────────────────────────

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
          Where should we send your analysis?
        </h2>
        <p
          style={{
            color: "var(--ink-muted)",
            fontSize: "14px",
            margin: "0 0 28px",
            lineHeight: 1.6,
          }}
        >
          Your personalized revenue analysis will be emailed to you instantly.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div>
            <label style={labelStyle}>
              Full Name <span style={{ color: "var(--crimson)" }}>*</span>
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
              Practice Name <span style={{ color: "var(--crimson)" }}>*</span>
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
              Email Address <span style={{ color: "var(--crimson)" }}>*</span>
            </label>
            <input
              type="email"
              placeholder="jane@atlantafamily.com"
              value={lead.email}
              onChange={(e) =>
                setLead((p) => ({ ...p, email: e.target.value }))
              }
              style={fieldStyle}
            />
          </div>
        </div>
      </div>
    );
  }

  // ── step 4: results ───────────────────────────────────────────────────────

  function renderResults() {
    if (!results) return null;
    const ar = AR_CONFIG[results.arStatus];

    return (
      <div>
        <div className="eyebrow" style={{ marginBottom: "14px" }}>
          <span className="eyebrow-rule"></span>
          Your Revenue Analysis
        </div>
        <h2
          style={{
            fontFamily: "var(--serif)",
            color: "var(--ink)",
            fontSize: "clamp(18px, 3vw, 22px)",
            fontWeight: 400,
            margin: "0 0 24px",
            lineHeight: 1.3,
          }}
        >
          Estimated Leakage for{" "}
          <em style={{ fontStyle: "italic", color: "var(--crimson)" }}>
            {lead.practice}
          </em>
        </h2>

        {/* Two metric cards side-by-side, wrapping on narrow screens */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "12px",
          }}
        >
          <div
            style={{
              flex: "1 1 200px",
              background: "var(--white)",
              border: "1px solid var(--stone)",
              borderTop: "3px solid var(--crimson)",
              borderRadius: "10px",
              padding: "20px 18px",
            }}
          >
            <div
              style={{
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--ink-faint)",
                marginBottom: "8px",
              }}
            >
              Collection Gap
            </div>
            <div
              style={{
                fontFamily: "var(--serif)",
                fontSize: "28px",
                fontWeight: 400,
                color:
                  results.benchmarkCollectionLoss > 0
                    ? "var(--crimson)"
                    : "#4EAD7A",
                lineHeight: 1,
                marginBottom: "6px",
              }}
            >
              {fmt(results.benchmarkCollectionLoss)}
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "var(--ink-muted)",
                lineHeight: 1.4,
              }}
            >
              {results.benchmarkCollectionLoss > 0
                ? "Below 95% collection benchmark"
                : "At or above 95% benchmark"}
            </div>
          </div>

          <div
            style={{
              flex: "1 1 200px",
              background: "var(--white)",
              border: "1px solid var(--stone)",
              borderTop: "3px solid var(--terra)",
              borderRadius: "10px",
              padding: "20px 18px",
            }}
          >
            <div
              style={{
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--ink-faint)",
                marginBottom: "8px",
              }}
            >
              Denial Risk
            </div>
            <div
              style={{
                fontFamily: "var(--serif)",
                fontSize: "28px",
                fontWeight: 400,
                color: "var(--terra)",
                lineHeight: 1,
                marginBottom: "6px",
              }}
            >
              {fmt(results.denialRevenueAtRisk)}
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "var(--ink-muted)",
                lineHeight: 1.4,
              }}
            >
              {inputs.denialRate}% denial rate · 60% recoverable
            </div>
          </div>
        </div>

        {/* A/R status row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            background: "var(--white)",
            border: "1px solid var(--stone)",
            borderRadius: "10px",
            padding: "16px 20px",
            marginBottom: "12px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--ink-faint)",
                marginBottom: "4px",
              }}
            >
              A/R Days Status
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "var(--ink-mid)",
              }}
            >
              {inputs.daysInAR} days average · Benchmark: under 30 days
            </div>
          </div>
          <div
            style={{
              background: ar.bg,
              border: `1.5px solid ${ar.color}`,
              borderRadius: "6px",
              padding: "5px 14px",
              fontSize: "12px",
              fontWeight: 700,
              color: ar.color,
              letterSpacing: "0.04em",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {ar.label} · {ar.note}
          </div>
        </div>

        {/* Total monthly leakage — featured */}
        <div
          style={{
            background: "rgba(184,48,48,0.04)",
            border: "2px solid rgba(184,48,48,0.18)",
            borderRadius: "12px",
            padding: "24px 22px",
            marginBottom: "12px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--crimson)",
              marginBottom: "10px",
            }}
          >
            Total Estimated Monthly Leakage
          </div>
          <div
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(36px, 8vw, 52px)",
              fontWeight: 400,
              color: "var(--crimson)",
              lineHeight: 1,
              marginBottom: "6px",
            }}
          >
            {fmt(results.totalMonthlyLeakage)}
          </div>
          <div style={{ fontSize: "13px", color: "var(--ink-faint)" }}>
            per month
          </div>
        </div>

        {/* Annual projection */}
        <div
          style={{
            background: "var(--ink)",
            borderRadius: "10px",
            padding: "18px 22px",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
                marginBottom: "4px",
              }}
            >
              Annual Leakage Estimate
            </div>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>
              If current patterns continue
            </div>
          </div>
          <div
            style={{
              fontFamily: "var(--serif)",
              fontSize: "32px",
              fontWeight: 400,
              color: "var(--terra-light)",
              lineHeight: 1,
            }}
          >
            {fmt(results.annualLeakage)}
            <span
              style={{
                fontSize: "13px",
                color: "rgba(255,255,255,0.35)",
                marginLeft: "6px",
              }}
            >
              /yr
            </span>
          </div>
        </div>

        {/* Callout */}
        <div
          style={{
            background: "var(--stone-light)",
            border: "1px solid var(--stone)",
            borderLeft: "3px solid var(--crimson)",
            borderRadius: "0 6px 6px 0",
            padding: "18px 22px",
            marginBottom: "24px",
          }}
        >
          <p
            style={{
              fontSize: "13px",
              color: "var(--ink-muted)",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            These numbers are estimates based on industry benchmarks. A{" "}
            <strong style={{ color: "var(--ink-mid)" }}>
              Practice Operational Diagnostic
            </strong>{" "}
            will identify the exact sources in your specific reports.
          </p>
        </div>

        {/* CTA */}
        <Link
          href="https://calendly.com/dev-harinemanagement/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
          style={{
            width: "100%",
            justifyContent: "center",
            fontSize: "15px",
            padding: "16px 32px",
          }}
        >
          Book a Free 15-Min RCM Review →
        </Link>
      </div>
    );
  }

  // ── dispatcher ────────────────────────────────────────────────────────────

  function renderStep() {
    if (step === 1) return renderIntro();
    if (step === 2) return renderInputs();
    if (step === 3) return renderLeadCapture();
    if (step === 4) return renderResults();
    return null;
  }

  // ─── render ───────────────────────────────────────────────────────────────

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
        {/* Progress bar */}
        {showProgress && (
          <div
            style={{ width: "100%", maxWidth: "600px", padding: "20px 0 0" }}
          >
            <div
              style={{
                height: "3px",
                background: "var(--stone)",
                borderRadius: "2px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progressPct}%`,
                  background: "var(--crimson)",
                  borderRadius: "2px",
                  transition: "width 0.35s ease",
                }}
              />
            </div>
          </div>
        )}

        {/* Card */}
        <div
          style={{
            background: "var(--white)",
            border: "1px solid var(--stone)",
            borderRadius: "16px",
            padding: "clamp(28px, 5vw, 44px) clamp(20px, 5vw, 40px)",
            width: "100%",
            maxWidth: step === 4 ? "660px" : "600px",
            marginTop: showProgress ? "20px" : "40px",
            boxShadow: "0 4px 24px rgba(28,20,18,0.07)",
          }}
        >
          {renderStep()}

          {/* In-card navigation — steps 2 and 3 only */}
          {(showBack || showForward) && (
            <div
              style={{
                display: "flex",
                justifyContent: showBack ? "space-between" : "flex-end",
                alignItems: "center",
                marginTop: "32px",
                paddingTop: "24px",
                borderTop: "1px solid var(--stone)",
              }}
            >
              {showBack && (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  style={{
                    background: "transparent",
                    border: "1.5px solid var(--stone)",
                    color: "var(--ink-mid)",
                    fontSize: "14px",
                    fontFamily: "inherit",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "border-color 0.15s",
                  }}
                >
                  ← Back
                </button>
              )}
              {showForward && (
                <button
                  type="button"
                  onClick={handleForward}
                  disabled={!canGoForward()}
                  style={{
                    background: canGoForward()
                      ? "var(--crimson)"
                      : "var(--stone)",
                    color: canGoForward()
                      ? "var(--white)"
                      : "var(--ink-faint)",
                    fontSize: "15px",
                    fontWeight: 600,
                    fontFamily: "inherit",
                    padding: "11px 28px",
                    borderRadius: "8px",
                    border: "none",
                    cursor: canGoForward() ? "pointer" : "not-allowed",
                    transition: "all 0.15s ease",
                  }}
                >
                  {forwardLabel}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer link */}
        {step !== 4 && (
          <p
            style={{
              color: "var(--ink-faint)",
              fontSize: "12px",
              marginTop: "28px",
            }}
          >
            <a
              href="/"
              style={{ color: "var(--ink-faint)", textDecoration: "none" }}
            >
              harinemanagement.com
            </a>
          </p>
        )}
      </div>
      <SiteFooter />
    </>
  );
}
