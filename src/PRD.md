# RUNNA — Product Design Document

**Version:** 1.1  
**Last Updated:** June 2026  
**Status:** Active Development

---

## 1. Product Vision & Problem Statement

RUNNA is a campus-first super-app for Nigerian universities. It gives students instant access to food from campus vendors, same-campus parcel delivery (errands), and eventually laundry and print services — all without leaving campus grounds.

**Three-sided marketplace:** Customers (students) · Vendors (campus store owners) · Runners (campus couriers). Admin monitors the whole ecosystem.

---

## 2. Brand Identity

| Role | Token | Hex | Usage |
|------|-------|-----|-------|
| Primary | `--runna-primary` | #1B2B45 | CTAs, active nav, sticky headers, hero banners |
| Accent | `--runna-accent` | #3DB04B | Section underlines, positive states, add-to-cart |
| Informational | `--runna-blue` | #1E7CFF | Order status labels, info banners, links |
| Success | — | #16A34A | Payment confirmed, delivery complete |
| Warning | — | #F59E0B | Prep time badges, "SOON" chips |
| Error | — | #DC2626 | Cancellations, validation errors |

**Font:** Inter 800 display / 700 headings / 600 labels / 400 body.

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
Price is **locked at checkout** (`price_snapshot`) — mid-order admin changes don't affect in-flight orders.

---

## 4. Information Architecture

### 4.1 Customer — 4-Tab Shell
| Tab | Content |
|-----|---------|
| Home | Campus selector (big button) + Service grid + Vendor list |
| Orders | My Cart / Ongoing / Completed |
| Support | FAQ · Live Chat · Call · Report Issue |
| Profile | Account, addresses, payment methods |

**Errand (Send Package):** Triggered from Service Grid on Home. Full-screen overlay with Back arrow, 4 steps: Landing → Form → Runner Matching → Confirmation.

### 4.2 Vendor — 4-Tab Shell
| Tab | Content |
|-----|---------|
| Dashboard | Today's revenue, order counts |
| Orders | Incoming / Preparing / Ready / History |
| Products | Menu grid, add/edit, availability toggle |
| Settings | Campus area (Campus + Zone), operating hours (open/close time selects + validation), store status toggle, bank details |

### 4.3 Runner — 3-Tab Shell
Jobs · Active Delivery · Profile

### 4.4 Admin — Side Nav (hamburger, slide-in drawer)
| Section | Notes |
|---------|-------|
| Dashboard | KPIs, weekly chart, live order status, activity feed |
| Ledger | Revenue / Runner Payouts / Vendor Payouts |
| Users | Students · Vendors · Runners (expandable in nav) |
| Disputes | Open / In Progress / Resolved queue with resolution actions |
| Settings | Fees, platform toggles, app info |

---

## 5. Flow Specifications

### 5.1 Food Order
1. Home → Select campus (CampusButton → bottom-sheet)
2. Tap vendor → VendorDetail → product modal (full-screen, image, qty stepper)
3. Cart badge updates → Orders tab "My Cart"
4. Checkout → delivery address (3-level location picker) + payment
5. Order placed → OrderTracking (animated timeline) → Review/Rating screen

### 5.2 Send Package (Errand)
1. Home → Service grid → "Send Package"
2. Landing: Send | Receive
3. Form: Pickup zone + sublocation + note, Drop-off zone + sublocation + note, Package description + size, Live pricing preview
4. "Find Runner" → matching loader (2.5s) → Confirmed screen with runner name + ETA
5. Orders tab shows it as ongoing errand

### 5.3 Campus Switch Edge Case
Switching campus **clears the cart** immediately (enforced in `setCampus()`). Campus change also reloads vendor feed.

### 5.4 Vendor: Order Lifecycle
Incoming → Accept/Reject (2 min) → Preparing → Ready for Pickup → (Runner collects) → History

### 5.5 Admin: Dispute Resolution
Open → Admin expands claim → Full Refund | Partial | No Action → Resolved (both parties notified)

---

## 6. Key Interaction Patterns

### Product Modal
- Full-screen overlay (not bottom sheet), image fills top 55% of height
- X button top-right; qty stepper; CTA: "Add ₦{price × qty}" — disabled at qty 0
- Pre-loads existing cart qty on re-open

### Cart (My Cart tab)
- Grouped by vendor; per-vendor delivery fee + subtotal + total
- Qty stepper: minus button becomes × at qty 1 (removes item)
- "Clear Cart" header pill visible only when cart has items

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

## 7. Edge Cases Handled

| Case | Fix |
|------|-----|
| A. Campus switch with items in cart | `setCampus()` clears cart before writing new campus |
| B. Sub-location not found | Falls back to main location base fee (no crash) |
| C. Pricing changed mid-order | Price locked at checkout time |
| D. Vendor outside mapped location | Vendor profile requires campus + zone before going live (admin verification flag) |
| E. Runner zone confusion | Job card shows zone label + estimated minutes |
| F. Duplicate sub-location names | Admin warned on similar names (future: fuzzy match) |
| G. Offline / weak network | Cart and campus persisted in localStorage; order actions queue on retry |

---

## 8. Implementation Status

### ✅ Done
- Customer: Home, Campus Selector (CampusButton functional), Service Grid, Vendor list, Product Modal
- Customer: Orders (My Cart + Ongoing + Completed), Checkout, Order Tracking + Review
- Customer: Send Package (4-step flow: Landing → 3-level location form → Matching → Confirmed)
- Customer: Support (FAQ, channels, report issue), Profile
- Vendor: Dashboard, Orders, Products, Settings (campus/zone picker, operating hours + validation)
- Runner: Job board, Active Delivery, Earnings, Profile
- Admin: Side-nav shell (`AdminShell`), Dashboard, Ledger, Users, Disputes, Settings, Orders
- Design token fix: navy `#1B2B45` as primary CTA, green `#3DB04B` as accent, blue `#1E7CFF` informational
- Location system: 3-level data in `runnaData.js` + `calculateErrandFee()` + campus-switch cart clear

### 🔜 Upcoming
- Day-specific operating hours (Mon–Sun grid)
- Real-time push notifications
- Campus map view for runner job board
- Laundry and Printing services (currently "SOON")
- Multi-campus vendor support
- Rating & review persistence to database
- Vendor photo upload for menu items
- Admin location management UI (add/edit/delete zones and sub-locations)