import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Headset } from 'lucide-react';

const STEPS = ['pending', 'confirmed', 'ready', 'picked_up', 'delivered'];
const STEP_LABELS = {
  pending: 'Placed',
  confirmed: 'Accepted',
  ready: 'Ready',
  picked_up: 'On the way',
  delivered: 'Delivered',
};

export default function OngoingOrderCard({ order }) {
  const navigate = useNavigate();
  const idx = Math.max(0, STEPS.indexOf(order.status));
  const pct = ((idx + 1) / STEPS.length) * 100;

  return (
    <div className="md3-card p-4 mb-3">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-heading font-semibold text-foreground text-sm">{order.vendor_name}</p>
          <p className="text-muted-foreground text-xs mt-0.5">
            {order.items?.map(i => `${i.quantity}× ${i.name}`).join(', ')}
          </p>
        </div>
        <span
          className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg flex-shrink-0"
          style={{ background: '#FEF3C7', color: '#B45309' }}
        >
          <Clock size={11} /> {order.estimated_delivery_min || 30} min
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: '#1E7CFF' }} />
      </div>
      <p className="text-xs font-medium mt-2" style={{ color: '#1E7CFF' }}>{STEP_LABELS[order.status] || 'Placed'}</p>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
        <span className="font-bold text-foreground text-sm">₦{(order.total || 0).toLocaleString()}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/customer/support')}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border border-border text-muted-foreground"
          >
            <Headset size={12} /> Support
          </button>
          <button
            onClick={() => navigate('/customer/order-tracking', { state: { vendor: { store_name: order.vendor_name, delivery_time_min: order.estimated_delivery_min }, total: order.total } })}
            className="text-xs font-semibold px-3 py-1.5 rounded-xl text-white"
            style={{ background: '#1B2B45' }}
          >
            Track
          </button>
        </div>
      </div>
    </div>
  );
}