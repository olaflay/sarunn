import React from 'react';
import { TrendingUp, DollarSign, ShoppingBag, Star } from 'lucide-react';
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from 'recharts';
import RunnaShell from '@/components/RunnaShell';
import BottomNav from '@/components/BottomNav';

const WEEKLY_DATA = [
  { day: 'Mon', amount: 45000 },
  { day: 'Tue', amount: 62000 },
  { day: 'Wed', amount: 38000 },
  { day: 'Thu', amount: 75000 },
  { day: 'Fri', amount: 91000 },
  { day: 'Sat', amount: 110000 },
  { day: 'Sun', amount: 68000 },
];

const STATS = [
  { label: 'Total Revenue', value: '₦489,000', icon: DollarSign, color: '#2E7D32', bg: '#E8F5E9' },
  { label: 'Orders This Week', value: '47', icon: ShoppingBag, color: '#1E7CFF', bg: '#E3F2FD' },
  { label: 'Avg Order Value', value: '₦10,404', icon: TrendingUp, color: '#9333EA', bg: '#F3E5F5' },
  { label: 'Store Rating', value: '4.8 ⭐', icon: Star, color: '#F59E0B', bg: '#FFF8E1' },
];

export default function VendorEarnings() {
  return (
    <RunnaShell>
      <div className="sarunn-screen bg-background">
        <div className="navy-gradient px-4 pt-6 pb-8">
          <h1 className="font-heading font-bold text-white text-lg mb-1">Earnings</h1>
          <p className="text-white/60 text-xs">Burger Palace · This week</p>
          <div className="mt-4">
            <p className="text-white/60 text-xs">Total This Week</p>
            <p className="font-heading font-black text-white text-4xl">₦489,000</p>
            <p className="text-green-400 text-xs mt-1 font-medium">↑ 18% vs last week</p>
          </div>
        </div>

        <div className="px-4 -mt-4">
          {/* Chart */}
          <div className="bg-white rounded-2xl p-4 shadow-md border border-border/40 mb-4">
            <h3 className="font-semibold text-foreground text-sm mb-3">Daily Revenue</h3>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={WEEKLY_DATA} barSize={24}>
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip
                  formatter={(v) => [`₦${v.toLocaleString()}`, 'Revenue']}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', fontSize: '12px' }}
                />
                <Bar dataKey="amount" fill="#1E7CFF" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {STATS.map(stat => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="bg-white rounded-2xl p-4 shadow-sm border border-border/40">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-2" style={{ background: stat.bg }}>
                    <Icon size={18} color={stat.color} />
                  </div>
                  <p className="font-heading font-bold text-foreground text-lg leading-tight">{stat.value}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* Recent payouts */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-border/40 mb-4">
            <h3 className="font-semibold text-foreground text-sm mb-3">Recent Payouts</h3>
            {[
              { date: 'Jun 14, 2026', amount: 89000, status: 'Paid' },
              { date: 'Jun 7, 2026', amount: 76500, status: 'Paid' },
              { date: 'May 31, 2026', amount: 102000, status: 'Paid' },
            ].map((p, i) => (
              <div key={i} className={`flex items-center justify-between py-3 ${i < 2 ? 'border-b border-border/40' : ''}`}>
                <div>
                  <p className="text-sm font-medium text-foreground">{p.date}</p>
                  <p className="text-xs text-green-600 font-medium">{p.status}</p>
                </div>
                <span className="font-bold text-foreground text-sm">₦{p.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav role="vendor" />
    </RunnaShell>
  );
}
