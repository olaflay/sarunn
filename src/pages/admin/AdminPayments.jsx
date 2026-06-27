import React from 'react';
import { ArrowUpRight, ArrowDownRight, Wallet, Clock3, Landmark, Repeat2, BarChart3, ReceiptText, RotateCcw, Send } from 'lucide-react';
import AdminShell from '@/components/AdminShell';
import { Badge } from '@/components/ui/badge';
import { mockPaymentDashboard } from '@/lib/scaffoldData';

const STATUS_COLORS = {
  settled: { bg: '#E8F5E9', color: '#2E7D32' },
  paid: { bg: '#E8F5E9', color: '#2E7D32' },
  pending: { bg: '#FFF8E1', color: '#E65100' },
  processed: { bg: '#E3F2FD', color: '#1565C0' },
  approved: { bg: '#E8F5E9', color: '#2E7D32' },
  review: { bg: '#F3E5F5', color: '#9333EA' },
};

const cardItems = [
  { label: 'Platform revenue', value: mockPaymentDashboard.revenue, icon: ArrowUpRight, tone: '#1E7CFF', bg: '#E3F2FD' },
  { label: 'Pending payouts', value: mockPaymentDashboard.pending_payouts, icon: Clock3, tone: '#F59E0B', bg: '#FFF8E1' },
  { label: 'Completed payouts', value: mockPaymentDashboard.completed_payouts, icon: Wallet, tone: '#2E7D32', bg: '#E8F5E9' },
  { label: 'Runner earnings', value: mockPaymentDashboard.runner_earnings, icon: Send, tone: '#9333EA', bg: '#F3E5F5' },
  { label: 'Vendor settlements', value: mockPaymentDashboard.vendor_settlements, icon: Landmark, tone: '#1565C0', bg: '#E3F2FD' },
];

function HistoryTable({ title, rows }) {
  return (
    <div className="rounded-[24px] border border-border/40 bg-card p-4 shadow-sm">
      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <ReceiptText size={16} className="text-primary" />
        {title}
      </div>
      <div className="mt-4 space-y-3">
        {rows.map((row) => {
          const statusStyle = STATUS_COLORS[row.status] || { bg: '#F5F5F5', color: '#666' };
          const isCredit = row.type === 'credit';
          return (
            <div key={row.id} className="flex items-center gap-3 rounded-2xl bg-muted/40 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: isCredit ? '#E8F5E9' : '#FFF3E0' }}>
                {isCredit ? <ArrowUpRight size={18} color="#2E7D32" /> : <ArrowDownRight size={18} color="#F59E0B" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">{row.title}</p>
                <p className="text-xs text-muted-foreground">{row.date}{row.method ? ` · ${row.method}` : ''}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-foreground">₦{row.amount.toLocaleString()}</p>
                <Badge className="rounded-full px-2 py-1 text-[10px] font-semibold" style={{ background: statusStyle.bg, color: statusStyle.color }}>
                  {row.status}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function AdminPayments() {
  return (
    <AdminShell>
      <div className="min-h-full bg-background">
        <div className="navy-gradient px-4 pt-6 pb-10 text-white">
          <p className="text-xs text-white/60">Payments Scaffold</p>
          <h1 className="font-heading text-2xl font-black">Mock Payment Dashboard</h1>
          <p className="mt-1 text-sm text-white/70">A sandbox for revenue, payouts, settlements, withdrawals, and refund tracking.</p>
        </div>

        <div className="-mt-4 px-4 pb-6 space-y-4">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {cardItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-[24px] border border-border/40 bg-card p-4 shadow-sm">
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: item.bg }}>
                      <Icon size={18} color={item.tone} />
                    </div>
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">Mock</span>
                  </div>
                  <p className="font-heading text-2xl font-black text-foreground">₦{item.value.toLocaleString()}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{item.label}</p>
                </div>
              );
            })}
          </div>

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <section className="space-y-4">
              <HistoryTable title="Transaction history" rows={mockPaymentDashboard.transaction_history} />
              <HistoryTable title="Refund history" rows={mockPaymentDashboard.refund_history} />
            </section>

            <aside className="space-y-4">
              <div className="rounded-[24px] border border-border/40 bg-card p-4 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <BarChart3 size={16} className="text-primary" />
                  Payment analytics
                </div>
                <div className="mt-4 space-y-3">
                  {mockPaymentDashboard.analytics.map((item) => (
                    <div key={item.label} className="rounded-2xl bg-muted/40 p-3">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-foreground">{item.label}</p>
                        <span className="text-xs font-semibold text-emerald-700">{item.change}</span>
                      </div>
                      <p className="mt-1 text-lg font-black text-foreground">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[24px] border border-border/40 bg-card p-4 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Repeat2 size={16} className="text-primary" />
                  Withdrawal requests
                </div>
                <div className="mt-4 space-y-3">
                  {mockPaymentDashboard.withdrawal_requests.map((item) => {
                    const tone = STATUS_COLORS[item.status] || { bg: '#F5F5F5', color: '#666' };
                    return (
                      <div key={item.id} className="rounded-2xl bg-muted/40 p-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-foreground">{item.title}</p>
                            <p className="text-xs text-muted-foreground">{item.date} · {item.method}</p>
                          </div>
                          <Badge className="rounded-full px-2 py-1 text-[10px] font-semibold" style={{ background: tone.bg, color: tone.color }}>
                            {item.status}
                          </Badge>
                        </div>
                        <p className="mt-2 text-sm font-bold text-foreground">₦{item.amount.toLocaleString()}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

