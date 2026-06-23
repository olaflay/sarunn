import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, MapPin, Settings2, ChevronRight } from 'lucide-react';
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
              <div className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden">
                {/* Campus info */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Current Campus</p>
                    <button onClick={() => setCampusPickerOpen(true)} className="text-xs font-semibold" style={{ color: '#1E7CFF' }}>
                      Change
                    </button>
                  </div>
                  <p className="font-heading font-bold text-foreground text-base leading-tight">{campus.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{campus.institution} · Est. {campus.est_delivery}</p>
                </div>

                {/* Delivery location */}
                <button
                  onClick={() => setLocPickerOpen(true)}
                  className="w-full flex items-center gap-3 px-4 py-3.5 border-t border-border/30 text-left m3-motion-standard"
                  style={{ background: locLabel ? '#F0F7FF' : '#FFFBEB' }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: locLabel ? '#E3F2FD' : '#FEF3C7' }}>
                    <MapPin size={15} color={locLabel ? '#1565C0' : '#D97706'} />
                  </div>
                  <div className="flex-1 min-w-0">
                    {locLabel ? (
                      <>
                        <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Deliver to</p>
                        <p className="text-sm font-semibold text-foreground truncate">{locLabel}{deliveryLoc?.note ? ` · ${deliveryLoc.note}` : ''}</p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm font-semibold text-foreground">Set delivery location</p>
                        <p className="text-xs text-muted-foreground">Required for checkout</p>
                      </>
                    )}
                  </div>
                  <ChevronRight size={16} color="#94a3b8" className="flex-shrink-0" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setCampusPickerOpen(true)}
                className="w-full bg-white rounded-2xl border border-border/50 shadow-sm p-6 text-center m3-motion-standard active:scale-98"
              >
                <div className="w-14 h-14 rounded-2xl navy-gradient mx-auto flex items-center justify-center mb-4">
                  <MapPin size={26} color="white" />
                </div>
                <p className="font-heading font-bold text-foreground text-base mb-1">Select your campus</p>
                <p className="text-muted-foreground text-xs mb-5">We'll show you vendors and services around you</p>
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white" style={{ background: '#1B2B45' }}>
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