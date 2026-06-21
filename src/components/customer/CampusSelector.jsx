import React from 'react';
import { MapPin, Check, X, ChevronDown } from 'lucide-react';
import { CAMPUSES, campusVendorCount } from '@/lib/runnaData';
import { setCampus } from '@/lib/runnaStore';

export default function CampusSelector({ open, onClose, selectedId }) {
  if (!open) return null;
  return (
    <div className="absolute inset-0 z-[60] flex flex-col justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 animate-fade-in" />
      <div className="relative bg-white rounded-t-3xl p-5 pb-8 animate-slide-up" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-bold text-foreground text-base">Select your campus</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            <X size={16} />
          </button>
        </div>
        <div className="space-y-2.5">
          {CAMPUSES.map(c => {
            const selected = c.id === selectedId;
            return (
              <button
                key={c.id}
                onClick={() => { setCampus(c.id); onClose(); }}
                className="w-full flex items-center gap-3 p-3.5 rounded-2xl border-2 text-left transition-all"
                style={{ borderColor: selected ? '#1B2B45' : 'hsl(var(--border))', background: selected ? '#F0F2F7' : 'white' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#1B2B45' }}>
                  <MapPin size={18} color="white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm">{c.name}</p>
                  <p className="text-muted-foreground text-xs">{campusVendorCount(c.id)} vendors · {c.est_delivery} · {c.institution}</p>
                </div>
                {selected && <Check size={18} color="#1B2B45" className="flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function CampusButton({ campus, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all"
      style={{ borderColor: campus ? '#1B2B45' : 'hsl(var(--border))', background: campus ? '#F0F2F7' : 'white' }}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#1B2B45' }}>
        <MapPin size={18} color="white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground font-medium">Delivering to</p>
        <p className="font-semibold text-foreground text-sm">{campus ? campus.name : 'Select your campus'}</p>
        {campus && <p className="text-xs text-muted-foreground">{campus.est_delivery}</p>}
      </div>
      <ChevronDown size={16} color="#94a3b8" className="flex-shrink-0" />
    </button>
  );
}