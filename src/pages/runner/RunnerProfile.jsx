import React, { useState } from 'react';
import { User, Star, MapPin, Phone, Bike, ToggleRight, ToggleLeft, ChevronRight, HelpCircle, LogOut, Shield, Banknote, CreditCard, BadgeCheck } from 'lucide-react';
import RunnaShell from '@/components/RunnaShell';
import BottomNav from '@/components/BottomNav';
import Snackbar from '@/components/Snackbar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRunStore } from '@/store/runStore';
import { Badge } from '@/components/ui/badge';

export default function RunnerProfile() {
  const [isAvailable, setIsAvailable] = useState(true);
  const [snack, setSnack] = useState('');
  const profile = useRunStore((state) => state.runnerProfile);

  return (
    <RunnaShell>
      <div className="sarunn-screen bg-background">
        <div className="navy-gradient px-4 pt-6 pb-16 text-center text-white">
          <Avatar className="mx-auto mb-3 h-20 w-20 border-4 border-white/30">
            <AvatarImage src={profile.profile_picture} alt={profile.full_name} />
            <AvatarFallback className="bg-white/15 text-2xl font-bold text-white">
              {profile.full_name.split(' ').map((part) => part[0]).join('').slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <h2 className="font-heading text-xl font-bold">{profile.full_name}</h2>
          <div className="mt-1 flex items-center justify-center gap-1.5">
            <Star size={14} fill="#FCD34D" color="#FCD34D" />
            <span className="text-sm text-white/80">{profile.rating} Runner Rating · {profile.total_deliveries} deliveries</span>
          </div>
          <div className="mt-2 flex items-center justify-center gap-2">
            <Badge className="border-0 bg-green-500/20 text-green-200 hover:bg-green-500/20" title="Identity verified">
              <BadgeCheck size={12} className="mr-1" />
              Verified
            </Badge>
            <span className="text-xs bg-white/10 text-white/80 px-3 py-1 rounded-full font-semibold">{profile.account_status}</span>
          </div>
        </div>

        <div className="mx-4 -mt-8 space-y-4">
          <div className="bg-white rounded-2xl p-4 shadow-md border border-border/40 flex items-center justify-between">
            <div>
              <p className="font-semibold text-foreground text-sm">Availability</p>
              <p className="text-muted-foreground text-xs">{isAvailable ? 'Accepting new jobs' : 'Not accepting jobs'}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsAvailable((value) => !value);
                setSnack(isAvailable ? 'You are now offline' : 'You are now online');
              }}
            >
              {isAvailable ? <ToggleRight size={36} color="#2E7D32" /> : <ToggleLeft size={36} color="#94a3b8" />}
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-white rounded-2xl shadow-sm border border-border/40 overflow-hidden">
              {[
                { icon: Phone, label: 'Phone', value: profile.phone },
                { icon: Bike, label: 'Vehicle', value: `${profile.vehicle} · ${profile.plate_number}` },
                { icon: MapPin, label: 'Campus', value: profile.campus },
                { icon: Shield, label: 'Zones', value: profile.assigned_zones.join(', ') },
              ].map((item, idx, arr) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-muted/50 ${idx < arr.length - 1 ? 'border-b border-border/40' : ''}`}
                    type="button"
                  >
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

            <div className="bg-white rounded-2xl shadow-sm border border-border/40 overflow-hidden">
              {[
                { icon: Banknote, label: 'Bank name', value: profile.bank_name },
                { icon: CreditCard, label: 'Account number', value: profile.account_number },
                { icon: User, label: 'Account name', value: profile.account_name },
                { icon: BadgeCheck, label: 'Suspension status', value: profile.suspension_reason ? profile.suspension_reason : 'Active' },
              ].map((item, idx, arr) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-muted/50 ${idx < arr.length - 1 ? 'border-b border-border/40' : ''}`}
                    type="button"
                  >
                    <Icon size={16} color="#2E7D32" />
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="text-sm font-medium text-foreground">{item.value}</p>
                    </div>
                    <ChevronRight size={14} color="#94a3b8" />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border/40 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Earnings summary</p>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Today</span>
                  <span className="font-semibold text-foreground">₦{profile.earnings_today?.toLocaleString?.() || '12,400'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Week</span>
                  <span className="font-semibold text-foreground">₦{profile.earnings_week?.toLocaleString?.() || '38,400'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Month</span>
                  <span className="font-semibold text-foreground">₦{profile.earnings_month?.toLocaleString?.() || '128,500'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-semibold text-foreground">₦{profile.earnings_total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border/40 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Account health</p>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Verification</span>
                  <span className="font-semibold text-green-700">Identity verified</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="font-semibold text-foreground">{profile.account_status}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Suspension note</span>
                  <span className="max-w-[160px] truncate font-semibold text-foreground">{profile.suspension_reason || 'None'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-border/40 overflow-hidden mb-4">
            <button className="w-full flex items-center gap-3 px-4 py-4 text-left border-b border-border/40 hover:bg-muted/50" type="button">
              <HelpCircle size={16} color="#1E7CFF" />
              <span className="font-semibold text-foreground text-sm">Help & Support</span>
              <ChevronRight size={14} color="#94a3b8" className="ml-auto" />
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-4 text-left hover:bg-muted/50" type="button">
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

