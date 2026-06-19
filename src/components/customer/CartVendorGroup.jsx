import React from 'react';
import { Plus, Minus, Trash2, Store } from 'lucide-react';
import { setItemQty, clearVendorCart, vendorSubtotal } from '@/lib/runnaStore';

export default function CartVendorGroup({ group, onCheckout }) {
  const items = Object.values(group.items);
  const subtotal = vendorSubtotal(group);
  const total = subtotal + (group.delivery_fee || 0);

  return (
    <div className="md3-card p-4 mb-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#F0F2F7' }}>
            <Store size={15} color="#1B2B45" />
          </div>
          <p className="font-heading font-semibold text-foreground text-sm">{group.store_name}</p>
        </div>
        <button
          onClick={() => clearVendorCart(group.vendorId)}
          className="text-muted-foreground hover:text-red-500 transition-colors"
        >
          <Trash2 size={15} />
        </button>
      </div>

      <div className="space-y-3">
        {items.map(item => (
          <div key={item.id} className="flex items-center gap-3">
            <img src={item.image_url} alt={item.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground text-sm leading-tight truncate">{item.name}</p>
              <p className="font-bold text-sm mt-0.5" style={{ color: '#1B2B45' }}>₦{item.price.toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => setItemQty(group.vendorId, item.id, item.qty - 1)}
                className="w-7 h-7 rounded-full border-2 flex items-center justify-center"
                style={{ borderColor: '#1B2B45' }}
              >
                {item.qty <= 1 ? <Trash2 size={11} color="#DC2626" /> : <Minus size={12} color="#1B2B45" />}
              </button>
              <span className="font-bold text-sm w-4 text-center text-foreground">{item.qty}</span>
              <button
                onClick={() => setItemQty(group.vendorId, item.id, item.qty + 1)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-white"
                style={{ background: '#1B2B45' }}
              >
                <Plus size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border/50 mt-3 pt-3 space-y-1.5">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Subtotal</span>
          <span>₦{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Delivery fee</span>
          <span>₦{(group.delivery_fee || 0).toLocaleString()}</span>
        </div>
        <button
          onClick={() => onCheckout(group.vendorId)}
          className="w-full flex items-center justify-between text-white font-semibold rounded-xl px-4 py-3 mt-2"
          style={{ background: '#1B2B45' }}
        >
          <span className="text-sm">Checkout</span>
          <span className="text-sm">₦{total.toLocaleString()}</span>
        </button>
      </div>
    </div>
  );
}