import React from 'react';
import { UtensilsCrossed, Package, Shirt, Printer, ShoppingBag } from 'lucide-react';
import { SERVICES } from '@/lib/runnaData';

const ICONS = {
  food: UtensilsCrossed,
  send: Package,
  laundry: Shirt,
  print: Printer,
  market: ShoppingBag,
};

const ICON_BG = {
  food: { bg: '#FFF3E0', color: '#E65100' },
  send: { bg: '#E3F2FD', color: '#1565C0' },
  laundry: { bg: '#F3E5F5', color: '#7B1FA2' },
  print: { bg: '#E8F5E9', color: '#2E7D32' },
  market: { bg: '#FFF8E1', color: '#F57F17' },
};

export default function ServiceGrid({ onSelect }) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {SERVICES.map((s) => {
        const Icon = ICONS[s.id] || ShoppingBag;
        const style = ICON_BG[s.id] || { bg: '#F0F2F7', color: '#1B2B45' };
        return (
          <button
            key={s.id}
            onClick={() => s.active && onSelect(s.id)}
            className="relative flex flex-col items-center gap-1.5 py-3 px-1 rounded-2xl border border-border/50 bg-white transition-all active:scale-95"
            style={{ opacity: s.active ? 1 : 0.55 }}
          >
            {s.badge && (
              <span
                className="absolute -top-2 left-1/2 -translate-x-1/2 text-[8px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap"
                style={{ background: '#F59E0B', color: 'white' }}
              >
                {s.badge}
              </span>
            )}
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ background: style.bg }}
            >
              <Icon size={20} color={style.color} />
            </div>
            <span className="text-[10px] font-semibold text-foreground leading-tight text-center">
              {s.label}
            </span>
            {!s.active && (
              <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: '#FFF8E1', color: '#F59E0B' }}>
                SOON
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}