import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Star, Clock, ChevronRight, MapPin, Settings2 } from 'lucide-react';
import RunnaShell from '@/components/RunnaShell';
import DemoBar from '@/components/DemoBar';
import BottomNav from '@/components/BottomNav';
import ServiceGrid from '@/components/customer/ServiceGrid';
import CampusSelector, { CampusButton } from '@/components/customer/CampusSelector';
import DeliveryLocationPicker from '@/components/customer/DeliveryLocationPicker';
import { CAMPUSES, vendorsByCampus, getLocationLabel } from '@/lib/runnaData';
import { useCampus, useDeliveryLocation } from '@/lib/runnaStore';

// Popular meal combo cards (horizontal scroll)
function PopularCard({ item, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 w-36 rounded-2xl overflow-hidden bg-white border border-border/50 shadow-sm text-left active:scale-95 transition-transform"
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
    <div className="md3-card cursor-pointer" onClick={onClick}>
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

// Static popular combos using vendor menu data
const POPULAR = [
  { id: 'p1', name: 'Jollof Rice & Chicken', price: 2500, image_url: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=200&h=200&fit=crop', vendorId: '1' },
  { id: 'p2', name: 'Beef Burger', price: 3200, image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop', vendorId: '2' },
  { id: 'p3', name: 'Pounded Yam & Egusi', price: 2800, image_url: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=200&h=200&fit=crop', vendorId: '4' },
  { id: 'p4', name: 'Mixed Small Chops', price: 2000, image_url: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=200&h=200&fit=crop', vendorId: '5' },
  { id: 'p5', name: 'Beef Suya', price: 2000, image_url: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=200&h=200&fit=crop', vendorId: '6' },
];

export default function CustomerHome() {
  const navigate = useNavigate();
  const campusId = useCampus();
  const deliveryLoc = useDeliveryLocation();
  const [campusPickerOpen, setCampusPickerOpen] = useState(false);
  const [locPickerOpen, setLocPickerOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null); // null | 'food'
  const foodRef = useRef(null);

  const campus = CAMPUSES.find(c => c.id === campusId);
  const vendors = campusId ? vendorsByCampus(campusId) : [];
  const locLabel = campusId && deliveryLoc ? getLocationLabel(campusId, deliveryLoc.mainId, deliveryLoc.subId) : null;

  const handleService = (id) => {
    if (id === 'send') { navigate('/customer/errand'); return; }
    if (!campusId) { setCampusPickerOpen(true); return; }
    if (id === 'food') {
      setSelectedService('food');
      setTimeout(() => foodRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  };

  return (
    <RunnaShell>
      <DemoBar currentRole="Customer" />
      <div className="runna-screen bg-background">

        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-white border-b border-border/40">
          <div className="flex items-center justify-between px-4 pt-4 pb-3">
            <div>
              <p className="font-heading font-extrabold text-xl leading-none" style={{ color: '#1B2B45' }}>RUNNA</p>
              <p className="text-muted-foreground text-xs mt-0.5">Campus delivery, made easy</p>
            </div>
            <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center relative">
              <Bell size={20} color="#1B2B45" />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white" />
            </button>
          </div>
        </div>

        <div className="px-4 pt-4 space-y-5">

          {/* ── STEP 1: Campus Selection ── */}
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Step 1 · Select Campus</p>
            <div className="bg-white rounded-2xl border border-border/50 shadow-sm p-4">
              {campus ? (
                <>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#E8F5E9' }}>
                      <MapPin size={16} color="#2E7D32" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground font-medium">Current Campus</p>
                      <p className="font-semibold text-foreground text-sm leading-tight">{campus.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">You can switch your campus location anytime</p>
                    </div>
                  </div>
                  {/* Delivery location row */}
                  <div
                    className="flex items-center gap-2 p-2.5 rounded-xl cursor-pointer mb-3"
                    style={{ background: '#F7F8FA' }}
                    onClick={() => setLocPickerOpen(true)}
                  >
                    <MapPin size={13} color={locLabel ? '#2E7D32' : '#F59E0B'} />
                    <p className="text-xs flex-1 truncate" style={{ color: locLabel ? '#1B2B45' : '#92400E' }}>
                      {locLabel
                        ? <>Deliver to: <span className="font-semibold">{locLabel}</span>{deliveryLoc?.note ? ` · ${deliveryLoc.note}` : ''}</>
                        : 'Tap to set your delivery location'}
                    </p>
                    <ChevronRight size={12} color="#94a3b8" />
                  </div>
                  <button
                    onClick={() => setCampusPickerOpen(true)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border/60 text-sm font-semibold text-foreground"
                  >
                    <Settings2 size={14} /> Change Campus Location
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setCampusPickerOpen(true)}
                  className="w-full flex flex-col items-center py-6 text-center"
                >
                  <div className="w-12 h-12 rounded-2xl bg-muted mx-auto flex items-center justify-center mb-3">
                    <MapPin size={22} color="#1B2B45" />
                  </div>
                  <p className="font-semibold text-foreground text-sm mb-1">Select your campus</p>
                  <p className="text-muted-foreground text-xs">We'll show you vendors and services around you</p>
                  <div
                    className="mt-4 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
                    style={{ background: '#1B2B45' }}
                  >
                    <Settings2 size={14} /> Choose Campus Location
                  </div>
                </button>
              )}
            </div>
          </div>

          {/* ── STEP 2: Service Selection ── */}
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Step 2 · Choose Service</p>
            <ServiceGrid onSelect={handleService} />
          </div>

          {/* ── FOOD SECTION (shown after selecting food or if already was food) ── */}
          {(selectedService === 'food' || campusId) && (
            <div ref={foodRef}>
              {/* Popular meals - horizontal scroll */}
              {campusId && vendors.length > 0 && (
                <div className="mb-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-heading font-bold text-foreground text-sm">🔥 Popular Combos</h3>
                  </div>
                  <div className="flex gap-3 scroll-x pb-1">
                    {POPULAR.filter(p => {
                      const campusVendors = vendors.map(v => v.id);
                      return campusVendors.includes(p.vendorId);
                    }).map(item => (
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
                <h3 className="font-heading font-bold text-foreground text-sm">
                  {campus ? `🍽️ All Restaurants` : 'Food Vendors'}
                </h3>
                {campus && <span className="text-xs text-muted-foreground">{vendors.length} places</span>}
              </div>

              {!campusId ? (
                <button
                  onClick={() => setCampusPickerOpen(true)}
                  className="w-full text-center py-12 rounded-2xl border-2 border-dashed border-border"
                >
                  <p className="font-semibold text-foreground text-sm mb-1">Select your campus first</p>
                  <p className="text-muted-foreground text-xs">We'll show vendors around you</p>
                </button>
              ) : vendors.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-4xl mb-3">🏪</div>
                  <p className="font-semibold text-foreground text-sm mb-1">No vendors yet</p>
                  <p className="text-muted-foreground text-xs">Vendors are coming soon to this campus</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3 pb-4">
                  {vendors.map(vendor => (
                    <VendorCard
                      key={vendor.id}
                      vendor={vendor}
                      onClick={() => vendor.is_open && navigate(`/customer/vendor/${vendor.id}`)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      <CampusSelector open={campusPickerOpen} onClose={() => setCampusPickerOpen(false)} selectedId={campusId} />
      <DeliveryLocationPicker
        campusId={campusId}
        open={locPickerOpen}
        onClose={() => setLocPickerOpen(false)}
        onSave={() => {}}
      />
      <BottomNav role="customer" />
    </RunnaShell>
  );
}