const STATS = [
  { label: "Avg. Price / sqft", value: "AED 1,280", change: "+8.5%",  up: true  },
  { label: "Active Listings",   value: "24,500+",   change: null,      up: null  },
  { label: "Rental Yield",      value: "9.1%",      change: "+0.8pp", up: true  },
  { label: "Q1 Transactions",   value: "AED 142B",  change: "+21%",   up: true  },
];

export default function MarketStrip() {
  return (
    <section
      style={{
        background: 'var(--color-z3-bg-deep)',
        borderTop: '1px solid var(--color-z3-border)',
        borderBottom: '1px solid var(--color-z3-border)',
        padding: 'clamp(28px, 4vw, 40px) var(--page-gutter)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <p className="type-label-mono mb-6 text-center">Dubai Market Index</p>
        <div
          className="grid grid-cols-2 sm:grid-cols-4"
          style={{ gap: 0 }}
        >
          {STATS.map(({ label, value, change, up }, i) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1.5 py-4"
              style={{
                borderRight: i < STATS.length - 1 ? '1px solid var(--color-z3-border)' : undefined,
                paddingLeft: 'clamp(12px, 2vw, 24px)',
                paddingRight: 'clamp(12px, 2vw, 24px)',
              }}
            >
              <span className="type-body-sm text-center">{label}</span>
              <span
                className="font-display"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(18px, 2vw, 24px)',
                  fontWeight: 400,
                  color: 'var(--color-z3-text)',
                  letterSpacing: '-0.01em',
                }}
              >
                {value}
              </span>
              {change && (
                <span className="feature-pill" style={{ fontSize: 11 }}>
                  {up ? '↑' : '↓'} {change}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
