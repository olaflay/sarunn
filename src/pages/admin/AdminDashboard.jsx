import React from 'react';
import { ShoppingBag, Users, Store, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from 'recharts';
import AdminShell from '@/components/AdminShell';

const KPI = [
  { label: 'Orders Today', value: '127', icon: ShoppingBag, color: '#1E7CFF', bg: '#E3F2FD', change: '+12%' },
  { label: 'Active Runners', value: '34', icon: Users, color: '#2E7D32', bg: '#E8F5E9', change: '+3' },
  { label: 'Active Vendors', value: '18', icon: Store, color: '#9333EA', bg: '#F3E5F5', change: '+2' },
  { label: 'Revenue Today', value: '₦1.2M', icon: TrendingUp, color: '#F59E0B', bg: '#FFF8E1', change: '+18%' },
];

const WEEKLY = [
  { day: 'Mon', orders: 89, revenue: 890000 },
  { day: 'Tue', orders: 112, revenue: 1120000 },
  { day: 'Wed', orders: 76, revenue: 760000 },
  { day: 'Thu', orders: 134, revenue: 1340000 },
  { day: 'Fri', orders: 158, revenue: 1580000 },
  { day: 'Sat', orders: 201, revenue: 2010000 },
  { day: 'Sun', orders: 127, revenue: 1270000 },
];

const RECENT_ACTIVITY = [
  { msg: 'New order #4521 from Adaeze O.', time: '2 min ago', color: '#1E7CFF', icon: ShoppingBag },
  { msg: 'Vendor "Pizza Hub" approved', time: '15 min ago', color: '#2E7D32', icon: CheckCircle },
  { msg: 'Order #4498 flagged for dispute', time: '32 min ago', color: '#B3261E', icon: AlertCircle },
  { msg: 'Runner Chidi Obi went online', time: '48 min ago', color: '#9333EA', icon: Users },
  { msg: 'Order #4490 delivered successfully', time: '1 hr ago', color: '#2E7D32', icon: CheckCircle },
];

const ORDER_STATUS = [
  { label: 'Pending', count: 12, color: '#F59E0B' },
  { label: 'Confirmed', count: 23, color: '#1E7CFF' },
  { label: 'Ready', count: 8, color: '#9333EA' },
  { label: 'Delivering', count: 31, color: '#F59E0B' },
  { label: 'Delivered', count: 53, color: '#2E7D32' },
];

export default function AdminDashboard() {
  const totalStatus = ORDER_STATUS.reduce((a, b) => a + b.count, 0);

  return (
    <AdminShell>
      <div className="min-h-full bg-background">
        <div className="navy-gradient px-4 pb-8 pt-6 lg:px-6">
          <p className="text-xs text-white/60">Platform Overview</p>
          <h1 className="font-heading text-xl font-bold text-white lg:text-2xl">Admin Dashboard</h1>
          <p className="mt-0.5 text-xs text-white/40">Thursday, June 19, 2026</p>
        </div>

        <div className="-mt-4 px-4 pb-4 lg:-mt-6 lg:px-6 lg:pb-6">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <section className="space-y-4">
              <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
                {KPI.map((k) => {
                  const Icon = k.icon;
                  return (
                    <div key={k.label} className="rounded-[24px] border border-border/40 bg-card p-4 shadow-sm">
                      <div className="mb-2 flex items-start justify-between">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: k.bg }}>
                          <Icon size={18} color={k.color} aria-hidden="true" />
                        </div>
                        <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-600">{k.change}</span>
                      </div>
                      <p className="font-heading text-2xl font-black leading-tight text-foreground">{k.value}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{k.label}</p>
                    </div>
                  );
                })}
              </div>

              <div className="rounded-[24px] border border-border/40 bg-card p-4 shadow-sm">
                <h3 className="mb-3 text-sm font-semibold text-foreground">Weekly Orders</h3>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={WEEKLY} barSize={22}>
                    <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <Tooltip
                      formatter={(v) => [v, 'Orders']}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', fontSize: '12px' }}
                    />
                    <Bar dataKey="orders" fill="#1E7CFF" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="rounded-[24px] border border-border/40 bg-card p-4 shadow-sm">
                <h3 className="mb-3 text-sm font-semibold text-foreground">Live Order Status</h3>
                <div className="space-y-3">
                  {ORDER_STATUS.map((s) => {
                    const pct = Math.round((s.count / totalStatus) * 100);
                    return (
                      <div key={s.label}>
                        <div className="mb-1 flex justify-between text-xs">
                          <span className="font-medium text-foreground">{s.label}</span>
                          <span className="text-muted-foreground">{s.count} · {pct}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-muted">
                          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: s.color }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            <aside className="space-y-4">
              <div className="rounded-[24px] border border-border/40 bg-card p-4 shadow-sm">
                <h3 className="mb-3 text-sm font-semibold text-foreground">Recent Activity</h3>
                <div className="space-y-0">
                  {RECENT_ACTIVITY.map((a, idx) => {
                    const Icon = a.icon;
                    return (
                      <div key={idx} className={`flex items-start gap-3 py-3 ${idx < RECENT_ACTIVITY.length - 1 ? 'border-b border-border/30' : ''}`}>
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ background: `${a.color}18` }}>
                          <Icon size={14} color={a.color} aria-hidden="true" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-foreground">{a.msg}</p>
                          <p className="mt-0.5 text-xs text-muted-foreground">{a.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-[24px] border border-border/40 bg-card p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-foreground">Quick Actions</h3>
                <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <p>Review disputes and resolve blockers faster.</p>
                  <p>Check order spikes before they impact fulfillment.</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
