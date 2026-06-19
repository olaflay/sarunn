# RUNNA — Product Requirements (Living Doc)

**Type:** Campus-first food & errands delivery PWA
**Phase 1 campuses:** LASU Epe, LASUED Epe
**Core principle:** Customer, vendor, and runner are always scoped to the same campus.

---

## 1. Customer Experience (IMPLEMENTED)

### Home — EasyWay style
- **Big campus selector** at the top (bottom-sheet picker with vendor counts per campus). Selection persists.
- **Service grid:** Food · Send Package (active) · Laundry · Printing Press (inactive, "SOON").
- **Food feed:** only vendors from the selected campus are shown. Prompts to pick a campus first if none selected.

### Navigation — 4 tabs only
`Home · Orders · Support · Profile`. The **Errand (Send Package)** flow is launched from the Home service grid, not a nav tab.

### Product modal — Chowdeck style
- Full-screen, large hero image, name + price, quantity stepper, "Add to Cart" CTA.
- **No item description** shown.

### Orders — combined Chowdeck-style screen
- **My Cart:** items grouped by vendor, per-vendor delivery fee, quantity steppers, per-vendor checkout, Clear Cart.
- **Ongoing:** live orders with status progress bar, ETA badge, Track + Support actions.
- **Completed:** past orders with status badge and reorder.
- Cart badge shown on the Orders tab.

### Checkout & Support
- Checkout reads the selected vendor's cart group; payment via Card or Bank Transfer.
- Support: contact channels, FAQ accordion, report-an-issue form.

### States
- Loading skeletons, empty states (cart/ongoing/completed/no-campus/no-vendors), and snackbar feedback throughout.

---

## 2. Vendor (PARTIAL — next up)
- Orders, menu management, earnings, profile implemented.
- **TODO:** campus area selection + opening/closing times in vendor profile setup.

## 3. Runner (IMPLEMENTED baseline)
- Job board, active delivery, earnings, profile. Campus-scoped jobs.

## 4. Admin (PARTIAL — next up)
- Dashboard, orders, users, settings, disputes implemented with bottom nav.
- **TODO:** collapsible side nav (replace bottom nav); Settings with pricing; Users grouped (students/customers, vendors, runners) with full detail; standardized dispute UI; Ledger section.

---

## 5. Data / Campus Model
- Each vendor has a `campus`. Customers select a campus; only same-campus vendors appear.
- Cart is grouped by vendor and persisted on-device.

## 6. Deferred (post-MVP)
Live GPS maps · chat · WhatsApp · loyalty/coupons · subscriptions · public reviews · multi-stop routing · advanced analytics.