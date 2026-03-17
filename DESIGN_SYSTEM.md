# Z3 Design System — "Desert Gold"

Design-v2 warm luxury theme. All tokens defined in `src/app/globals.css` under `@theme inline`. Source of truth for visual decisions.

---

## Theme Overview

| Mode | Background | Primary Accent | Secondary Accent | Text |
|------|-----------|----------------|------------------|------|
| Light (default) | `#F8F4EE` warm cream | `#C9A258` gold | `#C47650` terracotta | `#1E1B14` charcoal |
| Dark | `#12130F` near-black | `#A5FFD6` mint | `#A96DA3` mauve | `#EEE5E9` off-white |

Dark mode is applied via `[data-theme="dark"]` on `<html>`. Toggle via `ThemeContext`.

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

| Token | Value | Usage |
|-------|-------|-------|
| `--font-display` | Cormorant Garamond, Georgia, serif | Headlines, prices, editorial |
| `--font-sans` | DM Sans, system-ui, sans-serif | Body, UI, labels |
| `--font-mono` | JetBrains Mono, ui-monospace | Labels, index numbers, tags |

Weights available: 300, 400, 500, 600, 700.

### Type Scale Classes

| Class | Font | Size | Weight | Line-height | Usage |
|-------|------|------|--------|-------------|-------|
| `.type-display-xl` | Display | clamp(44px, 7vw, 88px) | 300 | 1.05 | Hero headline |
| `.type-display-lg` | Display | clamp(36px, 4vw, 56px) | 300 | 1.08 | Section headers |
| `.type-display-md` | Display | clamp(20px, 2vw, 28px) | 400 | 1.15 | Card headlines |
| `.type-display-sm` | Display | clamp(17px, 1.5vw, 20px) | 400 | 1.25 | Feature titles, subheadings |
| `.type-body-lg` | Sans | 16px | 400 | 1.65 | Lead paragraphs |
| `.type-body` | Sans | 14px | 400 | 1.60 | Body text (secondary color) |
| `.type-body-sm` | Sans | 12px | 400 | 1.55 | Captions, metadata |
| `.type-label` | Sans | 13px | 600 | — | UI labels |
| `.type-label-mono` | Mono | 11px | 400 | — | Section eyebrows, index labels |

### Special

| Class | Usage |
|-------|-------|
| `.type-gradient` | Gold → terracotta gradient text (hero italic only) |
| `.cargo-label` | Small mono uppercase tag (10px, 0.2em spacing, gold 85%) |
| `.cargo-number` | Mono index number (11px, secondary color) |
| `.editorial-index` | Same as type-label-mono (legacy alias) |

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

Apply page-gutter via: `style={{ padding: 'var(--spacing-section) var(--page-gutter)' }}`

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

All glass classes use `backdrop-filter: blur()` + warm white background + inset highlight.

| Class | Opacity | Blur | Usage |
|-------|---------|------|-------|
| `.glass` | 55% | 24px | Subtle overlays |
| `.glass-medium` | 72% | 32px | Hero stats, floating cards |
| `.glass-strong` | 85% | 44px | Prominent panels |
| `.glass-panel` | 92% | 40px | Sidebars, drawers |
| `.glass-nav` | 92% | 52px | Fixed navbar |
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
| `.btn-gold` | Alias for `.btn-primary` | Legacy |
| `.btn-mauve` | Alias for `.btn-secondary` | Legacy |

All buttons have: hover brightness, active scale(0.98), disabled opacity(0.4).

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
| `.property-card__title` | Serif title (15px) |
| `.property-card__price` | Price (serif 20px, gold) |
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
| `.ai-agent` | AI chat panel wrapper |
| `.ai-agent__header` | Chat header |
| `.ai-agent__avatar` | 32px avatar square |
| `.ai-agent__messages` | Message list |
| `.ai-agent__message` | Message row |
| `.ai-agent__message--user` | User message (right-aligned) |
| `.ai-agent__bubble` | Message bubble |
| `.ai-agent__bubble--user` | User bubble (gold tint) |
| `.ai-agent__suggestion` | Suggestion button |
| `.ai-agent__input-bar` | Input container |
| `.ai-agent__input` | Text input |
| `.market-sidebar` | Market data right sidebar |
| `.market-sidebar__tab` | Tab button |
| `.market-sidebar__tab--active` | Active tab (gold underline) |
| `.market-signal` | Signal card |
| `.market-area-row` | Area row with hover |
| `.market-badge--up` | Green trend badge |
| `.market-badge--down` | Red trend badge |

---

## Map System

| Class | Usage |
|-------|-------|
| `.map-container` | Full-height map wrapper |
| `.map-bubble` | Circular property marker (36px) |
| `.map-bubble--buy` | Gold marker (buy mode) |
| `.map-bubble--rent` | Terracotta marker (rent mode) |
| `.map-bubble--highlighted` | Pulsing ring animation |
| `.map-popup` | Info popup card |
| `.map-info-bar` | Info strip (bottom-left/right) |
| `.map-dark` | Dark fallback map background |

---

## Filter / Search System

| Class | Usage |
|-------|-------|
| `.search-bar` | Search input container with glass bg |
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

## Hero Section

| Class | Usage |
|-------|-------|
| `.hero` | Full-viewport hero container |
| `.hero__bg` | Absolute background layer |
| `.hero__content` | Centered flex content (uses `--page-gutter`) |
| `.hero__badge` | Eyebrow badge row |
| `.hero__headline` | Headline wrapper |
| `.hero__subline` | Subtitle (max-width 480px, centered) |

---

## Utility Classes

### Dividers
| Class | Usage |
|-------|-------|
| `.editorial-rule` | `border-top` at 10% opacity |
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
| `.animate-pulse-subtle` | 2.5s | Notification dots, badge indicators |
| `.animate-glow-pulse` | 2s | Glowing elements |
| `.animate-fade-in` | 250ms | Appearing elements |

### Property Image Placeholders
Classes `.prop-img-1` through `.prop-img-8` — warm beige gradient backgrounds for property cards with no image.

### Font Aliases
| Class | Maps to |
|-------|---------|
| `.font-gambino` | `var(--font-display)` (Cormorant Garamond) |
| `.font-epilogue` | `var(--font-sans)` (DM Sans) |

---

## Dark Mode

Dark mode overrides are at the bottom of `globals.css` under `[data-theme="dark"]`.

**Key swaps:**
- Background: cream → `#12130F` near-black
- Gold accent → mint `#A5FFD6`
- Terracotta → mauve `#A96DA3`
- Glass backgrounds → very low opacity dark
- All border colors → light-on-dark rgba

When adding new components, add dark mode overrides in the `[data-theme="dark"]` section following existing patterns.

---

## Mode Colors (Buy vs Rent)

The search page is mode-aware. Use conditional logic rather than separate classes where possible:

```tsx
const accentColor = mode === "buy" ? "var(--color-z3-accent)" : "var(--color-z3-mauve)";
const bubbleClass = mode === "buy" ? "map-bubble--buy" : "map-bubble--rent";
```

| Mode | Color | Token |
|------|-------|-------|
| Buy | Gold `#C9A258` | `--color-z3-accent` |
| Rent | Terracotta `#C47650` | `--color-z3-mauve` |
