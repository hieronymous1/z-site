"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import MarketSidebar from "@/components/MarketSidebar";
import AIChatPanel from "@/components/AIChatPanel";
import MapPanel from "@/components/MapPanel";
import PropertyPanel from "@/components/PropertyPanel";
import { BUY_PROPERTIES, RENT_PROPERTIES } from "@/data/properties";
import type { Property } from "@/data/properties";

function SearchContent() {
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<"buy" | "rent">("buy");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [propertyOpen, setPropertyOpen] = useState(false);

  useEffect(() => {
    const modeParam = searchParams.get("mode");
    setMode(modeParam === "rent" ? "rent" : "buy");
  }, [searchParams]);

  const properties = mode === "buy" ? BUY_PROPERTIES : RENT_PROPERTIES;

  const handleMarkerClick = (id: string) => {
    const property = properties.find((p) => p.id === id) ?? null;
    setSelectedProperty(property);
    setPropertyOpen(true);
  };

  const buyActive = mode === "buy";

  return (
    <div className="h-screen flex flex-col overflow-hidden pb-[56px] lg:pb-0" style={{ background: 'var(--color-z3-bg)', fontFamily: 'var(--font-sans)' }}>
      {/* Ambient orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 right-1/3 w-[480px] h-[480px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(165,255,214,0.06) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute bottom-0 left-1/4 w-[560px] h-[560px] rounded-full"
          style={{ background: buyActive
            ? 'radial-gradient(circle, rgba(165,255,214,0.04) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(169,109,163,0.05) 0%, transparent 70%)',
            filter: 'blur(100px)' }} />
      </div>

      <Navbar />

      {/* ── Buy / Rent mode toggle ── */}
      <div className="fixed top-16 left-0 right-0 z-40 flex items-center justify-center py-2 border-b glass-nav">
        <div className="mode-toggle">
          <button
            onClick={() => setMode("buy")}
            className={`mode-toggle__btn ${buyActive ? "mode-toggle__btn--buy" : ""}`}
          >
            Buy
          </button>
          <button
            onClick={() => setMode("rent")}
            className={`mode-toggle__btn ${!buyActive ? "mode-toggle__btn--rent" : ""}`}
          >
            Rent
          </button>
        </div>
      </div>

      {/* Main 3-column layout */}
      <div className="flex-1 flex pt-[88px] overflow-hidden">
        {/* Far left — AI Chat (desktop only) */}
        <aside className="hidden lg:flex w-[300px] shrink-0">
          <AIChatPanel mode={mode} />
        </aside>

        {/* Center — Map (full width on mobile) */}
        <main className="flex-1 min-w-0">
          <MapPanel
            onMarkerClick={handleMarkerClick}
            properties={properties}
            mode={mode}
          />
        </main>

        {/* Far right — Market Sidebar (desktop only, hidden when property panel open) */}
        <aside
          className="hidden lg:flex w-[280px] shrink-0 transition-all duration-300"
          style={{
            opacity: propertyOpen ? 0 : 1,
            pointerEvents: propertyOpen ? 'none' : 'auto',
            transform: propertyOpen ? 'translateX(20px)' : 'translateX(0)',
          }}
        >
          <MarketSidebar mode={mode} />
        </aside>
      </div>

      {/* Mobile bottom bar — quick access to AI + market data */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 flex border-t"
        style={{ background: 'rgba(18,19,15,0.92)', backdropFilter: 'blur(20px)', borderColor: 'rgba(238,229,233,0.08)' }}>
        <a href={`/search?mode=${mode}`}
          className="flex-1 flex flex-col items-center gap-1 py-3 text-xs transition-colors"
          style={{ color: 'var(--color-z3-text-secondary)' }}>
          <span style={{ fontSize: 16 }}>🗺</span>
          Map
        </a>
        <button onClick={() => setPropertyOpen(false)}
          className="flex-1 flex flex-col items-center gap-1 py-3 text-xs transition-colors"
          style={{ color: 'var(--color-z3-text-secondary)' }}>
          <span style={{ fontSize: 16 }}>✦</span>
          AI
        </button>
        <a href="/"
          className="flex-1 flex flex-col items-center gap-1 py-3 text-xs"
          style={{ color: 'var(--color-z3-text-secondary)' }}>
          <span style={{ fontSize: 16 }}>⌂</span>
          Home
        </a>
      </nav>

      {/* Property panel — slides in from right, overlays sidebar */}
      <PropertyPanel
        isOpen={propertyOpen}
        onClose={() => setPropertyOpen(false)}
        property={selectedProperty}
        mode={mode}
      />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}
