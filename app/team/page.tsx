import type { Metadata } from "next";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: { absolute: "Devanshu Patel | Atlanta Healthcare Consulting" },
  description:
    "Harine Management is a solo Atlanta healthcare consulting practice. Devanshu Patel does the analytics and operations work.",
  alternates: {
    canonical: "https://harinemanagement.com/team",
  },
  openGraph: {
    title: "Devanshu Patel | Atlanta Healthcare Consulting",
    description:
      "Solo Atlanta healthcare consulting practice. Devanshu Patel builds Power BI dashboards for medical practices and advises healthcare investors.",
    url: "https://harinemanagement.com/team",
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
    bio: "Devanshu brings a decade of healthcare operations and management experience to every engagement. He has worked in eClinicalWorks and athenahealth environments, including practice operations, revenue cycle management, and analytics builds for independent practices. Harine Management is the solo practice he runs from Atlanta. He does the work himself.",
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
          <h1>Devanshu Patel</h1>
          <p className="service-subhead">Harine Management is a solo practice in Atlanta. Devanshu does the work.</p>
        </div>
      </section>

      {/* TEAM GRID */}
      <section style={{ padding: "100px 0", background: "var(--white)" }}>
        <div className="container">
          <div
            className="team-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 480px)",
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
          <h2>Book a 20-minute call.</h2>
          <p>
            Email dev@harinemanagement.com. For practices, the usual first step is the $2,500 diagnostic.
          </p>
          <div className="service-cta-actions">
            <a
              href="mailto:dev@harinemanagement.com?subject=Book%20a%2020-minute%20call"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-white"
            >
              Book a 20-minute call
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
