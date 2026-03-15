"use client";

import { useState } from "react";
import { Search, Mic } from "lucide-react";
import Link from "next/link";

const TABS = ["Buy", "Rent", "Invest"] as const;

const FILTERS_BY_TAB: Record<(typeof TABS)[number], string[]> = {
  Buy:     ["Under AED 2M", "Off-plan", "High yield", "Palm views", "New handover"],
  Rent:    ["Bills included", "Pet friendly", "Furnished", "Short term", "Family areas"],
  Invest:  ["8%+ yield", "Off-plan", "Payment plan", "Capital gain"],
};

const PROPERTY_TYPES = [
  { short: "APT",   slug: "apartment" },
  { short: "VILLA", slug: "villa" },
  { short: "TH",    slug: "townhouse" },
  { short: "PENT",  slug: "penthouse" },
  { short: "LAND",  slug: "land" },
];

const STATS = [
  { label: "Avg. Price/sqft", value: "AED 1,280", change: "+8.5%" },
  { label: "Active Listings",  value: "24,500+",   change: null },
  { label: "Rental Yield",     value: "9.1%",       change: "+0.8pp" },
  { label: "Q1 Transactions",  value: "AED 142B",   change: "+21%" },
];

/* ─── Dubai skyline — golden hour treatment ─── */
function DubaiSkyline() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Golden hour sky */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(to bottom, #F8F0E0 0%, #F5E8CC 30%, #EDD9A8 65%, #E8CC88 85%, #E0BB70 100%)',
      }} />

      {/* Warm haze / horizon glow */}
      <div className="absolute bottom-0 left-0 right-0 h-[60%]" style={{
        background: 'radial-gradient(ellipse at 50% 100%, rgba(224,187,112,0.50) 0%, rgba(232,175,80,0.25) 35%, transparent 70%)',
      }} />

      {/* Subtle sun orb */}
      <div className="absolute" style={{
        right: '22%',
        top: '18%',
        width: 120,
        height: 120,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,210,100,0.55) 0%, rgba(240,185,70,0.20) 50%, transparent 75%)',
        filter: 'blur(18px)',
      }} />

      {/* Atmospheric haze layers */}
      <div className="absolute inset-x-0 bottom-0 h-[45%]" style={{
        background: 'linear-gradient(to top, rgba(232,200,140,0.30) 0%, transparent 100%)',
      }} />

      {/* Skyline SVG — warm stone silhouette */}
      <svg
        viewBox="0 0 1440 380"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMax slice"
        className="absolute bottom-0 left-0 w-full"
        style={{ height: '65%' }}
      >
        <defs>
          <linearGradient id="bldg-warm" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C8A870" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#B89458" stopOpacity="0.90" />
            <stop offset="100%" stopColor="#A88040" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="burj-warm" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D4B478" stopOpacity="0.80" />
            <stop offset="50%" stopColor="#C0A060" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#A88040" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="water-warm" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E0C880" stopOpacity="0.40" />
            <stop offset="100%" stopColor="#D4B870" stopOpacity="0.60" />
          </linearGradient>
          <filter id="warm-glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Water / foreground base */}
        <rect x="0" y="340" width="1440" height="40" fill="url(#water-warm)" />
        <rect x="0" y="338" width="1440" height="2" fill="rgba(201,162,88,0.35)" />

        {/* Left cluster — low-rise */}
        <path d="M0,380 V295 H18 V280 H30 V270 H42 V260 H58 V268 H70 V255 H85 V262 H95 V248 H108 V255 H118 V242 H130 V250 H142 V238 H152 V245 H160 V235 H168 V228 H175 V235 H182 V240 H192 V230 H200 V238 H210 V245 H220 V380 Z" fill="url(#bldg-warm)" />

        {/* Mid-left towers */}
        <path d="M218,380 V230 H228 V215 H238 V200 H248 V215 H255 V205 H262 V195 H270 V185 H278 V195 H284 V210 H292 V220 H302 V210 H312 V198 H318 V188 H326 V178 H334 V168 H342 V178 H348 V188 H354 V200 H362 V212 H372 V220 H382 V380 Z" fill="url(#bldg-warm)" />

        {/* Emirates Towers area */}
        <path d="M380,380 V215 H392 V195 H400 V175 H408 V155 H414 V148 H418 V155 H422 V175 H428 V195 H434 V215 H442 V220 H452 V210 H460 V195 H468 V178 H474 V172 H478 V178 H482 V195 H488 V210 H496 V380 Z" fill="url(#bldg-warm)" />

        {/* Mid section buildings */}
        <path d="M494,380 V210 H506 V198 H516 V188 H526 V198 H534 V205 H544 V195 H552 V185 H560 V175 H568 V185 H574 V195 H582 V205 H590 V215 H600 V220 H612 V212 H622 V200 H632 V188 H640 V178 H648 V172 H654 V165 H660 V172 H664 V178 H668 V188 H672 V380 Z" fill="url(#bldg-warm)" />

        {/* Burj Khalifa — iconic needle */}
        <path d="
          M668,380
          V188 H672 V168 H676 V145 H679 V120 H681 V95 H683 V72 H685 V52 H686 V35 H687 V22 H688 V14 H689 V8 H690 V4 H691 V2 H692 V0 H693 V2 H694 V4 H695 V8 H696 V14 H697 V22 H698 V35 H699 V52 H700 V72 H702 V95 H704 V120 H706 V145 H709 V168 H712 V188 H716 V380 Z
        " fill="url(#burj-warm)" />
        {/* Burj highlight seams */}
        <rect x="681" y="188" width="2" height="192" fill="rgba(255,220,130,0.20)" />
        <rect x="697" y="188" width="2" height="192" fill="rgba(255,220,130,0.20)" />

        {/* Buildings right of Burj */}
        <path d="M714,380 V185 H722 V175 H730 V165 H738 V155 H745 V165 H750 V175 H756 V185 H764 V195 H774 V200 H784 V190 H794 V178 H804 V168 H812 V178 H818 V188 H824 V200 H832 V210 H842 V220 H854 V380 Z" fill="url(#bldg-warm)" />

        {/* Business Bay cluster */}
        <path d="M852,380 V215 H862 V200 H872 V188 H880 V178 H886 V170 H892 V163 H898 V170 H902 V178 H908 V188 H916 V200 H924 V210 H934 V215 H944 V205 H952 V192 H960 V182 H968 V192 H974 V205 H980 V215 H990 V380 Z" fill="url(#bldg-warm)" />

        {/* Marina / JBR cluster */}
        <path d="M988,380 V212 H998 V198 H1008 V185 H1016 V175 H1022 V168 H1028 V158 H1034 V150 H1040 V158 H1044 V168 H1048 V178 H1054 V190 H1062 V200 H1070 V210 H1080 V215 H1092 V205 H1102 V192 H1110 V200 H1118 V210 H1128 V218 H1140 V210 H1150 V198 H1158 V188 H1166 V198 H1172 V210 H1178 V220 H1190 V380 Z" fill="url(#bldg-warm)" />

        {/* Far right fade */}
        <path d="M1188,380 V218 H1200 V225 H1215 V232 H1230 V240 H1248 V248 H1265 V255 H1282 V262 H1300 V268 H1320 V275 H1345 V280 H1370 V285 H1400 V290 H1440 V380 Z" fill="url(#bldg-warm)" />

        {/* Window glints — warm gold dots */}
        {[
          [392,165],[414,148],[478,175],[560,180],[640,180],[884,175],[1034,155],
          [430,168],[482,162],[694,8],[693,4],
        ].map(([x,y], i) => (
          <rect key={i} x={x} y={y} width="1" height="1" fill="rgba(255,220,100,0.80)" filter="url(#warm-glow)" />
        ))}
        {/* Burj spire tip glow */}
        <rect x="692" y="0" width="2" height="2" fill="rgba(255,210,80,0.95)" filter="url(#warm-glow)" />
      </svg>

      {/* Warm gradient vignette at top */}
      <div className="absolute inset-x-0 top-0 h-32" style={{
        background: 'linear-gradient(to bottom, rgba(248,240,224,0.60) 0%, transparent 100%)',
      }} />
    </div>
  );
}

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("Buy");
  const [searchQuery, setSearchQuery] = useState("");
  const filters = FILTERS_BY_TAB[activeTab];
  const accentColor = "#C9A258";
  const accentBg = "rgba(201,162,88,0.10)";

  return (
    <section className="hero">
      {/* ── Background ── */}
      <div className="hero__bg">
        <DubaiSkyline />
      </div>

      {/* ── Main content ── */}
      <div className="hero__content">

        {/* Badge */}
        <div className="hero__badge">
          <span className="type-label-mono" style={{ color: 'rgba(30,22,10,0.35)' }}>— 01</span>
          <span className="w-px h-3" style={{ background: 'rgba(30,22,10,0.15)' }} />
          <span className="w-1.5 h-1.5 rounded-full animate-pulse-subtle" style={{ background: accentColor }} />
          <span className="type-label-mono" style={{ color: accentColor }}>AI-Powered Real Estate</span>
        </div>

        {/* Headline */}
        <div className="hero__headline max-w-4xl">
          <div className="border-b pb-6 mb-6" style={{ borderColor: 'rgba(201,162,88,0.20)' }}>
            <h1 className="type-display-xl">
              <span className="block">The Smartest</span>
              <span className="block italic type-gradient">Real Estate.</span>
              <span className="block">Ever.</span>
            </h1>
          </div>
          <p className="hero__subline">
            AI-powered property search across the UAE. Buy, rent, and invest with real-time market intelligence.
          </p>
        </div>

        {/* ── Tab selector ── */}
        <div className="mode-toggle mb-5">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`mode-toggle__btn ${activeTab === tab ? "mode-toggle__btn--buy" : ""}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Search bar ── */}
        <div className="relative group w-full max-w-2xl mb-4">
          <div
            className="absolute -inset-px rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{ background: 'linear-gradient(135deg, rgba(201,162,88,0.40), rgba(196,118,80,0.25))', filter: 'blur(1px)' }}
          />
          <div className="search-bar rounded-xl px-5 py-4">
            <Search className="w-5 h-5 shrink-0 text-z3-text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && searchQuery.trim()) window.location.href = `/search?mode=${activeTab.toLowerCase()}&q=${encodeURIComponent(searchQuery)}`; }}
              placeholder={`Search ${activeTab === "Invest" ? "investment" : activeTab.toLowerCase()} properties in UAE…`}
              className="flex-1 text-base"
            />
            <button className="btn-icon" aria-label="Voice search">
              <Mic className="w-4 h-4" />
            </button>
            <Link
              href={`/search?mode=${activeTab.toLowerCase()}&q=${encodeURIComponent(searchQuery)}`}
              className="btn btn-primary px-5 py-2 text-sm shrink-0"
            >
              Search
            </Link>
          </div>
        </div>

        {/* ── Filter chips ── */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-5 w-full max-w-2xl">
          {filters.map((filter) => (
            <Link
              key={filter}
              href={`/search?mode=${activeTab.toLowerCase()}&q=${encodeURIComponent(filter)}`}
              className="filter-btn"
            >
              {filter}
            </Link>
          ))}
        </div>

        {/* ── Property type row ── */}
        <div className="flex items-center gap-0 flex-wrap justify-center mb-12">
          {PROPERTY_TYPES.map(({ short, slug }, i) => (
            <span key={short} className="flex items-center">
              <Link
                href={`/search?mode=${activeTab.toLowerCase()}&type=${slug}`}
                className="cargo-label transition-colors px-1"
                style={{ color: 'rgba(201,162,88,0.65)' }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(201,162,88,0.95)')}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(201,162,88,0.65)')}
              >
                {short}
              </Link>
              {i < PROPERTY_TYPES.length - 1 && <span className="cargo-number px-1">·</span>}
            </span>
          ))}
        </div>

        {/* ── Market stats row ── */}
        <div className="hero__stats glass-medium rounded-2xl px-6 py-5">
          <p className="type-label-mono text-center mb-4">Dubai Market Index</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0 sm:divide-x" style={{ borderColor: 'rgba(30,22,10,0.08)' }}>
            {STATS.map(({ label, value, change }) => (
              <div key={label} className="flex flex-col items-center gap-1 sm:px-4">
                <span className="type-body-sm text-center">{label}</span>
                <span className="text-base font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-z3-text)' }}>{value}</span>
                {change && (
                  <span className="feature-pill text-[10px]">{change}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll cue ── */}
      <div className="relative z-10 flex justify-center pb-8">
        <div className="flex flex-col items-center gap-2 opacity-40" aria-hidden="true">
          <span className="type-label-mono">Scroll</span>
          <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, rgba(30,22,10,0.30), transparent)' }} />
        </div>
      </div>
    </section>
  );
}
