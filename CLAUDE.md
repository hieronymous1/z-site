# Z3 — Claude Code Instructions

## Project Overview

Z3 is an AI-powered UAE real estate platform. It is a Next.js frontend-only prototype with mock data — no backend or auth exists yet. The client is reviewing two design variants side-by-side via Vercel previews before approving one for development.

---

## Branch Strategy

| Branch | URL | Design |
|--------|-----|--------|
| `main` | Production | V1 — dark noir, mint `#A5FFD6`, mauve `#A96DA3` |
| `design-v2` | Vercel preview | V2 — "Desert Gold" warm luxury light theme |

**Always work on `design-v2`.** Do not touch `main` until the client approves the redesign.

---

## Tech Stack

| Tool | Version |
|------|---------|
| Next.js | 16 (App Router) |
| React | 19 |
| TypeScript | 5 |
| Tailwind CSS | v4 (via `@tailwindcss/postcss`) |
| Mapbox GL | 3.18.1 |
| react-map-gl | 8.1.0 |
| lucide-react | 0.575.0 |
| clsx | 2.1.1 |

---

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # production build
npm run lint     # ESLint
```

---

## CSS Architecture — Critical Rule

**All component styles are hand-written CSS classes defined in `src/app/globals.css`.** Do not use Tailwind utility classes for visual design in components.

| Allowed | Not allowed |
|---------|-------------|
| `className="btn btn-primary"` | `className="bg-gradient-to-r from-yellow-400 to-amber-500"` |
| `className="card"` | `className="rounded-xl bg-white/80 shadow-lg border"` |
| `className="type-display-lg"` | `className="text-4xl font-light tracking-tight"` |
| `className="hidden md:flex"` | — (responsive breakpoints are fine) |
| `style={{ padding: 'var(--spacing-md)' }}` | — (token references in inline styles are fine) |

Tailwind is only used for:
- Responsive breakpoints (`sm:`, `md:`, `lg:`)
- Layout one-offs (`flex-1`, `min-w-0`, `overflow-hidden`, `pointer-events-none`)
- Positioning utilities (`absolute`, `fixed`, `relative`, `inset-0`)

This approach maintains Figma token parity — every visual value in the CSS maps to a named token.

---

## Key Files

```
src/
  app/
    globals.css              ← all design tokens + component CSS (source of truth)
    layout.tsx               ← font imports (Google Fonts), root layout
    page.tsx                 ← home page
    search/page.tsx          ← map + AI chat + property panel
    property-management/     ← listing management
    design-system/           ← design system showcase
  components/
    Navbar.tsx
    HeroSection.tsx
    MarketStrip.tsx          ← below-fold market stats band
    FeaturesSection.tsx
    Footer.tsx
    MapPanel.tsx             ← Mapbox + fallback SVG map
    AIChatPanel.tsx
    MarketSidebar.tsx
    PropertyPanel.tsx
  contexts/
    ThemeContext.tsx          ← light/dark toggle, persists to localStorage
  data/
    properties.ts            ← mock data (8 buy + 8 rent properties)
```

---

## Design Tokens

All tokens live in the `@theme inline` block at the top of `globals.css` and are accessible as CSS custom properties.

- **Colors:** `var(--color-z3-*)` — backgrounds, text, accent (gold), terracotta, status
- **Spacing:** `var(--spacing-*)` — xs (8px) → 3xl (96px), plus `--spacing-section` and `--page-gutter`
- **Radii:** `var(--radius-*)` — xs (6px) → lg (16px)
- **Fonts:** `var(--font-display)` (Urbanist), `var(--font-sans)` (Lora), `var(--font-mono)` (JetBrains Mono)

See `DESIGN_SYSTEM.md` for the full token reference.

---

## Theme System

- Default theme: **light** ("Desert Gold")
- Dark mode: toggled via `ThemeContext` — sets `data-theme="dark"` on `<html>`
- Dark overrides: all `[data-theme="dark"]` rules are at the bottom of `globals.css`
- Dark mode swaps gold `#C9A258` → mint `#A5FFD6`, terracotta `#C47650` → mauve `#A96DA3`, bg cream → navy `#0B0F1A`
- City renders swap: `dubai-day.png` (light) ↔ `dubai-night.png` (dark) via `useTheme()` in components
- Theme persists to `localStorage` key `z3-theme`

---

## Icons

Use **lucide-react** exclusively. Do not add other icon packages.

```tsx
import { Search, MapPin, ArrowRight } from "lucide-react";
```

---

## Map

- Library: `react-map-gl` with `mapbox-gl`
- Token: `NEXT_PUBLIC_MAPBOX_TOKEN` in `.env.local` — **never commit this file**
- Light style: `mapbox://styles/mapbox/streets-v12`
- Dark style: `mapbox://styles/mapbox/dark-v11`
- Fallback: SVG canvas map renders if token is missing or map errors

---

## Environment Variables

```bash
# .env.local (gitignored — do not commit)
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1...
```

---

## Data

All property data is mock — `src/data/properties.ts` exports `BUY_PROPERTIES` and `RENT_PROPERTIES` (8 each). There is no API, database, or authentication.

---

## Cargo Editorial Aesthetic

The design-v2 visual language is inspired by Cargo's "Writer's Retreat" template — a flat, newspaper-editorial aesthetic:
- **Rules as structure**: Use `<hr className="hero-cargo__rule">` or `.editorial-rule` dividers between sections — not decorative cards or containers
- **No ambient glow orbs**: Do not add radial-gradient background effects to page layouts
- **No glass on hero/main sections**: Glass morphism is reserved for interactive overlays only (map popups, property panels, modals)
- **Full-width imagery**: City renders and hero images should be edge-to-edge, not boxed or constrained
- **Left-aligned heavy headlines**: Hero headlines use `.hero-cargo__headline` (Urbanist 900, left-aligned) — not centered badge+logo layouts

---

## Rules

- Never commit `.env.local`
- Never modify `main` branch
- Never add Tailwind utility classes for visual styling — add a CSS class to `globals.css` instead
- Always use `var(--color-z3-*)` tokens for colors, not hardcoded hex values in new code
- If adding a new component style, add the class to `globals.css` in the appropriate section
- Dark mode overrides go at the bottom of `globals.css` under `[data-theme="dark"]`
- Hero and landing sections must follow the Cargo editorial aesthetic (flat, no glow, full-width image)
