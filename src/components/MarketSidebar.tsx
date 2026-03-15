"use client";

import { useState } from "react";
import {
  TrendingUp,
  BarChart3,
  MapPin,
  Volume2,
  Flame,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

type Mode = "buy" | "rent";
const BUY_TABS  = ["Sale", "Noise", "Hip"] as const;
const RENT_TABS = ["Rent", "Noise", "Hip"] as const;
type SidebarTab = (typeof BUY_TABS)[number] | (typeof RENT_TABS)[number];

const TAB_ICONS: Record<SidebarTab, React.ElementType> = {
  Sale: BarChart3,
  Rent: TrendingUp,
  Noise: Volume2,
  Hip: Flame,
};

interface MarketSignal {
  title: string;
  description: string;
  areas: { name: string; value: string; change: string; up: boolean }[];
}

const MARKET_DATA: Record<SidebarTab, {
  trend: { label: string; value: string; change: string; unit: string; period: string; up: boolean };
  signals: MarketSignal[];
}> = {
  Sale: {
    trend: { label: "Sale Price Trend", value: "AED 1,280", change: "+8.5%", unit: "/sqft avg", period: "6 months", up: true },
    signals: [
      {
        title: "Price drops — best buying opportunity",
        description: "Prices down ~3% in 90 days",
        areas: [
          { name: "JVC",                  value: "AED 850/sqft",  change: "-3.2%", up: false },
          { name: "Dubai Silicon Oasis",  value: "AED 720/sqft",  change: "-2.8%", up: false },
          { name: "International City",   value: "AED 540/sqft",  change: "-4.1%", up: false },
        ],
      },
      {
        title: "3 Top Areas for High Rental Yield",
        description: "Up to 9.1% annual yield",
        areas: [
          { name: "Discovery Gardens",    value: "9.1%",          change: "+0.8pp", up: true },
          { name: "International City",   value: "8.7%",          change: "+0.5pp", up: true },
          { name: "Dubai Sports City",    value: "8.3%",          change: "+0.3pp", up: true },
        ],
      },
      {
        title: "Rising capital values",
        description: "Strong investment areas",
        areas: [
          { name: "Creek Harbour",        value: "AED 1,580/sqft", change: "+9.3%", up: true },
          { name: "Dubai Hills",          value: "AED 1,680/sqft", change: "+7.8%", up: true },
          { name: "Business Bay",         value: "AED 1,850/sqft", change: "+6.4%", up: true },
        ],
      },
    ],
  },
  Rent: {
    trend: { label: "Rent Price Trend", value: "AED 85K", change: "+4.2%", unit: "/yr avg", period: "12 months", up: true },
    signals: [
      {
        title: "Areas with rising rents",
        description: "Significant rent increases",
        areas: [
          { name: "Dubai Marina",   value: "AED 120K/yr", change: "+6.5%", up: true },
          { name: "Downtown Dubai", value: "AED 150K/yr", change: "+5.8%", up: true },
          { name: "Palm Jumeirah", value: "AED 200K/yr", change: "+4.2%", up: true },
        ],
      },
      {
        title: "Best value for renters",
        description: "Affordable areas with amenities",
        areas: [
          { name: "Al Nahda", value: "AED 35K/yr", change: "-1.2%", up: false },
          { name: "Deira",    value: "AED 40K/yr", change: "-0.8%", up: false },
          { name: "JVC",      value: "AED 62K/yr", change: "-1.0%", up: false },
        ],
      },
    ],
  },
  Noise: {
    trend: { label: "Noise Index", value: "Moderate", change: "Updated", unit: "", period: "weekly", up: true },
    signals: [
      {
        title: "Quietest neighborhoods",
        description: "Low noise levels, family-friendly",
        areas: [
          { name: "Arabian Ranches", value: "Very Quiet", change: "32dB", up: true },
          { name: "Emirates Hills",  value: "Very Quiet", change: "28dB", up: true },
          { name: "The Springs",     value: "Quiet",      change: "38dB", up: true },
        ],
      },
    ],
  },
  Hip: {
    trend: { label: "Trending Score", value: "High", change: "+12%", unit: "", period: "this quarter", up: true },
    signals: [
      {
        title: "Hottest neighborhoods right now",
        description: "Most search activity",
        areas: [
          { name: "JBR",           value: "Very Hot", change: "+18%", up: true },
          { name: "Dubai Hills",   value: "Hot",      change: "+15%", up: true },
          { name: "Creek Harbour", value: "Rising",   change: "+22%", up: true },
        ],
      },
    ],
  },
};

export default function MarketSidebar({ mode = "buy" }: { mode?: Mode }) {
  const tabs = mode === "buy" ? BUY_TABS : RENT_TABS;
  const [activeTab, setActiveTab] = useState<SidebarTab>(mode === "buy" ? "Sale" : "Rent");

  const effectiveTab: SidebarTab = tabs.includes(activeTab as never) ? activeTab : tabs[0];
  const data = MARKET_DATA[effectiveTab];

  const accentColor = mode === "buy" ? "#A5FFD6" : "#A96DA3";
  const accentBg    = mode === "buy" ? "rgba(165,255,214,0.12)" : "rgba(169,109,163,0.12)";

  return (
    <aside className="market-sidebar">

      {/* ── Tab bar ── */}
      <div className="flex border-b" style={{ borderColor: "var(--color-z3-border)" }}>
        {tabs.map((tab) => {
          const Icon     = TAB_ICONS[tab];
          const isActive = effectiveTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`market-sidebar__tab ${isActive ? "market-sidebar__tab--active" : ""}`}
              style={isActive ? { color: accentColor } : undefined}
            >
              <Icon className="w-4 h-4" />
              {tab}
              {/* Active underline — color driven by mode */}
              {isActive && (
                <span
                  className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                  style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* ── Trend card ── */}
      <div className="p-4">
        <div className="card p-4">
          <p className="type-body-sm mb-1">{data.trend.label}</p>

          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-z3-text">{data.trend.value}</span>
            {data.trend.unit && <span className="type-body-sm">{data.trend.unit}</span>}
          </div>

          <div className="flex items-center gap-1 mt-1.5">
            {data.trend.up
              ? <ArrowUpRight   className="w-3.5 h-3.5" style={{ color: accentColor }} />
              : <ArrowDownRight className="w-3.5 h-3.5" style={{ color: "var(--color-z3-red)" }} />}
            <span className="text-xs font-semibold" style={{ color: data.trend.up ? accentColor : "var(--color-z3-red)" }}>
              {data.trend.change}
            </span>
            <span className="type-body-sm">over {data.trend.period}</span>
          </div>
        </div>
      </div>

      {/* ── Market Signals ── */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
        <p className="type-label-mono" style={{ color: `${accentColor}A8` }}>
          Market Signals
        </p>

        {data.signals.map((signal, i) => (
          <article key={i} className="market-signal">
            <header>
              <h3 className="type-label">{signal.title}</h3>
              <p className="type-body-sm mt-0.5">{signal.description}</p>
            </header>

            <div className="space-y-1">
              {signal.areas.map((area, j) => (
                <div key={j} className="market-area-row">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-z3-text-muted" />
                    <span className="text-xs font-medium text-z3-text-secondary">{area.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="type-body-sm">{area.value}</span>
                    <span
                      className={area.up ? "market-badge--up" : "market-badge--down"}
                      style={area.up ? { background: accentBg, color: accentColor } : undefined}
                    >
                      {area.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button className="flex items-center gap-1 text-xs font-medium" style={{ color: accentColor }}>
              View details
              <ChevronRight className="w-3 h-3" />
            </button>
          </article>
        ))}
      </div>

    </aside>
  );
}
