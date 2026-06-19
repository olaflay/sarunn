import React, { useState } from 'react';
import { Store, MapPin, Phone, Clock, ToggleRight, ToggleLeft, ChevronRight, Star } from 'lucide-react';
import RunnaShell from '@/components/RunnaShell';
import DemoBar from '@/components/DemoBar';
import BottomNav from '@/components/BottomNav';
import Snackbar from '@/components/Snackbar';

export default function VendorProfile() {
  const [isOpen, setIsOpen] = useState(true);
  const [snack, setSnack] = useState('');

  const toggleStore = () => {
    const next = !isOpen;
    setIsOpen(next);
    setSnack(next ? '🟢 Store is now Open' : '🔴 Store is now Closed');
  };

  return (
    <RunnaShell>
      <DemoBar currentRole="Vendor" />
      <div className="runna-screen bg-background">
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
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${isOpen ? 'bg-green-400/20 text-green-300' : 'bg-red-400/20 text-red-300'}`}>
              {isOpen ? '● Open' : '● Closed'}
            </span>
          </div>
        </div>

        <div className="mx-4 -mt-8">
          {/* Store Status Toggle */}
          <div className="bg-white rounded-2xl p-4 shadow-md border border-border/40 flex items-center justify-between mb-4">
            <div>
              <p className="font-semibold text-foreground text-sm">Store Status</p>
              <p className="text-muted-foreground text-xs">{isOpen ? 'Accepting orders' : 'Not accepting orders'}</p>
            </div>
            <button onClick={toggleStore}>
              {isOpen ? <ToggleRight size={36} color="#2E7D32" /> : <ToggleLeft size={36} color="#94a3b8" />}
            </button>
          </div>

          {/* Store Info */}
          <div className="bg-white rounded-2xl shadow-sm border border-border/40 overflow-hidden mb-4">
            <div className="px-4 py-3 border-b border-border/40">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Store Information</p>
            </div>
            {[
              { icon: MapPin, label: 'Address', value: '14 Allen Ave, Ikeja, Lagos' },
              { icon: Phone, label: 'Phone', value: '+234 802 345 6789' },
              { icon: Clock, label: 'Hours', value: '8:00 AM – 10:00 PM' },
              { icon: Store, label: 'Category', value: 'Food & Burgers' },
            ].map((info, idx, arr) => {
              const Icon = info.icon;
              return (
                <button key={info.label} className={`w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-muted/50 ${idx < arr.length - 1 ? 'border-b border-border/40' : ''}`}>
                  <Icon size={16} color="#1E7CFF" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">{info.label}</p>
                    <p className="text-sm font-medium text-foreground">{info.value}</p>
                  </div>
                  <ChevronRight size={14} color="#94a3b8" />
                </button>
              );
            })}
          </div>

          {/* Bank Details */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-border/40 mb-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-foreground text-sm">Bank Account</p>
                <p className="text-muted-foreground text-xs">GTBank · •••• 7821</p>
              </div>
              <button className="text-xs font-semibold px-3 py-1.5 rounded-xl" style={{ color: '#1E7CFF', background: '#F0F7FF' }}>Edit</button>
            </div>
          </div>
        </div>
      </div>
      <BottomNav role="vendor" />
      <Snackbar message={snack} onClose={() => setSnack('')} />
    </RunnaShell>
  );
}