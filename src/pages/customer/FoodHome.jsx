import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Star, Clock, ShoppingBag, MapPin } from 'lucide-react';
import RunnaShell from '@/components/RunnaShell';
import DemoBar from '@/components/DemoBar';
import BottomNav from '@/components/BottomNav';
import { useCart, cartItemCount, useCampus } from '@/lib/runnaStore';
import { CAMPUSES, vendorsByCampus, POPULAR_MEALS, FOOD_CATEGORIES, PROMOTIONS } from '@/lib/runnaData';

function PromoBanner({ promo }) {
  return (
    <div className="flex-shrink-0 w-72 rounded-2xl p-4 text-white m3-motion-standard" style={{ background: promo.bg }}>
      <h3 className="font-heading font-bold text-base leading-tight">{promo.title}</h3>
      <p className="text-white/70 text-xs mt-1 leading-relaxed">{promo.desc}</p>
    </div>
  );
}

function PopularCard({ item, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 w-36 rounded-2xl overflow-hidden bg-white border border-border/50 shadow-sm text-left m3-motion-spring active:scale-95"
    >
      <img src={item.image_url} alt={item.name} className="w-full h-24 object-cover" />
      <div className="p-2.5">
        <p className="text-xs font-semibold text-foreground leading-tight">{item.name}</p>
        <p className="text-xs font-bold mt-0.5" style={{ color: '#1B2B45' }}>₦{item.price.toLocaleString()}</p>
      </div>
    </button>
  );
}

function VendorCard({ vendor, onClick }) {
  return (
    <div className="md3-card cursor-pointer m3-motion-spring active:scale-98" onClick={onClick}>
      <div className="relative">
        <img src={vendor.cover_url} alt={vendor.store_name} className="w-full h-32 object-cover" />
        {!vendor.is_open && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-xl">
            <span className="text-white font-semibold text-sm bg-black/60 px-3 py-1 rounded-full">Closed</span>
          </div>
        )}
        <div className="absolute bottom-2.5 left-2.5">
          <img src={vendor.logo_url} alt="" className="w-9 h-9 rounded-xl border-2 border-white shadow-md object-cover" />
        </div>
        {vendor.tags?.[0] && (
          <div className="absolute top-2.5 right-2.5 bg-white/90 text-xs font-semibold px-2 py-0.5 rounded-lg text-slate-700">
            {vendor.tags[0]}
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-heading font-semibold text-slate-800 text-sm leading-tight">{vendor.store_name}</h3>
            <div className="flex items-center gap-3 mt-1">
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <Star size={11} fill="#F59E0B" color="#F59E0B" />
                <span className="font-medium text-slate-700">{vendor.rating}</span>
                <span>({vendor.rating_count})</span>
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <Clock size={11} />{vendor.delivery_time_min} min
              </span>
            </div>
          </div>
          <span className="text-xs text-slate-500 mt-1">₦{vendor.delivery_fee} fee</span>
        </div>
      </div>
    </div>
  );
}

/**
 * DEDICATED FOOD EXPERIENCE — no service switching distractions.
 * Search, Categories, Promotions, Popular Meals, Restaurants.
 */
export default function FoodHome() {
  const navigate = useNavigate();
  const campusId = useCampus();
  const cart = useCart();
  const count = cartItemCount(cart);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const campus = CAMPUSES.find(c => c.id === campusId);
  const vendors = campusId ? vendorsByCampus(campusId) : [];
  const popular = POPULAR_MEALS.filter(p => vendors.some(v => v.id === p.vendorId));

  const filteredVendors = useMemo(() => {
    let result = vendors;
    if (activeCategory !== 'All') {
      result = result.filter(v => v.tags?.some(t => t.toLowerCase() === activeCategory.toLowerCase()));
    }
    if (search) {
      result = result.filter(v =>
        v.store_name.toLowerCase().includes(search.toLowerCase()) ||
        v.tags?.some(t => t.toLowerCase().includes(search.toLowerCase()))
      );
    }
    return result;
  }, [vendors, activeCategory, search]);

  /* Edge case: no campus selected */
  if (!campusId) {
    return (
      <RunnaShell>
        <DemoBar currentRole="Customer" />
        <div className="runna-screen bg-background flex flex-col items-center justify-center text-center px-8">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
            <MapPin size={28} color="#94a3b8" />
          </div>
          <h3 className="font-heading font-bold text-foreground text-base mb-1">Select your campus first</h3>
          <p className="text-muted-foreground text-sm mb-6">Go back and choose a campus to see food vendors.</p>
          <button onClick={() => navigate('/customer/home')} className="text-white font-semibold rounded-2xl px-6 py-3 text-sm" style={{ background: '#1B2B45' }}>
            Back to Home
          </button>
        </div>
      </RunnaShell>
    );
  }

  return (
    <RunnaShell>
      <DemoBar currentRole="Customer" />
      <div className="runna-screen bg-background">

        {/* ── App bar ── */}
        <div className="sticky top-0 z-30 bg-white border-b border-border/40">
          <div className="flex items-center gap-3 px-4 pt-4 pb-3">
            <button onClick={() => navigate('/customer/home')} className="w-9 h-9 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
              <ArrowLeft size={18} />
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="font-heading font-bold text-foreground text-base leading-tight">Food Delivery</h1>
              <p className="text-xs text-muted-foreground truncate">{campus?.name}</p>
            </div>
            <button onClick={() => navigate('/customer/orders')} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center relative flex-shrink-0">
              <ShoppingBag size={20} color="#1B2B45" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center border border-white">
                  {count}
                </span>
              )}
            </button>
          </div>

          {/* Search bar (M3 search field) */}
          <div className="px-4 pb-3">
            <div className="relative">
              <Search size={16} color="#94a3b8" className="absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search restaurants, dishes…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-full bg-muted text-sm outline-none border-2 border-transparent focus:border-[#1B2B45]/20 transition-colors"
              />
            </div>
          </div>

          {/* Category chips (horizontal scroll) */}
          <div className="flex gap-2 px-4 pb-3 scroll-x">
            {FOOD_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`chip flex-shrink-0 ${activeCategory === cat ? 'selected' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 pt-4 space-y-5">

          {/* Promotions */}
          {PROMOTIONS.length > 0 && (
            <div className="flex gap-3 scroll-x pb-1">
              {PROMOTIONS.map(p => (
                <PromoBanner key={p.id} promo={p} />
              ))}
            </div>
          )}

          {/* Popular Meals */}
          {popular.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading font-bold text-foreground text-sm">Popular Combos</h3>
              </div>
              <div className="flex gap-3 scroll-x pb-1">
                {popular.map(item => (
                  <PopularCard
                    key={item.id}
                    item={item}
                    onClick={() => navigate(`/customer/vendor/${item.vendorId}`)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* All Restaurants */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-heading font-bold text-foreground text-sm">All Restaurants</h3>
            <span className="text-xs text-muted-foreground">{filteredVendors.length} places</span>
          </div>

          {filteredVendors.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-3">
                <Search size={24} color="#94a3b8" />
              </div>
              <p className="font-semibold text-foreground text-sm mb-1">No results found</p>
              <p className="text-muted-foreground text-xs">Try a different search or category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 pb-4">
              {filteredVendors.map(vendor => (
                <VendorCard
                  key={vendor.id}
                  vendor={vendor}
                  onClick={() => vendor.is_open && navigate(`/customer/vendor/${vendor.id}`)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <BottomNav role="customer" />
    </RunnaShell>
  );
}