export default function DesignSystemPage() {
  return (
    <div
      className="min-h-screen px-10 py-16 space-y-20"
      style={{ background: 'var(--color-z3-bg)', color: 'var(--color-z3-text)' }}
    >
      <header>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,163,94,0.6)', marginBottom: '8px' }}>
          Z3 Real Estate
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '48px', fontWeight: 300 }}>
          Design System
        </h1>
      </header>

      {/* ── Color Swatches ── */}
      <section>
        <SectionLabel number="01" title="Color Tokens" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px', marginTop: '24px' }}>
          <Swatch name="z3-bg" value="#06080B" />
          <Swatch name="z3-bg-deep" value="#030405" />
          <Swatch name="z3-surface" value="#0D1018" />
          <Swatch name="z3-surface-light" value="#111521" />
          <Swatch name="z3-surface-hover" value="#161B28" />
          <Swatch name="z3-text" value="#F2F4F7" />
          <Swatch name="z3-text-secondary" value="#8A95A8" />
          <Swatch name="z3-text-muted" value="#4E5868" />
          <Swatch name="z3-gold" value="#C9A35E" />
          <Swatch name="z3-gold-bright" value="#E8C27A" />
          <Swatch name="z3-accent" value="#4A80F0" />
          <Swatch name="z3-green" value="#2ECC8E" />
          <Swatch name="z3-red" value="#F06060" />
          <Swatch name="z3-orange" value="#E8923C" />
          <Swatch name="z3-purple" value="#9B7EF5" />
        </div>
      </section>

      {/* ── Typography ── */}
      <section>
        <SectionLabel number="02" title="Typography" />
        <div style={{ marginTop: '24px', borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '24px' }}>
          <TypeRow tag="H1" size="96px" weight={300} family="Cormorant Garamond" text="The Smartest Real Estate." />
          <TypeRow tag="H2" size="56px" weight={300} family="Cormorant Garamond" text="Real estate, reimagined." />
          <TypeRow tag="H3" size="36px" weight={300} family="Cormorant Garamond" text="Dubai Hills Estate" />
          <TypeRow tag="H4" size="24px" weight={300} family="Cormorant Garamond" text="Market Intelligence Report" />
          <TypeRow tag="Body" size="16px" weight={400} family="Inter" text="Natural language property search that understands your needs." />
          <TypeRow tag="Small" size="14px" weight={400} family="Inter" text="Active listings — 24,500+ properties across all Emirates" />
          <TypeRow tag="Mono" size="11px" weight={400} family="JetBrains Mono" text="APT · VILLA · TH · PENT · LAND" mono />
          <TypeRow tag="Label" size="10px" weight={600} family="JetBrains Mono" text="DUBAI MARKET INDEX — 01" mono caps />
        </div>
      </section>

      {/* ── Glass Tiers ── */}
      <section>
        <SectionLabel number="03" title="Glass Tiers" />
        <div style={{ display: 'flex', gap: '16px', marginTop: '24px', flexWrap: 'wrap' }}>
          <GlassBox tier=".glass" desc="bg 0.025 / blur 24px" className="glass" />
          <GlassBox tier=".glass-medium" desc="bg 0.035 / blur 32px" className="glass-medium" />
          <GlassBox tier=".glass-strong" desc="bg 0.045 / blur 44px" className="glass-strong" />
          <GlassBox tier=".glass-panel" desc="bg rgba(8,10,16,0.60)" className="glass-panel" />
          <GlassBox tier=".glass-nav" desc="bg rgba(6,8,11,0.72)" className="glass-nav" />
        </div>
      </section>

      {/* ── Buttons ── */}
      <section>
        <SectionLabel number="04" title="Buttons" />
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginTop: '24px', flexWrap: 'wrap' }}>
          <button
            className="btn btn-primary"
            style={{ padding: '12px 28px', borderRadius: '8px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}
          >
            Search Properties
          </button>
          <button
            style={{
              padding: '11px 27px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 500,
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.14)',
              color: 'var(--color-z3-text)',
              cursor: 'pointer',
            }}
          >
            View All Listings
          </button>
          <button
            style={{
              padding: '11px 27px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 500,
              background: 'transparent',
              border: '1px solid rgba(201,163,94,0.3)',
              color: '#C9A35E',
              cursor: 'pointer',
            }}
          >
            Gold Ghost
          </button>
        </div>
      </section>

      {/* ── Cargo Utilities ── */}
      <section>
        <SectionLabel number="05" title="Cargo Utilities" />
        <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="section-rule" style={{ paddingTop: '12px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>
              .section-rule — 1px solid rgba(255,255,255,0.07) hairline
            </span>
          </div>
          <div>
            <span className="cargo-label">cargo-label — 10px mono uppercase gold</span>
          </div>
          <div>
            <span className="cargo-number">01 — cargo-number — 11px mono dim white</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
            <span className="cargo-number">— 01</span>
            <span style={{ width: '1px', height: '12px', background: 'rgba(255,255,255,0.12)' }} />
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C9A35E' }} />
            <span className="cargo-label">AI-Powered Real Estate</span>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionLabel({ number, title }: { number: string; title: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '4px' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.18)' }}>
        {number}
      </span>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 300 }}>
        {title}
      </h2>
    </div>
  );
}

function Swatch({ name, value }: { name: string; value: string }) {
  return (
    <div>
      <div style={{ background: value, width: '100%', height: '64px', borderRadius: '4px', marginBottom: '8px', border: '1px solid rgba(255,255,255,0.06)' }} />
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.05em' }}>{name}</p>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.25)' }}>{value}</p>
    </div>
  );
}

function TypeRow({ tag, size, weight, family, text, mono, caps }: {
  tag: string; size: string; weight: number; family: string; text: string; mono?: boolean; caps?: boolean;
}) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'baseline',
      gap: '24px',
      padding: '16px 0',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
    }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.25)', width: '40px', flexShrink: 0 }}>{tag}</span>
      <span
        style={{
          fontFamily: mono ? 'var(--font-mono)' : family === 'Inter' ? 'var(--font-sans)' : 'var(--font-display)',
          fontSize: size,
          fontWeight: weight,
          textTransform: caps ? 'uppercase' : undefined,
          letterSpacing: caps ? '0.18em' : undefined,
          lineHeight: 1.2,
        }}
      >
        {text}
      </span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.2)', marginLeft: 'auto', flexShrink: 0 }}>
        {size} / {family}
      </span>
    </div>
  );
}

function GlassBox({ tier, desc, className }: { tier: string; desc: string; className: string }) {
  return (
    <div
      className={className}
      style={{ width: '180px', height: '120px', borderRadius: '4px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
    >
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em', marginBottom: '4px' }}>{tier}</p>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(255,255,255,0.3)' }}>{desc}</p>
    </div>
  );
}
