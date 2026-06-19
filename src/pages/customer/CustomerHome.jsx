import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Bell, Search, ChevronRight, Star, Clock, Zap } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import RunnaShell from '@/components/RunnaShell';
import DemoBar from '@/components/DemoBar';
import BottomNav from '@/components/BottomNav';

const CATEGORIES = [
  { id: 'all', label: 'All', emoji: '🏪' },
  { id: 'food', label: 'Food', emoji: '🍔' },
  { id: 'groceries', label: 'Groceries', emoji: '🛒' },
  { id: 'errands', label: 'Errands', emoji: '📦' },
  { id: 'pharmacy', label: 'Pharmacy', emoji: '💊' },
  { id: 'drinks', label: 'Drinks', emoji: '🥤' },
  { id: 'bakery', label: 'Bakery', emoji: '🥐' },
];

const MOCK_VENDORS = [
  { id: '1', store_name: 'Burger Palace', category: 'food', rating: 4.8, rating_count: 312, delivery_time_min: 25, delivery_fee: 1.5, logo_url: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=80&h=80&fit=crop', cover_url: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=180&fit=crop', tags: ['Fast Food', 'Burgers'], is_open: true },
  { id: '2', store_name: 'Fresh Mart', category: 'groceries', rating: 4.6, rating_count: 218, delivery_time_min: 35, delivery_fee: 2.0, logo_url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=80&h=80&fit=crop', cover_url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=180&fit=crop', tags: ['Groceries', 'Fresh'], is_open: true },
  { id: '3', store_name: 'Sushi Garden', category: 'food', rating: 4.9, rating_count: 541, delivery_time_min: 40, delivery_fee: 2.5, logo_url: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=80&h=80&fit=crop', cover_url: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=180&fit=crop', tags: ['Japanese', 'Sushi'], is_open: true },
  { id: '4', store_name: 'Green Pharmacy', category: 'pharmacy', rating: 4.5, rating_count: 87, delivery_time_min: 20, delivery_fee: 1.0, logo_url: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=80&h=80&fit=crop', cover_url: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=180&fit=crop', tags: ['Pharmacy', 'Health'], is_open: false },
  { id: '5', store_name: 'Artisan Bakery', category: 'bakery', rating: 4.7, rating_count: 193, delivery_time_min: 30, delivery_fee: 1.5, logo_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=80&h=80&fit=crop', cover_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=180&fit=crop', tags: ['Bakery', 'Pastries'], is_open: true },
  { id: '6', store_name: 'Brew & Co.', category: 'drinks', rating: 4.6, rating_count: 154, delivery_time_min: 20, delivery_fee: 1.0, logo_url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=80&h=80&fit=crop', cover_url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=180&fit=crop', tags: ['Coffee', 'Tea', 'Boba'], is_open: true },
];

function VendorCard({ vendor, onClick }) {
  return (
    <div className="md3-card cursor-pointer" onClick={onClick}>
      <div className="relative">
        <img src={vendor.cover_url} alt={vendor.store_name} className="w-full h-36 object-cover" />
        {!vendor.is_open && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-xl">
            <span className="text-white font-semibold text-sm bg-black/60 px-3 py-1 rounded-full">Closed</span>
          </div>
        )}
        <div className="absolute bottom-3 left-3">
          <img src={vendor.logo_url} alt="" className="w-10 h-10 rounded-xl border-2 border-white shadow-md object-cover" />
        </div>
        {vendor.tags?.[0] && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-xs font-semibold px-2 py-1 rounded-lg text-slate-700">
            {vendor.tags[0]}
          </div>
        )}
      </div>
      <div className="p-3 pt-4">
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
                <Clock size={11} />
                {vendor.delivery_time_min} min
              </span>
            </div>
          </div>
          <span className="text-xs text-slate-500 mt-1">₦{vendor.delivery_fee} fee</span>
        </div>
      </div>
    </div>
  );
}

export default function CustomerHome() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [vendors, setVendors] = useState(MOCK_VENDORS);

  const filtered = activeCategory === 'all' ? vendors : vendors.filter(v => v.category === activeCategory);

  return (
    <RunnaShell>
      <DemoBar currentRole="Customer" />
      <div className="runna-screen bg-background">
        {/* Top App Bar */}
        <div className="sticky top-0 z-30 bg-white border-b border-border/40">
          <div className="flex items-center justify-between px-4 pt-4 pb-3">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-0.5">
                <MapPin size={12} color="#1E7CFF" />
                <span>Delivering to</span>
              </div>
              <h2 className="font-heading font-bold text-foreground text-base leading-tight">Lagos, Nigeria ▾</h2>
            </div>
            <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center relative">
              <Bell size={20} color="#1B2B45" />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white" />
            </button>
          </div>
          {/* Search bar */}
          <div className="px-4 pb-3">
            <button
              onClick={() => navigate('/customer/search')}
              className="w-full flex items-center gap-3 bg-muted rounded-2xl px-4 py-3 text-muted-foreground text-sm"
            >
              <Search size={16} />
              <span>Search restaurants, food…</span>
            </button>
          </div>
        </div>

        <div className="px-4 pt-4">
          {/* Hero Banner */}
          <div
            className="rounded-2xl p-4 mb-5 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #1B2B45 0%, #1E7CFF 100%)' }}
          >
            <div className="relative z-10">
              <div className="flex items-center gap-1.5 mb-1">
                <Zap size={14} color="#FCD34D" fill="#FCD34D" />
                <span className="text-yellow-300 text-xs font-semibold uppercase tracking-wider">Fast Delivery</span>
              </div>
              <h2 className="text-white font-heading font-bold text-lg leading-tight mb-2">Order food & run<br />errands in minutes</h2>
              <button
                onClick={() => navigate('/customer/search')}
                className="bg-white text-slate-800 text-xs font-semibold px-4 py-2 rounded-xl"
              >
                Explore Now
              </button>
            </div>
            <div className="absolute right-4 top-2 text-6xl opacity-20">🚀</div>
          </div>

          {/* Schedule Errand CTA */}
          <button
            onClick={() => navigate('/customer/errand')}
            className="w-full flex items-center justify-between bg-white rounded-2xl p-4 mb-5 border border-border/60 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: '#F0F7FF' }}>📦</div>
              <div className="text-left">
                <p className="font-semibold text-foreground text-sm">Schedule an Errand</p>
                <p className="text-muted-foreground text-xs">Shopping, queuing, pickup & more</p>
              </div>
            </div>
            <ChevronRight size={18} color="#94a3b8" />
          </button>

          {/* Categories */}
          <h3 className="font-heading font-bold text-foreground text-sm mb-3">Categories</h3>
          <div className="scroll-x flex gap-2 pb-1 mb-5">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`chip flex-shrink-0 ${activeCategory === cat.id ? 'selected' : ''}`}
              >
                <span>{cat.emoji}</span>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Vendors */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-heading font-bold text-foreground text-sm">
              {activeCategory === 'all' ? 'All Stores' : CATEGORIES.find(c => c.id === activeCategory)?.label}
            </h3>
            <span className="text-xs text-muted-foreground">{filtered.length} places</span>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🏪</div>
              <p className="font-semibold text-foreground mb-1">No stores found</p>
              <p className="text-muted-foreground text-sm">Try a different category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 pb-4">
              {filtered.map(vendor => (
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