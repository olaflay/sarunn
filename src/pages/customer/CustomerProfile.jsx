import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, CreditCard, Bell, HelpCircle, LogOut, ChevronRight, Star } from 'lucide-react';
import RunnaShell from '@/components/RunnaShell';
import BottomNav from '@/components/BottomNav';

const MENU_ITEMS = [
  { icon: MapPin, label: 'Saved Addresses', sub: '2 saved addresses' },
  { icon: CreditCard, label: 'Payment Methods', sub: 'Card •••• 4242' },
  { icon: Bell, label: 'Notifications', sub: 'All notifications on' },
  { icon: Star, label: 'My Reviews', sub: 'You have 5 reviews' },
  { icon: HelpCircle, label: 'Help & Support', sub: 'FAQs and contact' },
];

export default function CustomerProfile() {
  const navigate = useNavigate();
  return (
    <RunnaShell>
      <div className="sarunn-screen bg-background">
        {/* Header */}
        <div className="navy-gradient px-4 pt-8 pb-16 text-center">
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3 border-4 border-white/30">
            <User size={36} color="white" />
          </div>
          <h2 className="font-heading font-bold text-white text-xl">Demo Customer</h2>
          <p className="text-white/60 text-sm">demo@sarunn.app</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Star size={14} fill="#FCD34D" color="#FCD34D" />
            <span className="text-white/80 text-sm font-medium">4.9 Customer Rating</span>
          </div>
        </div>

        {/* Stats */}
        <div className="mx-4 -mt-8 bg-white rounded-2xl p-4 shadow-md border border-border/40 flex items-center justify-around mb-4">
          {[{ label: 'Orders', value: '23' }, { label: 'Errands', value: '8' }, { label: 'Reviews', value: '15' }].map(s => (
            <div key={s.label} className="text-center">
              <p className="font-heading font-black text-foreground text-2xl">{s.value}</p>
              <p className="text-muted-foreground text-xs">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="px-4">
          <div className="bg-white rounded-2xl shadow-sm border border-border/40 overflow-hidden">
            {MENU_ITEMS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button key={item.label} className={`w-full flex items-center gap-3 px-4 py-4 text-left hover:bg-muted/50 transition-colors ${idx < MENU_ITEMS.length - 1 ? 'border-b border-border/40' : ''}`}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#F0F7FF' }}>
                    <Icon size={18} color="#1E7CFF" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground text-sm">{item.label}</p>
                    <p className="text-muted-foreground text-xs">{item.sub}</p>
                  </div>
                  <ChevronRight size={16} color="#94a3b8" />
                </button>
              );
            })}
          </div>

          <button className="w-full flex items-center gap-3 px-4 py-4 mt-3 bg-red-50 rounded-2xl border border-red-100">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-red-100">
              <LogOut size={18} color="#B3261E" />
            </div>
            <span className="font-semibold text-red-600 text-sm">Sign Out</span>
          </button>
          <div className="h-4" />
        </div>
      </div>
      <BottomNav role="customer" />
    </RunnaShell>
  );
}
