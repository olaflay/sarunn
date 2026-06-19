import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Star, Clock, MapPin } from 'lucide-react';
import RunnaShell from '@/components/RunnaShell';
import DemoBar from '@/components/DemoBar';
import BottomNav from '@/components/BottomNav';
import ServiceGrid from '@/components/customer/ServiceGrid';
import CampusSelector, { CampusButton } from '@/components/customer/CampusSelector';
import { CAMPUSES, vendorsByCampus } from '@/lib/runnaData';
import { useCampus } from '@/lib/runnaStore';

function VendorCard({ vendor, onClick }) {
  return (
    <div className="md3-card cursor-pointer" onClick={onClick}>
      <div className="relative">
        <img src={vendor.cover_url} alt={vendor.store_name} className="w-full h-36 object-cover" />
        {!vendor.is_open &&
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-xl">
            <span className="text-white font-semibold text-sm bg-black/60 px-3 py-1 rounded-full">Closed</span>
          </div>
        }
        <div className="absolute bottom-3 left-3">
          <img src={vendor.logo_url} alt="" className="w-10 h-10 rounded-xl border-2 border-white shadow-md object-cover" />
        </div>
        {vendor.tags?.[0] &&
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-xs font-semibold px-2 py-1 rounded-lg text-slate-700">
            {vendor.tags[0]}
          </div>
        }
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
    </div>);

}

export default function CustomerHome() {
  const navigate = useNavigate();
  const campusId = useCampus();
  const [pickerOpen, setPickerOpen] = useState(false);
  const foodRef = useRef(null);

  const campus = CAMPUSES.find((c) => c.id === campusId);
  const vendors = campusId ? vendorsByCampus(campusId) : [];

  const handleService = (id) => {
    if (id === 'send') {navigate('/customer/errand');return;}
    if (id === 'food') {
      if (!campusId) {setPickerOpen(true);return;}
      foodRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <RunnaShell>
      <DemoBar currentRole="Customer" />
      <div className="runna-screen bg-background">
        {/* Top App Bar */}
        <div className="sticky top-0 z-30 bg-white border-b border-border/40">
          <div className="flex items-center justify-between px-4 pt-4 pb-3">
            <div>
              <p className="font-heading font-extrabold text-lg leading-none" style={{ color: '#1B2B45' }}>RUNNA</p>
              <p className="text-muted-foreground text-xs mt-0.5">Campus delivery, made easy</p>
            </div>
            <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center relative text-xs">
              <Bell size={20} color="#1B2B45" />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white" />
            </button>
          </div>
        </div>

        <div className="px-4 pt-4">
          {/* Big campus selector */}
          <CampusButton campus={campus} onClick={() => setPickerOpen(true)} />

          {/* Service grid */}
          <div className="mt-5">
            <h3 className="font-heading font-bold text-foreground text-sm mb-3 hidden">What do you need?</h3>
            <ServiceGrid onSelect={handleService} />
          </div>

          {/* Food feed */}
          <div ref={foodRef} className="flex items-center justify-between mt-6 mb-3">
            <h3 className="font-heading font-bold text-foreground text-sm">
              {campus ? `Food near ${campus.name}` : 'Food vendors'}
            </h3>
            {campus && <span className="text-xs text-muted-foreground">{vendors.length} places</span>}
          </div>

          {!campusId ?
          <button
            onClick={() => setPickerOpen(true)}
            className="w-full text-center py-14 rounded-2xl border-2 border-dashed border-border">
            
              <div className="w-12 h-12 rounded-2xl bg-muted mx-auto flex items-center justify-center mb-3">
                <MapPin size={22} color="#1B2B45" />
              </div>
              <p className="font-semibold text-foreground text-sm mb-1">Select your campus first</p>
              <p className="text-muted-foreground text-xs">We'll show vendors around you</p>
            </button> :
          vendors.length === 0 ?
          <div className="text-center py-14">
              <div className="text-4xl mb-3">🏪</div>
              <p className="font-semibold text-foreground text-sm mb-1">No vendors yet</p>
              <p className="text-muted-foreground text-xs">Vendors are coming soon to this campus</p>
            </div> :

          <div className="grid grid-cols-1 gap-3 pb-4">
              {vendors.map((vendor) =>
            <VendorCard
              key={vendor.id}
              vendor={vendor}
              onClick={() => vendor.is_open && navigate(`/customer/vendor/${vendor.id}`)} />

            )}
            </div>
          }
        </div>
      </div>

      <CampusSelector open={pickerOpen} onClose={() => setPickerOpen(false)} selectedId={campusId} />
      <BottomNav role="customer" />
    </RunnaShell>);

}