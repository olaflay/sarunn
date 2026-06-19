import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Star, Clock, MapPin, Plus } from 'lucide-react';
import RunnaShell from '@/components/RunnaShell';
import DemoBar from '@/components/DemoBar';
import BottomNav from '@/components/BottomNav';
import ProductModal from '@/components/customer/ProductModal';
import { getVendor, getMenu } from '@/lib/runnaData';
import { useCart, cartItemCount, vendorSubtotal } from '@/lib/runnaStore';

export default function VendorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const cart = useCart();
  const vendor = getVendor(id) || getVendor('1');
  const menuItems = getMenu(vendor.id);
  const [activeItem, setActiveItem] = useState(null);

  const categories = [...new Set(menuItems.map(i => i.category))];
  const group = cart[vendor.id];
  const count = group ? Object.values(group.items).reduce((s, i) => s + i.qty, 0) : 0;
  const total = group ? vendorSubtotal(group) : 0;

  const qtyFor = (itemId) => group?.items?.[itemId]?.qty || 0;

  return (
    <RunnaShell>
      <DemoBar currentRole="Customer" />
      <div className="runna-screen bg-background">
        {/* Cover + Back */}
        <div className="relative">
          <img src={vendor.cover_url} alt={vendor.store_name} className="w-full h-48 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <button
            onClick={() => navigate('/customer/home')}
            className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-md"
          >
            <ArrowLeft size={18} color="#1B2B45" />
          </button>
        </div>

        <div className="px-4">
          {/* Vendor Info Card */}
          <div className="bg-white rounded-2xl -mt-6 relative z-10 p-4 shadow-md mb-4">
            <h1 className="font-heading font-bold text-foreground text-lg">{vendor.store_name}</h1>
            <div className="flex items-center gap-4 mt-2 flex-wrap">
              <span className="flex items-center gap-1 text-xs text-slate-600">
                <Star size={12} fill="#F59E0B" color="#F59E0B" />
                <span className="font-semibold">{vendor.rating}</span>
                <span className="text-muted-foreground">({vendor.rating_count})</span>
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-600">
                <Clock size={12} color="#1E7CFF" />
                {vendor.delivery_time_min} min
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-600">
                <MapPin size={12} />
                {vendor.address}
              </span>
            </div>
          </div>

          {/* Menu */}
          {categories.map(cat => (
            <div key={cat} className="mb-5">
              <h3 className="font-heading font-bold text-foreground text-sm mb-3">{cat}</h3>
              <div className="flex flex-col gap-3">
                {menuItems.filter(i => i.category === cat).map(item => {
                  const q = qtyFor(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveItem(item)}
                      className="md3-card flex items-center gap-3 p-3 text-left"
                    >
                      <img src={item.image_url} alt={item.name} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground text-sm leading-tight">{item.name}</p>
                        <p className="font-bold text-sm mt-1" style={{ color: '#1B2B45' }}>₦{item.price.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {q > 0 && <span className="font-bold text-sm text-foreground">{q} in cart</span>}
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ background: '#1B2B45' }}>
                          <Plus size={16} />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          <div className="h-4" />
        </div>
      </div>

      {/* Cart bar → goes to Orders (My Cart) */}
      {count > 0 && (
        <button
          onClick={() => navigate('/customer/orders')}
          className="absolute bottom-20 left-4 right-4 z-40 flex items-center justify-between text-white rounded-2xl px-5 py-4 shadow-lg"
          style={{ background: '#1B2B45' }}
        >
          <span className="bg-white/20 text-white text-sm font-bold w-6 h-6 rounded-full flex items-center justify-center">{count}</span>
          <span className="font-semibold">View Cart</span>
          <span className="font-bold">₦{total.toLocaleString()}</span>
        </button>
      )}

      {activeItem && (
        <ProductModal vendor={vendor} item={activeItem} onClose={() => setActiveItem(null)} />
      )}

      <BottomNav role="customer" />
    </RunnaShell>
  );
}