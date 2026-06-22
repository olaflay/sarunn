import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { addToCart, getItemQty } from '@/lib/runnaStore';

// Chowdeck-style 3/4 bottom-sheet product modal
export default function ProductModal({ vendor, item, onClose, onAdded }) {
  const [qty, setQty] = useState(Math.max(1, getItemQty(vendor.id, item.id)));

  const handleAdd = () => {
    const current = getItemQty(vendor.id, item.id);
    addToCart(vendor, item, qty - current);
    onAdded?.();
    onClose();
  };

  return (
    <div
      className="absolute inset-0 z-[70] flex flex-col justify-end animate-fade-in"
      style={{ background: 'rgba(0,0,0,0.55)' }}
      onClick={onClose}
    >
      {/* 3/4 sheet */}
      <div
        className="relative bg-white rounded-t-3xl animate-slide-up overflow-hidden"
        style={{ maxHeight: '78%' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close pill */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-slate-200 z-10" />

        {/* Image */}
        <div className="relative" style={{ height: '200px' }}>
          <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-md"
          >
            <X size={16} color="#1B2B45" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-4">
            <h2 className="font-heading font-bold text-foreground text-lg leading-tight flex-1">{item.name}</h2>
            <p className="font-bold text-base flex-shrink-0" style={{ color: '#1B2B45' }}>₦{item.price.toLocaleString()}</p>
          </div>

          {item.description && (
            <p className="text-sm text-muted-foreground leading-relaxed mt-2" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {item.description}
            </p>
          )}

          {item.category && (
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-muted text-muted-foreground mt-3 inline-block">
              {item.category}
            </span>
          )}

          {/* Qty stepper + CTA */}
          <div className="flex items-center gap-4 mt-5">
            <div className="flex items-center gap-3 border-2 rounded-2xl px-3 py-2" style={{ borderColor: '#1B2B45' }}>
              <button
                onClick={() => setQty(q => Math.max(1, q - 1))}
                className="w-7 h-7 flex items-center justify-center"
              >
                <Minus size={16} color={qty <= 1 ? '#94a3b8' : '#1B2B45'} />
              </button>
              <span className="font-heading font-bold text-base text-foreground w-5 text-center">{qty}</span>
              <button
                onClick={() => setQty(q => q + 1)}
                className="w-7 h-7 flex items-center justify-center"
              >
                <Plus size={16} color="#1B2B45" />
              </button>
            </div>
            <button
              onClick={handleAdd}
              className="flex-1 flex items-center justify-between text-white font-semibold rounded-2xl px-4 py-3 text-sm"
              style={{ background: '#1B2B45' }}
            >
              <span>Add to Cart</span>
              <span>₦{(item.price * qty).toLocaleString()}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}