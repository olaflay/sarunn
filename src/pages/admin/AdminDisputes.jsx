import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import AdminShell from '@/components/AdminShell';
import Snackbar from '@/components/Snackbar';

const STATUS_TABS = ['Open', 'In Progress', 'Resolved'];

const DISPUTES = [
  { id: 'D001', status: 'open', priority: 'high', title: 'Order not delivered', customer: 'Adaeze Okafor', vendor: 'Mama Tee Kitchen', orderId: '#4521', amount: 5300, time: '15 min ago', claim: 'I paid for my order but never received it. The runner marked it delivered but I was in my room.' },
  { id: 'D002', status: 'open', priority: 'medium', title: 'Wrong items received', customer: 'Emeka Bello', vendor: 'Campus Bites', orderId: '#4515', amount: 3200, time: '1 hr ago', claim: 'I ordered a Beef Burger but received Chicken. I have a photo to prove this.' },
  { id: 'D003', status: 'in_progress', priority: 'high', title: 'Double charged', customer: 'Fatimah Ibrahim', vendor: 'Chops & More', orderId: '#4508', amount: 6500, time: '3 hrs ago', claim: 'My card was charged twice for the same order. Please refund the duplicate charge.' },
  { id: 'D004', status: 'in_progress', priority: 'medium', title: 'Food quality complaint', customer: 'Tunde Adeola', vendor: 'Naija Grills', orderId: '#4501', amount: 4000, time: '5 hrs ago', claim: 'The grilled chicken was undercooked. I had to dispose of it.' },
  { id: 'D005', status: 'resolved', priority: 'low', title: 'Late delivery', customer: 'Chidi Okafor', vendor: 'Naija Grills', orderId: '#4490', amount: 4200, time: 'Jun 20', claim: 'Order arrived 45 minutes late.', resolution: 'Partial refund of ₦1,000 issued to customer.' },
];

const PRIORITY = {
  high: { bg: '#FFEBEE', text: '#C62828' },
  medium: { bg: '#FFF8E1', text: '#F57F17' },
  low: { bg: '#E8F5E9', text: '#2E7D32' },
};

const STATUS_KEY = ['open', 'in_progress', 'resolved'];

export default function AdminDisputes() {
  const [tab, setTab] = useState(0);
  const [expanded, setExpanded] = useState(null);
  const [resolved, setResolved] = useState({});
  const [snack, setSnack] = useState('');

  const filtered = DISPUTES.filter(d => d.status === STATUS_KEY[tab]);
  const openCount = DISPUTES.filter(d => d.status === 'open').length;

  const resolve = (id, action) => {
    const msgs = { refund: 'Full refund issued', partial: 'Partial refund issued', none: 'Closed — no action taken' };
    setResolved(r => ({ ...r, [id]: msgs[action] }));
    setExpanded(null);
    setSnack(`Dispute ${id} — ${msgs[action]}`);
  };

  return (
    <AdminShell>
      <div>
        <div className="navy-gradient px-4 pt-5 pb-10 flex items-start gap-3">
          <AlertTriangle size={22} color="#F59E0B" className="mt-1" />
          <div>
            <p className="font-heading font-bold text-white text-xl">Disputes</p>
            <p className="text-white/50 text-xs">{openCount} open · require attention</p>
          </div>
        </div>

        <div className="px-4 -mt-4 pb-6">
          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-sm border border-border/40 mb-4 overflow-hidden">
            <div className="flex">
              {STATUS_TABS.map((t, i) => (
                <button key={t} onClick={() => setTab(i)}
                  className="flex-1 py-3 text-xs font-semibold transition-colors relative"
                  style={{ color: tab === i ? '#1B2B45' : '#94a3b8', borderBottom: tab === i ? '2px solid #1B2B45' : '2px solid transparent' }}>
                  {t}
                  {i === 0 && openCount > 0 && (
                    <span className="ml-1 text-[9px] bg-red-500 text-white px-1.5 py-0.5 rounded-full">{openCount}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <CheckCircle size={40} color="#2E7D32" className="mx-auto mb-3" />
              <p className="font-semibold text-foreground">All clear!</p>
              <p className="text-muted-foreground text-sm mt-1">No disputes in this category</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map(d => {
                const pc = PRIORITY[d.priority];
                const isOpen = expanded === d.id;
                const resolutionNote = resolved[d.id];
                return (
                  <div key={d.id} className="bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden">
                    <button onClick={() => setExpanded(isOpen ? null : d.id)} className="w-full p-4 text-left">
                      <div className="flex items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase" style={{ background: pc.bg, color: pc.text }}>{d.priority}</span>
                            <span className="text-xs text-muted-foreground">{d.orderId}</span>
                          </div>
                          <p className="font-semibold text-foreground text-sm">{d.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 truncate">{d.customer} → {d.vendor}</p>
                        </div>
                        <div className="text-right flex-shrink-0 ml-2">
                          <p className="font-bold text-sm" style={{ color: '#1B2B45' }}>₦{d.amount.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">{d.time}</p>
                        </div>
                        {isOpen ? <ChevronUp size={16} color="#94a3b8" className="flex-shrink-0 mt-1" /> : <ChevronDown size={16} color="#94a3b8" className="flex-shrink-0 mt-1" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 space-y-3">
                        <div className="bg-muted rounded-xl p-3">
                          <p className="text-xs font-semibold text-foreground mb-1">Customer Claim</p>
                          <p className="text-xs text-muted-foreground leading-relaxed">{d.claim}</p>
                        </div>
                        {(d.resolution || resolutionNote) ? (
                          <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 rounded-xl p-3">
                            <CheckCircle size={14} />
                            <span>{d.resolution || resolutionNote}</span>
                          </div>
                        ) : (
                          <div className="grid grid-cols-3 gap-2">
                            <button onClick={() => resolve(d.id, 'refund')} className="py-2.5 rounded-xl text-xs font-semibold text-white" style={{ background: '#1B2B45' }}>Full Refund</button>
                            <button onClick={() => resolve(d.id, 'partial')} className="py-2.5 rounded-xl text-xs font-semibold" style={{ background: '#FFF8E1', color: '#F57F17' }}>Partial</button>
                            <button onClick={() => resolve(d.id, 'none')} className="py-2.5 rounded-xl text-xs font-semibold text-muted-foreground bg-muted">No Action</button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Snackbar message={snack} onClose={() => setSnack('')} />
    </AdminShell>
  );
}