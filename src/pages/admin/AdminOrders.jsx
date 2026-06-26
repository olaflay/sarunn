import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { runnaApi } from '@/lib/runnaClient';
import AdminShell from '@/components/AdminShell';
import StatusBadge from '@/components/StatusBadge';
import Snackbar from '@/components/Snackbar';
import { EmptyState, ErrorState, LoadingState } from '@/components/PageStates';

const MOCK_ORDERS = [
  { id: 'o_a1', customer_name: 'Adaeze Okafor', vendor_name: 'Burger Palace', runner_name: 'Chidi Obi', status: 'delivering', total: 11400, created_date: new Date(Date.now() - 1200000).toISOString() },
  { id: 'o_a2', customer_name: 'Emeka Nwosu', vendor_name: 'Sushi Garden', runner_name: 'Tunde Adeyemi', status: 'confirmed', total: 18600, created_date: new Date(Date.now() - 2400000).toISOString() },
  { id: 'o_a3', customer_name: 'Fatima Bello', vendor_name: 'Fresh Mart', runner_name: null, status: 'pending', total: 8400, created_date: new Date(Date.now() - 600000).toISOString() },
  { id: 'o_a4', customer_name: 'Ngozi Aba', vendor_name: 'Artisan Bakery', runner_name: 'Tunde Adeyemi', status: 'delivered', total: 6500, created_date: new Date(Date.now() - 7200000).toISOString() },
  { id: 'o_a5', customer_name: 'Samuel Oke', vendor_name: 'Brew & Co.', runner_name: null, status: 'cancelled', total: 3800, created_date: new Date(Date.now() - 86400000).toISOString() },
];

const STATUS_FILTERS = ['All', 'pending', 'confirmed', 'ready', 'picked_up', 'delivered', 'cancelled'];

export default function AdminOrders() {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [snack, setSnack] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError('');
    runnaApi.entities.Order.list('-created_date', 30)
      .then(data => { if (alive && data.length) setOrders(data); })
      .catch(() => { if (alive) setError('Unable to load live order data right now.'); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, []);

  const filtered = orders.filter(o => {
    const matchStatus = filter === 'All' || o.status === filter;
    const matchSearch = !search || [o.customer_name, o.vendor_name, o.runner_name, o.id].some(f => f?.toLowerCase().includes(search.toLowerCase()));
    return matchStatus && matchSearch;
  });

  if (loading) {
    return (
      <AdminShell>
        <div className="bg-background min-h-full">
          <div className="bg-white border-b border-border/40 px-4 py-4 sticky top-0 z-10">
            <h1 className="font-heading font-bold text-foreground text-lg mb-3">All Orders</h1>
            <div className="flex items-center gap-2 bg-muted rounded-2xl px-3 py-2.5 mb-3">
              <Search size={15} color="#94a3b8" />
              <div className="skeleton h-4 flex-1 rounded-full" />
            </div>
            <div className="scroll-x flex gap-2">
              {STATUS_FILTERS.map(s => (
                <div key={s} className="skeleton h-8 w-20 rounded-full" />
              ))}
            </div>
          </div>
          <div className="px-4 pt-4">
            <LoadingState title="Loading orders" subtitle="Pulling recent order activity." rows={4} />
          </div>
        </div>
      </AdminShell>
    );
  }

  const handleCancel = async (order) => {
    setOrders(prev => prev.map(o => o.id === order.id ? { ...o, status: 'cancelled' } : o));
    setSnack('Order cancelled and parties notified.');
    try { await runnaApi.entities.Order.update(order.id, { status: 'cancelled' }); } catch {}
  };

  return (
    <AdminShell>
      <div className="bg-background min-h-full">
        <div className="bg-white border-b border-border/40 px-4 py-4 sticky top-0 z-10">
          <h1 className="font-heading font-bold text-foreground text-lg mb-3">All Orders</h1>
          {/* Search */}
          <div className="flex items-center gap-2 bg-muted rounded-2xl px-3 py-2.5 mb-3">
            <Search size={15} color="#94a3b8" />
            <input className="flex-1 bg-transparent outline-none text-sm placeholder-muted-foreground" placeholder="Search by customer, vendor, runner…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          {/* Status filter */}
          <div className="scroll-x flex gap-2">
            {STATUS_FILTERS.map(s => (
              <button key={s} onClick={() => setFilter(s)} className={`chip flex-shrink-0 text-xs ${filter === s ? 'selected' : ''}`}>
                {s === 'All' ? 'All' : s.replace('_', ' ')}
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
          <p className="text-muted-foreground text-xs mb-3">{filtered.length} orders</p>
          {filtered.length === 0 ? (
            <EmptyState title="No orders found" subtitle="Try changing the search or status filter." />
          ) : (
            filtered.map(order => {
              const date = new Date(order.created_date);
              return (
                <div key={order.id} className="md3-card p-4 mb-3">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-foreground text-sm">{order.customer_name}</p>
                      <p className="text-muted-foreground text-xs">{order.vendor_name} · #{order.id.slice(-4).toUpperCase()}</p>
                    </div>
                    <StatusBadge status={order.status} />
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span>Runner: {order.runner_name || 'Unassigned'}</span>
                    <span>·</span>
                    <span>{date.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-foreground text-sm">₦{order.total?.toLocaleString()}</span>
                    {order.status !== 'delivered' && order.status !== 'cancelled' && (
                      <button
                        onClick={() => handleCancel(order)}
                        className="text-xs font-semibold px-3 py-1.5 rounded-xl"
                        style={{ color: '#B3261E', background: '#FEECEB' }}
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      <Snackbar message={snack} onClose={() => setSnack('')} />
    </AdminShell>
  );
}
