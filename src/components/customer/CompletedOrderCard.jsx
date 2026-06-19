import React from 'react';
import { RefreshCw } from 'lucide-react';
import StatusBadge from '@/components/StatusBadge';

export default function CompletedOrderCard({ order, onReorder }) {
  const date = new Date(order.created_date);
  return (
    <div className="md3-card p-4 mb-3">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="font-heading font-semibold text-foreground text-sm">{order.vendor_name}</p>
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
        <span className="font-bold text-foreground text-sm">₦{(order.total || 0).toLocaleString()}</span>
        {order.status === 'delivered' && (
          <button
            onClick={() => onReorder(order)}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border-2"
            style={{ color: '#1B2B45', borderColor: '#1B2B45' }}
          >
            <RefreshCw size={12} /> Reorder
          </button>
        )}
      </div>
    </div>
  );
}