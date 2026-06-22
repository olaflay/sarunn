# RUNNA — Product Requirements Document

**Version:** 2.1  
**Last Updated:** June 2026  
**Status:** Active Development  
**Design System:** Material Design 3  
**Platform:** React + Vite PWA (iOS/Android publishable)

---

## Table of Contents

1. [Product Vision & Problem Statement](#1-product-vision--problem-statement)
2. [Brand Identity & Material 3 Design System](#2-brand-identity--material-3-design-system)
3. [Location System (3-Level Tree)](#3-location-system-3-level-tree)
4. [Information Architecture](#4-information-architecture)
5. [User Personas](#5-user-personas)
6. [Flow Specifications](#6-flow-specifications)
7. [Key Interaction Patterns](#7-key-interaction-patterns)
8. [Data Models](#8-data-models)
9. [Edge Cases Handled](#9-edge-cases-handled)
10. [Accessibility & Compliance](#10-accessibility--compliance)
11. [Implementation Status](#11-implementation-status)
12. [File Architecture](#12-file-architecture)
13. [Metrics & KPIs](#13-metrics--kpis)
14. [Roadmap](#14-roadmap)

---

## 1. Product Vision & Problem Statement

### Vision
RUNNA is a campus-first super-app for Nigerian universities. It gives students instant access to food from campus vendors, same-campus parcel delivery (errands), and eventually laundry and print services — all without leaving campus grounds.

### Problem
- Students struggle to get food and run errands between tight lecture schedules
- Campus vendors lack digital ordering channels
- Students need flexible income opportunities within campus
- No hyper-local delivery platform serves Nigerian university campuses

### Solution
A three-sided marketplace: **Customers** (students) · **Vendors** (campus store owners) · **Runners** (campus couriers). An **Admin** monitors the whole ecosystem.

### Value Propositions
| Audience | Value |
|----------|-------|
| Students | Fast, affordable food & parcel delivery without leaving campus |
| Vendors | Digital storefront, more orders, easy order management |
| Runners | Flexible income on their own schedule |
| Admins | Full platform visibility, dispute resolution, financial control |

---

## 2. Brand Identity & Material 3 Design System

### Brand Seed Colors (M3 Theme Seeds)
| Role | Token | Hex | M3 Role |
|------|-------|-----|---------|
| Primary Seed | Navy | #1B2B45 | Primary / Secondary |
| Accent Seed | Green | #3DB04B | Tertiary |
| Informational | Blue | #1E7CFF | Primary Container |

### Status Colors
| Role | Hex | Usage |
|------|-----|-------|
| Success | #16A34A / #2E7D32 | Payment confirmed, delivery complete |
| Warning | #F59E0B | Prep time badges, "SOON" chips |
| Error | #DC2626 / #B3261E | Cancellations, validation errors |

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
| Scale | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| Display Small | 36px | 44px | 400 | Splash, hero numbers |
| Headline Large | 32px | 40px | 400 | Page titles |
| Headline Medium | 28px | 36px | 400 | Section headers |
| Headline Small | 24px | 32px | 400 | Section headers |
| Title Large | 22px | 28px | 400 | Card titles |
| Title Medium | 16px | 24px | 500 | List item titles |
| Title Small | 14px | 20px | 500 | Subtitles |
| Body Large | 16px | 24px | 400 | Primary body text |
| Body Medium | 14px | 20px | 400 | Secondary text |
| Body Small | 12px | 16px | 400 | Captions |
| Label Large | 14px | 20px | 500 | Button labels |
| Label Medium | 12px | 16px | 500 | Chips, badges |
| Label Small | 11px | 16px | 500 | Timestamps |

**Font:** Inter (800 display / 700 headings / 500 labels / 400 body)

### M3 Shape Scale
| Token | Radius | Usage |
|-------|--------|-------|
| Extra-Small | 4px | Badges |
| Small | 8px | Chips |
| Medium | 12px | Cards, inputs |
| Large | 16px | Buttons, list items |
| Extra-Large | 28px | Bottom sheets, hero cards |
| Full | 9999px | FABs, pills, search bars |

### M3 Elevation (Tonal Surfaces)
| Level | Surface | Shadow | Usage |
|-------|---------|--------|-------|
| 0 | Surface | None | Background |
| 1 | Surface-Low | 1dp | Cards |
| 2 | Surface-Container | 3dp | Raised cards |
| 3 | Surface-High | 6dp | Modals, dropdowns |

### M3 Motion
| Type | Duration | Easing | Usage |
|------|----------|--------|-------|
| Standard | 200ms | cubic-bezier(0.2, 0, 0, 1) | Default transitions |
| Emphasized | 300ms | cubic-bezier(0.2, 0, 0, 1) | Card taps, page elements |
| Spring | 350ms | cubic-bezier(0.34, 1.56, 0.64, 1) | Service grid, buttons |

Animations: Shared-axis transitions, container transforms, state transitions, loading states, campus selection, food card expansion, product modal opening, service navigation.

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

### LASUED Epe Zones
| Zone ID | Name | Base Fee |
|---------|------|----------|
| `lasued-main` | Main Campus | ₦300 |
| `lasued-annex` | Annex Area | ₦350 |

### Sub-locations (School Campus)
| ID | Name | Surcharge |
|----|------|-----------|
| `library` | Library | ₦0 |
| `mosque` | Mosque | ₦50 |
| `chapel` | School Chapel | ₦0 |
| `ece-hall` | ECE Lecture Hall | ₦0 |
| `part-time` | Part-time Lecture Rooms | ₦0 |
| `male-hostel` | Male Hostel | ₦0 |
| `female-hostel` | Female Hostel | ₦0 |

### Pricing Formula
```
Final Price = Base Fee (Main Location) + Sub-location surcharge (if any)
```
Price is **locked at checkout** — mid-order admin changes don't affect in-flight orders.

### Data Source
All location data lives in `lib/runnaData.js`:
- `CAMPUSES` — array of campus objects
- `LOCATIONS` — map of campusId → zones
- `SUB_LOCATIONS` — map of zoneId → landmarks
- `getLocations(campusId)` — returns zones for a campus
- `getSubLocations(locationId)` — returns landmarks for a zone
- `calculateErrandFee(fromLocationId, toLocationId, toSubLocationId)` — returns total delivery fee
- `getLocationLabel(campusId, mainId, subId)` — returns "Zone › Landmark" label

---

## 4. Information Architecture

### 4.1 Customer — Gateway + Dedicated Service Pages

#### Gateway Page (`/customer/home`)
The central hub. Contains ONLY:
1. **Product Logo** — RUNNA wordmark with icon
2. **Campus Selector** (Step 1) — Status card showing current campus, delivery location row, "Change Campus" button
3. **Service Grid** (Step 2) — 2-column premium cards with M3 tonal color themes

No food content, no vendors — those live in dedicated pages. Zero cognitive load.

**Public Footer** at bottom with links to About and Contact pages.

#### Service Grid Items
| Service | Status | Route | Color Theme | Icon |
|---------|--------|-------|-------------|------|
| Food Delivery | ✅ Active | `/customer/food` | Orange | UtensilsCrossed |
| Send Package | ✅ Active | `/customer/errand` | Blue | Package |
| Receive Package | ✅ Active | `/customer/errand` | Purple | Inbox |
| Shopping | 🔜 Soon | — | Amber | ShoppingBag |
| Laundry | 🔜 Soon | — | Teal | Shirt |
| Printing | 🔜 Soon | — | Pink | Printer |

#### Food Home (`/customer/food`)
Dedicated food experience — no service switching distractions:
- **Top bar:** Back button + title + cart icon with badge
- **Search bar** (M3 search field) — searches restaurant names and tags
- **Category chips** (horizontal scroll): All, Local, Fast Food, Swallow, Grills, Suya, Pastries
- **Promotions** (horizontal scroll banners)
- **Popular Combos** (horizontal scroll cards)
- **All Restaurants** (filtered by search + category)
- Empty state: "No results found" when search/filter returns nothing

#### Package Delivery Dashboard (`/customer/errand`)
- **Top bar:** Back button + location capsule (shows delivery location, tappable to open picker)
- **Two premium cards** filling available space:
  - **Send Card** — Navy gradient, package icon, "Send, seamlessly", circular arrow with inner shadow
  - **Receive Card** — Green gradient, inbox icon, "Receive, with ease", circular arrow with inner shadow
- Cards fill space properly (flex-1, minHeight 180px), maintain visual balance, no dead space

#### Errand Form Flow (4 steps)
1. **Dashboard** — Choose Send or Receive
2. **Form** — Pickup & delivery locations (3-level system), sender details (radio: use my details), receiver details, package info + size
3. **Matching** — Loading screen ("Finding runner…")
4. **Confirmed** — Runner name + ETA + order summary

#### Customer Bottom Navigation (4 tabs)
| Tab | Content |
|-----|---------|
| Home | Gateway page (logo + campus + service grid) |
| Orders | My Cart / Ongoing / Completed (with cart badge) |
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

### 4.5 Public Pages
| Route | Page | Purpose |
|-------|------|---------|
| `/` | Splash | Auto-redirect to gateway after 2.8s |
| `/about` | About | Company description (SEO content, 150+ words) |
| `/contact` | Contact | Contact methods + form (SEO content) |

---

## 5. User Personas

### Persona 1: Tunde (Student / Customer)
- **Age:** 19–25
- **Context:** Attends LASU Epe, lives in hostel, tight lecture schedule
- **Needs:** Food delivery between lectures, send parcels to friends across campus
- **Pain point:** No time to queue at bukas, wants to track orders in real-time

### Persona 2: Mama Tee (Vendor)
- **Age:** 35–55
- **Context:** Runs a kitchen behind Male Hostel, serves ~100 students daily
- **Needs:** Digital order management, track daily earnings, manage operating hours
- **Pain point:** Phone calls for orders are chaotic, no digital record of sales

### Persona 3: Chidi (Runner / Courier)
- **Age:** 20–28
- **Context:** Student who needs flexible income, owns a bicycle or motorbike
- **Needs:** View available jobs nearby, track earnings, manage availability
- **Pain point:** Needs income that fits around lecture schedule

### Persona 4: Admin (Platform Operator)
- **Context:** RUNNA team member managing the platform
- **Needs:** Full visibility, dispute resolution, financial oversight, user management
- **Pain point:** Needs to monitor multiple campuses, approve vendors/runners, resolve disputes

---

## 6. Flow Specifications

### 6.1 Food Order Flow
1. **Gateway** → Select campus (if not set) → Tap "Food Delivery"
2. **Food Home** → Search/filter → Tap vendor → VendorDetail
3. Tap menu item → **Product Modal** (3/4 bottom sheet: image, name, 2-line description, price, qty, add-to-cart)
4. Cart badge updates → Orders tab "My Cart"
5. **Checkout** → delivery location (required, 3-level picker) + payment method
6. Order placed → **OrderTracking** (animated timeline) → Review/Rating screen

### 6.2 Send/Receive Package Flow
1. **Gateway** → Tap "Send Package" or "Receive Package"
2. **Package Dashboard** → Location capsule in top bar → Choose Send or Receive card
3. **Form:** Pickup & delivery locations (3-level system), sender details (radio: use my details), receiver details, package info + size
4. Info banner: max size 65×65×40cm, 20kg. Warning banner: no illegal/prohibited items
5. "Review Delivery" → **Matching** (runner found) → **Confirmed** (runner name + ETA)
6. Orders tab shows it as ongoing errand

### 6.3 Campus Switch Edge Case
Switching campus **clears the cart AND delivery location** immediately (enforced in `setCampus()`). Campus change also reloads vendor feed.

### 6.4 Delivery Location Enforcement
- User can skip setting delivery location on the gateway
- Delivery location is **required at checkout** — checkout blocks until location is set
- Location picker is a 3/4 bottom sheet: Zone → Landmark → Free-text note

### 6.5 Vendor: Order Lifecycle
Incoming → Accept/Reject (2 min) → Preparing → Ready for Pickup → (Runner collects) → History

### 6.6 Admin: Dispute Resolution
Open → Admin expands claim → Full Refund | Partial | No Action → Resolved (both parties notified)

### 6.7 Cart Management
- Cart is grouped by vendor (each vendor has separate cart + delivery fee)
- Qty stepper: minus button becomes × at qty 1 (removes item)
- "Clear Cart" header pill visible only when cart has items
- Cart and campus persisted in localStorage

---

## 7. Key Interaction Patterns

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

### Campus Selector
- Bottom-sheet modal with list of campuses
- Shows institution name and estimated delivery time
- Selecting campus triggers cart + delivery location reset

### Delivery Location Picker
- 3/4 bottom sheet: Zone dropdown → Landmark dropdown → Free-text note
- Saves to localStorage via `runnaStore`
- Skippable but enforced at checkout

### Operating Hours (Vendor Settings)
- Open/Close time selects (1-hour increments, 12hr format)
- Validation: close must be after open — red banner on error
- Store status toggle overrides hours for today

### Admin Ledger
- Three sub-tabs: Revenue / Runner Payouts / Vendor Payouts
- Each: summary total + transaction list with colour-coded amount, status chip

### Admin Side Nav
- Hamburger top-left → slide-in drawer + backdrop
- Users item inline-expands → Students / Vendors / Runners
- Active section: navy left border + tinted background
- Disputes badge: red pill with open count

---

## 8. Data Models

### Entities

| Entity | Purpose | Key Fields |
|--------|---------|------------|
| Vendor | Store/vendor profile | store_name, category, campus, rating, is_open, is_approved |
| MenuItem | Food items on a vendor's menu | vendor_id, name, description, price, image_url, category, is_available |
| Order | Customer food orders | customer_id, vendor_id, runner_id, status, items, subtotal, total, delivery_address |
| ErrandRequest | Package delivery requests | customer_id, runner_id, title, description, pickup_location, dropoff_location, budget, status |
| RunnerProfile | Courier profile | user_id, full_name, phone, vehicle_type, is_available, is_approved, rating, description |
| Review | Post-delivery ratings | order_id, customer_id, vendor_id, runner_id, vendor_rating, runner_rating, description |
| User | Built-in user entity | id, email, full_name, role |

### Built-in Attributes (on every record)
`id`, `created_date`, `updated_date`, `created_by_id` — never declared in schema.

### Static Data (lib/runnaData.js)
- `CAMPUSES` — campus list
- `LOCATIONS` — zones per campus
- `SUB_LOCATIONS` — landmarks per zone
- `VENDORS` — vendor list with logos, covers, ratings
- `MENUS` — menu items per vendor (with descriptions)
- `POPULAR_MEALS` — featured meals for Food Home
- `FOOD_CATEGORIES` — filter chips
- `PROMOTIONS` — promotional banners
- `SERVICES` — service grid configuration

### Client Store (lib/runnaStore.js)
- `useCampus()` — current campus ID (localStorage)
- `useDeliveryLocation()` — current delivery location (localStorage)
- `useCart()` — cart grouped by vendor (localStorage)
- `setCampus(id)` — sets campus, clears cart + delivery location
- `setDeliveryLocation(loc)` — sets delivery location
- `addToCart(vendorId, item)`, `updateQty(vendorId, itemId, qty)`, `clearVendorCart(vendorId)`
- `vendorSubtotal(cart, vendorId)`, `cartItemCount(cart)`

---

## 9. Edge Cases Handled

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
| K. Vendor closed | Card overlay shows "Closed" badge, tap disabled |
| L. Duplicate sub-location names | Admin warned on similar names (future: fuzzy match) |

---

## 10. Accessibility & Compliance

### Material 3 Accessibility
- WCAG-compliant contrast ratios for all text/background combinations
- Proper touch targets (minimum 44×44dp)
- Keyboard navigation support
- Screen reader support (semantic HTML, ARIA labels)
- Focus states on all interactive elements
- Disabled states with reduced opacity (0.4)
- Error states with clear messaging

### Responsive Behavior
| Breakpoint | Layout |
|------------|--------|
| Mobile (< 768px) | Bottom navigation, single column |
| Tablet (768–1024px) | Navigation Rail (future) |
| Desktop (> 1024px) | Navigation Drawer (future) |

### PWA Features
- Mobile-first shell (430px max width, 100dvh)
- Safe area insets for notched devices
- localStorage persistence for offline resilience
- Smooth scrolling with `-webkit-overflow-scrolling: touch`

---

## 11. Implementation Status

### ✅ Done
- **Gateway page** — Logo + Campus Selector + Service Grid (2-column premium cards with M3 tonal themes) + Public Footer
- **Food Home** — Dedicated food experience (search, categories, promotions, popular meals, restaurants)
- **Product Modal** — 3/4 bottom sheet with 2-line descriptions, M3 slide-up animation
- **Package Delivery Dashboard** — Location capsule + two premium gradient cards with inner-shadow arrow buttons
- **Send/Receive Package flow** — 4-step: Dashboard → Form (3-level locations, sender/receiver, package info) → Matching → Confirmed
- **Delivery Location System** — 3-level picker (Zone → Landmark → Note), enforced at checkout
- **M3 Design System** — Color roles, typography scale, shape scale, elevation (tonal surfaces), motion tokens, utility classes
- **Public SEO pages** — About page (150+ words), Contact page (email + form), linked from footer
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
- Stripe payment integration
- Real-time runner tracking (GPS)
- Push notifications for order status updates

---

## 12. File Architecture

```
src/
├── pages/
│   ├── Splash.jsx               # Auto-redirect splash screen
│   ├── About.jsx                # Public SEO page (150+ words)
│   ├── Contact.jsx              # Public SEO page (email + form)
│   ├── customer/
│   │   ├── CustomerHome.jsx     # Gateway (logo + campus + service grid)
│   │   ├── FoodHome.jsx         # Dedicated food experience
│   │   ├── ErrandRequest.jsx    # Package delivery (dashboard + form + matching)
│   │   ├── VendorDetail.jsx     # Vendor menu + product modal
│   │   ├── Checkout.jsx         # Order checkout (location enforced)
│   │   ├── OrderTracking.jsx    # Live delivery tracking + review
│   │   ├── CustomerOrders.jsx   # Cart + ongoing + completed
│   │   ├── CustomerProfile.jsx
│   │   ├── CustomerSearch.jsx
│   │   └── Support.jsx
│   ├── vendor/                  # 4-tab vendor shell
│   ├── runner/                  # 4-tab runner shell
│   └── admin/                   # Side-nav admin shell
├── components/
│   ├── customer/
│   │   ├── ServiceGrid.jsx     # 2-column premium M3 cards
│   │   ├── ProductModal.jsx    # 3/4 bottom sheet with description
│   │   ├── CampusSelector.jsx  # Campus selection bottom sheet
│   │   ├── DeliveryLocationPicker.jsx  # 3-level location picker
│   │   ├── CartVendorGroup.jsx
│   │   └── ...
│   ├── AdminShell.jsx
│   ├── RunnaShell.jsx          # Mobile PWA shell wrapper
│   ├── BottomNav.jsx           # Customer/vendor/runner bottom nav
│   ├── DemoBar.jsx             # Role switcher for demo
│   ├── PublicFooter.jsx        # Footer with About/Contact links
│   ├── Snackbar.jsx
│   ├── StatusBadge.jsx
│   └── ...
├── entities/                    # JSON schemas (data models)
│   ├── Vendor.json
│   ├── MenuItem.json
│   ├── Order.json
│   ├── ErrandRequest.json
│   ├── RunnerProfile.json
│   └── Review.json
├── lib/
│   ├── runnaData.js            # Campuses, locations, vendors, menus, services
│   ├── runnaStore.js           # Cart + campus + delivery location (localStorage)
│   ├── AuthContext.jsx
│   ├── query-client.js
│   ├── PageNotFound.jsx
│   └── app-params.js
├── index.css                   # M3 design tokens + utility classes
├── tailwind.config.js          # Tailwind config with token mapping
└── App.jsx                     # Router
```

---

## 13. Metrics & KPIs

### Customer Metrics
- Daily/Monthly Active Users (DAU/MAU)
- Order frequency per user
- Average order value
- Cart abandonment rate
- Delivery location set rate

### Vendor Metrics
- Active vendors per campus
- Average orders per vendor per day
- Vendor retention rate
- Average prep time

### Runner Metrics
- Active runners per campus
- Average deliveries per runner per day
- Runner earnings
- Runner rating average

### Platform Metrics
- Total GMV (Gross Merchandise Value)
- Platform commission revenue
- Order completion rate
- Average delivery time
- Dispute resolution time
- Customer satisfaction (review ratings)

---

## 14. Roadmap

### Phase 1 (Current)
- ✅ Food delivery + package delivery
- ✅ 2 campuses (LASU Epe, LASUED Epe)
- ✅ M3 design system
- ✅ Public SEO pages

### Phase 2 (Next)
- Shopping, Laundry, Printing services
- More campuses across Nigeria
- Stripe payment integration
- Real-time runner GPS tracking
- Push notifications

### Phase 3 (Future)
- M3 dynamic color theming
- Tablet/desktop adaptive layouts
- Multi-campus vendor chains
- AI-powered order recommendations
- Campus map integration
- Subscription plans for frequent users