import Image from "next/image";
import Link from "next/link";

export default function Nav() {
  return (
    <nav>
      <div className="nav-inner">
        <Link href="/" className="nav-logo">
          <Image
            src="/logo.png"
            alt="Harine Management"
            className="nav-logo-img"
            width={1200}
            height={1200}
            priority
          />
          <div>
            <div className="nav-logo-text">Harine</div>
            <div className="nav-logo-tag">Management</div>
          </div>
        </Link>
        <ul className="nav-links">
          <li><Link href="/services">Services</Link></li>
          <li><Link href="/for/practices">For Practices</Link></li>
          <li><Link href="/for/investors">For Investors</Link></li>
          <li><Link href="/#how-it-works">How It Works</Link></li>
        </ul>
        <Link href="/score" className="nav-score-cta">Practice Health Check</Link>
        <Link href="https://calendly.com/dev-harinemanagement/30min" target="_blank" rel="noopener noreferrer" className="nav-cta">Schedule a Call</Link>
      </div>
    </nav>
  );
}
