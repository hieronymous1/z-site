import Link from "next/link";

const NAV = {
  Platform:  [["Buy", "/search?mode=buy"], ["Rent", "/search?mode=rent"], ["Invest", "#"], ["Property Management", "/property-management"]],
  Resources: [["Market Reports", "#"], ["Area Guides", "#"], ["Mortgage Calculator", "#"], ["Blog", "#"]],
  Company:   [["About", "#"], ["Careers", "#"], ["Contact", "#"], ["Privacy", "#"]],
};

export default function Footer() {
  return (
    <footer className="section-rule" style={{ padding: 'clamp(48px, 6vw, 80px) var(--page-gutter)' }}>
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">

          {/* ── Brand ── */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              {/* Logo badge */}
              <div className="navbar__logo">Z3</div>
              <span className="type-label" style={{ fontFamily: "var(--font-display)", fontSize: 15 }}>
                Z3 Real Estate
              </span>
            </div>

            <p className="type-body mb-6">
              AI-powered property search for the UAE. Buy, rent, and invest smarter.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {["X", "IG", "LI"].map((s) => (
                <a key={s} href="#" className="footer-icon" aria-label={s}>
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* ── Nav columns ── */}
          {Object.entries(NAV).map(([section, links]) => (
            <nav key={section} aria-label={section}>
              <h4 className="type-label-mono mb-5">{section}</h4>
              <div className="space-y-3">
                {(links as [string, string][]).map(([label, href]) => (
                  <Link key={label} href={href} className="block type-body transition-colors hover:text-z3-text">
                    {label}
                  </Link>
                ))}
              </div>
            </nav>
          ))}

        </div>

        {/* ── Bottom bar ── */}
        <div className="editorial-rule pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="type-body-sm">&copy; 2026 Z3 Real Estate. All rights reserved.</span>
          <span className="type-label-mono">MADE IN THE UAE</span>
        </div>

      </div>
    </footer>
  );
}
