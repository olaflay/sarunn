import React from 'react';
import { UtensilsCrossed, Package, Shirt, Printer } from 'lucide-react';
import { SERVICES } from '@/lib/runnaData';

const ICONS = {
  food: UtensilsCrossed,
  send: Package,
  laundry: Shirt,
  print: Printer,
};

export default function ServiceGrid({ onSelect }) {
  return (
    <div className="grid grid-cols-4 gap-2.5">
      {SERVICES.map(s => {
        const Icon = ICONS[s.id];
        return (
          <button
            key={s.id}
            disabled={!s.active}
            onClick={() => s.active && onSelect(s.id)}
            className="flex flex-col items-center gap-2 py-3 px-1 rounded-2xl border transition-all relative"
            style={{
              background: s.active ? 'white' : '#F1F3F6',
              borderColor: 'hsl(var(--border))',
              opacity: s.active ? 1 : 0.65,
              cursor: s.active ? 'pointer' : 'not-allowed',
            }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ background: s.active ? '#F0F2F7' : '#E5E7EB' }}
            >
              <Icon size={20} color={s.active ? '#1B2B45' : '#9CA3AF'} />
            </div>
            <span
              className="text-[11px] font-semibold leading-tight text-center"
              style={{ color: s.active ? '#1B2B45' : '#9CA3AF' }}
            >
              {s.label}
            </span>
            {!s.active && (
              <span
                className="absolute top-1.5 right-1.5 text-[8px] font-bold px-1.5 py-0.5 rounded-full"
                style={{ background: '#FEF3C7', color: '#B45309' }}
              >
                SOON
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}