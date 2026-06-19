import React, { useState, useEffect } from 'react';
import { ShoppingBag, Users, Store, TrendingUp, AlertCircle, CheckCircle, Clock, XCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip, LineChart, Line } from 'recharts';
import RunnaShell from '@/components/RunnaShell';
import DemoBar from '@/components/DemoBar';
import BottomNav from '@/components/BottomNav';

const KPI = [
  { label: 'Orders Today', value: '127', icon: ShoppingBag, color: '#1E7CFF', bg: '#E3F2FD', change: '+12%' },
  { label: 'Active Runners', value: '34', icon: Users, color: '#2E7D32', bg: '#E8F5E9', change: '+3' },
  { label: 'Active Vendors', value: '18', icon: Store, color: '#9333EA', bg: '#F3E5F5', change: '+2' },
  { label: "Revenue Today", value: '₦1.2M', icon: TrendingUp, color: '#F59E0B', bg: '#FFF8E1', change: '+18%' },
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
  { type: 'order', msg: 'New order #4521 from Adaeze O.', time: '2 min ago', color: '#1E7CFF', icon: ShoppingBag },
  { type: 'vendor', msg: 'Vendor "Pizza Hub" approved', time: '15 min ago', color: '#2E7D32', icon: CheckCircle },
  { type: 'flag', msg: 'Order #4498 flagged for dispute', time: '32 min ago', color: '#B3261E', icon: AlertCircle },
  { type: 'runner', msg: 'Runner Chidi Obi went online', time: '48 min ago', color: '#9333EA', icon: Users },
  { type: 'order', msg: 'Order #4490 delivered successfully', time: '1 hr ago', color: '#2E7D32', icon: CheckCircle },
];

const ORDER_STATUS = [
  { label: 'Pending', count: 12, color: '#F59E0B' },
  { label: 'Confirmed', count: 23, color: '#1E7CFF' },
  { label: 'Ready', count: 8, color: '#9333EA' },
  { label: 'Delivering', count: 31, color: '#F59E0B' },
  { label: 'Delivered', count: 53, color: '#2E7D32' },
];

export default function AdminDashboard() {
  return (
    <RunnaShell>
      <DemoBar currentRole="Admin" />
      <div className="runna-screen bg-background">
        <div className="navy-gradient px-4 pt-6 pb-8">
          <p className="text-white/60 text-xs">Platform Overview</p>
          <h1 className="font-heading font-bold text-white text-xl">Admin Dashboard</h1>
          <p className="text-white/40 text-xs mt-0.5">Thursday, June 19, 2026</p>
        </div>

        <div className="px-4 -mt-4">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {KPI.map(k => {
              const Icon = k.icon;
              return (
                <div key={k.label} className="bg-white rounded-2xl p-4 shadow-sm border border-border/40">
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: k.bg }}>
                      <Icon size={18} color={k.color} />
                    </div>
                    <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{k.change}</span>
                  </div>
                  <p className="font-heading font-black text-foreground text-2xl leading-tight">{k.value}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">{k.label}</p>
                </div>
              );
            })}
          </div>

          {/* Revenue Chart */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-border/40 mb-4">
            <h3 className="font-semibold text-foreground text-sm mb-3">Weekly Orders</h3>
            <ResponsiveContainer width="100%" height={120}>
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

          {/* Order Status Breakdown */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-border/40 mb-4">
            <h3 className="font-semibold text-foreground text-sm mb-3">Live Order Status</h3>
            <div className="space-y-2">
              {ORDER_STATUS.map(s => {
                const total = ORDER_STATUS.reduce((a, b) => a + b.count, 0);
                const pct = Math.round((s.count / total) * 100);
                return (
                  <div key={s.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium text-foreground">{s.label}</span>
                      <span className="text-muted-foreground">{s.count} · {pct}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: s.color }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-border/40 mb-4">
            <h3 className="font-semibold text-foreground text-sm mb-3">Recent Activity</h3>
            <div className="space-y-0">
              {RECENT_ACTIVITY.map((a, idx) => {
                const Icon = a.icon;
                return (
                  <div key={idx} className={`flex items-start gap-3 py-3 ${idx < RECENT_ACTIVITY.length - 1 ? 'border-b border-border/30' : ''}`}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${a.color}18` }}>
                      <Icon size={14} color={a.color} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground font-medium">{a.msg}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <BottomNav role="admin" />
    </RunnaShell>
  );
}