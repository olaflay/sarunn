# RUNNA — Product Design Document

**Version:** 2.0  
**Last Updated:** June 2026  
**Status:** Active Development  
**Design System:** Material Design 3

---

## 1. Product Vision & Problem Statement

RUNNA is a campus-first super-app for Nigerian universities. It gives students instant access to food from campus vendors, same-campus parcel delivery (errands), and eventually laundry and print services — all without leaving campus grounds.

**Three-sided marketplace:** Customers (students) · Vendors (campus store owners) · Runners (campus couriers). Admin monitors the whole ecosystem.

---

## 2. Brand Identity & Material 3 Design System

### Brand Seed Colors (M3 Theme Seeds)
| Role | Token | Hex | M3 Role |
|------|-------|-----|---------|
| Primary Seed | Navy | #1B2B45 | Primary / Secondary |
| Accent Seed | Green | #3DB04B | Tertiary |
| Informational | Blue | #1E7CFF | Primary Container |

### M3 Color System
All colors use Material 3 color roles and tonal palettes:
- **Primary / On-Primary / Primary-Container / On-Primary-Container**
- **Secondary / On-Secondary / Secondary-Container**
- **Tertiary / On-Tertiary / Tertiary-Container**
- **Error / On-Error / Error-Container**
- **Surface hierarchy:** Surface → Surface-Container-Low → Surface-Container → Surface-Container-High → Surface-Container-Highest
- **Outline / Outline-Variant**
- Full light mode + dark mode support

### M3 Typography Scale
| Scale | Size | Weight | Usage |
|-------|------|--------|-------|
| Display Small | 36px | 400 | Splash, hero numbers |
| Headline Large | 32px | 400 | Page titles |
| Headline Small | 24px | 400 | Section headers |
| Title Large | 22px | 400 | Card titles |
| Title Medium | 16px | 500 | List item titles |
| Body Large | 16px | 400 | Primary body text |
| Body Medium | 14px | 400 | Secondary text |
| Body Small | 12px | 400 | Captions |
| Label Large | 14px | 500 | Button labels |
| Label Medium | 12px | 500 | Chips, badges |
| Label Small | 11px | 500 | Timestamps |

### M3 Shape Scale
| Token | Radius | Usage |
|-------|--------|-------|
| Extra-Small | 4px | Badges |
| Small | 8px | Chips |
| Medium | 12px | Cards, inputs |
| Large | 16px | Buttons, list items |
| Extra-Large | 28px | Bottom sheets, hero cards |
| Full | 9999px | FABs, pills |

### M3 Elevation (Tonal Surfaces)
| Level | Surface | Shadow | Usage |
|-------|---------|--------|-------|
| 0 | Surface | None | Background |
| 1 | Surface-Low | 1dp | Cards |
| 2 | Surface-Container | 3dp | Raised cards |
| 3 | Surface-High | 6dp | Modals, dropdowns |

### M3 Motion
- **Standard:** 200ms, cubic-bezier(0.2, 0, 0, 1)
- **Emphasized:** 300ms, same curve
- **Spring:** 350ms, cubic-bezier(0.34, 1.56, 0.64, 1)
- Shared-axis transitions, container transforms, state transitions

**Font:** Inter (800 display / 700 headings / 500 labels / 400 body)

---

## 3. Location System (3-Level Tree)

```
Campus (Level 1)
  └── Main Location / Zone (Level 2)  ← pricing set here
        └── Sub Location / Landmark (Level 3)  ← optional surcharge
              └── Free-text description (user input)
```

### Phase 1 Campuses
| ID | Name | Institution |
|----|------|-------------|
| `lasu-epe` | LASU Epe Campus | Lagos State University |
| `lasued-epe` | LASUED Epe Campus | Lagos State University of Education |

### LASU Epe Zones
| Zone ID | Name | Base Fee |
|---------|------|----------|
| `school-campus` | School Campus | ₦300 |
| `iraye` | Iraye | ₦400 |
| `itamarun` | Itamarun | ₦450 |

Sub-locations under School Campus: Library, Mosque (+₦50), Chapel, ECE Lecture Hall, Part-time Rooms, Male/Female Hostel.

### Pricing Formula
```
Final Price = Base Fee (Main Location) + Sub-location surcharge (if any)
```
Price is **locked at checkout** — mid-order admin changes don't affect in-flight orders.

---

## 4. Information Architecture

### 4.1 Customer — Gateway + Dedicated Service Pages

#### Gateway Page (`/customer/home`)
The central hub. Contains ONLY:
1. **Product Logo** — RUNNA wordmark with icon
2. **Campus Selector** (Step 1) — Status card showing current campus, delivery location row, "Change Campus" button
3. **Service Grid** (Step 2) — 2-column premium cards with M3 tonal color themes

No food content, no vendors — those live in dedicated pages. Zero cognitive load.

#### Service Grid Items
| Service | Status | Route | Color Theme |
|---------|--------|-------|-------------|
| Food Delivery | ✅ Active | `/customer/food` | Orange |
| Send Package | ✅ Active | `/customer/errand` | Blue |
| Receive Package | ✅ Active | `/customer/errand` | Purple |
| Shopping | 🔜 Soon | — | Amber ("Best Prices" badge) |
| Laundry | 🔜 Soon | — | Teal |
| Printing | 🔜 Soon | — | Pink |

#### Food Home (`/customer/food`)
Dedicated food experience — no service switching distractions:
- **Search bar** (M3 search field)
- **Category chips** (horizontal scroll): All, Local, Fast Food, Swallow, Grills, Suya, Pastries
- **Promotions** (horizontal scroll banners)
- **Popular Combos** (horizontal scroll cards)
- **All Restaurants** (filtered by search + category)

#### Package Delivery Dashboard (`/customer/errand`)
- **Top bar:** Back button + location capsule (shows delivery location, tappable)
- **Two premium cards** filling available space:
  - **Send Card** — Navy gradient, courier/package icon, "Send, seamlessly", circular arrow with inner shadow
  - **Receive Card** — Green gradient, inbox/gift icon, "Receive, with ease", circular arrow with inner shadow
- Cards fill space properly, maintain visual balance, no dead space

#### Customer Bottom Navigation (4 tabs)
| Tab | Content |
|-----|---------|
| Home | Gateway page (logo + campus + service grid) |
| Orders | My Cart / Ongoing / Completed (with notification badge) |
| Support | FAQ · Live Chat · Call · Report Issue |
| Profile | Account, addresses, payment methods |

### 4.2 Vendor — 4-Tab Shell
| Tab | Content |
|-----|---------|
| Orders | Incoming / Preparing / Ready / History |
| Menu | Menu grid, add/edit, availability toggle |
| Earnings | Today's revenue, order counts |
| Profile | Campus area, operating hours, store status, bank details |

### 4.3 Runner — 4-Tab Shell
| Tab | Content |
|-----|---------|
| Home | Job board, active delivery |
| Jobs | Available errands + food deliveries |
| Earnings | Total earnings, delivery history |
| Profile | Vehicle, availability toggle, rating |

### 4.4 Admin — Side Nav (hamburger, slide-in drawer)
| Section | Notes |
|---------|-------|
| Dashboard | KPIs, weekly chart, live order status, activity feed |
| Orders | All platform orders, filterable |
| Users | Students · Vendors · Runners (expandable in nav) |
| Ledger | Revenue / Runner Payouts / Vendor Payouts |
| Disputes | Open / In Progress / Resolved queue |
| Settings | Fees, platform toggles, app info |

---

## 5. Flow Specifications

### 5.1 Food Order Flow
1. **Gateway** → Select campus (if not set) → Tap "Food Delivery"
2. **Food Home** → Search/filter → Tap vendor → VendorDetail
3. Tap menu item → **Product Modal** (3/4 bottom sheet: image, name, 2-line description, price, qty, add-to-cart)
4. Cart badge updates → Orders tab "My Cart"
5. **Checkout** → delivery location (required, 3-level picker) + payment method
6. Order placed → **OrderTracking** (animated timeline) → Review/Rating screen

### 5.2 Send/Receive Package Flow
1. **Gateway** → Tap "Send Package" or "Receive Package"
2. **Package Dashboard** → Location capsule in top bar → Choose Send or Receive card
3. **Form:** Pickup & delivery locations (3-level system), sender details (radio: use my details), receiver details, package info + size
4. Info banner: max size 65×65×40cm, 20kg. Warning banner: no illegal/prohibited items
5. "Review Delivery" → **Matching** (runner found) → **Confirmed** (runner name + ETA)
6. Orders tab shows it as ongoing errand

### 5.3 Campus Switch Edge Case
Switching campus **clears the cart AND delivery location** immediately (enforced in `setCampus()`). Campus change also reloads vendor feed.

### 5.4 Delivery Location Enforcement
- User can skip setting delivery location on the gateway
- Delivery location is **required at checkout** — checkout blocks until location is set
- Location picker is a 3/4 bottom sheet: Zone → Landmark → Free-text note

### 5.5 Vendor: Order Lifecycle
Incoming → Accept/Reject (2 min) → Preparing → Ready for Pickup → (Runner collects) → History

### 5.6 Admin: Dispute Resolution
Open → Admin expands claim → Full Refund | Partial | No Action → Resolved (both parties notified)

---

## 6. Key Interaction Patterns

### Product Modal (3/4 Bottom Sheet)
- Opens as bottom sheet covering 78% of screen height (not full screen)
- Backdrop dim (rgba 0,0,0,0.55), tap to dismiss
- Rounded top corners (28px = M3 extra-large)
- Layout: Image (200px) → Name + Price (side-by-side) → 2-line description → Category chip → Qty stepper + Add to Cart (inline)
- Pre-loads existing cart qty on re-open
- M3 slide-up animation

### Service Grid (Gateway)
- 2-column grid, premium cards with M3 tonal color themes
- Each card: gradient background, large icon in white circle, label, arrow button
- Active services: vibrant gradient + colored icon
- Inactive services: muted gray + "COMING SOON" badge
- Badge support (e.g., "Best Prices" on Shopping)
- M3 spring motion on tap (scale 0.95)

### Cart (My Cart tab)
- Grouped by vendor; per-vendor delivery fee + subtotal + total
- Qty stepper: minus button becomes × at qty 1 (removes item)
- "Clear Cart" header pill visible only when cart has items

### Package Dashboard Cards
- Two cards fill available space (flex-1 each, minHeight 180px)
- Navy gradient for Send, Green gradient for Receive
- Decorative circle with icon on right side
- Circular arrow button with inset shadow (premium inner shadow effect)
- M3 emphasized motion on tap

### Operating Hours (Vendor Settings)
- Open/Close time selects (1-hour increments, 12hr format)
- Validation: close must be after open — red banner on error
- Store status toggle overrides hours for today

---

## 7. Edge Cases Handled

| Case | Fix |
|------|-----|
| A. Campus switch with items in cart | `setCampus()` clears cart + delivery location before writing new campus |
| B. Sub-location not found | Falls back to main location base fee (no crash) |
| C. Pricing changed mid-order | Price locked at checkout time |
| D. Vendor outside mapped location | Vendor profile requires campus + zone before going live |
| E. Runner zone confusion | Job card shows zone label + estimated minutes |
| F. Food page accessed without campus | Redirect to gateway with "Select campus" message |
| G. Checkout without delivery location | Blocks order placement, opens location picker |
| H. Offline / weak network | Cart and campus persisted in localStorage; order actions queue on retry |
| I. Search returns no results | Empty state with "No results found" + helpful message |
| J. Category filter returns no vendors | Same empty state, suggests trying "All" category |

---

## 8. Implementation Status

### ✅ Done
- **Gateway page** — Logo + Campus Selector + Service Grid (2-column premium cards with M3 tonal themes)
- **Food Home** — Dedicated food experience (search, categories, promotions, popular meals, restaurants)
- **Product Modal** — 3/4 bottom sheet with 2-line descriptions, M3 slide-up animation
- **Package Delivery Dashboard** — Location capsule + two premium gradient cards with inner-shadow arrow buttons
- **Send/Receive Package flow** — 4-step: Dashboard → Form (3-level locations, sender/receiver, package info) → Matching → Confirmed
- **Delivery Location System** — 3-level picker (Zone → Landmark → Note), enforced at checkout
- **M3 Design System** — Color roles, typography scale, shape scale, elevation (tonal surfaces), motion tokens, utility classes
- Customer: Orders (My Cart + Ongoing + Completed), Checkout (with location enforcement), Order Tracking + Review
- Customer: Support (FAQ, channels, report issue), Profile
- Vendor: Dashboard, Orders, Products, Settings (campus/zone picker, operating hours + validation)
- Runner: Job board, Active Delivery, Earnings, Profile
- Admin: Side-nav shell, Dashboard, Ledger, Users, Disputes, Settings, Orders
- Location system: 3-level data in `runnaData.js` + `calculateErrandFee()` + campus-switch cart/location clear

### 🔜 Upcoming
- Day-specific operating hours (Mon–Sun grid)
- Real-time push notifications
- Campus map view for runner job board
- Shopping, Laundry and Printing services (currently "COMING SOON")
- Multi-campus vendor support
- Rating & review persistence to database
- Vendor photo upload for menu items
- Admin location management UI (add/edit/delete zones and sub-locations)
- M3 Navigation Rail for tablet, Navigation Drawer for desktop
- M3 dynamic color (user-selectable theme seeds)

---

## 9. File Architecture

```
src/
├── pages/
│   ├── customer/
│   │   ├── CustomerHome.jsx    # Gateway (logo + campus + service grid)
│   │   ├── FoodHome.jsx        # Dedicated food experience
│   │   ├── ErrandRequest.jsx   # Package delivery (dashboard + form + matching)
│   │   ├── VendorDetail.jsx    # Vendor menu + product modal
│   │   ├── Checkout.jsx        # Order checkout (location enforced)
│   │   ├── OrderTracking.jsx   # Live delivery tracking + review
│   │   ├── CustomerOrders.jsx  # Cart + ongoing + completed
│   │   ├── CustomerProfile.jsx
│   │   ├── CustomerSearch.jsx
│   │   └── Support.jsx
│   ├── vendor/                 # 4-tab vendor shell
│   ├── runner/                 # 4-tab runner shell
│   └── admin/                  # Side-nav admin shell
├── components/
│   ├── customer/
│   │   ├── ServiceGrid.jsx     # 2-column premium M3 cards
│   │   ├── ProductModal.jsx    # 3/4 bottom sheet with description
│   │   ├── CampusSelector.jsx  # Campus selection bottom sheet
│   │   ├── DeliveryLocationPicker.jsx  # 3-level location picker
│   │   ├── CartVendorGroup.jsx
│   │   └── ...
│   ├── AdminShell.jsx
│   ├── RunnaShell.jsx
│   ├── BottomNav.jsx
│   └── ...
├── lib/
│   ├── runnaData.js            # Campuses, locations, vendors, menus, services
│   ├── runnaStore.js           # Cart + campus + delivery location (localStorage)
│   └── AuthContext.jsx
├── index.css                   # M3 design tokens + utility classes
└── App.jsx                     # Router
``