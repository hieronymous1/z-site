"use client";

import {
  X, Heart, Share2, Bed, Bath, Maximize, Car,
  MapPin, TrendingUp, TrendingDown, ChevronLeft, ChevronRight,
  Phone, MessageCircle, Calendar, Star, Building, Eye,
} from "lucide-react";
import { useState } from "react";
import type { Property } from "@/data/properties";
import { BUY_PROPERTIES } from "@/data/properties";

interface PropertyPanelProps {
  isOpen: boolean;
  onClose: () => void;
  property?: Property | null;
  mode?: "buy" | "rent";
}

// Derived property metadata not in the data model
const META: Record<string, { yearBuilt: number; description: string; imgClass: string }> = {
  "buy-1":  { yearBuilt: 2019, imgClass: "prop-img-1", description: "A refined Marina apartment set across a high floor with panoramic views of the waterway. Features full-height glazing, Italian marble finishes, and direct access to the Marina Walk retail promenade." },
  "buy-2":  { yearBuilt: 2018, imgClass: "prop-img-2", description: "Rare penthouse position overlooking the Burj Khalifa and Dubai Fountain. Private rooftop terrace, butler service, and bespoke interior finishes across three generous bedrooms." },
  "buy-3":  { yearBuilt: 2026, imgClass: "prop-img-3", description: "A contemporary off-plan studio in JVC's fastest-growing pocket. Pool view position, modern open-plan layout, and strong projected rental yield on handover." },
  "buy-4":  { yearBuilt: 2021, imgClass: "prop-img-4", description: "A spacious family villa set on a quiet cul-de-sac within Dubai Hills Estate. Private garden, maid's room, study, and direct views across the championship golf course." },
  "buy-5":  { yearBuilt: 2017, imgClass: "prop-img-5", description: "Premium Palm residence with unobstructed Arabian Gulf views from both bedrooms. Beach access, resort-style pool, and 24-hour concierge in a boutique low-rise building." },
  "buy-6":  { yearBuilt: 2027, imgClass: "prop-img-6", description: "Early-release unit in Creek Harbour's fastest-appreciating cluster. Creek and skyline views, co-working amenity podium, and proximity to the forthcoming Emaar Creek Beach." },
  "buy-7":  { yearBuilt: 2020, imgClass: "prop-img-7", description: "Canal-front townhouse in the heart of Business Bay. Rooftop terrace access, double-height living, and ground-floor retail connectivity within walking distance of the Metro." },
  "buy-8":  { yearBuilt: 2016, imgClass: "prop-img-8", description: "Walk-facing apartment steps from JBR's open-air promenade and beach. Recently refurbished interior, generous layout, and year-round tenant demand." },
  "rent-1": { yearBuilt: 2019, imgClass: "prop-img-1", description: "Fully furnished Marina apartment with bills included. Balcony overlooking the Marina Walk, hotel-standard fit-out, available immediately for professional occupancy." },
  "rent-2": { yearBuilt: 2018, imgClass: "prop-img-2", description: "Spacious Downtown three-bedroom with direct Fountain views. Semi-furnished with premium appliances, available mid-March 2026 for long-term lease." },
  "rent-3": { yearBuilt: 2022, imgClass: "prop-img-3", description: "Pet-friendly JVC one-bedroom in a well-managed community. Affordable pricing with strong amenity provision and excellent transport links to major business districts." },
  "rent-4": { yearBuilt: 2021, imgClass: "prop-img-4", description: "Prestigious Dubai Hills villa with private pool and landscaped garden. Smart home automation, maid's accommodation, and gold-course position in a gated community." },
  "rent-5": { yearBuilt: 2017, imgClass: "prop-img-5", description: "Beachfront Palm apartment fully furnished and bills included. Immediate access to a private beach, sea-facing terraces, and resort facilities throughout the building." },
  "rent-6": { yearBuilt: 2024, imgClass: "prop-img-6", description: "Brand-new Creek Harbour studio with generous Creek views and co-working lounge access. High-demand location with consistently low vacancy rates." },
  "rent-7": { yearBuilt: 2020, imgClass: "prop-img-7", description: "Partially furnished Business Bay apartment with panoramic canal views. Doorman building, pool, and gym within a 5-minute walk of the Dubai Canal boardwalk." },
  "rent-8": { yearBuilt: 2016, imgClass: "prop-img-8", description: "Pet-friendly JBR one-bedroom a short walk from the beach. Open-plan layout, recently updated kitchen, and direct access to the JBR outdoor mall promenade." },
};

const FALLBACK_META = { yearBuilt: 2020, imgClass: "prop-img-1", description: "A premium Dubai property offering world-class amenities, exceptional build quality, and an outstanding location in one of the city's most sought-after districts." };

const GLASS_PANEL = {
  background: 'rgba(18,19,15,0.88)',
  backdropFilter: 'blur(52px) saturate(180%)',
  WebkitBackdropFilter: 'blur(52px) saturate(180%)',
  borderLeft: '1px solid rgba(238,229,233,0.10)',
  boxShadow: 'inset 1px 0 0 rgba(238,229,233,0.05), -32px 0 80px rgba(0,0,0,0.7)',
};

// Placeholder image URLs — Unsplash random architecture by seed
const IMG_SEEDS = ["dubai-marina","downtown-dubai","jvc-apartment","dubai-hills","palm-jumeirah","creek-harbour","business-bay","jbr-beach"];

export default function PropertyPanel({ isOpen, onClose, property, mode = "buy" }: PropertyPanelProps) {
  const [imgIdx, setImgIdx] = useState(0);
  const [liked, setLiked] = useState(false);

  if (!isOpen) return null;

  const p = property ?? BUY_PROPERTIES[0];
  const meta = META[p.id] ?? FALLBACK_META;

  const accentColor = mode === "buy" ? "#A5FFD6" : "#A96DA3";
  const accentColorBright = mode === "buy" ? "#C8FFE7" : "#C48DBE";
  const accentBg = mode === "buy" ? "rgba(165,255,214,0.10)" : "rgba(169,109,163,0.12)";
  const badgeBg = mode === "buy"
    ? "linear-gradient(135deg, #A5FFD6 0%, #C8FFE7 50%, #A5FFD6 100%)"
    : "linear-gradient(135deg, #A96DA3 0%, #C48DBE 50%, #A96DA3 100%)";
  const badgeColor = mode === "buy" ? "#12130F" : "#EEE5E9";

  const imgNums = [400, 401, 402];
  const imgSeed = IMG_SEEDS[(parseInt(p.id.split("-")[1] ?? "1") - 1) % IMG_SEEDS.length];

  const prevImg = () => setImgIdx((i) => (i + imgNums.length - 1) % imgNums.length);
  const nextImg = () => setImgIdx((i) => (i + 1) % imgNums.length);

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(3px)' }} onClick={onClose} />

      {/* Panel */}
      <article
        className="panel panel--slide-in fixed right-0 top-0 bottom-0 w-full max-w-[420px] z-50 overflow-hidden"
        style={{
          background: 'rgba(18,19,15,0.88)',
          backdropFilter: 'blur(52px) saturate(180%)',
          WebkitBackdropFilter: 'blur(52px) saturate(180%)',
          borderLeft: '1px solid rgba(238,229,233,0.10)',
          boxShadow: 'inset 1px 0 0 rgba(238,229,233,0.05), -32px 0 80px rgba(0,0,0,0.7)',
        }}
      >
        {/* Header */}
        <header className="panel__header">
          <div className="type-label-mono">{mode === "buy" ? "For Sale" : "For Rent"} · {p.area}</div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setLiked(l => !l)}
              className="p-2 rounded-lg transition-colors"
              style={{ color: liked ? '#F06060' : 'var(--color-z3-text-muted)' }}
            >
              <Heart className="w-4 h-4" fill={liked ? '#F06060' : 'none'} />
            </button>
            <button className="p-2 rounded-lg transition-colors" style={{ color: 'var(--color-z3-text-muted)' }}>
              <Share2 className="w-4 h-4" />
            </button>
            <button onClick={onClose} className="p-2 rounded-lg transition-colors" style={{ color: 'var(--color-z3-text-muted)' }}>
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Scrollable body */}
        <div className="panel__body">

          {/* ── Image carousel ── */}
          <div className="relative h-56 mx-4 mt-4 rounded-2xl overflow-hidden">
            {/* Placeholder image via picsum.photos (stable seed) */}
            <img
              src={`https://picsum.photos/seed/${imgSeed}${imgNums[imgIdx]}/800/450`}
              alt={p.title}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                el.style.display = 'none';
                (el.nextElementSibling as HTMLElement).style.display = 'flex';
              }}
            />
            {/* Fallback gradient if img fails */}
            <div className={`absolute inset-0 ${meta.imgClass} items-center justify-center`} style={{ display: 'none' }}>
              <Building className="w-12 h-12" style={{ color: 'rgba(238,229,233,0.08)' }} />
            </div>
            {/* Overlay gradient */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(18,19,15,0.7) 0%, transparent 50%)' }} />

            {/* Bottom badges */}
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
              <span className="px-2.5 py-1 rounded-lg text-[10px] font-semibold" style={{ background: 'rgba(18,19,15,0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(238,229,233,0.10)', color: 'var(--color-z3-text-secondary)' }}>
                {imgIdx + 1} / {imgNums.length}
              </span>
              <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold" style={{ background: badgeBg, color: badgeColor }}>
                {p.type === "For Sale" ? (p.completion ?? "Ready") : (p.available ?? "Now")}
              </span>
            </div>

            {/* Nav arrows */}
            <button onClick={prevImg} className="absolute left-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center transition-colors"
              style={{ background: 'rgba(18,19,15,0.75)', backdropFilter: 'blur(12px)', border: '1px solid rgba(238,229,233,0.10)', color: 'var(--color-z3-text-secondary)' }}>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={nextImg} className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center transition-colors"
              style={{ background: 'rgba(18,19,15,0.75)', backdropFilter: 'blur(12px)', border: '1px solid rgba(238,229,233,0.10)', color: 'var(--color-z3-text-secondary)' }}>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* ── Price & title ── */}
          <div className="px-5 pt-5 space-y-1.5">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-z3-text)', letterSpacing: '-0.01em' }}>
                {p.price}
              </span>
              {p.pricePerSqft && <span className="text-xs" style={{ color: 'var(--color-z3-text-muted)' }}>{p.pricePerSqft}</span>}
              {p.annualPrice && <span className="text-xs" style={{ color: 'var(--color-z3-text-muted)' }}>{p.annualPrice}</span>}
            </div>
            <h3 className="text-sm font-semibold leading-snug" style={{ color: 'var(--color-z3-text)' }}>{p.title}</h3>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: accentColor }} />
              <span className="text-xs" style={{ color: 'var(--color-z3-text-secondary)' }}>{p.location}</span>
            </div>
          </div>

          {/* ── Quick stat grid ── */}
          <div className="grid grid-cols-4 gap-2 px-5 pt-4">
            <QuickStat icon={Bed}      value={p.beds.toString()}    label="Beds"  accent={accentColor} />
            <QuickStat icon={Bath}     value={p.baths.toString()}   label="Baths" accent={accentColor} />
            <QuickStat icon={Maximize} value={p.sqft}               label="Area"  accent={accentColor} />
            <QuickStat icon={Car}      value={p.parking.toString()} label="Park"  accent={accentColor} />
          </div>

          {/* ── Year built + developer row ── */}
          <div className="flex items-center gap-3 px-5 pt-4">
            <div className="flex-1 rounded-xl px-4 py-3 flex flex-col gap-0.5"
              style={{ background: 'rgba(238,229,233,0.04)', border: '1px solid rgba(238,229,233,0.08)' }}>
              <span className="editorial-index">Year Built</span>
              <span className="text-sm font-semibold" style={{ color: 'var(--color-z3-text)' }}>{meta.yearBuilt}</span>
            </div>
            {p.developer && (
              <div className="flex-1 rounded-xl px-4 py-3 flex flex-col gap-0.5"
                style={{ background: 'rgba(238,229,233,0.04)', border: '1px solid rgba(238,229,233,0.08)' }}>
                <span className="editorial-index">Developer</span>
                <span className="text-xs font-medium truncate" style={{ color: 'var(--color-z3-text)' }}>{p.developer}</span>
              </div>
            )}
            {p.rentalYield && (
              <div className="flex-1 rounded-xl px-4 py-3 flex flex-col gap-0.5"
                style={{ background: accentBg, border: `1px solid ${accentColor}22` }}>
                <span className="editorial-index">Yield</span>
                <span className="text-sm font-bold" style={{ color: accentColor }}>{p.rentalYield}</span>
              </div>
            )}
          </div>

          {/* ── Description ── */}
          <div className="px-5 pt-5">
            <div className="editorial-index mb-2">About this property</div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--color-z3-text-secondary)' }}>
              {meta.description}
            </p>
          </div>

          {/* ── Price / Rent indicators ── */}
          <div className="px-5 pt-5">
            <div className="type-label-mono mb-3">{mode === "buy" ? "Price Indicators" : "Rent Indicators"}</div>
            <div className="grid grid-cols-2 gap-2">
              {p.indicators.map((ind, i) => (
                <div key={i} className="property-indicator">
                  <div className="property-stat__label mb-0.5">{ind.label}</div>
                  <div className="flex items-center gap-1">
                    {ind.up !== undefined && (ind.up
                      ? <TrendingUp   className="w-3 h-3" style={{ color: accentColor }} />
                      : <TrendingDown className="w-3 h-3" style={{ color: "var(--color-z3-red)" }} />)}
                    <span className="property-stat__value" style={{ color: ind.up ? accentColor : "var(--color-z3-text)" }}>{ind.value}</span>
                  </div>
                  {ind.period && <div className="property-stat__label mt-0.5">{ind.period}</div>}
                </div>
              ))}
            </div>
          </div>

          {/* ── Features ── */}
          <div className="px-5 pt-5">
            <div className="type-label-mono mb-3">Features</div>
            <div className="flex flex-wrap gap-1.5">
              {p.features.map((feat) => (
                <span key={feat} className={mode === "buy" ? "feature-pill" : "feature-pill feature-pill--mauve"}>
                  {feat}
                </span>
              ))}
            </div>
          </div>

          {/* ── Agent card ── */}
          <div className="px-5 pt-5 pb-5">
            <div className="editorial-index mb-3">Listed By</div>
            <div className="rounded-xl p-4 flex items-center gap-3"
              style={{ background: 'rgba(238,229,233,0.05)', border: '1px solid rgba(238,229,233,0.10)', boxShadow: 'inset 0 1px 0 rgba(238,229,233,0.10)' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: accentBg }}>
                <span className="text-sm font-bold" style={{ color: accentColor, fontFamily: 'var(--font-display)' }}>
                  {p.agent.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate" style={{ color: 'var(--color-z3-text)' }}>{p.agent.name}</div>
                <div className="text-xs truncate" style={{ color: 'var(--color-z3-text-muted)' }}>{p.agent.agency}</div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Star className="w-3 h-3" style={{ color: accentColor, fill: accentColor }} />
                <span className="text-xs font-semibold" style={{ color: 'var(--color-z3-text)' }}>{p.agent.rating}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── CTA buttons ── */}
        <footer className="panel__footer flex gap-2">
          {mode === "buy" ? (
            <button className="btn btn-primary flex-1">
              <Phone className="w-4 h-4" />
              Contact Agent
            </button>
          ) : (
            <button className="btn btn-secondary flex-1">
              <Eye className="w-4 h-4" />
              Schedule Viewing
            </button>
          )}
          <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all"
            style={{ background: 'rgba(238,229,233,0.06)', border: '1px solid rgba(238,229,233,0.10)', color: 'var(--color-z3-text)' }}
            onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(238,229,233,0.09)')}
            onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(238,229,233,0.06)')}>
            <MessageCircle className="w-4 h-4" />
            Message
          </button>
          <button className="w-12 flex items-center justify-center py-3 rounded-xl transition-all"
            style={{ background: 'rgba(238,229,233,0.06)', border: '1px solid rgba(238,229,233,0.10)', color: 'var(--color-z3-text-secondary)' }}
            onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(238,229,233,0.09)')}
            onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(238,229,233,0.06)')}>
            <Calendar className="w-4 h-4" />
          </button>
        </footer>
      </article>
    </>
  );
}

function QuickStat({ icon: Icon, value, label, accent }: { icon: React.ElementType; value: string; label: string; accent: string }) {
  return (
    <div className="property-stat">
      <Icon className="w-4 h-4" style={{ color: accent, opacity: 0.7 }} />
      <span className="property-stat__value">{value}</span>
      <span className="property-stat__label">{label}</span>
    </div>
  );
}
