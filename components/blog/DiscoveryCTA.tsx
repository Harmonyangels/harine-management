export default function DiscoveryCTA() {
  return (
    <aside style={{
      background: "linear-gradient(135deg, #0d2340, #0f2a1e)",
      border: "1px solid #1a3d56",
      borderRadius: "12px",
      padding: "36px 40px",
      margin: "48px 0 0",
    }}>
      <h3 style={{
        fontSize: "26px",
        fontWeight: 700,
        color: "#ffffff",
        lineHeight: 1.3,
        marginBottom: "12px",
      }}>
        Ready to see what your EHR data can actually do?
      </h3>
      <p style={{
        fontSize: "16px",
        color: "rgba(255,255,255,0.7)",
        lineHeight: 1.6,
        marginBottom: "24px",
      }}>
        Book a free 30-minute discovery call. We&apos;ll look at your specific EHR setup and show you what a live dashboard would look like for your practice.
      </p>
      <a
        href="https://calendly.com/dev-harinemanagement/30min"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          background: "linear-gradient(135deg, #1a6fa8, #23c6a0)",
          color: "#ffffff",
          fontWeight: 600,
          fontSize: "16px",
          padding: "14px 28px",
          borderRadius: "8px",
          textDecoration: "none",
          letterSpacing: "0.01em",
        }}
      >
        Book a Free 30-Min Call →
      </a>
    </aside>
  );
}
