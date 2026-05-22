import type { Metadata } from "next";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Our Team | Harine Management",
  description:
    "Meet the team behind Harine Management — healthcare operations and analytics consultants serving independent practices and investors nationwide.",
  alternates: {
    canonical: "https://harinemanagement.com/team",
  },
  openGraph: {
    title: "Our Team | Harine Management",
    description:
      "Meet the team behind Harine Management — healthcare operations and analytics consultants serving independent practices and investors nationwide.",
    url: "https://harinemanagement.com/team",
    images: [{ url: "/og-image.jpg" }],
  },
};

interface TeamMember {
  name: string;
  title: string;
  initials: string;
  bio: string;
  email: string;
  phone: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Devanshu Patel",
    title: "Founder & Principal Consultant",
    initials: "DP",
    bio: "Devanshu brings a decade of healthcare operations and management experience to every engagement. With deep expertise in eClinicalWorks and Athena Health environments, he has led practice operations, revenue cycle management, and analytics infrastructure builds for independent practices across Georgia. He founded Harine Management to give independent practices access to the operational and analytical firepower that large health systems take for granted.",
    email: "dev@harinemanagement.com",
    phone: "682-256-3389",
  },
];

export default function TeamPage() {
  return (
    <>
      <Nav />

      {/* PAGE HEADER */}
      <section className="service-hero">
        <div className="service-hero-inner">
          <div className="eyebrow faint">
            <span className="eyebrow-rule"></span>
            Harine Management
          </div>
          <h1>Our Team</h1>
          <p className="service-subhead">The people behind Harine Management.</p>
        </div>
      </section>

      {/* TEAM GRID */}
      <section style={{ padding: "100px 0", background: "var(--white)" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(360px, 480px))",
              gap: "32px",
              justifyContent: "center",
            }}
          >
            {teamMembers.map((member) => (
              <div
                key={member.email}
                style={{
                  background: "var(--white)",
                  border: "1px solid var(--stone)",
                  borderTop: "3px solid var(--crimson)",
                  borderRadius: "10px",
                  padding: "40px 36px",
                  boxShadow: "0 4px 24px rgba(28,20,18,0.06)",
                }}
              >
                {/* Photo placeholder — photo will be added here */}
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background: "rgba(184,48,48,0.1)",
                    border: "2px solid rgba(184,48,48,0.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "24px",
                    fontFamily: "var(--serif)",
                    fontSize: "24px",
                    fontWeight: 500,
                    color: "var(--crimson)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {member.initials}
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <h2
                    style={{
                      fontFamily: "var(--serif)",
                      fontSize: "24px",
                      fontWeight: 500,
                      color: "var(--ink)",
                      lineHeight: 1.2,
                      marginBottom: "6px",
                    }}
                  >
                    {member.name}
                  </h2>
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 500,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--crimson)",
                    }}
                  >
                    {member.title}
                  </div>
                </div>

                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: 300,
                    color: "var(--ink-muted)",
                    lineHeight: 1.75,
                    marginBottom: "28px",
                  }}
                >
                  {member.bio}
                </p>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    borderTop: "1px solid var(--stone)",
                    paddingTop: "20px",
                  }}
                >
                  <a
                    href={`mailto:${member.email}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "var(--crimson)",
                      textDecoration: "none",
                    }}
                  >
                    <span style={{ fontSize: "15px" }}>✉</span>
                    {member.email}
                  </a>
                  <a
                    href={`tel:${member.phone.replace(/-/g, "")}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "var(--ink-mid)",
                      textDecoration: "none",
                    }}
                  >
                    <span style={{ fontSize: "15px" }}>☎</span>
                    {member.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="service-cta">
        <div className="service-cta-inner">
          <h2>Work with our team.</h2>
          <p>
            Ready to see what hands-on healthcare operations expertise can do for
            your practice? Start with a 30-minute discovery call.
          </p>
          <div className="service-cta-actions">
            <a
              href="https://calendly.com/dev-harinemanagement/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-white"
            >
              Book a Discovery Call
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
