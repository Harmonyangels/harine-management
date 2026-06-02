import Link from "next/link";

export default function RevenueCalcCTA() {
  return (
    <aside
      style={{
        background: "var(--stone-light)",
        borderLeft: "3px solid var(--crimson)",
        borderTop: "1px solid var(--stone)",
        borderRight: "1px solid var(--stone)",
        borderBottom: "1px solid var(--stone)",
        borderRadius: "0 10px 10px 0",
        padding: "28px 32px",
        margin: "40px 0",
      }}
    >
      <p
        style={{
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--crimson)",
          marginBottom: "10px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: "20px",
            height: "1.5px",
            background: "var(--crimson)",
            flexShrink: 0,
          }}
        />
        Free Calculator
      </p>
      <h3
        style={{
          fontFamily: "var(--serif)",
          fontSize: "22px",
          fontWeight: 500,
          color: "var(--ink)",
          lineHeight: 1.25,
          marginBottom: "10px",
        }}
      >
        Find out how much revenue your practice is losing
      </h3>
      <p
        style={{
          fontSize: "15px",
          color: "var(--ink-muted)",
          lineHeight: 1.65,
          marginBottom: "22px",
        }}
      >
        Enter 4 numbers from your billing reports and get an instant dollar estimate of your monthly revenue leakage — benchmarked against MGMA standards.
      </p>
      <Link
        href="/tools/revenue-leakage-calculator"
        className="btn btn-primary"
        style={{ fontSize: "14px", padding: "12px 24px", color: "#ffffff", fontWeight: 600 }}
      >
        Calculate My Revenue Leakage →
      </Link>
    </aside>
  );
}
