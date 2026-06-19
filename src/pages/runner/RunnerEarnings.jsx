import React from 'react';
import { DollarSign, Package, Star, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from 'recharts';
import RunnaShell from '@/components/RunnaShell';
import DemoBar from '@/components/DemoBar';
import BottomNav from '@/components/BottomNav';

const WEEKLY = [
  { day: 'Mon', amount: 4200 },
  { day: 'Tue', amount: 6800 },
  { day: 'Wed', amount: 3100 },
  { day: 'Thu', amount: 7500 },
  { day: 'Fri', amount: 9200 },
  { day: 'Sat', amount: 11000 },
  { day: 'Sun', amount: 5800 },
];

export default function RunnerEarnings() {
  const total = WEEKLY.reduce((s, d) => s + d.amount, 0);
  return (
    <RunnaShell>
      <DemoBar currentRole="Runner" />
      <div className="runna-screen bg-background">
        <div className="navy-gradient px-4 pt-6 pb-8">
          <h1 className="font-heading font-bold text-white text-lg mb-1">Earnings</h1>
          <p className="text-white/60 text-xs">Chidi Obi · This week</p>
          <div className="mt-4">
            <p className="text-white/60 text-xs">Total This Week</p>
            <p className="font-heading font-black text-white text-4xl">₦{total.toLocaleString()}</p>
            <p className="text-green-400 text-xs mt-1 font-medium">↑ 24% vs last week</p>
          </div>
        </div>

        <div className="px-4 -mt-4">
          <div className="bg-white rounded-2xl p-4 shadow-md border border-border/40 mb-4">
            <h3 className="font-semibold text-foreground text-sm mb-3">Daily Earnings</h3>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={WEEKLY} barSize={24}>
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip
                  formatter={(v) => [`₦${v.toLocaleString()}`, 'Earned']}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', fontSize: '12px' }}
                />
                <Bar dataKey="amount" fill="#2E7D32" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              { label: 'Deliveries', value: '47', icon: Package, color: '#1E7CFF', bg: '#E3F2FD' },
              { label: 'Avg per Job', value: `₦${Math.round(total / 47).toLocaleString()}`, icon: DollarSign, color: '#2E7D32', bg: '#E8F5E9' },
              { label: 'Rating', value: '4.9 ⭐', icon: Star, color: '#F59E0B', bg: '#FFF8E1' },
              { label: 'Total Lifetime', value: '₦248K', icon: TrendingUp, color: '#9333EA', bg: '#F3E5F5' },
            ].map(stat => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="bg-white rounded-2xl p-4 shadow-sm border border-border/40">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-2" style={{ background: stat.bg }}>
                    <Icon size={18} color={stat.color} />
                  </div>
                  <p className="font-heading font-bold text-foreground text-lg">{stat.value}</p>
                  <p className="text-muted-foreground text-xs">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* Payout */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-border/40 mb-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-foreground text-sm">Pending Payout</h3>
              <span className="text-xs bg-yellow-50 text-yellow-700 px-2.5 py-1 rounded-full font-semibold">Processing</span>
            </div>
            <p className="font-heading font-black text-foreground text-3xl mb-1">₦{total.toLocaleString()}</p>
            <p className="text-muted-foreground text-xs">Expected: Friday, Jun 20 · Access Bank ••••2341</p>
          </div>
        </div>
      </div>
      <BottomNav role="runner" />
    </RunnaShell>
  );
}