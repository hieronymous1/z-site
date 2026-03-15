"use client";

const FEATURES = [
  { title: "AI-Powered Search",   description: "Natural language property search that understands your needs, budget, and lifestyle preferences." },
  { title: "Market Intelligence", description: "Real-time price trends, rental yields, and investment signals for every neighbourhood." },
  { title: "Interactive Map",     description: "Explore properties visually with live cluster markers, noise maps, and neighbourhood overlays." },
  { title: "Verified Listings",   description: "Every listing is verified for accuracy with up-to-date pricing, availability, and documentation." },
  { title: "Instant Alerts",      description: "Get notified the moment properties matching your criteria hit the market." },
  { title: "Full UAE Coverage",   description: "Comprehensive coverage across Dubai, Abu Dhabi, Sharjah, Ras Al Khaimah, and all Emirates." },
];

export default function FeaturesSection() {
  return (
    <section className="py-32 px-6 sm:px-10 lg:px-16 section-rule">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:gap-20">

          {/* ── Left — sticky title + CTA ── */}
          <aside className="lg:w-80 shrink-0 mb-14 lg:mb-0">
            <p className="type-label-mono mb-6">Why Z3</p>

            <h2 className="type-display-lg mb-6">
              <span className="block">Real estate,</span>
              <span className="block italic type-gradient">reimagined.</span>
            </h2>

            <p className="type-body">
              Combining AI, real-time data, and editorial design to transform how you discover and invest in UAE properties.
            </p>

            <div className="mt-10 flex flex-col gap-3">
              <a href="/search?mode=buy" className="btn btn-primary justify-center">
                Start searching
              </a>
              <a href="/property-management" className="btn btn-ghost justify-center">
                List a property
              </a>
            </div>
          </aside>

          {/* ── Right — numbered feature list ── */}
          <div className="flex-1 divide-y" style={{ borderColor: "var(--color-z3-border)" }}>
            {FEATURES.map(({ title, description }, i) => (
              <div key={title} className="flex items-start gap-8 py-7 group cursor-default">

                {/* Counter */}
                <span className="cargo-number shrink-0 w-10 text-right leading-none pt-1">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3
                    className="type-display-md mb-1.5 transition-colors group-hover:text-z3-accent"
                    style={{ fontSize: 20 }}
                  >
                    {title}
                  </h3>
                  <p className="type-body">{description}</p>
                </div>

                {/* Arrow */}
                <span
                  className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity pt-1 text-z3-accent"
                  aria-hidden="true"
                  style={{ fontSize: 16 }}
                >
                  →
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
