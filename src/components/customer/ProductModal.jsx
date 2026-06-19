import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { addToCart, getItemQty } from '@/lib/runnaStore';

// Chowdeck-style full-screen product modal (no description)
export default function ProductModal({ vendor, item, onClose, onAdded }) {
  const [qty, setQty] = useState(Math.max(1, getItemQty(vendor.id, item.id)));

  const handleAdd = () => {
    const current = getItemQty(vendor.id, item.id);
    addToCart(vendor, item, qty - current);
    onAdded?.();
    onClose();
  };

  return (
    <div className="absolute inset-0 z-[70] flex flex-col bg-white animate-fade-in">
      {/* Hero image */}
      <div className="relative" style={{ height: '52%' }}>
        <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md"
        >
          <X size={18} color="#1B2B45" />
        </button>
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col p-5">
        <h2 className="font-heading font-bold text-foreground text-xl leading-tight">{item.name}</h2>
        <p className="font-bold text-lg mt-2" style={{ color: '#1B2B45' }}>₦{item.price.toLocaleString()}</p>

        <div className="mt-auto pt-5">
          {/* Qty stepper */}
          <div className="flex items-center justify-center gap-6 mb-4">
            <button
              onClick={() => setQty(q => Math.max(1, q - 1))}
              className="w-11 h-11 rounded-full border-2 flex items-center justify-center"
              style={{ borderColor: qty <= 1 ? '#E5E7EB' : '#1B2B45' }}
            >
              <Minus size={18} color={qty <= 1 ? '#9CA3AF' : '#1B2B45'} />
            </button>
            <span className="font-heading font-bold text-2xl text-foreground w-8 text-center">{qty}</span>
            <button
              onClick={() => setQty(q => q + 1)}
              className="w-11 h-11 rounded-full border-2 flex items-center justify-center"
              style={{ borderColor: '#1B2B45' }}
            >
              <Plus size={18} color="#1B2B45" />
            </button>
          </div>

          <button
            onClick={handleAdd}
            className="w-full flex items-center justify-between text-white font-semibold rounded-2xl px-5 py-4"
            style={{ background: '#1B2B45' }}
          >
            <span>Add to Cart</span>
            <span>₦{(item.price * qty).toLocaleString()}</span>
          </button>
        </div>
      </div>
    </div>
  );
}