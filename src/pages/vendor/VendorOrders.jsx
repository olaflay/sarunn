import React, { useState, useEffect } from 'react';
import { Bell, CheckCircle, XCircle, Clock, Package } from 'lucide-react';
import { sarunnApi } from '@/lib/runnaClient';
import RunnaShell from '@/components/RunnaShell';
import BottomNav from '@/components/BottomNav';
import StatusBadge from '@/components/StatusBadge';
import Snackbar from '@/components/Snackbar';
import { ErrorState, LoadingState } from '@/components/PageStates';

const MOCK_ORDERS = [
  { id: 'v_o1', customer_name: 'Adaeze Okafor', status: 'pending', total: 11400, created_date: new Date(Date.now() - 180000).toISOString(), items: [{ name: 'Classic Smash Burger', quantity: 2 }, { name: 'Fries', quantity: 1 }], delivery_address: '14 Allen Ave, Ikeja', estimated_delivery_min: 30 },
  { id: 'v_o2', customer_name: 'Emeka Nwosu', status: 'confirmed', total: 8200, created_date: new Date(Date.now() - 600000).toISOString(), items: [{ name: 'BBQ Bacon Burger', quantity: 1 }, { name: 'Milkshake', quantity: 1 }], delivery_address: '7 Victoria Island', estimated_delivery_min: 25 },
  { id: 'v_o3', customer_name: 'Fatima Bello', status: 'ready', total: 6500, created_date: new Date(Date.now() - 1200000).toISOString(), items: [{ name: 'Chicken Strips', quantity: 2 }], delivery_address: '23 Lekki Phase 1', estimated_delivery_min: 15 },
];

const TABS = ['All', 'Pending', 'Active', 'Ready'];

function OrderCard({ order, onAction, snackFn }) {
  const elapsed = Math.round((Date.now() - new Date(order.created_date)) / 60000);
  return (
    <div className="md3-card p-4 mb-3">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="font-semibold text-foreground text-sm">{order.customer_name}</p>
          <p className="text-muted-foreground text-xs">{elapsed} min ago · ₦{order.total.toLocaleString()}</p>
        </div>
        <StatusBadge status={order.status} />
      </div>
      <p className="text-muted-foreground text-xs mb-1">📍 {order.delivery_address}</p>
      <p className="text-foreground text-xs mb-3">
        {order.items?.map(i => `${i.quantity}× ${i.name}`).join(' · ')}
      </p>
      <div className="flex gap-2">
        {order.status === 'pending' && (
          <>
            <button onClick={() => onAction(order, 'confirmed')} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold text-white" style={{ background: '#2E7D32' }}>
              <CheckCircle size={14} /> Accept
            </button>
            <button onClick={() => onAction(order, 'cancelled')} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold" style={{ background: '#FEECEB', color: '#B3261E' }}>
              <XCircle size={14} /> Reject
            </button>
          </>
        )}
        {order.status === 'confirmed' && (
          <button onClick={() => onAction(order, 'ready')} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold" style={{ background: '#F0F7FF', color: '#1E7CFF' }}>
            <Package size={14} /> Mark Ready for Pickup
          </button>
        )}
        {order.status === 'ready' && (
          <div className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold" style={{ background: '#E8F5E9', color: '#2E7D32' }}>
            <Clock size={14} /> Awaiting Runner Pickup
          </div>
        )}
      </div>
    </div>
  );
}

export default function VendorOrders() {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [tab, setTab] = useState('All');
  const [snack, setSnack] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError('');
    sarunnApi.entities.Order.filter({ vendor_id: 'demo_vendor' }, '-created_date', 20)
      .then(data => { if (alive && data.length) setOrders(data); })
      .catch(() => { if (alive) setError('Unable to load live orders right now.'); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, []);

  const handleAction = async (order, newStatus) => {
    setOrders(prev => prev.map(o => o.id === order.id ? { ...o, status: newStatus } : o));
    const msgs = { confirmed: '✅ Order accepted!', ready: '📦 Marked as ready for pickup!', cancelled: '❌ Order rejected.' };
    setSnack(msgs[newStatus] || 'Status updated');
    try { await sarunnApi.entities.Order.update(order.id, { status: newStatus }); } catch {}
  };

  const filtered = tab === 'All' ? orders
    : tab === 'Pending' ? orders.filter(o => o.status === 'pending')
    : tab === 'Active' ? orders.filter(o => o.status === 'confirmed')
    : orders.filter(o => o.status === 'ready');

  const pendingCount = orders.filter(o => o.status === 'pending').length;

  if (loading) {
    return (
      <RunnaShell>
        <div className="sarunn-screen bg-background">
          <div className="bg-white border-b border-border/40 px-4 py-4 sticky top-0 z-30">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-heading font-bold text-foreground text-lg">Live Orders</h1>
                <p className="text-muted-foreground text-xs">Burger Palace</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <Bell size={20} />
              </div>
            </div>
          </div>
          <div className="px-4 pt-4">
            <LoadingState title="Loading live orders" subtitle="Fetching vendor order updates." rows={3} />
          </div>
        </div>
        <BottomNav role="vendor" />
      </RunnaShell>
    );
  }

  return (
    <RunnaShell>
      <div className="sarunn-screen bg-background">
        {/* Header */}
        <div className="bg-white border-b border-border/40 px-4 py-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-heading font-bold text-foreground text-lg">Live Orders</h1>
              <p className="text-muted-foreground text-xs">Burger Palace</p>
            </div>
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <Bell size={20} />
              </div>
              {pendingCount > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{pendingCount}</span>
                </div>
              )}
            </div>
          </div>
          {/* Tabs */}
          <div className="flex gap-1 mt-3 bg-muted rounded-xl p-1">
            {TABS.map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all"
                style={{ background: tab === t ? 'white' : 'transparent', color: tab === t ? '#1B2B45' : '#94a3b8', boxShadow: tab === t ? '0 1px 4px rgba(0,0,0,0.1)' : 'none' }}
              >
                {t}
                {t === 'Pending' && pendingCount > 0 && <span className="ml-1 bg-red-500 text-white rounded-full px-1.5 py-0.5 text-xs">{pendingCount}</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 pt-4">
          {error && (
            <div className="mb-4">
              <ErrorState
                title="Orders unavailable"
                subtitle={error}
                actionLabel="Try again"
                onAction={() => window.location.reload()}
              />
            </div>
          )}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">📋</div>
              <h3 className="font-heading font-bold text-foreground text-lg mb-1">No orders here</h3>
              <p className="text-muted-foreground text-sm">New orders will appear here</p>
            </div>
          ) : (
            filtered.map(order => (
              <OrderCard key={order.id} order={order} onAction={handleAction} snackFn={setSnack} />
            ))
          )}
        </div>
      </div>
      <BottomNav role="vendor" />
      <Snackbar message={snack} onClose={() => setSnack('')} />
    </RunnaShell>
  );
}
