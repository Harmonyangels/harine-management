"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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
          border: selected ? "1.5px solid #23c6a0" : "1.5px solid #1a2d42",
          background: selected
            ? "linear-gradient(135deg, rgba(26,111,168,0.18), rgba(35,198,160,0.18))"
            : "transparent",
          color: selected ? "#e8edf2" : "#8ba5bc",
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
            color: "#23c6a0",
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
        stroke="#1a2d42"
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
        fill="#e8edf2"
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
        fill="#8ba5bc"
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
            marginBottom: "36px",
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
            <div
              style={{
                color: "#e8edf2",
                fontSize: "16px",
                fontWeight: 600,
                letterSpacing: "0.2px",
              }}
            >
              Harine
            </div>
            <div style={{ color: "#8ba5bc", fontSize: "12px" }}>
              Management
            </div>
          </div>
        </div>

        <h1
          style={{
            color: "#e8edf2",
            fontSize: "clamp(22px, 4vw, 30px)",
            fontWeight: 700,
            margin: "0 0 16px",
            lineHeight: 1.25,
          }}
        >
          Get Your Free Practice Health Score
        </h1>

        <p
          style={{
            color: "#8ba5bc",
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
          style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #1a6fa8, #23c6a0)",
            color: "#fff",
            fontFamily: "inherit",
            fontSize: "16px",
            fontWeight: 700,
            padding: "16px 44px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            letterSpacing: "0.2px",
          }}
        >
          Begin Assessment →
        </button>

        <p style={{ color: "#4a6878", fontSize: "13px", marginTop: "20px" }}>
          Free · No credit card required · Results delivered by email
        </p>
      </div>
    );
  }

  function renderQualifier(stepIndex: number) {
    const qualifier = QUALIFIERS[stepIndex];
    return (
      <div>
        <p
          style={{
            color: "#23c6a0",
            fontSize: "11px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            margin: "0 0 12px",
          }}
        >
          Practice Profile
        </p>
        <h2
          style={{
            color: "#e8edf2",
            fontSize: "clamp(18px, 3vw, 22px)",
            fontWeight: 600,
            margin: "0 0 28px",
            lineHeight: 1.35,
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
        <p
          style={{
            color: "#23c6a0",
            fontSize: "11px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            margin: "0 0 10px",
          }}
        >
          {question.category}
        </p>
        <h2
          style={{
            color: "#e8edf2",
            fontSize: "clamp(18px, 3vw, 22px)",
            fontWeight: 600,
            margin: "0 0 28px",
            lineHeight: 1.35,
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
      border: "1.5px solid #1a2d42",
      background: "#0b1623",
      color: "#e8edf2",
      fontSize: "15px",
      fontFamily: "inherit",
      outline: "none",
      boxSizing: "border-box",
    };
    const labelStyle: React.CSSProperties = {
      display: "block",
      color: "#8ba5bc",
      fontSize: "13px",
      fontWeight: 500,
      marginBottom: "7px",
    };

    return (
      <div>
        <p
          style={{
            color: "#23c6a0",
            fontSize: "11px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            margin: "0 0 12px",
          }}
        >
          Almost There
        </p>
        <h2
          style={{
            color: "#e8edf2",
            fontSize: "clamp(18px, 3vw, 22px)",
            fontWeight: 600,
            margin: "0 0 8px",
            lineHeight: 1.35,
          }}
        >
          Where should we send your report?
        </h2>
        <p
          style={{
            color: "#8ba5bc",
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
              background: "rgba(192,57,43,0.15)",
              border: "1px solid rgba(192,57,43,0.4)",
              borderRadius: "8px",
              padding: "12px 16px",
              color: "#e8705a",
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
              Full Name <span style={{ color: "#e05c2a" }}>*</span>
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
              Practice Name <span style={{ color: "#e05c2a" }}>*</span>
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
              Email Address <span style={{ color: "#e05c2a" }}>*</span>
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
            border: "4px solid #1a2d42",
            borderTopColor: "#23c6a0",
            animation: "spin 0.85s linear infinite",
          }}
        />
        <p
          style={{
            color: "#8ba5bc",
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
          style={{
            background: "#0b1623",
            borderRadius: "12px",
            padding: "24px 28px",
            marginBottom: "28px",
            border: "1px solid #1a2d42",
          }}
          dangerouslySetInnerHTML={{ __html: reportHtml }}
        />

        {/* CTA card */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(26,111,168,0.15), rgba(35,198,160,0.15))",
            border: "1.5px solid rgba(35,198,160,0.3)",
            borderRadius: "14px",
            padding: "28px 32px",
            textAlign: "center",
          }}
        >
          <h3
            style={{
              color: "#e8edf2",
              fontSize: "18px",
              fontWeight: 600,
              margin: "0 0 12px",
              lineHeight: 1.4,
            }}
          >
            {ctaHeadline}
          </h3>
          <p
            style={{
              color: "#8ba5bc",
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
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #1a6fa8, #23c6a0)",
              color: "#fff",
              fontWeight: 700,
              fontSize: "15px",
              padding: "15px 36px",
              borderRadius: "10px",
              textDecoration: "none",
              letterSpacing: "0.2px",
            }}
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
    <div
      style={{
        minHeight: "100vh",
        background: "#0b1623",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: "80px",
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
              background: "#1a2d42",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progressPct}%`,
                background: "linear-gradient(90deg, #1a6fa8, #23c6a0)",
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
          background: "#0f1e2e",
          border: "1px solid #1a2d42",
          borderRadius: "16px",
          padding: "clamp(28px, 5vw, 44px) clamp(20px, 5vw, 40px)",
          width: "100%",
          maxWidth: "600px",
          marginTop: showProgress ? "20px" : "40px",
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
              borderTop: "1px solid #1a2d42",
            }}
          >
            {showBack && (
              <button
                type="button"
                onClick={goBack}
                style={{
                  background: "transparent",
                  border: "1.5px solid #1a2d42",
                  color: "#8ba5bc",
                  fontSize: "14px",
                  fontFamily: "inherit",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  cursor: "pointer",
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
                  background: canGoForward()
                    ? "linear-gradient(135deg, #1a6fa8, #23c6a0)"
                    : "#1a2d42",
                  color: canGoForward() ? "#fff" : "#4a6878",
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
        <p style={{ color: "#2d4459", fontSize: "12px", marginTop: "28px" }}>
          <Link
            href="/"
            style={{ color: "#2d4459", textDecoration: "none" }}
          >
            harinemanagement.com
          </Link>
        </p>
      )}
    </div>
  );
}
