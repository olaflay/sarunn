import React, { useState } from 'react';
import { Store, MapPin, Phone, Clock, ToggleRight, ToggleLeft, Star, ChevronDown } from 'lucide-react';
import RunnaShell from '@/components/RunnaShell';
import BottomNav from '@/components/BottomNav';
import Snackbar from '@/components/Snackbar';
import { CAMPUSES, LOCATIONS } from '@/lib/runnaData';

const HOURS = Array.from({ length: 24 }, (_, i) => {
  const h = i % 12 === 0 ? 12 : i % 12;
  const ampm = i < 12 ? 'AM' : 'PM';
  return { value: i, label: `${h}:00 ${ampm}` };
});

export default function VendorProfile() {
  const [isOpen, setIsOpen] = useState(true);
  const [campus, setCampus] = useState('lasu-epe');
  const [mainLocation, setMainLocation] = useState('school-campus');
  const [openHour, setOpenHour] = useState(7);
  const [closeHour, setCloseHour] = useState(21);
  const [hoursError, setHoursError] = useState('');
  const [snack, setSnack] = useState('');

  const toggleStore = () => {
    const next = !isOpen;
    setIsOpen(next);
    setSnack(next ? '🟢 Store is now Open' : '🔴 Store is now Closed');
  };

  const handleSaveHours = () => {
    if (closeHour <= openHour) {
      setHoursError('Closing time must be after opening time');
      return;
    }
    setHoursError('');
    setSnack('Operating hours saved');
  };

  const handleSaveLocation = () => {
    setSnack('Campus area saved');
  };

  const locs = LOCATIONS[campus] || [];

  return (
    <RunnaShell>
      <div className="sarunn-screen bg-background">
        {/* Header */}
        <div className="navy-gradient px-4 pt-6 pb-16 text-center">
          <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-3 border-4 border-white/30 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=80&h=80&fit=crop" alt="" className="w-full h-full object-cover" />
          </div>
          <h2 className="font-heading font-bold text-white text-xl">Burger Palace</h2>
          <div className="flex items-center justify-center gap-1.5 mt-1">
            <Star size={14} fill="#FCD34D" color="#FCD34D" />
            <span className="text-white/80 text-sm">4.8 · 312 reviews</span>
          </div>
          <div className="mt-3">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${isOpen ? 'bg-green-400/20 text-green-300' : 'bg-red-400/20 text-red-300'}`}>
              {isOpen ? '● Open' : '● Closed'}
            </span>
          </div>
        </div>

        <div className="mx-4 -mt-8 space-y-4 pb-6">
          {/* Store Status Toggle */}
          <div className="bg-white rounded-2xl p-4 shadow-md border border-border/40 flex items-center justify-between">
            <div>
              <p className="font-semibold text-foreground text-sm">Store Status</p>
              <p className="text-muted-foreground text-xs">{isOpen ? 'Accepting orders now' : 'Not accepting orders'}</p>
            </div>
            <button onClick={toggleStore}>
              {isOpen ? <ToggleRight size={36} color="#2E7D32" /> : <ToggleLeft size={36} color="#94a3b8" />}
            </button>
          </div>

          {/* Campus Area */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-border/40">
            <h3 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
              <MapPin size={15} color="#1B2B45" /> Campus Area
            </h3>
            <div className="space-y-2">
              <div>
                <label className="text-xs text-muted-foreground font-medium block mb-1.5">Campus</label>
                <div className="relative">
                  <select
                    value={campus}
                    onChange={e => { setCampus(e.target.value); setMainLocation(''); }}
                    className="md3-input text-sm appearance-none pr-10"
                  >
                    {CAMPUSES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground font-medium block mb-1.5">Zone / Main Location</label>
                <div className="relative">
                  <select
                    value={mainLocation}
                    onChange={e => setMainLocation(e.target.value)}
                    className="md3-input text-sm appearance-none pr-10"
                  >
                    <option value="">Select zone</option>
                    {locs.map(l => <option key={l.id} value={l.id}>{l.label}</option>)}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>
            <button
              onClick={handleSaveLocation}
              className="w-full mt-3 py-3 rounded-xl text-sm font-semibold text-white"
              style={{ background: '#1B2B45' }}
            >
              Save Campus Area
            </button>
          </div>

          {/* Operating Hours */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-border/40">
            <h3 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
              <Clock size={15} color="#1B2B45" /> Operating Hours
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground font-medium block mb-1.5">Opening Time</label>
                <div className="relative">
                  <select
                    value={openHour}
                    onChange={e => { setOpenHour(Number(e.target.value)); setHoursError(''); }}
                    className="md3-input text-sm appearance-none pr-8"
                  >
                    {HOURS.map(h => <option key={h.value} value={h.value}>{h.label}</option>)}
                  </select>
                  <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground font-medium block mb-1.5">Closing Time</label>
                <div className="relative">
                  <select
                    value={closeHour}
                    onChange={e => { setCloseHour(Number(e.target.value)); setHoursError(''); }}
                    className="md3-input text-sm appearance-none pr-8"
                  >
                    {HOURS.map(h => <option key={h.value} value={h.value}>{h.label}</option>)}
                  </select>
                  <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>
            {hoursError && (
              <div className="mt-2 flex items-center gap-2 text-xs text-red-600 bg-red-50 rounded-xl p-3">
                <span>⚠ {hoursError}</span>
              </div>
            )}
            <button
              onClick={handleSaveHours}
              className="w-full mt-3 py-3 rounded-xl text-sm font-semibold text-white"
              style={{ background: '#1B2B45' }}
            >
              Save Hours
            </button>
          </div>

          {/* Store Info */}
          <div className="bg-white rounded-2xl shadow-sm border border-border/40 overflow-hidden">
            <div className="px-4 py-3 border-b border-border/40">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Store Information</p>
            </div>
            {[
              { icon: Phone, label: 'Phone', value: '+234 802 345 6789' },
              { icon: Store, label: 'Category', value: 'Food & Burgers' },
            ].map((info, idx, arr) => {
              const Icon = info.icon;
              return (
                <div key={info.label} className={`flex items-center gap-3 px-4 py-3.5 ${idx < arr.length - 1 ? 'border-b border-border/40' : ''}`}>
                  <Icon size={16} color="#1E7CFF" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">{info.label}</p>
                    <p className="text-sm font-medium text-foreground">{info.value}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bank Details */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-border/40 flex items-center justify-between">
            <div>
              <p className="font-semibold text-foreground text-sm">Bank Account</p>
              <p className="text-muted-foreground text-xs">GTBank · •••• 7821</p>
            </div>
            <button className="text-xs font-semibold px-3 py-1.5 rounded-xl" style={{ color: '#1E7CFF', background: '#F0F7FF' }}>Edit</button>
          </div>
        </div>
      </div>
      <BottomNav role="vendor" />
      <Snackbar message={snack} onClose={() => setSnack('')} />
    </RunnaShell>
  );
}
