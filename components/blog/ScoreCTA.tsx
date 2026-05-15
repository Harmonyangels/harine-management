import Link from "next/link";

export default function ScoreCTA() {
  return (
    <aside style={{
      background: "linear-gradient(135deg, #0d2340, #0f2a1e)",
      border: "1px solid #1a3d56",
      borderRadius: "12px",
      padding: "28px 32px",
      margin: "40px 0",
    }}>
      <p style={{
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: "#23c6a0",
        marginBottom: "10px",
      }}>
        Practice Health Check
      </p>
      <h3 style={{
        fontSize: "22px",
        fontWeight: 700,
        color: "#ffffff",
        lineHeight: 1.3,
        marginBottom: "10px",
      }}>
        How does your practice compare on this metric?
      </h3>
      <p style={{
        fontSize: "15px",
        color: "rgba(255,255,255,0.7)",
        lineHeight: 1.6,
        marginBottom: "22px",
      }}>
        Get your free Practice Health Score — 10 questions, instant benchmarked report, no commitment.
      </p>
      <Link
        href="/score"
        style={{
          display: "inline-block",
          background: "linear-gradient(135deg, #1a6fa8, #23c6a0)",
          color: "#ffffff",
          fontWeight: 600,
          fontSize: "15px",
          padding: "12px 24px",
          borderRadius: "8px",
          textDecoration: "none",
          letterSpacing: "0.01em",
        }}
      >
        Get My Free Score →
      </Link>
    </aside>
  );
}
