import React, { useState } from 'react';
import { User, Star, MapPin, Phone, Bike, ToggleRight, ToggleLeft, ChevronRight, HelpCircle, LogOut, Shield } from 'lucide-react';
import RunnaShell from '@/components/RunnaShell';
import BottomNav from '@/components/BottomNav';
import Snackbar from '@/components/Snackbar';

export default function RunnerProfile() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [snack, setSnack] = useState('');

  return (
    <RunnaShell>
      <div className="runna-screen bg-background">
        <div className="navy-gradient px-4 pt-6 pb-16 text-center">
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3 border-4 border-white/30">
            <User size={36} color="white" />
          </div>
          <h2 className="font-heading font-bold text-white text-xl">Chidi Obi</h2>
          <div className="flex items-center justify-center gap-1.5 mt-1">
            <Star size={14} fill="#FCD34D" color="#FCD34D" />
            <span className="text-white/80 text-sm">4.9 Runner Rating · 247 deliveries</span>
          </div>
          <div className="mt-2">
            <span className="text-xs bg-green-400/20 text-green-300 px-3 py-1 rounded-full font-semibold">✓ Verified Runner</span>
          </div>
        </div>

        <div className="mx-4 -mt-8">
          {/* Availability toggle */}
          <div className="bg-white rounded-2xl p-4 shadow-md border border-border/40 flex items-center justify-between mb-4">
            <div>
              <p className="font-semibold text-foreground text-sm">Availability</p>
              <p className="text-muted-foreground text-xs">{isAvailable ? 'Accepting new jobs' : 'Not accepting jobs'}</p>
            </div>
            <button onClick={() => { setIsAvailable(!isAvailable); setSnack(isAvailable ? 'You are now Offline' : '🟢 You are now Online!'); }}>
              {isAvailable ? <ToggleRight size={36} color="#2E7D32" /> : <ToggleLeft size={36} color="#94a3b8" />}
            </button>
          </div>

          {/* Info */}
          <div className="bg-white rounded-2xl shadow-sm border border-border/40 overflow-hidden mb-4">
            {[
              { icon: Phone, label: 'Phone', value: '+234 803 456 7890' },
              { icon: Bike, label: 'Vehicle', value: 'Motorbike · Lagos SM12ABC' },
              { icon: MapPin, label: 'Zone', value: 'Lagos Island & Mainland' },
              { icon: Shield, label: 'Background Check', value: 'Cleared ✓' },
            ].map((item, idx, arr) => {
              const Icon = item.icon;
              return (
                <button key={item.label} className={`w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-muted/50 ${idx < arr.length - 1 ? 'border-b border-border/40' : ''}`}>
                  <Icon size={16} color="#1E7CFF" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-medium text-foreground">{item.value}</p>
                  </div>
                  <ChevronRight size={14} color="#94a3b8" />
                </button>
              );
            })}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-border/40 overflow-hidden mb-4">
            <button className="w-full flex items-center gap-3 px-4 py-4 text-left border-b border-border/40 hover:bg-muted/50">
              <HelpCircle size={16} color="#1E7CFF" />
              <span className="font-semibold text-foreground text-sm">Help & Support</span>
              <ChevronRight size={14} color="#94a3b8" className="ml-auto" />
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-4 text-left hover:bg-muted/50">
              <LogOut size={16} color="#B3261E" />
              <span className="font-semibold text-red-600 text-sm">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
      <BottomNav role="runner" />
      <Snackbar message={snack} onClose={() => setSnack('')} />
    </RunnaShell>
  );
}
