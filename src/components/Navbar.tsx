"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sun, Moon, ArrowRight } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={`navbar-v3 ${scrolled ? "navbar-v3--scrolled" : ""}`}>
        <div
          className="mx-auto max-w-[1800px] flex h-14 items-center justify-between"
          style={{ paddingLeft: "var(--page-gutter)", paddingRight: "var(--page-gutter)" }}
        >
          {/* Logo */}
          <Link href="/" className="navbar-v3__logo">Z3</Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Primary navigation">
            <Link href="/search?mode=buy" className="navbar-v3__link">Buy</Link>
            <Link href="/search?mode=rent" className="navbar-v3__link">Rent</Link>
            <Link href="/property-management" className="navbar-v3__link">PM</Link>
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            <button onClick={toggle} className="btn-icon" aria-label="Toggle theme">
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <Link
              href="/search?mode=buy"
              className="btn btn-ghost"
              style={{ fontSize: 12, padding: "6px 14px", gap: 6 }}
            >
              Enter
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-2">
            <button onClick={toggle} className="btn-icon" aria-label="Toggle theme">
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              className="btn-icon"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="navbar-v3__overlay md:hidden">
          <Link href="/search?mode=buy" className="navbar-v3__overlay-link" onClick={() => setMobileOpen(false)}>
            Buy
          </Link>
          <Link href="/search?mode=rent" className="navbar-v3__overlay-link" onClick={() => setMobileOpen(false)}>
            Rent
          </Link>
          <Link href="/property-management" className="navbar-v3__overlay-link" onClick={() => setMobileOpen(false)}>
            PM
          </Link>
        </div>
      )}
    </>
  );
}
