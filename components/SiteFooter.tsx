import Link from "next/link";

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
              Healthcare data analytics for medical practices and the investors who evaluate them. We turn raw EHR data into real-time executive visibility.
            </p>
          </div>

          <div className="footer-col">
            <h5>Services</h5>
            <ul>
              <li><Link href="/services">All Services</Link></li>
              <li><Link href="/services/practice-analytics-system">Practice Analytics</Link></li>
              <li><Link href="/services/revenue-cycle-analytics">Revenue Intelligence</Link></li>
              <li><Link href="/services/due-diligence-analytics">Due Diligence</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Who We Serve</h5>
            <ul>
              <li><Link href="/#practices">Medical Groups</Link></li>
              <li><Link href="/#practices">Multi-Site Practices</Link></li>
              <li><Link href="/#investors">PE &amp; Private Equity</Link></li>
              <li><Link href="/#investors">Healthcare Investors</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Company</h5>
            <ul>
              <li><Link href="/#how-it-works">How It Works</Link></li>
              <li><Link href="/#contact">Contact</Link></li>
              <li><a href="mailto:dev@harinemanagement.com">dev@harinemanagement.com</a></li>
              <li><a href="tel:6822563389">682-256-3389</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copy">© 2026 Harine Management LLC · Atlanta, GA</div>
          <div className="footer-contact">
            <a href="mailto:dev@harinemanagement.com">dev@harinemanagement.com</a>
            &nbsp;·&nbsp;
            <a href="tel:6822563389">682-256-3389</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
