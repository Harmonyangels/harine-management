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
          Discovery Call
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
          Ready to see what your EHR data can actually do?
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
          Book a free 30-minute discovery call. We&apos;ll look at your specific EHR setup and show you what a live dashboard would look like for your practice.
        </p>
        <a
          href="https://calendly.com/dev-harinemanagement/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-white"
          style={{ fontSize: "15px", padding: "13px 28px" }}
        >
          Book a Free 30-Min Call →
        </a>
      </div>
    </aside>
  );
}
