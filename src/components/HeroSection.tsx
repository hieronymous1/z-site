"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function HeroSection() {
  const { theme } = useTheme();
  const [activeCity, setActiveCity] = useState<"dubai" | "abu-dhabi">("dubai");

  return (
    <section className="hero-cargo">
      {/* Rule */}
      <hr className="hero-cargo__rule" />

      {/* Headline block */}
      <div className="hero-cargo__headline-block">
        <h1 className="hero-cargo__headline">Discover Dubai</h1>
        <h1 className="hero-cargo__headline">Real Estate.</h1>
      </div>

      {/* Rule */}
      <hr className="hero-cargo__rule" />

      {/* Full-width city render */}
      <img
        className="hero-cargo__image"
        src={theme === "dark" ? "/assets/dubai-night.png" : "/assets/dubai-day.png"}
        alt="Dubai city render"
      />

      {/* Rule */}
      <hr className="hero-cargo__rule" />

      {/* Footer: byline + city switcher left, CTA right */}
      <div className="hero-cargo__footer">
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <p className="hero-cargo__byline">Z3 Real Estate — AI-powered</p>
          <div className="city-switcher" style={{ marginBottom: 0 }}>
            <button
              className={`city-pill ${activeCity === "dubai" ? "city-pill--active" : ""}`}
              onClick={() => setActiveCity("dubai")}
            >
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--color-z3-accent)", display: "inline-block" }} />
              Dubai
            </button>
            <span className="city-pill city-pill--soon">
              Abu Dhabi
              <span className="city-pill__soon">Soon</span>
            </span>
          </div>
        </div>

        <Link
          href="/search?mode=buy"
          className="btn btn-primary"
          style={{ gap: 8, paddingLeft: "var(--spacing-lg)", paddingRight: "var(--spacing-lg)", flexShrink: 0 }}
        >
          Enter
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
