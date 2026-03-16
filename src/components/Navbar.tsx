"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Bell, Menu, X, Sun, Moon } from "lucide-react";
import clsx from "clsx";
import { useTheme } from "@/contexts/ThemeContext";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggle } = useTheme();

  return (
    <nav className="navbar">
      <div className="mx-auto max-w-[1800px]" style={{ paddingLeft: 'var(--page-gutter)', paddingRight: 'var(--page-gutter)' }}>
        <div className="flex h-16 items-center justify-between">

          {/* ── Logo ── */}
          <Link href="/" className="navbar__logo">
            Z3
          </Link>

          {/* ── Desktop nav links ── */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Primary navigation">
            <NavLink href="/search?mode=buy" active>Buy</NavLink>
            <NavLink href="/search?mode=rent">Rent</NavLink>
            <NavLink href="/property-management">Property Management</NavLink>
          </nav>

          {/* ── Right actions ── */}
          <div className="hidden md:flex items-center gap-1.5">
            <button className="btn-icon" aria-label="Search">
              <Search className="w-4 h-4" />
            </button>

            <div className="relative">
              <button className="btn-icon" aria-label="Notifications">
                <Bell className="w-4 h-4" />
              </button>
              <span
                className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full animate-pulse-subtle"
                style={{ background: "var(--color-z3-accent)" }}
              />
            </div>

            <button
              onClick={toggle}
              className="btn-icon"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          {/* ── Mobile controls ── */}
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
      </div>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div
          className="md:hidden border-t px-4 py-3 space-y-1"
          style={{ borderColor: "var(--color-z3-border)", background: "var(--color-z3-bg)" }}
        >
          <MobileNavLink href="/search?mode=buy">Buy</MobileNavLink>
          <MobileNavLink href="/search?mode=rent">Rent</MobileNavLink>
          <MobileNavLink href="/property-management">Property Management</MobileNavLink>
        </div>
      )}
    </nav>
  );
}

function NavLink({
  href,
  children,
  active,
  disabled,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
}) {
  return (
    <Link
      href={disabled ? "#" : href}
      className={clsx(
        "navbar__link",
        active && "navbar__link--active",
        disabled && "opacity-50 cursor-default pointer-events-none"
      )}
      style={active ? { borderColor: "var(--color-z3-accent)" } : undefined}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  children,
  disabled,
}: {
  href: string;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <Link
      href={disabled ? "#" : href}
      className={clsx(
        "block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
        disabled
          ? "text-z3-text-muted cursor-default pointer-events-none"
          : "text-z3-text-secondary hover:text-z3-text hover:bg-white/[0.06]"
      )}
    >
      {children}
    </Link>
  );
}
