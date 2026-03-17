# Z3 Design System — "Desert Gold"

Design-v2 warm luxury theme. All tokens defined in `src/app/globals.css` under `@theme inline`. Source of truth for visual decisions.

---

## Cargo Editorial Principles

Z3's visual language is inspired by the Cargo "Writer's Retreat" template — a newspaper/editorial aesthetic:

| Principle | Rule |
|-----------|------|
| **Rules as structure** | Thin 1px horizontal lines (`editorial-rule`) divide sections — not cards or containers |
| **Headlines dominate** | Display type is large, heavy, left-aligned, and fills its container — not centered |
| **Flat surfaces** | Hero and page backgrounds are flat — no glass morphism, no glow orbs, no gradients |
| **Imagery is full-width** | City renders are edge-to-edge, not boxed or constrained |
| **Restraint** | Glass surfaces are reserved for interactive overlays only (map popups, property panels) |

---

## Theme Overview

| Mode | Background | Primary Accent | Secondary Accent | Text |
|------|-----------|----------------|------------------|------|
| Light (default) | `#F8F4EE` warm cream | `#C9A258` gold | `#C47650` terracotta | `#1E1B14` charcoal |
| Dark | `#0B0F1A` navy | `#A5FFD6` mint | `#A96DA3` mauve | `#EEE5E9` off-white |

Dark mode is applied via `[data-theme="dark"]` on `<html>`. Toggle via `ThemeContext`.

---

## Day/Night City Renders

| File | Used when |
|------|-----------|
| `public/assets/dubai-day.png` | Light mode (default) |
| `public/assets/dubai-night.png` | Dark mode |

Swap logic in components:
```tsx
const { theme } = useTheme();
const src = theme === "dark" ? "/assets/dubai-night.png" : "/assets/dubai-day.png";
```

---

## Color Tokens

### Backgrounds

| Token | Light Value | Usage |
|-------|-------------|-------|
| `--color-z3-bg` | `#F8F4EE` | Page background |
| `--color-z3-bg-deep` | `#EEE8DE` | Sections, MarketStrip |
| `--color-z3-surface` | `#FFFFFF` | Cards, panels |
| `--color-z3-surface-light` | `#FDFAF6` | Subtle surface |
| `--color-z3-surface-hover` | `#F2EDE4` | Hover states |

### Borders

| Token | Light Value | Usage |
|-------|-------------|-------|
| `--color-z3-border` | `rgba(30,22,10,0.13)` | Default border |
| `--color-z3-border-light` | `rgba(30,22,10,0.20)` | Stronger border |

### Text

| Token | Light Value | Usage |
|-------|-------------|-------|
| `--color-z3-text` | `#1E1B14` | Primary text |
| `--color-z3-text-secondary` | `#7A7060` | Secondary / labels |
| `--color-z3-text-muted` | `#8A8070` | Placeholders, captions |

### Gold (Buy / Primary Accent)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-z3-accent` | `#C9A258` | Primary gold accent |
| `--color-z3-accent-hover` | `#B8922E` | Gold hover state |
| `--color-z3-accent-glow` | `rgba(201,162,88,0.20)` | Glow effect |
| `--color-z3-gold-bright` | `#E0BB78` | Gradient highlight |
| `--color-z3-gold-glow` | `rgba(201,162,88,0.22)` | Stronger glow |
| `--color-z3-gold-dim` | `rgba(201,162,88,0.09)` | Very subtle bg |
| `--color-z3-gold-bg` | `rgba(201,162,88,0.10)` | Tinted background |

### Terracotta (Rent / Secondary Accent)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-z3-mauve` | `#C47650` | Rent mode accent |
| `--color-z3-mauve-bright` | `#D48E6A` | Gradient highlight |
| `--color-z3-mauve-glow` | `rgba(196,118,80,0.22)` | Glow effect |
| `--color-z3-mauve-bg` | `rgba(196,118,80,0.10)` | Tinted background |

### Status

| Token | Value | Usage |
|-------|-------|-------|
| `--color-z3-green` | `#4E8A60` | Positive / up trend |
| `--color-z3-green-bg` | `rgba(78,138,96,0.10)` | Green badge bg |
| `--color-z3-red` | `#C04848` | Error / down trend |
| `--color-z3-red-bg` | `rgba(192,72,72,0.09)` | Red badge bg |
| `--color-z3-orange` | `#D47830` | Warning |
| `--color-z3-purple` | `#9060A0` | Purple accent |

---

## Typography

### Fonts

| Token | Value | Role |
|-------|-------|------|
| `--font-display` | `"Urbanist", system-ui, sans-serif` | Headlines, nav, UI labels, prices |
| `--font-sans` | `"Lora", Georgia, serif` | Body text, editorial paragraphs |
| `--font-mono` | `"JetBrains Mono", ui-monospace` | Eyebrows, index numbers, tags |

Urbanist weights loaded: 300, 400, 500, 600, 700, 800, 900.
Lora weights loaded: 400, 500, 600 (+ italic variants).

### Type Scale Classes

| Class | Font | Size | Weight | Line-height | Usage |
|-------|------|------|--------|-------------|-------|
| `.type-display-xl` | Display (Urbanist) | clamp(44px, 7vw, 88px) | 800 | 1.05 | Hero headline |
| `.type-display-lg` | Display (Urbanist) | clamp(36px, 4vw, 56px) | 700 | 1.08 | Section headers |
| `.type-display-md` | Display (Urbanist) | clamp(20px, 2vw, 28px) | 400 | 1.15 | Card headlines |
| `.type-display-sm` | Display (Urbanist) | clamp(17px, 1.5vw, 20px) | 400 | 1.25 | Feature titles |
| `.type-body-lg` | Sans (Lora) | 16px | 400 | 1.65 | Lead paragraphs |
| `.type-body` | Sans (Lora) | 14px | 400 | 1.60 | Body text |
| `.type-body-sm` | Sans (Lora) | 12px | 400 | 1.55 | Captions, metadata |
| `.type-label` | Display (Urbanist) | 13px | 600 | — | UI labels |
| `.type-label-mono` | Mono | 11px | 400 | — | Section eyebrows |

### Special

| Class | Usage |
|-------|-------|
| `.type-gradient` | Gold → terracotta gradient text |
| `.cargo-label` | Small mono uppercase tag (10px, 0.2em spacing, gold 85%) |
| `.cargo-number` | Mono index number (11px, secondary color) |
| `.editorial-index` | Alias for `.type-label-mono` |

---

## Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--spacing-xs` | 8px | Tight gaps, icon spacing |
| `--spacing-sm` | 16px | Standard padding |
| `--spacing-md` | 24px | Component gaps |
| `--spacing-lg` | 32px | Section internal spacing |
| `--spacing-xl` | 48px | Large gaps |
| `--spacing-2xl` | 64px | Extra large |
| `--spacing-3xl` | 96px | Hero top padding |
| `--spacing-section` | clamp(80px, 10vw, 128px) | Vertical section padding |
| `--page-gutter` | clamp(20px, 5vw, 64px) | Horizontal page padding |

---

## Radii

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-xs` | 6px | Small chips, tags |
| `--radius-sm` | 8px | Buttons, inputs |
| `--radius-md` | 12px | Cards, panels |
| `--radius-lg` | 16px | Large cards, modals |

---

## Glass Surfaces

Reserved for interactive overlays only (not main page sections — see Cargo Editorial Principles).

| Class | Opacity | Blur | Usage |
|-------|---------|------|-------|
| `.glass` | 55% | 24px | Subtle overlays |
| `.glass-medium` | 72% | 32px | Floating cards |
| `.glass-strong` | 85% | 44px | Prominent panels |
| `.glass-panel` | 92% | 40px | Sidebars, drawers |
| `.glass-nav` | 92% | 52px | (legacy — navbar uses flat bg now) |
| `.glass-card` | 72% | 28px | Property cards |

---

## Button System

Base class: `.btn` (always required). Combine with a variant.

```html
<button class="btn btn-primary">Search</button>
<button class="btn btn-ghost">Cancel</button>
<button class="btn-icon"><SearchIcon /></button>
```

| Class | Appearance | Usage |
|-------|-----------|-------|
| `.btn-primary` | Gold gradient, dark text | Primary CTA |
| `.btn-secondary` | Terracotta gradient, white text | Secondary CTA |
| `.btn-ghost` | Transparent, subtle border | Tertiary actions |
| `.btn-danger` | Red tint | Destructive actions |
| `.btn-icon` | 36×36px square | Icon-only buttons |

All buttons: hover brightness, active scale(0.98), disabled opacity(0.4).

---

## Card System

| Class | Usage |
|-------|-------|
| `.card` | Generic glass card with hover |
| `.card--active` | Selected/pressed state |
| `.property-card` | Property listing card |
| `.property-card__image` | Image area (176px height) |
| `.property-card__image-overlay` | Dark gradient on image bottom |
| `.property-card__badge` | Sale/Rent badge (top-left of image) |
| `.property-card__badge--sale` | Gold gradient |
| `.property-card__badge--rent` | Terracotta gradient |
| `.property-card__body` | Content padding area |
| `.property-card__meta` | Mono area label (10px, gold) |
| `.property-card__title` | Display title (15px) |
| `.property-card__price` | Price (display 20px, gold) |
| `.property-card__price--rent` | Rent price (terracotta) |
| `.property-card__stats` | 4-column stat grid |
| `.property-card__stat` | Individual stat cell |

---

## Panel / Sidebar System

| Class | Usage |
|-------|-------|
| `.panel` | Full-height panel container |
| `.panel__header` | Header with bottom border |
| `.panel__body` | Scrollable content |
| `.panel__footer` | Footer with top border |
| `.panel--slide-in` | Slide-in-from-right animation (0.3s) |

### AI Chat Panel

| Class | Usage |
|-------|-------|
| `.chat-panel` | Chat panel wrapper |
| `.chat-header` | Header with bottom border |
| `.chat-messages` | Scrollable message list |
| `.chat-msg` | Message row |
| `.chat-msg--user` | User message (right-aligned) |
| `.chat-bubble` | Message bubble |
| `.chat-input-row` | Input bar container |

### Market Sidebar

| Class | Usage |
|-------|-------|
| `.market-sidebar` | Market data right sidebar |
| `.market-sidebar__tab` | Tab button |
| `.market-sidebar__tab--active` | Active tab (gold underline) |
| `.market-signal` | Signal card |
| `.market-area-row` | Area row with hover |
| `.market-badge--up` | Green trend badge |
| `.market-badge--down` | Red trend badge |

---

## Map System

Pill-shaped property markers (two-step click: marker → popup → full panel).

| Class | Usage |
|-------|-------|
| `.map-container` | Full-height map wrapper |
| `.map-pill` | Pill marker (white bg, rounded) |
| `.map-pill__price` | Price text (Urbanist 600, 11px) |
| `.map-pill__area` | Area label (Lora 9px, muted) |
| `.map-pill--rent` | Rent mode (mauve border) |
| `.map-pill--hover` | Hover state (gold border + glow) |
| `.map-pill--active` | Selected state (gold border + glow) |
| `.map-popup` | Info popup card |
| `.map-info-bar` | Info strip (bottom) |

---

## Hero System

### Cargo Editorial Hero (primary — homepage)

```
[navbar]
──────────── (hero-cargo__rule)
DISCOVER DUBAI        ← hero-cargo__headline (Urbanist 900, huge, left-aligned)
REAL ESTATE.
──────────── (hero-cargo__rule)
[city render — full width, 55vh]  ← hero-cargo__image
──────────── (hero-cargo__rule)
[byline + city switcher]    [Enter →]  ← hero-cargo__footer
```

| Class | Usage |
|-------|-------|
| `.hero-cargo` | Outer section (flex-col, flat bg) |
| `.hero-cargo__headline-block` | Headline padding wrapper |
| `.hero-cargo__headline` | Giant display headline (900 weight, clamp 56–120px) |
| `.hero-cargo__image` | Full-width city render (55vh, object-cover) |
| `.hero-cargo__footer` | Two-column footer (byline left, CTA right) |
| `.hero-cargo__byline` | Mono eyebrow text |
| `.hero-cargo__rule` | 1px border-top divider (hr element) |

### City Switcher

| Class | Usage |
|-------|-------|
| `.city-switcher` | Pill group row |
| `.city-pill` | Individual city pill |
| `.city-pill--active` | Active city (gold border) |
| `.city-pill--soon` | Disabled "soon" state |
| `.city-pill__soon` | "Soon" badge text |

### Legacy Hero V3 (kept for reference)

`.hero-v3`, `.hero-v3__badge`, `.hero-v3__eyebrow`, `.hero-v3__city-render` — centered layout, replaced by `.hero-cargo`.

---

## Navbar

```
Z3                    Buy · Rent · PM           🌙  Enter →
─────────────────────────────────────────────────────────── ← border-top + border-bottom always visible
```

| Class | Usage |
|-------|-------|
| `.navbar-v3` | Fixed navbar (border-top + border-bottom, transparent → bg on scroll) |
| `.navbar-v3--scrolled` | Scrolled state (adds `var(--color-z3-bg)` background) |
| `.navbar-v3__logo` | "Z3" wordmark (Urbanist 900, 18px) |
| `.navbar-v3__link` | Nav link (Urbanist 500, 12px, uppercase) |
| `.navbar-v3__overlay` | Full-screen mobile menu |
| `.navbar-v3__overlay-link` | Large mobile nav link |

---

## Filter / Search System

| Class | Usage |
|-------|-------|
| `.search-bar` | Search input container |
| `.filter-btn` | Filter chip button |
| `.filter-btn--active` | Active filter (gold tint) |
| `.feature-pill` | Tag pill (gold tint, rounded) |
| `.feature-pill--mauve` | Tag pill (terracotta tint) |
| `.mode-toggle` | Buy/Rent toggle container |
| `.mode-toggle__btn` | Toggle button |
| `.mode-toggle__btn--buy` | Active buy (gold gradient) |
| `.mode-toggle__btn--rent` | Active rent (terracotta gradient) |

---

## Form System

| Class | Usage |
|-------|-------|
| `.form-field` | Label + input wrapper |
| `.form-label` | Mono uppercase label (11px, gold 85%) |
| `.form-input` | Text input (white bg, warm border) |
| `.form-input--error` | Error state (red border + glow) |
| `.form-textarea` | Textarea (min-height 96px) |
| `.form-select` | Select dropdown |
| `.form-upload` | Dashed upload drop zone |

---

## Utility Classes

### Dividers
| Class | Usage |
|-------|-------|
| `.editorial-rule` | `border-top` at 10% opacity (structural separator) |
| `.section-rule` | `border-top` at 7% opacity |

### Glows
| Class | Usage |
|-------|-------|
| `.glow-gold` | Gold box-shadow glow |
| `.glow-mint` | Mint box-shadow glow |
| `.glow-mauve` | Mauve box-shadow glow |

### Animations
| Class | Duration | Usage |
|-------|----------|-------|
| `.animate-pulse-subtle` | 2.5s | Notification dots |
| `.animate-glow-pulse` | 2s | Glowing elements |
| `.animate-fade-in` | 250ms | Appearing elements |

### Property Image Placeholders
`.prop-img-1` through `.prop-img-8` — warm beige gradient backgrounds for property cards without images.

---

## Dark Mode

Dark mode overrides at bottom of `globals.css` under `[data-theme="dark"]`.

**Key swaps:**
- Background: cream `#F8F4EE` → navy `#0B0F1A`
- Gold accent → mint `#A5FFD6`
- Terracotta → mauve `#A96DA3`
- Glass backgrounds → very low opacity dark
- City render: `dubai-day.png` → `dubai-night.png`

When adding new components, add dark mode overrides in the `[data-theme="dark"]` section.

---

## Mode Colors (Buy vs Rent)

The search page is mode-aware. Use conditional logic:

```tsx
const accentColor = mode === "buy" ? "var(--color-z3-accent)" : "var(--color-z3-mauve)";
```

| Mode | Color | Token |
|------|-------|-------|
| Buy | Gold `#C9A258` | `--color-z3-accent` |
| Rent | Terracotta `#C47650` | `--color-z3-mauve` |
