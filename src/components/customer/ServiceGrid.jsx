import React from 'react';
import { UtensilsCrossed, Package, Inbox, ShoppingBag, Shirt, Printer, ChevronRight } from 'lucide-react';
import { SERVICES } from '@/lib/runnaData';

const ICONS = {
  food: UtensilsCrossed,
  send: Package,
  receive: Inbox,
  market: ShoppingBag,
  laundry: Shirt,
  print: Printer,
};

// M3-style tonal color themes per service
const THEMES = {
  food: { gradient: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)', icon: '#E65100', accent: '#FF6D00' },
  send: { gradient: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)', icon: '#1565C0', accent: '#1976D2' },
  receive: { gradient: 'linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)', icon: '#7B1FA2', accent: '#8E24AA' },
  market: { gradient: 'linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%)', icon: '#F57F17', accent: '#FFA000' },
  laundry: { gradient: 'linear-gradient(135deg, #E0F2F1 0%, #B2DFDB 100%)', icon: '#00695C', accent: '#00897B' },
  print: { gradient: 'linear-gradient(135deg, #FCE4EC 0%, #F8BBD0 100%)', icon: '#AD1457', accent: '#C2185B' },
};

export default function ServiceGrid({ onSelect }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {SERVICES.map((s) => {
        const Icon = ICONS[s.id] || ShoppingBag;
        const theme = THEMES[s.id] || THEMES.food;
        return (
          <button
            key={s.id}
            onClick={() => s.active && onSelect(s.id)}
            className="relative rounded-2xl p-4 text-left overflow-hidden m3-motion-spring active:scale-95"
            style={{
              background: s.active ? theme.gradient : 'linear-gradient(135deg, #F5F5F5 0%, #EEEEEE 100%)',
              minHeight: '110px',
              opacity: s.active ? 1 : 0.65,
            }}
          >
            {/* Badge */}
            {s.badge && (
              <span
                className="absolute top-2.5 right-2.5 text-[9px] font-bold px-2 py-0.5 rounded-full text-white"
                style={{ background: theme.accent }}
              >
                {s.badge}
              </span>
            )}

            {/* Icon */}
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
              style={{ background: 'rgba(255,255,255,0.6)' }}
            >
              <Icon size={22} color={s.active ? theme.icon : '#9E9E9E'} />
            </div>

            {/* Label */}
            <p className="text-sm font-semibold leading-tight" style={{ color: s.active ? theme.icon : '#757575' }}>
              {s.label}
            </p>

            {/* Status */}
            {!s.active && (
              <span className="text-[9px] font-bold mt-1 inline-block px-2 py-0.5 rounded-full" style={{ background: '#E0E0E0', color: '#9E9E9E' }}>
                COMING SOON
              </span>
            )}

            {/* Arrow for active */}
            {s.active && (
              <div className="absolute bottom-3 right-3 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.5)' }}>
                <ChevronRight size={14} color={theme.icon} />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}