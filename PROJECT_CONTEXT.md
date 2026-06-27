# PROJECT_CONTEXT

## 1. Project Description
SARUNN is a campus-first super-app for Nigerian universities. It connects three primary user groups:

- Customers can order food and request campus errands.
- Vendors can manage menus, orders, earnings, and profile details.
- Runners can accept jobs, track earnings, and manage availability.
- Admins can oversee users, orders, pricing, disputes, and platform settings.

The current product focus is Phase 1: food delivery, campus errands, and public marketing pages for the LASU Epe and LASUED Epe campuses.

## 2. Tech Stack
- React 18
- Vite
- React Router DOM
- TanStack React Query
- Tailwind CSS
- Radix UI primitives
- Lucide React icons
- Framer Motion
- react-hook-form
- Zod
- Sonner / React Hot Toast for notifications
- date-fns, moment for date handling
- Local storage-backed client state for demo data and user session persistence

## 3. Folder Structure
The codebase is organized around the `src/` directory:

```text
src/
|-- components/
|   |-- customer/
|   `-- ui/
|-- pages/
|   |-- customer/
|   |-- vendor/
|   |-- runner/
|   `-- admin/
|-- routes/
|-- constants/
|-- lib/
|-- hooks/
|-- utils/
|-- layouts/
|-- services/
|-- store/
|-- api/
|-- assets/
`-- theme/
```

Notes:
- `src/lib/` currently holds core app wiring, auth, data, storage helpers, and query client setup.
- `src/routes/` now centralizes public, auth, and role-based route definitions.
- `src/constants/` holds shared role and navigation constants.
- `src/services/` now contains mock-backed data, storage, and platform API layers.
- `src/store/` now contains Zustand-style stores for auth, campus, cart, orders, notifications, and profile state.
- `src/components/customer/` contains customer-specific UI blocks such as the service grid, product modal, and location picker.
- `src/components/ui/` contains reusable shadcn-style primitives.
- `src/pages/` is split by audience: public, customer, vendor, runner, and admin pages.
- Some folders in the example structure are not fully materialized yet, but are included here as the intended architecture.

## 4. User Roles
- `customer`: browses food vendors, places orders, tracks deliveries, and requests errands.
- `vendor`: manages storefront operations, order flow, menu items, earnings, and profile settings.
- `runner`: accepts delivery jobs, tracks earnings, and updates availability.
- `admin`: manages platform-wide orders, users, pricing, disputes, payouts, and settings.

Demo accounts are seeded for all four roles in the local auth runtime.

## 5. Current Progress
Implemented and working:

- Public pages: Splash, About, Contact, Login, Register, Forgot Password, Reset Password
- Customer flows: Home, Food, Search, Vendor Detail, Checkout, Order Tracking, Orders, Profile, Errand Request, Support
- Vendor flows: Orders, Menu, Earnings, Profile
- Runner flows: Home, Jobs, Earnings, Profile
- Admin flows: Dashboard, Orders, Users, Settings, Pricing, Ledger, Disputes
- Role-based routing via `RoleRoute`
- Centralized route registry in `src/routes/appRoutes.jsx`
- Mock service abstraction layers in `src/services/`
- Zustand-style client stores in `src/store/`
- Auth/session handling via local demo auth runtime
- Local persistence for campus, delivery location, and cart state
- Campus-scoped vendors, menus, and location data
- Material Design 3-inspired styling and responsive mobile-first shell

Phase 1 status:
- Food delivery is in place.
- Package/errand delivery is in place.
- Two campuses are configured: LASU Epe and LASUED Epe.
- Shopping, Laundry, and Printing are planned but not yet active.

## 6. Coding Conventions
- Use modern React function components and hooks.
- Keep routing in `App.jsx` and protect role-specific pages with `RoleRoute`.
- Prefer feature-specific components under `src/components/` and page-level composition under `src/pages/`.
- Use the existing alias imports with `@/` where the project already does so.
- Keep route definitions centralized in `src/routes/` and role access in `RoleRoute`.
- Keep styling aligned with the Material 3 design system in `src/index.css` and `src/style.md`.
- Reuse the shared local state helpers in `src/lib/SARUNNStore.js` for campus, cart, and delivery location data.
- Keep static demo data in `src/lib/SARUNNData.js` unless it becomes dynamic.
- Prefer small, composable utilities over duplicate logic.
- Preserve mobile-first behavior and bottom-nav patterns for customer, vendor, and runner experiences.
