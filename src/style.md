# RUNNA — Style Guide & Design System

**Version:** 2.1  
**Last Updated:** June 2026  
**Design System:** Material Design 3  
**Framework:** React + Tailwind CSS + Vite

---

## Table of Contents

1. [Design Philosophy](#1-design-philosophy)
2. [Color System](#2-color-system)
3. [Typography System](#3-typography-system)
4. [Shape System](#4-shape-system)
5. [Elevation System](#5-elevation-system)
6. [Motion System](#6-motion-system)
7. [Spacing System](#7-spacing-system)
8. [Component Specifications](#8-component-specifications)
9. [Iconography](#9-iconography)
10. [Layout & Responsive Design](#10-layout--responsive-design)
11. [Accessibility Guidelines](#11-accessibility-guidelines)
12. [Design Token Reference](#12-design-token-reference)
13. [Usage Examples](#13-usage-examples)

---

## 1. Design Philosophy

RUNNA follows **Google's Material Design 3 (Material You)** specification. The design system is:

- **Token-driven** — All design values are centralized CSS custom properties mapped to Tailwind classes
- **Accessibility-first** — WCAG-compliant contrast, proper touch targets, semantic HTML
- **Tonal elevation** — Surfaces use tonal color differences + shadows, not shadows alone
- **Adaptive** — Layouts adapt across phone, tablet, and desktop
- **Motion-guided** — Animations guide attention and provide continuity

### Core Principles
1. **Clarity** — Users should never wonder what to do next
2. **Hierarchy** — Color, spacing, and visual weight guide the eye
3. **Feedback** — Every interaction provides immediate visual feedback
4. **Consistency** — Same patterns everywhere, no one-off components
5. **Premium feel** — Soft shapes, tonal surfaces, spring motion

---

## 2. Color System

### Brand Seed Colors
These are the source colors that generate the M3 tonal palettes:

| Role | Hex | M3 Role | Usage |
|------|-----|---------|-------|
| Navy (Primary Seed) | `#1B2B45` | Primary | CTAs, active nav, sticky headers |
| Green (Accent Seed) | `#3DB04B` | Tertiary | Positive states, add-to-cart |
| Blue (Informational) | `#1E7CFF` | Primary Container | Order status, info banners |

### M3 Color Roles (Light Mode)
All values are HSL triplets stored as CSS custom properties in `index.css`:

| Token | HSL | Usage |
|-------|-----|-------|
| `--background` | `220 20% 97%` | App background |
| `--foreground` | `215 35% 15%` | Primary text |
| `--card` | `0 0% 100%` | Card surfaces |
| `--card-foreground` | `215 35% 15%` | Text on cards |
| `--popover` | `0 0% 100%` | Popover surfaces |
| `--popover-foreground` | `215 35% 15%` | Text in popovers |
| `--primary` | `214 100% 56%` | Primary buttons, links |
| `--primary-foreground` | `0 0% 100%` | Text on primary |
| `--secondary` | `215 42% 19%` | Secondary actions |
| `--secondary-foreground` | `0 0% 100%` | Text on secondary |
| `--muted` | `220 14% 94%` | Muted backgrounds |
| `--muted-foreground` | `215 16% 47%` | Muted text |
| `--accent` | `214 100% 95%` | Accent backgrounds |
| `--accent-foreground` | `214 100% 40%` | Text on accent |
| `--destructive` | `4 74% 42%` | Delete, error actions |
| `--destructive-foreground` | `0 0% 98%` | Text on destructive |
| `--border` | `220 13% 90%` | Borders |
| `--input` | `220 13% 90%` | Input borders |
| `--ring` | `214 100% 56%` | Focus rings |

### M3 Color Roles (Dark Mode)
| Token | HSL |
|-------|-----|
| `--background` | `215 42% 8%` |
| `--foreground` | `220 20% 97%` |
| `--card` | `215 35% 12%` |
| `--primary` | `214 100% 56%` |
| `--muted` | `215 30% 18%` |
| `--muted-foreground` | `215 16% 60%` |
| `--border` | `215 30% 22%` |

### M3 Surface Container Hierarchy
Tonal surfaces replace shadow-heavy elevation. Each level is slightly lighter/darker than the previous:

**Light Mode:**
| Level | Token | HSL |
|-------|-------|-----|
| Surface | `--m3-surface` | `220 20% 97%` |
| Lowest | `--m3-surface-lowest` | `0 0% 100%` |
| Low | `--m3-surface-low` | `220 14% 96%` |
| Container | `--m3-surface-container` | `220 14% 94%` |
| High | `--m3-surface-high` | `220 12% 92%` |
| Highest | `--m3-surface-highest` | `220 10% 90%` |

**Dark Mode:**
| Level | Token | HSL |
|-------|-------|-----|
| Surface | `--m3-surface` | `215 42% 8%` |
| Lowest | `--m3-surface-lowest` | `215 45% 6%` |
| Low | `--m3-surface-low` | `215 40% 10%` |
| Container | `--m3-surface-container` | `215 35% 13%` |
| High | `--m3-surface-high` | `215 32% 16%` |
| Highest | `--m3-surface-highest` | `215 30% 20%` |

### Status Colors
| Role | Hex | Usage |
|------|-----|-------|
| Success | `#16A34A` / `#2E7D32` | Payment confirmed, delivery complete |
| Warning | `#F59E0B` | Prep time badges, "SOON" chips |
| Error | `#DC2626` / `#B3261E` | Cancellations, validation errors |

### Service Grid Color Themes
Each service card has its own M3 tonal palette:

| Service | Gradient | Icon Color |
|---------|----------|------------|
| Food Delivery | `linear-gradient(135deg, #FFF3E0, #FFE0B2)` | `#E65100` |
| Send Package | `linear-gradient(135deg, #E3F2FD, #BBDEFB)` | `#1565C0` |
| Receive Package | `linear-gradient(135deg, #F3E5F5, #E1BEE7)` | `#7B1FA2` |
| Shopping | `linear-gradient(135deg, #FFF8E1, #FFECB3)` | `#F57F17` |
| Laundry | `linear-gradient(135deg, #E0F2F1, #B2DFDB)` | `#00695C` |
| Printing | `linear-gradient(135deg, #FCE4EC, #F8BBD0)` | `#AD1457` |

### Usage Rules
- **Never** hardcode hex values in JSX — always use CSS custom properties or Tailwind token classes
- Use `hsl(var(--token))` via Tailwind classes (e.g., `bg-primary`, `text-foreground`)
- For brand-specific colors not in M3 roles (like RUNNA navy), use inline `style={{ color: '#1B2B45' }}` sparingly
- Maintain minimum 4.5:1 contrast ratio for text, 3:1 for large text

---

## 3. Typography System

### Font Family
```css
--font-heading: 'Inter', ui-sans-serif, system-ui, sans-serif;
--font-body: 'Inter', ui-sans-serif, system-ui, sans-serif;
--font-display: 'Inter', ui-sans-serif, system-ui, sans-serif;
--font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
```

Loaded from Google Fonts:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
```

### M3 Type Scale
| Class | Size | Line Height | Weight | Tracking | Usage |
|-------|------|-------------|--------|----------|-------|
| `.m3-display-small` | 36px | 44px | 400 | 0 | Splash, hero numbers |
| `.m3-headline-large` | 32px | 40px | 400 | 0 | Page titles |
| `.m3-headline-medium` | 28px | 36px | 400 | 0 | Section headers |
| `.m3-headline-small` | 24px | 32px | 400 | 0 | Section headers |
| `.m3-title-large` | 22px | 28px | 400 | 0 | Card titles |
| `.m3-title-medium` | 16px | 24px | 500 | 0.009em | List item titles |
| `.m3-title-small` | 14px | 20px | 500 | 0.007em | Subtitles |
| `.m3-body-large` | 16px | 24px | 400 | 0.031em | Primary body |
| `.m3-body-medium` | 14px | 20px | 400 | 0.016em | Secondary text |
| `.m3-body-small` | 12px | 16px | 400 | 0.025em | Captions |
| `.m3-label-large` | 14px | 20px | 500 | 0.007em | Button labels |
| `.m3-label-medium` | 12px | 16px | 500 | 0.031em | Chips, badges |
| `.m3-label-small` | 11px | 16px | 500 | 0.031em | Timestamps |

### Font Weight Usage
| Weight | Class | Usage |
|--------|-------|-------|
| 400 (Regular) | `font-normal` | Body text |
| 500 (Medium) | `font-medium` | Labels, titles |
| 600 (Semibold) | `font-semibold` | Button text, card titles |
| 700 (Bold) | `font-bold` | Section headers |
| 800 (Extrabold) | `font-extrabold` | Logo, display text |

### Usage Rules
- Use `font-heading` for titles and headers
- Use `font-body` for paragraph text
- Use `font-display` for the logo and splash
- Never use random font sizes — always use the M3 type scale classes
- Letter-spacing is built into the utility classes

---

## 4. Shape System

### M3 Shape Scale
| Class | Radius | Usage |
|-------|--------|-------|
| `.m3-shape-xs` | 4px | Badges, small indicators |
| `.m3-shape-s` | 8px | Chips |
| `.m3-shape-m` | 12px | Cards, inputs |
| `.m3-shape-l` | 16px | Buttons, list items |
| `.m3-shape-xl` | 28px | Bottom sheets, hero cards |
| `.m3-shape-full` | 9999px | FABs, pills, search bars |

### Component Shape Mapping
| Component | Radius | Tailwind Class |
|-----------|--------|----------------|
| Cards | 12px | `rounded-xl` |
| Buttons (filled) | 20px | `rounded-2xl` or `rounded-full` |
| Inputs | 12px | `rounded-xl` |
| Bottom sheets | 28px | `rounded-t-[28px]` |
| Chips | 8px | `rounded-lg` |
| FAB | 16px | `rounded-2xl` |
| Pills/badges | 9999px | `rounded-full` |
| Service grid cards | 16px | `rounded-2xl` |
| Hero cards | 24px | `rounded-3xl` |

### Usage Rules
- Interactive elements should feel soft and approachable
- Use larger radii for prominent cards (16–24px)
- Use smaller radii for compact elements (4–8px)
- Bottom sheets always use extra-large (28px) top corners
- Shape is part of the visual hierarchy — larger = more prominent

---

## 5. Elevation System

M3 uses **tonal elevation** — surfaces change color slightly as they elevate, combined with subtle shadows.

### Elevation Levels
| Class | Surface | Shadow | Usage |
|-------|---------|--------|-------|
| Level 0 | `.m3-surface` | None | Background |
| Level 1 | `.m3-elevate-1` | `0 1px 3px rgba(0,0,0,0.08)` | Cards |
| Level 2 | `.m3-elevate-2` | `0 2px 6px rgba(0,0,0,0.10)` | Raised cards |
| Level 3 | `.m3-elevate-3` | `0 4px 12px rgba(0,0,0,0.10)` | Modals, dropdowns |

### Surface Container Classes
| Class | Background |
|-------|------------|
| `.m3-surface` | Base surface |
| `.m3-surface-low` | Slightly elevated |
| `.m3-surface-container` | Medium elevation |
| `.m3-surface-high` | High elevation |
| `.m3-surface-highest` | Maximum elevation |

### Usage Rules
- Don't rely solely on shadows — use tonal surfaces
- Higher elevation = lighter surface (light mode) / lighter surface (dark mode)
- Bottom sheets use level 3
- Cards use level 1–2
- Backgrounds use level 0

---

## 6. Motion System

### M3 Motion Tokens
| Class | Duration | Easing | Usage |
|-------|----------|--------|-------|
| `.m3-motion-standard` | 200ms | `cubic-bezier(0.2, 0, 0, 1)` | Default transitions |
| `.m3-motion-emphasized` | 300ms | `cubic-bezier(0.2, 0, 0, 1)` | Card taps, page elements |
| `.m3-motion-spring` | 350ms | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Service grid, buttons |

### Keyframe Animations
| Animation | Duration | Usage |
|-----------|---------|-------|
| `fadeInUp` | 0.4s | Element entrance |
| `fadeIn` | 0.3s | Subtle entrance |
| `slideUp` | 0.35s | Bottom sheet entrance |
| `pulse` | 1.5s infinite | Loading indicators |
| `shimmer` | 1.5s infinite | Skeleton loaders |

### Animation Classes
```css
.animate-fade-in-up    /* Element slides up + fades in */
.animate-fade-in       /* Element fades in */
.animate-slide-up      /* Bottom sheet slide-up */
```

### Interaction Feedback
| Interaction | Animation |
|-------------|-----------|
| Button tap | `active:scale-95` or `active:scale-98` |
| Card tap | `active:scale-95` with spring |
| Modal open | Slide-up 0.35s |
| List item entrance | Staggered fade-in-up |
| Loading | Skeleton shimmer or pulse |

### Usage Rules
- Animations should guide attention, not distract
- Use spring motion for playful interactions (service grid)
- Use standard motion for functional transitions
- Use emphasized motion for important elements
- Keep loading animations under 2s

---

## 7. Spacing System

### Base Unit
RUNNA uses a **4px base unit** via Tailwind's spacing scale.

### Common Spacing
| Class | Value | Usage |
|-------|-------|-------|
| `gap-1` | 4px | Tight gaps (icons in badges) |
| `gap-2` | 8px | Small gaps (icon + text) |
| `gap-3` | 12px | Medium gaps (card internals) |
| `gap-4` | 16px | Large gaps (sections) |
| `gap-5` | 20px | Extra large gaps |
| `gap-6` | 24px | Section spacing |

### Padding Patterns
| Element | Padding | Tailwind |
|---------|---------|----------|
| Page content | 16px horizontal | `px-4` |
| Cards | 12–16px | `p-3` to `p-4` |
| Buttons | 12px vertical, 24px horizontal | `py-3 px-6` |
| Inputs | 14px vertical, 16px horizontal | `p-3.5` to `p-4` |
| Chips | 6px vertical, 16px horizontal | `py-1.5 px-4` |

### Page Layout
```
┌─────────────────────────────────┐
│ Top bar (sticky)                 │  py-4
├─────────────────────────────────┤
│                                 │
│  Content area                   │  px-4 py-4
│  (sections separated by         │  gap-5 / gap-6
│   space-y-5 or space-y-6)       │
│                                 │
├─────────────────────────────────┤
│ Bottom nav (72px)               │
└─────────────────────────────────┘
```

---

## 8. Component Specifications

### Buttons

#### Filled Button (`.btn-filled`)
```jsx
<button className="btn-filled">Add to Cart</button>
```
- Background: `var(--runna-primary)` (#1B2B45)
- Text: White
- Radius: 20px
- Padding: 12px 24px
- Font: 14px, 600 weight
- Hover: darker bg + blue glow shadow
- Active: scale(0.97)
- Disabled: opacity 0.4

#### Tonal Button (`.btn-tonal`)
```jsx
<button className="btn-tonal">Filter</button>
```
- Background: `hsl(var(--accent))`
- Text: `hsl(var(--accent-foreground))`

#### Outlined Button (`.btn-outlined`)
```jsx
<button className="btn-outlined">Cancel</button>
```
- Background: Transparent
- Border: 1.5px solid primary
- Text: Primary color

### Cards (`.md3-card`)
```jsx
<div className="md3-card">Content</div>
```
- Background: White
- Radius: 12px
- Shadow: `0 2px 8px rgba(0,0,0,0.08)`
- Active: scale(0.98) + reduced shadow

### Chips (`.chip`)
```jsx
<button className="chip selected">All</button>
```
- Default: White bg, 1.5px border, 8px radius
- Selected: Primary bg, white text
- Padding: 6px 16px

### Inputs (`.md3-input`)
```jsx
<input className="md3-input" />
```
- Border: 1.5px solid `hsl(var(--border))`
- Radius: 12px
- Padding: 14px 16px
- Focus: Blue border + 3px blue glow

### Search Bar
```jsx
<div className="relative">
  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2" />
  <input className="w-full pl-10 pr-4 py-3 rounded-full bg-muted" />
</div>
```
- Full pill shape (9999px radius)
- Muted background
- Left-aligned search icon

### Bottom Sheet (3/4 Modal)
- Covers 78% of screen height
- Backdrop: `rgba(0,0,0,0.55)` (tap to dismiss)
- Top corners: 28px radius
- Slide-up animation: 0.35s

### Bottom Navigation
- Fixed bottom, 72px height
- 4 items max
- Active: blue icon + blue text + pill indicator
- Cart badge: red circle, top-right

### FAB
- Fixed bottom-right, 56×56px
- 16px radius
- Primary background
- Blue glow shadow

### Status Badge (`.status-badge`)
- Pill shape
- 3px 10px padding
- 0.7rem font, uppercase
- Color-coded per status

### Snackbar
- Fixed bottom-center, 84px from bottom
- Navy background, white text
- 12px radius
- Auto-dismiss after 3s

---

## 9. Iconography

### Library
**lucide-react** is the only icon library used.

### Common Icons
| Icon | Usage |
|------|-------|
| `Home` | Customer/Runner home nav |
| `ShoppingBag` | Orders nav |
| `User` | Profile nav |
| `ClipboardList` | Vendor orders nav |
| `UtensilsCrossed` | Vendor menu nav |
| `Package` | Send Package service |
| `Inbox` | Receive Package service |
| `ShoppingBag` | Shopping service |
| `Shirt` | Laundry service |
| `Printer` | Printing service |
| `MapPin` | Location indicators |
| `Bell` | Notifications |
| `Star` | Ratings |
| `Clock` | Delivery time |
| `ChevronRight` | Navigation arrows |
| `ArrowLeft` | Back buttons |
| `Search` | Search bars |
| `CheckCircle` | Success states |
| `AlertTriangle` | Warning states |
| `Info` | Info banners |

### Icon Sizes
| Context | Size |
|---------|------|
| Nav bar | 22px |
| Buttons | 14–18px |
| Cards | 16–22px |
| Badges | 11px |
| Hero/icons | 48–64px |

### Stroke Width
| State | Stroke Width |
|-------|--------------|
| Active nav | 2.5 |
| Default | 1.75 |

### Usage Rules
- Only use icons that exist in lucide-react
- Always import icons at the top of the file
- Non-existent or unimported icons break the entire app
- Use consistent sizes within the same context

---

## 10. Layout & Responsive Design

### Mobile Shell (`.runna-shell`)
```css
.runna-shell {
  width: min(430px, 100vw);
  height: 100dvh;
  position: relative;
  overflow: hidden;
  background: var(--runna-surface);
  display: flex;
  flex-direction: column;
}
```

### Scrollable Content (`.runna-screen`)
```css
.runna-screen {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  padding-bottom: 80px;
}
```

### Responsive Breakpoints (Future)
| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 768px | Bottom navigation, single column |
| Tablet | 768–1024px | Navigation Rail |
| Desktop | > 1024px | Navigation Drawer |

### Grid Patterns
| Context | Classes |
|---------|---------|
| Service grid | `grid grid-cols-2 gap-3` |
| Restaurant list | `grid grid-cols-1 gap-3` |
| Popular meals | `flex gap-3 scroll-x` |
| Category chips | `flex gap-2 scroll-x` |

### Safe Areas
- `padding-bottom: env(safe-area-inset-bottom)` on bottom nav
- Use `100dvh` (not `100vh`) for full height

---

## 11. Accessibility Guidelines

### WCAG Compliance
- Minimum 4.5:1 contrast ratio for normal text
- Minimum 3:1 contrast ratio for large text (24px+)
- Minimum 3:1 contrast ratio for UI components and graphical elements

### Touch Targets
- Minimum 44×44dp for all interactive elements
- Spacing between targets: at least 8px

### Keyboard Navigation
- All interactive elements must be focusable
- Visible focus states (blue ring)
- Logical tab order

### Screen Reader Support
- Use semantic HTML (`<button>`, `<nav>`, `<footer>`, `<h1>`–`<h6>`)
- Add `aria-label` to icon-only buttons
- Add `alt` text to all images

### State Indicators
- **Focus:** Blue ring (`box-shadow: 0 0 0 3px rgba(30,124,255,0.12)`)
- **Disabled:** `opacity: 0.4` + `cursor: not-allowed`
- **Error:** Red border + error message
- **Loading:** Skeleton shimmer or pulse

### Dark Mode
- Full dark mode support via `.dark` class
- All tokens have light + dark variants
- Surfaces use tonal hierarchy in both modes

---

## 12. Design Token Reference

### CSS Custom Properties (index.css)
All tokens are defined in `:root` and `.dark` in `index.css`:

```css
:root {
  /* Brand */
  --runna-primary: #1B2B45;
  --runna-accent: #3DB04B;
  --runna-blue: #1E7CFF;

  /* M3 Color Roles (HSL) */
  --background: 220 20% 97%;
  --foreground: 215 35% 15%;
  --primary: 214 100% 56%;
  /* ... (see index.css for full list) */

  /* M3 Surface Hierarchy */
  --m3-surface: 220 20% 97%;
  --m3-surface-lowest: 0 0% 100%;
  /* ... */

  /* Typography */
  --font-heading: 'Inter', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-display: 'Inter', sans-serif;

  /* Shape */
  --radius: 0.75rem;
}
```

### Tailwind Mapping (tailwind.config.js)
Tokens are mapped to Tailwind classes:
- `bg-primary` → `hsl(var(--primary))`
- `text-foreground` → `hsl(var(--foreground))`
- `border-border` → `hsl(var(--border))`
- `font-heading` → `var(--font-heading)`

### Tailwind Safelist
Runtime-sourced classes must be safelisted in `tailwind.config.js`:
```js
safelist: [
  'navy-gradient', 'animate-fade-in-up', 'animate-fade-in',
  'animate-slide-up', 'runna-shell', 'runna-screen', 'md3-card',
  'btn-filled', 'btn-tonal', 'btn-outlined', 'chip', 'chip selected',
  'bottom-nav', 'bottom-nav-item', 'demo-bar', 'status-badge',
  'scroll-x', 'skeleton',
]
```

### Usage Rules
- **Never** hardcode hex values in JSX (`bg-[#ffffff]`, `bg-white`)
- **Always** use token classes (`bg-primary`, `text-foreground`, `font-heading`)
- **Never** use dynamic class names (`bg-${color}-500`) — Tailwind purges them
- New custom tokens: define in `:root` + `.dark`, map in `tailwind.config.js`

---

## 13. Usage Examples

### Page Structure
```jsx
<RunnaShell>
  <div className="runna-screen bg-background">
    {/* Sticky top bar */}
    <div className="sticky top-0 z-30 bg-white border-b border-border/40">
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <h1 className="font-heading font-bold text-foreground text-base">Title</h1>
      </div>
    </div>

    {/* Content */}
    <div className="px-4 pt-4 space-y-5">
      <p className="text-sm text-muted-foreground">Description text</p>
      <button className="btn-filled">Action</button>
    </div>
  </div>
  <BottomNav role="customer" />
</RunnaShell>
```

### Card with M3 Elevation
```jsx
<div className="md3-card m3-motion-spring active:scale-98">
  <div className="p-4">
    <h3 className="font-heading font-semibold text-foreground text-sm">Card Title</h3>
    <p className="text-xs text-muted-foreground mt-1">Card description</p>
  </div>
</div>
```

### M3 Bottom Sheet
```jsx
{open && (
  <>
    <div className="fixed inset-0 bg-black/55 z-40" onClick={onClose} />
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-[28px] animate-slide-up"
         style={{ height: '78%', maxWidth: '430px', margin: '0 auto' }}>
      {/* Content */}
    </div>
  </>
)}
```

### Service Grid Card
```jsx
<button
  className="relative rounded-2xl p-4 text-left m3-motion-spring active:scale-95"
  style={{ background: 'linear-gradient(135deg, #FFF3E0, #FFE0B2)', minHeight: '110px' }}
>
  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
       style={{ background: 'rgba(255,255,255,0.6)' }}>
    <UtensilsCrossed size={22} color="#E65100" />
  </div>
  <p className="text-sm font-semibold" style={{ color: '#E65100' }}>Food Delivery</p>
</button>
```

### Premium Gradient Card (Package Dashboard)
```jsx
<button
  className="relative flex-1 rounded-3xl overflow-hidden text-left m3-motion-emphasized active:scale-98"
  style={{ background: 'linear-gradient(135deg, #1B2B45, #2A4374)', minHeight: '180px' }}
>
  <div className="absolute inset-0 flex items-center justify-end pr-6">
    <div className="w-28 h-28 rounded-full flex items-center justify-center"
         style={{ background: 'rgba(255,255,255,0.08)' }}>
      <Package size={48} color="rgba(255,255,255,0.9)" />
    </div>
  </div>
  <div className="relative p-6 flex flex-col h-full justify-between">
    <div>
      <h2 className="font-heading font-bold text-white text-xl">Send, seamlessly</h2>
      <p className="text-white/60 text-xs mt-1">Packages • Parcels • Deliveries</p>
    </div>
    <div className="w-12 h-12 rounded-full flex items-center justify-center"
         style={{ background: 'rgba(255,255,255,0.15)', boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3)' }}>
      <ChevronRight size={20} color="white" />
    </div>
  </div>
</button>
```

### Typography Usage
```jsx
<h1 className="font-heading font-extrabold text-xl" style={{ color: '#1B2B45' }}>RUNNA</h1>
<h2 className="font-heading font-bold text-foreground text-base">Page Title</h2>
<h3 className="font-heading font-bold text-foreground text-sm">Section Header</h3>
<p className="text-sm text-foreground leading-relaxed">Body text</p>
<p className="text-xs text-muted-foreground">Caption text</p>
<span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Label</span>
```

### Color Usage
```jsx
// ✅ Correct — token classes
<div className="bg-primary text-primary-foreground">Button</div>
<p className="text-muted-foreground">Muted text</p>
<div className="bg-card border border-border">Card</div>

// ✅ Correct — brand colors via inline style (for RUNNA-specific values)
<div style={{ background: '#1B2B45' }}>Navy button</div>
<p style={{ color: '#2E7D32' }}>Success text</p>

// ❌ Wrong — hardcoded Tailwind colors
<div className="bg-blue-500">Don't do this</div>
<div className="bg-white">Use bg-card instead</div>
``
