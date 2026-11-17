"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BOOK_CALL_HREF, BOOK_CALL_LABEL } from "@/lib/contact";

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMenu = () => setMobileOpen(false);

  return (
    <nav>
      <div className="nav-inner">
        <Link href="/" className="nav-logo" onClick={closeMenu}>
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
          <li><Link href="/team">Team</Link></li>
          <li><Link href="/#how-it-works">How It Works</Link></li>
          <li><Link href="/blog">Blog</Link></li>
          <li><Link href="/tools">Free Tools</Link></li>
        </ul>
        <button
          className="nav-hamburger"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
        <Link href="/services/practice-operational-diagnostic" className="nav-score-cta nav-cta-desktop">$2,500 diagnostic</Link>
        <Link href={BOOK_CALL_HREF} target="_blank" rel="noopener noreferrer" className="nav-cta nav-cta-desktop">{BOOK_CALL_LABEL}</Link>
      </div>

      {/* Mobile dropdown */}
      <div className={`nav-mobile-menu${mobileOpen ? " open" : ""}`} role="navigation" aria-label="Mobile navigation">
        <Link href="/services" className="nav-mobile-link" onClick={closeMenu}>Services</Link>
        <Link href="/for/practices" className="nav-mobile-link" onClick={closeMenu}>For Practices</Link>
        <Link href="/for/investors" className="nav-mobile-link" onClick={closeMenu}>For Investors</Link>
        <Link href="/team" className="nav-mobile-link" onClick={closeMenu}>Team</Link>
        <Link href="/#how-it-works" className="nav-mobile-link" onClick={closeMenu}>How It Works</Link>
        <Link href="/blog" className="nav-mobile-link" onClick={closeMenu}>Blog</Link>
        <Link href="/tools" className="nav-mobile-link" onClick={closeMenu}>Free Tools</Link>
        <div className="nav-mobile-ctas">
          <Link href="/services/practice-operational-diagnostic" className="nav-score-cta" onClick={closeMenu} style={{ display: "block", textAlign: "center" }}>
            $2,500 diagnostic
          </Link>
          <Link href={BOOK_CALL_HREF} target="_blank" rel="noopener noreferrer" className="nav-cta" onClick={closeMenu} style={{ display: "block", textAlign: "center" }}>
            {BOOK_CALL_LABEL}
          </Link>
        </div>
      </div>
    </nav>
  );
}
