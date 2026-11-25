"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BOOK_CALL_HREF, BOOK_CALL_LABEL } from "@/lib/contact";

const links = [
  { href: "/services", label: "Services" },
  { href: "/for/practices", label: "For Practices" },
  { href: "/case-study", label: "Case Study" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/#how-it-works", label: "How It Works" },
];

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
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
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
        <Link href={BOOK_CALL_HREF} target="_blank" rel="noopener noreferrer" className="nav-cta nav-cta-desktop">{BOOK_CALL_LABEL}</Link>
      </div>

      <div className={`nav-mobile-menu${mobileOpen ? " open" : ""}`} role="navigation" aria-label="Mobile navigation">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="nav-mobile-link" onClick={closeMenu}>
            {link.label}
          </Link>
        ))}
        <div className="nav-mobile-ctas">
          <Link href={BOOK_CALL_HREF} target="_blank" rel="noopener noreferrer" className="nav-cta" onClick={closeMenu} style={{ display: "block", textAlign: "center" }}>
            {BOOK_CALL_LABEL}
          </Link>
        </div>
      </div>
    </nav>
  );
}
