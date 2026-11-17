import { BOOK_CALL_HREF, BOOK_CALL_LABEL, DIAGNOSTIC_PATH } from "@/lib/contact";

export default function DiscoveryCTA() {
  return (
    <aside
      style={{
        background: "var(--crimson)",
        borderRadius: "10px",
        padding: "36px 40px",
        margin: "48px 0 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle blob accent matching quote-section pattern */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "280px",
          height: "280px",
          borderRadius: "60% 40% 55% 45%",
          background: "var(--terra)",
          opacity: 0.25,
          top: "-80px",
          right: "-60px",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <p
          style={{
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.6)",
            marginBottom: "12px",
          }}
        >
          Practice Operational Diagnostic
        </p>
        <h3
          style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(20px, 3vw, 26px)",
            fontWeight: 400,
            color: "var(--white)",
            lineHeight: 1.3,
            marginBottom: "12px",
          }}
        >
          Start with a written look at the reporting.
        </h3>
        <p
          style={{
            fontSize: "15px",
            color: "rgba(255,255,255,0.75)",
            lineHeight: 1.65,
            marginBottom: "24px",
            maxWidth: "480px",
          }}
        >
          The diagnostic is $2,500 and finished in under a week. You get a findings report and a prioritized fix plan. Or book a 20-minute call first.
        </p>
        <a
          href={BOOK_CALL_HREF}
          className="btn btn-score"
          style={{ fontSize: "15px", padding: "13px 28px", color: "#ffffff", fontWeight: 600, marginRight: "12px" }}
        >
          {BOOK_CALL_LABEL} →
        </a>
        <a
          href={DIAGNOSTIC_PATH}
          className="btn btn-score"
          style={{ fontSize: "15px", padding: "13px 28px", color: "#ffffff", fontWeight: 600, background: "transparent", border: "1px solid rgba(255,255,255,0.7)" }}
        >
          See the diagnostic
        </a>
      </div>
    </aside>
  );
}
