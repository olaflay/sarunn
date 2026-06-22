import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, MapPin, Settings2, ChevronRight, CheckCircle } from 'lucide-react';
import RunnaShell from '@/components/RunnaShell';
import DemoBar from '@/components/DemoBar';
import BottomNav from '@/components/BottomNav';
import ServiceGrid from '@/components/customer/ServiceGrid';
import CampusSelector from '@/components/customer/CampusSelector';
import DeliveryLocationPicker from '@/components/customer/DeliveryLocationPicker';
import PublicFooter from '@/components/PublicFooter';
import { CAMPUSES, getLocationLabel } from '@/lib/runnaData';
import { useCampus, useDeliveryLocation } from '@/lib/runnaStore';

/**
 * GATEWAY PAGE — the central hub.
 * Contains ONLY: Logo, Campus Selector, Service Grid.
 * No food content, no vendors — those live in dedicated pages.
 */
export default function CustomerHome() {
  const navigate = useNavigate();
  const campusId = useCampus();
  const deliveryLoc = useDeliveryLocation();
  const [campusPickerOpen, setCampusPickerOpen] = useState(false);
  const [locPickerOpen, setLocPickerOpen] = useState(false);

  const campus = CAMPUSES.find(c => c.id === campusId);
  const locLabel = campusId && deliveryLoc ? getLocationLabel(campusId, deliveryLoc.mainId, deliveryLoc.subId) : null;

  const handleService = (id) => {
    if (!campusId) { setCampusPickerOpen(true); return; }
    if (id === 'food') { navigate('/customer/food'); return; }
    if (id === 'send' || id === 'receive') { navigate('/customer/errand'); return; }
  };

  return (
    <RunnaShell>
      <DemoBar currentRole="Customer" />
      <div className="runna-screen bg-background">

        {/* ── Top bar with logo ── */}
        <div className="sticky top-0 z-30 bg-white border-b border-border/40">
          <div className="flex items-center justify-between px-4 pt-4 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center navy-gradient">
                <span className="text-white font-heading font-extrabold text-sm">R</span>
              </div>
              <div>
                <p className="font-heading font-extrabold text-lg leading-none" style={{ color: '#1B2B45' }}>RUNNA</p>
                <p className="text-muted-foreground text-[10px] mt-0.5">Campus delivery, made easy</p>
              </div>
            </div>
            <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center relative">
              <Bell size={20} color="#1B2B45" />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white" />
            </button>
          </div>
        </div>

        <div className="px-4 pt-5 space-y-6">

          {/* ── STEP 1: Campus Selection ── */}
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2.5">Step 1 · Select Campus</p>

            {campus ? (
              /* Active campus card */
              <div className="bg-white rounded-2xl border border-border/50 shadow-sm p-4 m3-motion-standard">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#E8F5E9' }}>
                    <CheckCircle size={20} color="#2E7D32" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground font-medium">Current Campus</p>
                    <p className="font-semibold text-foreground text-sm leading-tight">{campus.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">You can switch your campus location anytime</p>
                  </div>
                </div>

                {/* Delivery location row */}
                <button
                  onClick={() => setLocPickerOpen(true)}
                  className="w-full flex items-center gap-2.5 p-3 rounded-xl mb-3 text-left"
                  style={{ background: locLabel ? '#F0F7FF' : '#FFFBEB' }}
                >
                  <MapPin size={14} color={locLabel ? '#1565C0' : '#F59E0B'} className="flex-shrink-0" />
                  <p className="text-xs flex-1 truncate" style={{ color: locLabel ? '#1565C0' : '#92400E' }}>
                    {locLabel
                      ? <>Deliver to: <span className="font-semibold">{locLabel}</span>{deliveryLoc?.note ? ` · ${deliveryLoc.note}` : ''}</>
                      : 'Set your delivery location'}
                  </p>
                  <ChevronRight size={12} color="#94a3b8" />
                </button>

                <button
                  onClick={() => setCampusPickerOpen(true)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border/60 text-sm font-semibold text-foreground m3-motion-standard active:scale-98"
                >
                  <Settings2 size={14} /> Change Campus Location
                </button>
              </div>
            ) : (
              /* Empty campus card */
              <button
                onClick={() => setCampusPickerOpen(true)}
                className="w-full flex flex-col items-center py-7 rounded-2xl border-2 border-dashed border-border bg-white text-center m3-motion-standard active:scale-98"
              >
                <div className="w-14 h-14 rounded-2xl navy-gradient mx-auto flex items-center justify-center mb-3">
                  <MapPin size={26} color="white" />
                </div>
                <p className="font-semibold text-foreground text-sm mb-1">Select your campus</p>
                <p className="text-muted-foreground text-xs mb-4">We'll show you vendors and services around you</p>
                <div className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white" style={{ background: '#1B2B45' }}>
                  <Settings2 size={14} /> Choose Campus
                </div>
              </button>
            )}
          </div>

          {/* ── STEP 2: Service Selection ── */}
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2.5">Step 2 · Choose Service</p>
            <ServiceGrid onSelect={handleService} />
          </div>

        </div>
      </div>

      <CampusSelector open={campusPickerOpen} onClose={() => setCampusPickerOpen(false)} selectedId={campusId} />
      <DeliveryLocationPicker
        campusId={campusId}
        open={locPickerOpen}
        onClose={() => setLocPickerOpen(false)}
        onSave={() => {}}
      />
      <PublicFooter />
      <BottomNav role="customer" />
    </RunnaShell>
  );
}