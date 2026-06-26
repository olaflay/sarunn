import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Star, Clock, ShoppingBag, MapPin } from 'lucide-react';
import RunnaShell from '@/components/RunnaShell';
import BottomNav from '@/components/BottomNav';
import { useCart, cartItemCount, useCampus } from '@/lib/runnaStore';
import { CAMPUSES, vendorsByCampus, POPULAR_MEALS, FOOD_CATEGORIES, PROMOTIONS } from '@/lib/runnaData';

function PromoBanner({ promo }) {
  return (
    <div className="flex-shrink-0 w-72 rounded-2xl p-4 text-white m3-motion-standard" style={{ background: promo.bg }}>
      <h3 className="font-heading text-base font-bold leading-tight">{promo.title}</h3>
      <p className="mt-1 text-xs leading-relaxed text-white/70">{promo.desc}</p>
    </div>
  );
}

function PopularCard({ item, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 w-36 overflow-hidden rounded-2xl border border-border/50 bg-white text-left shadow-sm m3-motion-spring active:scale-[0.98]"
    >
      <img src={item.image_url} alt={item.name} className="h-24 w-full object-cover" />
      <div className="p-2.5">
        <p className="text-xs font-semibold leading-tight text-foreground">{item.name}</p>
        <p className="mt-0.5 text-xs font-bold" style={{ color: '#1B2B45' }}>₦{item.price.toLocaleString()}</p>
      </div>
    </button>
  );
}

function VendorCard({ vendor, onClick }) {
  return (
    <button
      type="button"
      className="md3-card overflow-hidden text-left transition-transform active:scale-[0.98]"
      onClick={onClick}
    >
      <div className="relative">
        <img src={vendor.cover_url} alt={vendor.store_name} className="h-32 w-full object-cover" />
        {!vendor.is_open && (
          <div className="absolute inset-0 flex items-center justify-center rounded-t-[20px] bg-black/50">
            <span className="rounded-full bg-black/60 px-3 py-1 text-sm font-semibold text-white">Closed</span>
          </div>
        )}
        <div className="absolute bottom-2.5 left-2.5">
          <img src={vendor.logo_url} alt="" className="h-9 w-9 rounded-xl border-2 border-white object-cover shadow-md" />
        </div>
        {vendor.tags?.[0] && (
          <div className="absolute right-2.5 top-2.5 rounded-lg bg-white/90 px-2 py-0.5 text-xs font-semibold text-slate-700">
            {vendor.tags[0]}
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate font-heading text-sm font-semibold leading-tight text-slate-800">{vendor.store_name}</h3>
            <div className="mt-1 flex items-center gap-3">
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <Star size={11} fill="#F59E0B" color="#F59E0B" />
                <span className="font-medium text-slate-700">{vendor.rating}</span>
                <span>({vendor.rating_count})</span>
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <Clock size={11} aria-hidden="true" />
                {vendor.delivery_time_min} min
              </span>
            </div>
          </div>
          <span className="mt-1 text-xs text-slate-500">₦{vendor.delivery_fee} fee</span>
        </div>
      </div>
    </button>
  );
}

export default function FoodHome() {
  const navigate = useNavigate();
  const campusId = useCampus();
  const cart = useCart();
  const count = cartItemCount(cart);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const campus = CAMPUSES.find((c) => c.id === campusId);
  const vendors = campusId ? vendorsByCampus(campusId) : [];
  const popular = POPULAR_MEALS.filter((p) => vendors.some((v) => v.id === p.vendorId));

  const filteredVendors = useMemo(() => {
    let result = vendors;
    if (activeCategory !== 'All') {
      result = result.filter((v) => v.tags?.some((t) => t.toLowerCase() === activeCategory.toLowerCase()));
    }
    if (search) {
      result = result.filter(
        (v) =>
          v.store_name.toLowerCase().includes(search.toLowerCase()) ||
          v.tags?.some((t) => t.toLowerCase().includes(search.toLowerCase())),
      );
    }
    return result;
  }, [vendors, activeCategory, search]);

  if (!campusId) {
    return (
      <RunnaShell>
        <div className="runna-screen flex flex-col items-center justify-center bg-background px-8 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
            <MapPin size={28} color="#94a3b8" aria-hidden="true" />
          </div>
          <h3 className="mb-1 font-heading text-base font-bold text-foreground">Select your campus first</h3>
          <p className="mb-6 text-sm text-muted-foreground">Go back and choose a campus to see food vendors.</p>
          <button onClick={() => navigate('/customer/home')} className="btn-filled px-6">
            Back to Home
          </button>
        </div>
      </RunnaShell>
    );
  }

  return (
    <RunnaShell>
      <div className="runna-screen bg-background">
        <header className="sticky top-0 z-30 border-b border-border/40 bg-white/95 backdrop-blur-sm">
          <div className="flex items-center gap-3 px-4 pb-3 pt-4 lg:px-6">
            <button
              onClick={() => navigate('/customer/home')}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-muted transition hover:bg-muted/80"
              aria-label="Go back"
            >
              <ArrowLeft size={18} aria-hidden="true" />
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="font-heading text-base font-bold leading-tight text-foreground">Food Delivery</h1>
              <p className="truncate text-xs text-muted-foreground">{campus?.name}</p>
            </div>
            <button
              onClick={() => navigate('/customer/orders')}
              className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-muted transition hover:bg-muted/80"
              aria-label="Open orders"
            >
              <ShoppingBag size={20} color="#1B2B45" aria-hidden="true" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full border border-white bg-red-500 px-1 text-[9px] font-bold text-white">
                  {count}
                </span>
              )}
            </button>
          </div>

          <div className="px-4 pb-3 lg:px-6">
            <div className="relative">
              <Search size={16} color="#94a3b8" className="absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search restaurants, dishes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-full border-2 border-transparent bg-muted py-3 pl-10 pr-4 text-sm outline-none transition-colors focus:border-[#1B2B45]/20"
              />
            </div>
          </div>

          <div className="scroll-x flex gap-2 px-4 pb-3 lg:px-6">
            {FOOD_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`chip flex-shrink-0 ${activeCategory === cat ? 'selected' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <div className="px-4 py-4 lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-6 lg:px-6 lg:py-6">
          <section className="space-y-5">
            {PROMOTIONS.length > 0 && (
              <div className="scroll-x flex gap-3 pb-1">
                {PROMOTIONS.map((promo) => (
                  <PromoBanner key={promo.id} promo={promo} />
                ))}
              </div>
            )}

            {popular.length > 0 && (
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-heading text-sm font-bold text-foreground">Popular Combos</h3>
                </div>
                <div className="scroll-x flex gap-3 pb-1">
                  {popular.map((item) => (
                    <PopularCard key={item.id} item={item} onClick={() => navigate(`/customer/vendor/${item.vendorId}`)} />
                  ))}
                </div>
              </div>
            )}

            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-heading text-sm font-bold text-foreground">All Restaurants</h3>
              <span className="text-xs text-muted-foreground">{filteredVendors.length} places</span>
            </div>

            {filteredVendors.length === 0 ? (
              <div className="py-12 text-center">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
                  <Search size={24} color="#94a3b8" aria-hidden="true" />
                </div>
                <p className="mb-1 text-sm font-semibold text-foreground">No results found</p>
                <p className="text-xs text-muted-foreground">Try a different search or category</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 pb-4">
                {filteredVendors.map((vendor) => (
                  <VendorCard
                    key={vendor.id}
                    vendor={vendor}
                    onClick={() => vendor.is_open && navigate(`/customer/vendor/${vendor.id}`)}
                  />
                ))}
              </div>
            )}
          </section>

          <aside className="mt-6 space-y-4 lg:mt-0">
            <section className="rounded-[24px] border border-border/50 bg-card p-4 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Campus</p>
              <h2 className="mt-1 text-lg font-semibold text-foreground">{campus?.name}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {campus?.institution} · Est. {campus?.est_delivery}
              </p>
            </section>

            <section className="rounded-[24px] border border-border/50 bg-card p-4 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Desktop view</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                The sidebar keeps navigation close while the content expands into a wider catalog layout.
              </p>
            </section>
          </aside>
        </div>
      </div>
      <BottomNav role="customer" />
    </RunnaShell>
  );
}
