"use client";

import { useState } from "react";
import {
  BarChart3,
  MapPin,
  TrendingUp,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

type Mode = "buy" | "rent";
const TABS = ["Overview", "Areas", "Signals"] as const;
type SidebarTab = (typeof TABS)[number];

const TAB_ICONS: Record<SidebarTab, React.ElementType> = {
  Overview: BarChart3,
  Areas:    MapPin,
  Signals:  TrendingUp,
};

const OVERVIEW_STATS = [
  { label: "Avg Price",      value: "AED 1,280", unit: "/sqft", up: true,  change: "+8.5%" },
  { label: "Active Listings",value: "3,842",     unit: "",      up: true,  change: "+12%" },
  { label: "Days on Market", value: "42",         unit: "days",  up: false, change: "-6%" },
  { label: "YoY Change",     value: "+14.2%",     unit: "",      up: true,  change: "vs 2025" },
];

const AREAS_DATA = [
  { name: "Downtown Dubai", priceSqft: "AED 2,400", up: true,  change: "+9.3%" },
  { name: "Dubai Marina",   priceSqft: "AED 1,850", up: true,  change: "+7.8%" },
  { name: "Palm Jumeirah",  priceSqft: "AED 3,200", up: true,  change: "+6.4%" },
  { name: "JVC",            priceSqft: "AED 850",   up: false, change: "-3.2%" },
  { name: "Business Bay",   priceSqft: "AED 1,580", up: true,  change: "+5.1%" },
  { name: "Creek Harbour",  priceSqft: "AED 1,620", up: true,  change: "+11.2%" },
];

const SIGNALS_DATA = [
  {
    title: "Price drops — best buying opportunity",
    description: "Prices down ~3% in 90 days",
    areas: [
      { name: "JVC",                 value: "AED 850/sqft",  change: "-3.2%", up: false },
      { name: "Dubai Silicon Oasis", value: "AED 720/sqft",  change: "-2.8%", up: false },
      { name: "International City",  value: "AED 540/sqft",  change: "-4.1%", up: false },
    ],
  },
  {
    title: "Top areas for high rental yield",
    description: "Up to 9.1% annual yield",
    areas: [
      { name: "Discovery Gardens",   value: "9.1%",          change: "+0.8pp", up: true },
      { name: "International City",  value: "8.7%",          change: "+0.5pp", up: true },
      { name: "Dubai Sports City",   value: "8.3%",          change: "+0.3pp", up: true },
    ],
  },
  {
    title: "Rising capital values",
    description: "Strong investment areas",
    areas: [
      { name: "Creek Harbour",       value: "AED 1,580/sqft", change: "+9.3%", up: true },
      { name: "Dubai Hills",         value: "AED 1,680/sqft", change: "+7.8%", up: true },
      { name: "Business Bay",        value: "AED 1,850/sqft", change: "+6.4%", up: true },
    ],
  },
];

export default function MarketSidebar({ mode = "buy" }: { mode?: Mode }) {
  const [activeTab, setActiveTab] = useState<SidebarTab>("Overview");

  const accentColor = mode === "buy" ? "var(--color-z3-accent)" : "var(--color-z3-mauve)";
  const accentBg    = mode === "buy" ? "rgba(201,162,88,0.12)" : "rgba(196,118,80,0.12)";

  return (
    <aside className="market-sidebar">

      {/* Tab bar */}
      <div className="flex border-b" style={{ borderColor: "var(--color-z3-border)" }}>
        {TABS.map((tab) => {
          const Icon     = TAB_ICONS[tab];
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`market-sidebar__tab ${isActive ? "market-sidebar__tab--active" : ""}`}
              style={isActive ? { color: accentColor } : undefined}
            >
              <Icon className="w-4 h-4" />
              {tab}
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

      {/* Overview tab — 2×2 stat grid */}
      {activeTab === "Overview" && (
        <div className="flex-1 overflow-y-auto p-4">
          <p className="type-label-mono mb-3" style={{ color: `${accentColor}` }}>Market Overview</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {OVERVIEW_STATS.map((stat) => (
              <div key={stat.label} className="card p-3">
                <p className="type-body-sm mb-1">{stat.label}</p>
                <p className="type-label" style={{ fontSize: 15, fontWeight: 700 }}>
                  {stat.value}
                  {stat.unit && <span className="type-body-sm ml-1">{stat.unit}</span>}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  {stat.up
                    ? <ArrowUpRight   className="w-3 h-3" style={{ color: accentColor }} />
                    : <ArrowDownRight className="w-3 h-3" style={{ color: "var(--color-z3-red)" }} />}
                  <span style={{ fontSize: 10, fontWeight: 600, color: stat.up ? accentColor : "var(--color-z3-red)" }}>
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Areas tab — ranked list */}
      {activeTab === "Areas" && (
        <div className="flex-1 overflow-y-auto p-4">
          <p className="type-label-mono mb-3" style={{ color: `${accentColor}` }}>Areas / Price per sqft</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {AREAS_DATA.map((area, i) => (
              <div
                key={area.name}
                className="market-area-row"
                style={{ borderTop: i > 0 ? "1px solid var(--color-z3-border)" : "none" }}
              >
                <div className="flex items-center gap-2">
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-z3-text-muted)", width: 16 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="type-body-sm" style={{ color: "var(--color-z3-text)" }}>{area.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="type-body-sm">{area.priceSqft}</span>
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
        </div>
      )}

      {/* Signals tab */}
      {activeTab === "Signals" && (
        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4" style={{ paddingTop: 16 }}>
          <p className="type-label-mono" style={{ color: `${accentColor}` }}>Market Signals</p>
          {SIGNALS_DATA.map((signal, i) => (
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
                View details <ChevronRight className="w-3 h-3" />
              </button>
            </article>
          ))}
        </div>
      )}

    </aside>
  );
}
