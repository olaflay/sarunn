import React, { useState } from 'react';
import { ArrowUpRight, TrendingDown } from 'lucide-react';
import AdminShell from '@/components/AdminShell';

const TABS = ['Revenue', 'Runner Payouts', 'Vendor Payouts'];

const DATA = {
  0: {
    total: 287400, count: 127,
    rows: [
      { id: 'R001', name: 'Order #4521 — Adaeze Okafor', amount: 5300, date: 'Jun 21, 2026', type: 'credit', status: 'settled' },
      { id: 'R002', name: 'Order #4520 — Emeka Bello', amount: 3800, date: 'Jun 21, 2026', type: 'credit', status: 'settled' },
      { id: 'R003', name: 'Order #4519 — Fatimah Ibrahim', amount: 6500, date: 'Jun 20, 2026', type: 'credit', status: 'pending' },
      { id: 'R004', name: 'Order #4518 — Chidi Obi', amount: 2400, date: 'Jun 20, 2026', type: 'credit', status: 'settled' },
      { id: 'R005', name: 'Refund #4500', amount: 3200, date: 'Jun 19, 2026', type: 'debit', status: 'processed' },
    ],
  },
  1: {
    total: 36500, count: 18,
    rows: [
      { id: 'RP001', name: 'Chidi Obi', amount: 12400, date: 'Jun 21, 2026', type: 'debit', status: 'paid', meta: '8 trips' },
      { id: 'RP002', name: 'Emeka Eze', amount: 8900, date: 'Jun 20, 2026', type: 'debit', status: 'pending', meta: '6 trips' },
      { id: 'RP003', name: 'Tunde Adeyemi', amount: 15200, date: 'Jun 19, 2026', type: 'debit', status: 'paid', meta: '11 trips' },
    ],
  },
  2: {
    total: 142200, count: 71,
    rows: [
      { id: 'VP001', name: 'Mama Tee Kitchen', amount: 48600, date: 'Jun 21, 2026', type: 'debit', status: 'paid', meta: '24 orders' },
      { id: 'VP002', name: 'Campus Bites', amount: 32400, date: 'Jun 20, 2026', type: 'debit', status: 'pending', meta: '16 orders' },
      { id: 'VP003', name: 'Iya Basira Buka', amount: 61200, date: 'Jun 19, 2026', type: 'debit', status: 'paid', meta: '31 orders' },
    ],
  },
};

const STATUS_STYLES = {
  settled: { bg: '#E8F5E9', text: '#2E7D32' },
  paid: { bg: '#E8F5E9', text: '#2E7D32' },
  pending: { bg: '#FFF8E1', text: '#E65100' },
  processed: { bg: '#E3F2FD', text: '#1565C0' },
};

export default function AdminLedger() {
  const [tab, setTab] = useState(0);
  const { total, count, rows } = DATA[tab];

  return (
    <AdminShell>
      <div>
        <div className="navy-gradient px-4 pt-5 pb-10">
          <p className="text-white/50 text-xs mb-1">
            {tab === 0 ? 'Platform Revenue' : tab === 1 ? 'Runner Payouts' : 'Vendor Payouts'}
          </p>
          <p className="font-heading font-black text-white text-3xl leading-tight">₦{total.toLocaleString()}</p>
          <p className="text-white/40 text-xs mt-1">{count} transactions · June 2026</p>
        </div>

        <div className="px-4 -mt-4 pb-6">
          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-sm border border-border/40 mb-4 overflow-hidden">
            <div className="flex">
              {TABS.map((t, i) => (
                <button
                  key={t}
                  onClick={() => setTab(i)}
                  className="flex-1 py-3 text-xs font-semibold transition-colors"
                  style={{ color: tab === i ? '#1B2B45' : '#94a3b8', borderBottom: tab === i ? '2px solid #1B2B45' : '2px solid transparent' }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Rows */}
          <div className="bg-white rounded-2xl shadow-sm border border-border/40 overflow-hidden">
            {rows.map((row, idx) => {
              const sc = STATUS_STYLES[row.status] || STATUS_STYLES.pending;
              return (
                <div key={row.id} className={`flex items-center gap-3 px-4 py-3.5 ${idx < rows.length - 1 ? 'border-b border-border/30' : ''}`}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: row.type === 'credit' ? '#E8F5E9' : '#FFF3E0' }}>
                    {row.type === 'credit'
                      ? <ArrowUpRight size={18} color="#2E7D32" />
                      : <TrendingDown size={18} color="#F59E0B" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{row.name}</p>
                    <p className="text-xs text-muted-foreground">{row.date}{row.meta ? ` · ${row.meta}` : ''}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold" style={{ color: row.type === 'credit' ? '#2E7D32' : '#1B2B45' }}>
                      {row.type === 'credit' ? '+' : '-'}₦{row.amount.toLocaleString()}
                    </p>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: sc.bg, color: sc.text }}>
                      {row.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}