"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";
import {
  QUALIFIERS,
  QUESTIONS,
  calculateScore,
  getScoreBand,
  isPELead,
} from "./scoring";

interface LeadData {
  name: string;
  practice: string;
  email: string;
  phone: string;
}

// ─── constants ────────────────────────────────────────────────────────────────

const PROGRESS_STEPS = 14; // steps 2–15
const RING_R = 54;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_R;

// ─── sub-components ───────────────────────────────────────────────────────────

function OptionButton({
  label,
  selected,
  onClick,
  benchmarkNote,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  benchmarkNote?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <button
        type="button"
        onClick={onClick}
        style={{
          width: "100%",
          textAlign: "left",
          padding: "14px 18px",
          borderRadius: "10px",
          border: selected ? "1.5px solid var(--crimson)" : "1.5px solid var(--stone)",
          background: selected ? "rgba(184,48,48,0.05)" : "var(--white)",
          color: selected ? "var(--ink)" : "var(--ink-mid)",
          fontSize: "15px",
          fontFamily: "inherit",
          cursor: "pointer",
          transition: "all 0.15s ease",
          fontWeight: selected ? 500 : 400,
        }}
      >
        {label}
      </button>
      {benchmarkNote && (
        <p
          style={{
            margin: "0 0 0 4px",
            fontSize: "12px",
            fontStyle: "italic",
            color: "var(--terra)",
            opacity: 0.85,
          }}
        >
          {benchmarkNote}
        </p>
      )}
    </div>
  );
}

function ScoreRing({
  score,
  color,
  animated,
}: {
  score: number;
  color: string;
  animated: boolean;
}) {
  const dashOffset = animated
    ? RING_CIRCUMFERENCE - (score / 100) * RING_CIRCUMFERENCE
    : RING_CIRCUMFERENCE;

  return (
    <svg
      width="160"
      height="160"
      viewBox="0 0 120 120"
      style={{ display: "block", margin: "0 auto" }}
    >
      {/* Track */}
      <circle
        cx="60"
        cy="60"
        r={RING_R}
        fill="none"
        stroke="#EDE8E6"
        strokeWidth="8"
      />
      {/* Progress */}
      <circle
        cx="60"
        cy="60"
        r={RING_R}
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={RING_CIRCUMFERENCE}
        strokeDashoffset={dashOffset}
        transform="rotate(-90 60 60)"
        style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1)" }}
      />
      {/* Score label */}
      <text
        x="60"
        y="56"
        textAnchor="middle"
        style={{ fill: "#1C1412" }}
        fontSize="26"
        fontWeight="700"
        fontFamily="inherit"
      >
        {score}
      </text>
      <text
        x="60"
        y="72"
        textAnchor="middle"
        style={{ fill: "#6B5E5C" }}
        fontSize="10"
        fontFamily="inherit"
      >
        out of 100
      </text>
    </svg>
  );
}

// ─── main page ────────────────────────────────────────────────────────────────

export default function ScorePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [qualifierAnswers, setQualifierAnswers] = useState<
    Record<string, string>
  >({});
  const [scoredAnswers, setScoredAnswers] = useState<Record<string, number>>(
    {}
  );
  const [leadData, setLeadData] = useState<LeadData>({
    name: "",
    practice: "",
    email: "",
    phone: "",
  });
  const [score, setScore] = useState(0);
  const [reportHtml, setReportHtml] = useState("");
  const [apiError, setApiError] = useState("");
  const [ringAnimated, setRingAnimated] = useState(false);

  // Animate score ring after reaching results
  useEffect(() => {
    if (currentStep !== 17) return;
    const t = setTimeout(() => setRingAnimated(true), 80);
    return () => clearTimeout(t);
  }, [currentStep]);

  // API call fires when step 16 mounts
  useEffect(() => {
    if (currentStep !== 16) return;

    const computedScore = calculateScore(scoredAnswers);
    setScore(computedScore);
    setApiError("");

    fetch("/api/generate-report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lead: leadData,
        qualifiers: qualifierAnswers,
        answers: scoredAnswers,
        score: computedScore,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.reportHtml) {
          setReportHtml(data.reportHtml);
          setCurrentStep(17);
        } else {
          setApiError(data.error ?? "Something went wrong. Please try again.");
          setCurrentStep(15);
        }
      })
      .catch(() => {
        setApiError("Network error — please try again.");
        setCurrentStep(15);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  // ── progress ────────────────────────────────────────────────────────────────

  const showProgress = currentStep >= 2 && currentStep <= 15;
  const progressPct = showProgress
    ? ((currentStep - 1) / PROGRESS_STEPS) * 100
    : 0;

  // ── forward validity ─────────────────────────────────────────────────────────

  function canGoForward(): boolean {
    if (currentStep >= 2 && currentStep <= 4) {
      const q = QUALIFIERS[currentStep - 2];
      return !!qualifierAnswers[q.id];
    }
    if (currentStep >= 5 && currentStep <= 14) {
      const q = QUESTIONS[currentStep - 5];
      return scoredAnswers[q.id] !== undefined;
    }
    if (currentStep === 15) {
      return (
        !!leadData.name.trim() &&
        !!leadData.practice.trim() &&
        !!leadData.email.trim() &&
        leadData.email.includes("@")
      );
    }
    return true;
  }

  // ── navigation ───────────────────────────────────────────────────────────────

  const showBack = currentStep > 1 && currentStep !== 16 && currentStep !== 17;

  function goBack() {
    setCurrentStep((s) => s - 1);
  }

  function goForward() {
    if (!canGoForward()) return;
    setCurrentStep((s) => s + 1);
  }

  // ── step renderers ───────────────────────────────────────────────────────────

  function renderIntro() {
    return (
      <div style={{ textAlign: "center", padding: "8px 0" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            marginBottom: "32px",
          }}
        >
          <Image
            src="/logo.png"
            alt="Harine Management"
            width={44}
            height={44}
            style={{ borderRadius: "8px" }}
          />
          <div style={{ textAlign: "left", lineHeight: 1.2 }}>
            <div style={{ color: "var(--ink)", fontSize: "16px", fontWeight: 600, letterSpacing: "0.2px" }}>
              Harine
            </div>
            <div style={{ color: "var(--ink-muted)", fontSize: "12px" }}>Management</div>
          </div>
        </div>

        <div className="eyebrow" style={{ justifyContent: "center", marginBottom: "20px" }}>
          <span className="eyebrow-rule"></span>
          Practice Health Check
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
          Get Your Free<br />
          <em style={{ fontStyle: "italic", color: "var(--crimson)" }}>Practice Health Score</em>
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
          Answer 10 questions about your billing performance, patient volume,
          and operations. In under 3 minutes you&apos;ll receive a scored
          analysis with actionable recommendations — specific to your practice.
        </p>

        <button
          type="button"
          onClick={goForward}
          className="btn btn-primary"
          style={{ fontSize: "16px", padding: "16px 44px" }}
        >
          Begin Assessment →
        </button>

        <p style={{ color: "var(--ink-faint)", fontSize: "13px", marginTop: "20px" }}>
          Free · No credit card required · Results delivered by email
        </p>
      </div>
    );
  }

  function renderQualifier(stepIndex: number) {
    const qualifier = QUALIFIERS[stepIndex];
    return (
      <div>
        <div className="eyebrow" style={{ marginBottom: "14px" }}>
          <span className="eyebrow-rule"></span>
          Practice Profile
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
          {qualifier.question}
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {qualifier.options.map((opt) => (
            <OptionButton
              key={opt.label}
              label={opt.label}
              selected={qualifierAnswers[qualifier.id] === opt.label}
              onClick={() =>
                setQualifierAnswers((prev) => ({
                  ...prev,
                  [qualifier.id]: opt.label,
                }))
              }
            />
          ))}
        </div>
      </div>
    );
  }

  function renderQuestion(stepIndex: number) {
    const question = QUESTIONS[stepIndex];
    return (
      <div>
        <div className="eyebrow" style={{ marginBottom: "10px" }}>
          <span className="eyebrow-rule"></span>
          {question.category}
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
          {question.question}
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {question.options.map((opt) => (
            <OptionButton
              key={opt.label}
              label={opt.label}
              selected={scoredAnswers[question.id] === opt.points}
              onClick={() =>
                setScoredAnswers((prev) => ({
                  ...prev,
                  [question.id]: opt.points,
                }))
              }
              benchmarkNote={opt.benchmarkNote}
            />
          ))}
        </div>
      </div>
    );
  }

  function renderLeadCapture() {
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
          Where should we send your report?
        </h2>
        <p
          style={{
            color: "var(--ink-muted)",
            fontSize: "14px",
            margin: "0 0 28px",
            lineHeight: 1.6,
          }}
        >
          Your personalized score and recommendations will be emailed to you
          instantly.
        </p>

        {apiError && (
          <div
            style={{
              background: "rgba(184,48,48,0.06)",
              border: "1px solid rgba(184,48,48,0.25)",
              borderRadius: "8px",
              padding: "12px 16px",
              color: "var(--crimson)",
              fontSize: "14px",
              marginBottom: "20px",
            }}
          >
            {apiError}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div>
            <label style={labelStyle}>
              Full Name <span style={{ color: "var(--crimson)" }}>*</span>
            </label>
            <input
              type="text"
              placeholder="Dr. Jane Smith"
              value={leadData.name}
              onChange={(e) =>
                setLeadData((p) => ({ ...p, name: e.target.value }))
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
              value={leadData.practice}
              onChange={(e) =>
                setLeadData((p) => ({ ...p, practice: e.target.value }))
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
              value={leadData.email}
              onChange={(e) =>
                setLeadData((p) => ({ ...p, email: e.target.value }))
              }
              style={fieldStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Phone Number</label>
            <input
              type="tel"
              placeholder="(404) 555-0100"
              value={leadData.phone}
              onChange={(e) =>
                setLeadData((p) => ({ ...p, phone: e.target.value }))
              }
              style={fieldStyle}
            />
          </div>
        </div>
      </div>
    );
  }

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
          Analyzing your practice data&hellip;
        </p>
      </div>
    );
  }

  function renderResults() {
    const band = getScoreBand(score);
    const peLead = isPELead(scoredAnswers);

    const ctaHeadline = peLead
      ? "You're considering a transaction — let's talk deal readiness."
      : "Book a free 30-minute practice walkthrough.";

    return (
      <div>
        {/* Score ring + band */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <ScoreRing score={score} color={band.color} animated={ringAnimated} />
          <div
            style={{
              display: "inline-block",
              background: `${band.color}28`,
              border: `1.5px solid ${band.color}`,
              borderRadius: "6px",
              padding: "5px 18px",
              marginTop: "14px",
            }}
          >
            <span
              style={{
                color: band.color,
                fontWeight: 700,
                fontSize: "15px",
                letterSpacing: "0.4px",
              }}
            >
              {band.label}
            </span>
          </div>
        </div>

        {/* AI-generated report */}
        <div
          className="score-report"
          style={{
            background: "var(--stone-light)",
            borderRadius: "12px",
            padding: "24px 28px",
            marginBottom: "28px",
            border: "1px solid var(--stone)",
          }}
          dangerouslySetInnerHTML={{ __html: reportHtml }}
        />

        {/* CTA card */}
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
              margin: "0 0 12px",
              lineHeight: 1.4,
            }}
          >
            {ctaHeadline}
          </h3>
          <p
            style={{
              color: "var(--ink-muted)",
              fontSize: "14px",
              margin: "0 0 24px",
              lineHeight: 1.6,
            }}
          >
            We&apos;ll walk through your results together and identify your
            highest-impact opportunities — no commitment required.
          </p>
          <Link
            href="https://calendly.com/dev-harinemanagement/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ fontSize: "15px", padding: "15px 36px" }}
          >
            Book a Free 30-Min Call
          </Link>
        </div>
      </div>
    );
  }

  // ── step dispatcher ──────────────────────────────────────────────────────────

  function renderStep() {
    if (currentStep === 1) return renderIntro();
    if (currentStep >= 2 && currentStep <= 4)
      return renderQualifier(currentStep - 2);
    if (currentStep >= 5 && currentStep <= 14)
      return renderQuestion(currentStep - 5);
    if (currentStep === 15) return renderLeadCapture();
    if (currentStep === 16) return renderLoading();
    if (currentStep === 17) return renderResults();
    return null;
  }

  // ── forward button label ─────────────────────────────────────────────────────

  const forwardLabel = currentStep === 15 ? "Get My Score →" : "Next →";
  const showForward =
    currentStep >= 2 && currentStep <= 15 && currentStep !== 16;

  // ── render ───────────────────────────────────────────────────────────────────

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
            style={{
              width: "100%",
              maxWidth: "600px",
              padding: "20px 0 0",
            }}
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
            maxWidth: "600px",
            marginTop: showProgress ? "20px" : "40px",
            boxShadow: "0 4px 24px rgba(28,20,18,0.07)",
          }}
        >
          {renderStep()}

          {/* In-card navigation */}
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
                  onClick={goBack}
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
                  onClick={goForward}
                  disabled={!canGoForward()}
                  style={{
                    background: canGoForward() ? "var(--crimson)" : "var(--stone)",
                    color: canGoForward() ? "var(--white)" : "var(--ink-faint)",
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
        {currentStep !== 16 && (
          <p style={{ color: "var(--ink-faint)", fontSize: "12px", marginTop: "28px" }}>
            <Link
              href="/"
              style={{ color: "var(--ink-faint)", textDecoration: "none" }}
            >
              harinemanagement.com
            </Link>
          </p>
        )}
      </div>
      <SiteFooter />
    </>
  );
}
