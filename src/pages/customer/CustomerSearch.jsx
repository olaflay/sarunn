import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, X, Star, Clock } from 'lucide-react';
import RunnaShell from '@/components/RunnaShell';
import DemoBar from '@/components/DemoBar';
import BottomNav from '@/components/BottomNav';

const ALL_VENDORS = [
  { id: '1', store_name: 'Burger Palace', category: 'food', rating: 4.8, delivery_time_min: 25, logo_url: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=60&h=60&fit=crop', tags: ['Burgers', 'Fast Food'], is_open: true },
  { id: '2', store_name: 'Fresh Mart', category: 'groceries', rating: 4.6, delivery_time_min: 35, logo_url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=60&h=60&fit=crop', tags: ['Groceries', 'Fresh'], is_open: true },
  { id: '3', store_name: 'Sushi Garden', category: 'food', rating: 4.9, delivery_time_min: 40, logo_url: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=60&h=60&fit=crop', tags: ['Japanese', 'Sushi'], is_open: true },
  { id: '5', store_name: 'Artisan Bakery', category: 'bakery', rating: 4.7, delivery_time_min: 30, logo_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=60&h=60&fit=crop', tags: ['Bakery', 'Pastries'], is_open: true },
  { id: '6', store_name: 'Brew & Co.', category: 'drinks', rating: 4.6, delivery_time_min: 20, logo_url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=60&h=60&fit=crop', tags: ['Coffee', 'Boba'], is_open: true },
];

const POPULAR = ['Burgers', 'Sushi', 'Coffee', 'Groceries', 'Pizza', 'Shawarma', 'Jollof Rice'];

export default function CustomerSearch() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const results = query.length > 1
    ? ALL_VENDORS.filter(v =>
        v.store_name.toLowerCase().includes(query.toLowerCase()) ||
        v.tags?.some(t => t.toLowerCase().includes(query.toLowerCase())) ||
        v.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <RunnaShell>
      <DemoBar currentRole="Customer" />
      <div className="runna-screen bg-background">
        {/* Search Header */}
        <div className="bg-white border-b border-border/40 px-4 py-4 sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
              <ArrowLeft size={18} />
            </button>
            <div className="flex-1 flex items-center gap-2 bg-muted rounded-2xl px-4 py-2.5">
              <Search size={16} color="#94a3b8" />
              <input
                autoFocus
                className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder-muted-foreground"
                placeholder="Search stores, food, categories…"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              {query && <button onClick={() => setQuery('')}><X size={16} color="#94a3b8" /></button>}
            </div>
          </div>
        </div>

        <div className="px-4 pt-5">
          {query.length < 2 ? (
            <>
              <h3 className="font-semibold text-foreground text-sm mb-3">Popular Searches</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {POPULAR.map(p => (
                  <button key={p} onClick={() => setQuery(p)} className="chip">
                    {p}
                  </button>
                ))}
              </div>
              <h3 className="font-semibold text-foreground text-sm mb-3">All Stores</h3>
              <div className="space-y-2">
                {ALL_VENDORS.map(vendor => (
                  <button
                    key={vendor.id}
                    onClick={() => navigate(`/customer/vendor/${vendor.id}`)}
                    className="w-full flex items-center gap-3 bg-white rounded-2xl p-3 shadow-sm border border-border/40 text-left"
                  >
                    <img src={vendor.logo_url} alt="" className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground text-sm">{vendor.store_name}</p>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Star size={10} fill="#F59E0B" color="#F59E0B" />{vendor.rating}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock size={10} />{vendor.delivery_time_min} min
                        </span>
                        <span className="capitalize text-xs text-muted-foreground">{vendor.category}</span>
                      </div>
                    </div>
                    {!vendor.is_open && <span className="text-xs bg-red-50 text-red-500 px-2 py-0.5 rounded-lg font-medium">Closed</span>}
                  </button>
                ))}
              </div>
            </>
          ) : results.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="font-heading font-bold text-foreground text-lg mb-1">No results for "{query}"</h3>
              <p className="text-muted-foreground text-sm">Try searching for a different store or category</p>
            </div>
          ) : (
            <>
              <p className="text-muted-foreground text-xs mb-3">{results.length} result{results.length !== 1 ? 's' : ''}</p>
              <div className="space-y-2">
                {results.map(vendor => (
                  <button
                    key={vendor.id}
                    onClick={() => navigate(`/customer/vendor/${vendor.id}`)}
                    className="w-full flex items-center gap-3 bg-white rounded-2xl p-3 shadow-sm border border-border/40 text-left"
                  >
                    <img src={vendor.logo_url} alt="" className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground text-sm">{vendor.store_name}</p>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Star size={10} fill="#F59E0B" color="#F59E0B" />{vendor.rating}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock size={10} />{vendor.delivery_time_min} min
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <BottomNav role="customer" />
    </RunnaShell>
  );
}