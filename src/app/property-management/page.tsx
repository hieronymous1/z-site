"use client";

import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Plus, X, Upload, Building, Bed, Bath, Maximize,
  Car, Calendar, Tag, CheckCircle, Trash2, Eye,
} from "lucide-react";

interface Listing {
  id: string;
  title: string;
  description: string;
  images: string[];   // base64 or object URLs
  yearBuilt: number;
  beds: number;
  baths: number;
  sqft: string;
  parking: number;
  price: string;
  type: "For Sale" | "For Rent";
  area: string;
  features: string[];
  createdAt: string;
}

const FEATURE_SUGGESTIONS = [
  "Balcony", "Pool", "Gym", "Parking", "Furnished", "Sea View",
  "Smart Home", "Concierge", "Pet Friendly", "Beach Access",
  "Garden", "Maid's Room", "Study", "Built-in Wardrobes",
];

const EMPTY_FORM = {
  title: "", description: "", yearBuilt: new Date().getFullYear(),
  beds: 1, baths: 1, sqft: "", parking: 1,
  price: "", type: "For Sale" as "For Sale" | "For Rent",
  area: "", featureInput: "", features: [] as string[],
  images: [] as string[],
};

/* ─── Pill ─── */
function FeaturePill({ label, onRemove }: { label: string; onRemove?: () => void }) {
  return (
    <span className="feature-pill">
      {label}
      {onRemove && (
        <button onClick={onRemove} className="opacity-60 hover:opacity-100 transition-opacity" aria-label={`Remove ${label}`}>
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
}

/* ─── Listing card ─── */
function ListingCard({ listing, onDelete }: { listing: Listing; onDelete: () => void }) {
  const [imgIdx, setImgIdx] = useState(0);
  const accent = listing.type === "For Sale" ? "#A5FFD6" : "#A96DA3";
  const accentBg = listing.type === "For Sale" ? "rgba(165,255,214,0.10)" : "rgba(169,109,163,0.12)";

  return (
    <article className="listing-card">
      {/* Image */}
      <div className="listing-card__image">
        {listing.images.length > 0 ? (
          <img src={listing.images[imgIdx]} alt={listing.title} />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Building className="w-10 h-10" style={{ color: 'rgba(238,229,233,0.12)' }} />
          </div>
        )}
        {/* Overlay gradient */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(18,19,15,0.6) 0%, transparent 50%)' }} />
        {/* Badge */}
        <div className="absolute bottom-3 left-3">
          <span className={`property-card__badge ${listing.type === "For Sale" ? "property-card__badge--sale" : "property-card__badge--rent"}`}>
            {listing.type}
          </span>
        </div>
        {/* Image navigation dots */}
        {listing.images.length > 1 && (
          <div className="absolute bottom-3 right-3 flex gap-1">
            {listing.images.map((_, i) => (
              <button key={i} onClick={() => setImgIdx(i)}
                className="w-1.5 h-1.5 rounded-full transition-all"
                style={{ background: i === imgIdx ? accent : 'rgba(238,229,233,0.3)' }}
                aria-label={`Image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="listing-card__body">
        <div>
          <p className="type-label-mono mb-1">{listing.area || "Dubai"} · {listing.yearBuilt}</p>
          <h3 className="property-card__title mb-1">{listing.title}</h3>
          <p className={`property-card__price ${listing.type === "For Rent" ? "property-card__price--rent" : ""}`}>{listing.price}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-1.5">
          {[
            { icon: Bed,      v: `${listing.beds}bd`    },
            { icon: Bath,     v: `${listing.baths}ba`   },
            { icon: Maximize, v: listing.sqft || "—"    },
            { icon: Car,      v: `${listing.parking}pk` },
          ].map(({ icon: Icon, v }) => (
            <div key={v} className="property-card__stat">
              <Icon className="w-3 h-3" style={{ color: accent, opacity: 0.7 }} />
              <span>{v}</span>
            </div>
          ))}
        </div>

        {/* Description */}
        {listing.description && (
          <p className="type-body line-clamp-2">{listing.description}</p>
        )}

        {/* Features */}
        {listing.features.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {listing.features.slice(0, 4).map(f => <FeaturePill key={f} label={f} />)}
            {listing.features.length > 4 && (
              <span className="type-body-sm px-2 py-1">+{listing.features.length - 4}</span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="listing-card__actions">
          <button className="btn btn-ghost flex-1 text-xs py-2" style={{ color: accent, background: accentBg }}>
            <Eye className="w-3.5 h-3.5" /> View
          </button>
          <button onClick={onDelete} className="btn btn-danger px-3 py-2">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
}

/* ─── Main page ─── */
export default function PropertyManagementPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const setField = <K extends keyof typeof EMPTY_FORM>(key: K, val: (typeof EMPTY_FORM)[K]) =>
    setForm(f => ({ ...f, [key]: val }));

  const addFeature = (feat: string) => {
    const trimmed = feat.trim();
    if (trimmed && !form.features.includes(trimmed)) {
      setField("features", [...form.features, trimmed]);
    }
    setField("featureInput", "");
  };

  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setForm(f => ({ ...f, images: [...f.images, ev.target!.result as string] }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.price) return;
    const listing: Listing = {
      id: Date.now().toString(),
      title: form.title,
      description: form.description,
      images: form.images,
      yearBuilt: form.yearBuilt,
      beds: form.beds,
      baths: form.baths,
      sqft: form.sqft,
      parking: form.parking,
      price: form.price,
      type: form.type,
      area: form.area,
      features: form.features,
      createdAt: new Date().toLocaleDateString("en-AE", { day: "numeric", month: "short", year: "numeric" }),
    };
    setListings(prev => [listing, ...prev]);
    setForm({ ...EMPTY_FORM });
    setShowForm(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  // no local style objects needed — using semantic CSS classes

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-z3-bg)', fontFamily: 'var(--font-sans)' }}>
      {/* Ambient orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(165,255,214,0.05) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(169,109,163,0.04) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      </div>

      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-24">

        {/* ── Page header ── */}
        <header className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <p className="type-label-mono mb-3">Property Management</p>
              <h1 className="type-display-lg">
                Your <span className="italic type-gradient">Listings</span>
              </h1>
              <p className="text-sm mt-3" style={{ color: 'var(--color-z3-text-secondary)' }}>
                {listings.length === 0 ? "No listings yet — upload your first property below." : `${listings.length} listing${listings.length !== 1 ? "s" : ""} published`}
              </p>
            </div>

            <button
              onClick={() => setShowForm(f => !f)}
              className={`btn shrink-0 ${showForm ? "btn-ghost" : "btn-primary"}`}
            >
              {showForm ? <><X className="w-4 h-4" /> Cancel</> : <><Plus className="w-4 h-4" /> Add Listing</>}
            </button>
          </div>

          {/* Success toast */}
          {submitted && (
            <div className="mt-4 feature-pill text-sm">
              <CheckCircle className="w-4 h-4" />
              Listing published successfully
            </div>
          )}
        </header>

        {/* ── Upload form ── */}
        {showForm && (
          <section className="mb-16">
            <form onSubmit={handleSubmit}>
              <div className="card p-6 sm:p-8 space-y-8">
                <div>
                  <p className="type-label-mono mb-1">New listing</p>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--color-z3-text)', fontWeight: 400 }}>
                    Property details
                  </h2>
                </div>

                {/* ── Row 1: Title + Price ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="form-field">
                    <label className="form-label">Title *</label>
                    <input className="form-input" value={form.title} onChange={e => setField("title", e.target.value)}
                      placeholder="e.g. Luxury 2BR Marina Apartment" required />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Price / Rent *</label>
                    <input className="form-input" value={form.price} onChange={e => setField("price", e.target.value)}
                      placeholder="e.g. AED 1,850,000 or AED 14,000/mo" required />
                  </div>
                </div>

                {/* ── Row 2: Area + Type + Year Built ── */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="form-field">
                    <label className="form-label">Area / Neighbourhood</label>
                    <input className="form-input" value={form.area} onChange={e => setField("area", e.target.value)}
                      placeholder="e.g. Dubai Marina" />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Listing Type</label>
                    <select className="form-input form-select" value={form.type} onChange={e => setField("type", e.target.value as "For Sale" | "For Rent")}>
                      <option value="For Sale">For Sale</option>
                      <option value="For Rent">For Rent</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label className="form-label">Year Built</label>
                    <input className="form-input" type="number" value={form.yearBuilt} min={1970} max={2030}
                      onChange={e => setField("yearBuilt", parseInt(e.target.value) || 2020)} />
                  </div>
                </div>

                {/* ── Row 3: Beds, Baths, Sqft, Parking ── */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                  {([
                    { key: "beds",    label: "Bedrooms",  icon: Bed,      min: 0, max: 20 },
                    { key: "baths",   label: "Bathrooms", icon: Bath,     min: 1, max: 20 },
                    { key: "parking", label: "Parking",   icon: Car,      min: 0, max: 20 },
                  ] as const).map(({ key, label, icon: Icon, min, max }) => (
                    <div key={key} className="form-field">
                      <label className="form-label flex items-center gap-1">
                        <Icon className="w-3 h-3" /> {label}
                      </label>
                      <input className="form-input" type="number" value={form[key]} min={min} max={max}
                        onChange={e => setField(key, parseInt(e.target.value) || 0)} />
                    </div>
                  ))}
                  <div className="form-field">
                    <label className="form-label flex items-center gap-1">
                      <Maximize className="w-3 h-3" /> Area (sqft)
                    </label>
                    <input className="form-input" value={form.sqft} onChange={e => setField("sqft", e.target.value)}
                      placeholder="e.g. 1,303 sqft" />
                  </div>
                </div>

                {/* ── Description ── */}
                <div className="form-field">
                  <label className="form-label">Description</label>
                  <textarea className="form-input form-textarea" value={form.description} onChange={e => setField("description", e.target.value)}
                    rows={4} placeholder="Describe the property — location highlights, interior finishes, views, proximity to amenities…" />
                </div>

                {/* ── Features ── */}
                <div>
                  <label className="type-label-mono block mb-3 flex items-center gap-1.5">
                    <Tag className="w-3 h-3" /> Features
                  </label>
                  {/* Quick suggestions */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {FEATURE_SUGGESTIONS.filter(f => !form.features.includes(f)).map(f => (
                      <button key={f} type="button" onClick={() => addFeature(f)}
                        className="px-3 py-1.5 rounded-full text-xs transition-all"
                        style={{ background: 'rgba(238,229,233,0.05)', border: '1px solid rgba(238,229,233,0.09)', color: 'var(--color-z3-text-muted)' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(165,255,214,0.25)'; (e.currentTarget as HTMLButtonElement).style.color = '#A5FFD6'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(238,229,233,0.09)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-z3-text-muted)'; }}>
                        + {f}
                      </button>
                    ))}
                  </div>
                  {/* Custom tag input */}
                  <div className="flex gap-2 mb-3">
                    <input
                      className="form-input flex-1"
                      value={form.featureInput}
                      onChange={e => setField("featureInput", e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addFeature(form.featureInput); } }}
                      placeholder="Type a custom feature and press Enter…"
                    />
                    <button type="button" onClick={() => addFeature(form.featureInput)}
                      className="feature-pill cursor-pointer">
                      + Add
                    </button>
                  </div>
                  {/* Selected features */}
                  {form.features.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {form.features.map(f => (
                        <FeaturePill key={f} label={f} onRemove={() => setField("features", form.features.filter(x => x !== f))} />
                      ))}
                    </div>
                  )}
                </div>

                {/* ── Image upload ── */}
                <div>
                  <label className="type-label-mono block mb-3 flex items-center gap-1.5">
                    <Upload className="w-3 h-3" /> Images
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                    {form.images.map((src, i) => (
                      <div key={i} className="relative h-24 rounded-xl overflow-hidden group">
                        <img src={src} alt="" className="w-full h-full object-cover" />
                        <button type="button" onClick={() => setField("images", form.images.filter((_, j) => j !== i))}
                          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ background: 'rgba(0,0,0,0.5)' }}>
                          <X className="w-5 h-5" style={{ color: '#F06060' }} />
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={() => fileRef.current?.click()} className="form-upload">
                      <Upload className="w-5 h-5" />
                      <span className="text-xs">Upload</span>
                    </button>
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleImages} />
                  <p className="text-xs" style={{ color: 'var(--color-z3-text-muted)' }}>JPG, PNG or WebP. Multiple images supported.</p>
                </div>

                {/* ── Submit ── */}
                <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: 'var(--color-z3-border)' }}>
                  <button type="submit" className="btn btn-primary">
                    <CheckCircle className="w-4 h-4" /> Publish Listing
                  </button>
                  <button type="button" onClick={() => { setForm({ ...EMPTY_FORM }); setShowForm(false); }}
                    className="btn btn-ghost">
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </section>
        )}

        {/* ── Listings grid ── */}
        {listings.length > 0 ? (
          <section>
            <div className="flex items-center justify-between mb-6">
              <p className="type-label-mono">{listings.length} Listing{listings.length !== 1 ? "s" : ""}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {listings.map(l => (
                <ListingCard key={l.id} listing={l} onDelete={() => setListings(prev => prev.filter(x => x.id !== l.id))} />
              ))}
            </div>
          </section>
        ) : !showForm ? (
          /* ── Empty state ── */
          <section className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
              style={{ background: 'var(--color-z3-accent-glow)', border: '1px solid rgba(165,255,214,0.15)' }}>
              <Building className="w-9 h-9" style={{ color: '#A5FFD6', opacity: 0.7 }} />
            </div>
            <h2 className="type-display-md mb-2">No listings yet</h2>
            <p className="text-sm mb-8 max-w-sm" style={{ color: 'var(--color-z3-text-secondary)' }}>
              Upload your first property to get started. Fill in the details, add photos, and publish in minutes.
            </p>
            <button onClick={() => setShowForm(true)}
              className="btn btn-primary">
              <Plus className="w-4 h-4" /> Add Your First Listing
            </button>
          </section>
        ) : null}
      </main>

      <Footer />
    </div>
  );
}
