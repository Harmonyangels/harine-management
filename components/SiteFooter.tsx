import Link from "next/link";
import { BOOK_CALL_HREF, BOOK_CALL_LABEL, CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL } from "@/lib/contact";

export default function SiteFooter() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/#top" className="footer-logo">
              <div className="logo-mark">
                <div className="blob-top"></div>
                <div className="blob-bot"></div>
              </div>
              <div>
                <div className="footer-logo-text">Harine</div>
                <div className="footer-logo-tag">Management</div>
              </div>
            </Link>
            <p className="footer-desc">
              Harine Management LLC is a solo healthcare reporting consultancy in Atlanta. Devanshu Patel builds Power BI dashboards for multi-location outpatient practices on athenahealth or eClinicalWorks.
            </p>
            <p className="footer-hipaa">
              Engagements are done under a signed business associate agreement and a confidentiality agreement. Source files stay in your SharePoint. Access is limited to the reports the work needs.
            </p>
          </div>

          <div className="footer-col">
            <h5>Offer</h5>
            <ul>
              <li><Link href="/services">Services and prices</Link></li>
              <li><Link href="/services/practice-operational-diagnostic">Reporting Diagnostic</Link></li>
              <li><Link href="/services/practice-analytics-system">Core Build</Link></li>
              <li><Link href="/case-study">Case study</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Practices</h5>
            <ul>
              <li><Link href="/for/practices">For outpatient groups</Link></li>
              <li><Link href="/#how-it-works">How it works</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/team">Team</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Contact</h5>
            <ul>
              <li><a href={BOOK_CALL_HREF} target="_blank" rel="noopener noreferrer">{BOOK_CALL_LABEL}</a></li>
              <li><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></li>
              <li><a href={CONTACT_PHONE_TEL}>{CONTACT_PHONE_DISPLAY}</a></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/tools">Free tools</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copy">© 2026 Harine Management LLC · Atlanta, GA</div>
          <div className="footer-contact">
            <a href="mailto:dev@harinemanagement.com">dev@harinemanagement.com</a>
            &nbsp;·&nbsp;
            <a href={CONTACT_PHONE_TEL}>{CONTACT_PHONE_DISPLAY}</a>
            &nbsp;·&nbsp;
            Monday–Friday, 9 a.m.–6 p.m. ET
          </div>
        </div>
      </div>
    </footer>
  );
}
