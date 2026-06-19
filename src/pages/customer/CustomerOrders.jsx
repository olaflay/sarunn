import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, RefreshCw, ChevronRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import RunnaShell from '@/components/RunnaShell';
import DemoBar from '@/components/DemoBar';
import BottomNav from '@/components/BottomNav';
import StatusBadge from '@/components/StatusBadge';

const MOCK_ORDERS = [
  { id: 'o1', vendor_name: 'Burger Palace', status: 'delivered', total: 11400, created_date: new Date(Date.now() - 86400000).toISOString(), items: [{ name: 'Classic Smash Burger', quantity: 2 }, { name: 'Fries', quantity: 1 }] },
  { id: 'o2', vendor_name: 'Sushi Garden', status: 'delivered', total: 18600, created_date: new Date(Date.now() - 3 * 86400000).toISOString(), items: [{ name: 'Salmon Roll', quantity: 2 }] },
  { id: 'o3', vendor_name: 'Fresh Mart', status: 'cancelled', total: 8400, created_date: new Date(Date.now() - 7 * 86400000).toISOString(), items: [{ name: 'Groceries bundle', quantity: 1 }] },
];

function OrderCard({ order, onReorder }) {
  const date = new Date(order.created_date);
  return (
    <div className="md3-card p-4 mb-3">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="font-semibold text-foreground text-sm">{order.vendor_name}</p>
          <p className="text-muted-foreground text-xs mt-0.5">
            {date.toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}
          </p>
        </div>
        <StatusBadge status={order.status} />
      </div>
      <p className="text-muted-foreground text-xs mb-3">
        {order.items?.map(i => `${i.quantity}× ${i.name}`).join(', ')}
      </p>
      <div className="flex items-center justify-between">
        <span className="font-bold text-foreground text-sm">₦{order.total.toLocaleString()}</span>
        {order.status === 'delivered' && (
          <button
            onClick={() => onReorder(order)}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border-2 transition-all"
            style={{ color: '#1E7CFF', borderColor: '#1E7CFF' }}
          >
            <RefreshCw size={12} /> Reorder
          </button>
        )}
      </div>
    </div>
  );
}

export default function CustomerOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Order.filter({ customer_id: 'demo_customer' }, '-created_date', 20)
      .then(data => { if (data.length) setOrders(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleReorder = (order) => {
    navigate('/customer/home');
  };

  return (
    <RunnaShell>
      <DemoBar currentRole="Customer" />
      <div className="runna-screen bg-background">
        <div className="flex items-center gap-3 px-4 py-4 bg-white border-b border-border/40 sticky top-0 z-30">
          <ShoppingBag size={20} color="#1E7CFF" />
          <h1 className="font-heading font-bold text-foreground text-lg">My Orders</h1>
        </div>

        <div className="px-4 pt-4">
          {loading ? (
            <div className="space-y-3">
              {[1,2,3].map(i => <div key={i} className="skeleton h-28 rounded-2xl" />)}
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🛍️</div>
              <h3 className="font-heading font-bold text-foreground text-lg mb-2">No orders yet</h3>
              <p className="text-muted-foreground text-sm mb-6">Start exploring and place your first order!</p>
              <button onClick={() => navigate('/customer/home')} className="btn-filled px-6">Browse Stores</button>
            </div>
          ) : (
            orders.map(order => (
              <OrderCard key={order.id} order={order} onReorder={handleReorder} />
            ))
          )}
        </div>
      </div>
      <BottomNav role="customer" />
    </RunnaShell>
  );
}