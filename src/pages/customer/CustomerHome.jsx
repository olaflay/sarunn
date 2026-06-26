import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, MapPin, Settings2, ChevronRight } from 'lucide-react';
import RunnaShell from '@/components/RunnaShell';
import BottomNav from '@/components/BottomNav';
import ServiceGrid from '@/components/customer/ServiceGrid';
import CampusSelector from '@/components/customer/CampusSelector';
import DeliveryLocationPicker from '@/components/customer/DeliveryLocationPicker';
import PublicFooter from '@/components/PublicFooter';
import { CAMPUSES, getLocationLabel } from '@/lib/runnaData';
import { useCampus, useDeliveryLocation } from '@/lib/runnaStore';

export default function CustomerHome() {
  const navigate = useNavigate();
  const campusId = useCampus();
  const deliveryLoc = useDeliveryLocation();
  const [campusPickerOpen, setCampusPickerOpen] = useState(false);
  const [locPickerOpen, setLocPickerOpen] = useState(false);

  const campus = CAMPUSES.find((c) => c.id === campusId);
  const locLabel = campusId && deliveryLoc ? getLocationLabel(campusId, deliveryLoc.mainId, deliveryLoc.subId) : null;

  const handleService = (id) => {
    if (!campusId) {
      setCampusPickerOpen(true);
      return;
    }
    if (id === 'food') {
      navigate('/customer/food');
      return;
    }
    if (id === 'send' || id === 'receive') {
      navigate('/customer/errand');
    }
  };

  return (
    <RunnaShell>
      <div className="runna-screen bg-background">
        <header className="sticky top-0 z-30 border-b border-border/40 bg-white/95 backdrop-blur-sm">
          <div className="flex items-center justify-between px-4 pb-3 pt-4 lg:px-6">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl navy-gradient">
                <span className="font-heading text-sm font-extrabold text-white">R</span>
              </div>
              <div>
                <p className="font-heading text-lg font-extrabold leading-none text-slate-950">RUNNA</p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">Campus delivery, made easy</p>
              </div>
            </div>
            <button
              type="button"
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-muted transition hover:bg-muted/80"
              aria-label="Notifications"
            >
              <Bell size={20} color="#1B2B45" aria-hidden="true" />
              <div className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-white bg-red-500" />
            </button>
          </div>
        </header>

        <div className="px-4 py-5 lg:grid lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-6 lg:px-6 lg:py-6">
          <section className="space-y-6">
            <div>
              <p className="mb-2.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Step 1 · Select Campus</p>

              {campus ? (
                <div className="overflow-hidden rounded-[24px] border border-border/50 bg-card shadow-sm">
                  <div className="p-4">
                    <div className="mb-1 flex items-center justify-between">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Current Campus</p>
                      <button type="button" onClick={() => setCampusPickerOpen(true)} className="text-xs font-semibold text-primary">
                        Change
                      </button>
                    </div>
                    <p className="font-heading text-base font-bold leading-tight text-foreground">{campus.name}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{campus.institution} · Est. {campus.est_delivery}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setLocPickerOpen(true)}
                    className="flex w-full items-center gap-3 border-t border-border/30 px-4 py-3.5 text-left transition-colors hover:bg-muted/40"
                    style={{ background: locLabel ? '#F0F7FF' : '#FFFBEB' }}
                  >
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                      style={{ background: locLabel ? '#E3F2FD' : '#FEF3C7' }}
                    >
                      <MapPin size={15} color={locLabel ? '#1565C0' : '#D97706'} aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      {locLabel ? (
                        <>
                          <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">Deliver to</p>
                          <p className="truncate text-sm font-semibold text-foreground">
                            {locLabel}
                            {deliveryLoc?.note ? ` · ${deliveryLoc.note}` : ''}
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-sm font-semibold text-foreground">Set delivery location</p>
                          <p className="text-xs text-muted-foreground">Required for checkout</p>
                        </>
                      )}
                    </div>
                    <ChevronRight size={16} color="#94a3b8" className="shrink-0" aria-hidden="true" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setCampusPickerOpen(true)}
                  className="w-full rounded-[24px] border border-border/50 bg-card p-6 text-center shadow-sm transition-transform active:scale-[0.98]"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl navy-gradient">
                    <MapPin size={26} color="white" aria-hidden="true" />
                  </div>
                  <p className="mb-1 font-heading text-base font-bold text-foreground">Select your campus</p>
                  <p className="mb-5 text-xs text-muted-foreground">We'll show you vendors and services around you</p>
                  <div className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white">
                    <Settings2 size={14} aria-hidden="true" />
                    Choose Campus
                  </div>
                </button>
              )}
            </div>

            <div>
              <p className="mb-2.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Step 2 · Choose Service</p>
              <ServiceGrid onSelect={handleService} />
            </div>
          </section>

          <aside className="mt-6 space-y-4 lg:mt-0">
            <section className="rounded-[24px] border border-border/50 bg-card p-4 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Quick Start</p>
              <h2 className="mt-1 text-lg font-semibold text-foreground">One place for food and errands</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Pick your campus, choose a delivery location, and jump into food or errand requests without extra friction.
              </p>
            </section>

            <section className="rounded-[24px] border border-border/50 bg-card p-4 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Tips</p>
              <ul className="mt-3 space-y-3 text-sm text-muted-foreground">
                <li>Use the service grid for quick access on mobile.</li>
                <li>Desktop users get the sidebar and wider content area.</li>
                <li>Set your delivery note once to speed up checkout.</li>
              </ul>
            </section>
          </aside>
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
