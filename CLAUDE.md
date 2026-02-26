# Z3 — Dubai Real Estate App

## Project
Single-file vanilla web app. All code lives in `index.html`.

## Stack
- HTML / CSS / Vanilla JS — no framework, no build step
- Mapbox GL JS v3.3 (CDN) — map, custom pins, noise heatmap
- Fonts: Gambarino (display), Epilogue (UI), JetBrains Mono (data)

## Repo
- Local: `/Users/adam/z3-site/`
- GitHub: https://github.com/hieronymous1/z-site
- Dev server: `python3 -m http.server 8899` → http://localhost:8899

## File structure
```
index.html
  <style>   lines 13–1421   — design system + all CSS
  <body>    lines 1423–2057 — HTML structure
  <script>  lines 2057–2376 — all JS logic
```

## Design system (v4)
Tokens are in `:root` (lines 92–184). Key values:
- `--gold: #B8955A` — primary accent, buy listings, CTAs
- `--navy: #243B55` — rent listings, secondary actions
- `--ivory: #FAFAF8` — primary background
- `--charcoal: #1A1916` — primary text
- `--up: #3D7A52` / `--down: #8C3A3A` — semantic data only
- Never use mint or mauve — retired in v4

## Views
- **Hero** (`#heroView`) — landing, search, market data
- **Map** (`#mapView`) — AI panel + Mapbox map + data panel + prop panel
- **Mgmt** (`#mgmtView`) — property listing form

## Key components
- `.z3-pin` — custom Mapbox markers (gold border = buy, navy = rent)
- `.prop-panel` — slides in from right on pin click; sibling of `.data-panel` inside `.mapview`
- `.ai-panel` — left side of map view, simulated chat
- `.sig` / `.tr` — market signal cards; made visible immediately on load (no IntersectionObserver)

## Git
- Branch: `main`
- Push: `git push origin main`
