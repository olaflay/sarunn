import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Star, Clock, MapPin, Plus, Minus, ShoppingCart } from 'lucide-react';
import RunnaShell from '@/components/RunnaShell';
import DemoBar from '@/components/DemoBar';
import BottomNav from '@/components/BottomNav';

const MOCK_VENDORS = {
  '1': { id: '1', store_name: 'Burger Palace', category: 'food', rating: 4.8, rating_count: 312, delivery_time_min: 25, delivery_fee: 1.5, address: '14 Allen Ave, Ikeja', cover_url: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=200&fit=crop' },
  '2': { id: '2', store_name: 'Fresh Mart', category: 'groceries', rating: 4.6, rating_count: 218, delivery_time_min: 35, delivery_fee: 2.0, address: '7 Victoria Island', cover_url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=200&fit=crop' },
  '3': { id: '3', store_name: 'Sushi Garden', category: 'food', rating: 4.9, rating_count: 541, delivery_time_min: 40, delivery_fee: 2.5, address: '23 Lekki Phase 1', cover_url: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=200&fit=crop' },
  '5': { id: '5', store_name: 'Artisan Bakery', category: 'bakery', rating: 4.7, rating_count: 193, delivery_time_min: 30, delivery_fee: 1.5, address: '5 Bode Thomas, Surulere', cover_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=200&fit=crop' },
  '6': { id: '6', store_name: 'Brew & Co.', category: 'drinks', rating: 4.6, rating_count: 154, delivery_time_min: 20, delivery_fee: 1.0, address: '3 Admiralty Way, Lekki', cover_url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=200&fit=crop' },
};

const MOCK_MENU = {
  '1': [
    { id: 'm1', name: 'Classic Smash Burger', description: 'Double patty, cheddar, special sauce', price: 4500, image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=80&h=80&fit=crop', category: 'Burgers' },
    { id: 'm2', name: 'BBQ Bacon Burger', description: 'Crispy bacon, BBQ sauce, pickles', price: 5200, image_url: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=80&h=80&fit=crop', category: 'Burgers' },
    { id: 'm3', name: 'Crispy Fries (Large)', description: 'Seasoned with our signature spice blend', price: 1500, image_url: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=80&h=80&fit=crop', category: 'Sides' },
    { id: 'm4', name: 'Chicken Strips', description: '5 pieces with dipping sauce', price: 3800, image_url: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=80&h=80&fit=crop', category: 'Sides' },
    { id: 'm5', name: 'Chocolate Milkshake', description: 'Thick, creamy, indulgent', price: 2200, image_url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=80&h=80&fit=crop', category: 'Drinks' },
  ],
  '6': [
    { id: 'b1', name: 'Espresso', description: 'Double shot, rich and bold', price: 1200, image_url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=80&h=80&fit=crop', category: 'Coffee' },
    { id: 'b2', name: 'Brown Sugar Boba', description: 'Tiger pearls, brown sugar milk tea', price: 2800, image_url: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=80&h=80&fit=crop', category: 'Boba' },
    { id: 'b3', name: 'Matcha Latte', description: 'Ceremonial matcha, oat milk', price: 2500, image_url: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=80&h=80&fit=crop', category: 'Tea' },
  ],
};

function getDefaultMenu(vendorId) {
  const base = [
    { id: 'd1', name: 'Featured Item 1', description: 'Delicious and fresh', price: 3500, image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=80&h=80&fit=crop', category: 'Popular' },
    { id: 'd2', name: 'Featured Item 2', description: 'Customer favourite', price: 2800, image_url: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=80&h=80&fit=crop', category: 'Popular' },
    { id: 'd3', name: 'Special of the Day', description: 'Today\'s chef special', price: 4200, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=80&h=80&fit=crop', category: 'Specials' },
  ];
  return base;
}

export default function VendorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const vendor = MOCK_VENDORS[id] || MOCK_VENDORS['1'];
  const menuItems = MOCK_MENU[id] || getDefaultMenu(id);
  const [cart, setCart] = useState({});

  const addToCart = (item) => setCart(c => ({ ...c, [item.id]: (c[item.id] || 0) + 1 }));
  const removeFromCart = (item) => setCart(c => {
    const next = { ...c };
    if (next[item.id] > 1) next[item.id]--;
    else delete next[item.id];
    return next;
  });

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = menuItems.reduce((sum, item) => sum + (cart[item.id] || 0) * item.price, 0);

  const categories = [...new Set(menuItems.map(i => i.category))];

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
            <div className="flex items-center gap-4 mt-2">
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
                {menuItems.filter(i => i.category === cat).map(item => (
                  <div key={item.id} className="md3-card flex items-center gap-3 p-3">
                    <img src={item.image_url} alt={item.name} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground text-sm leading-tight">{item.name}</p>
                      <p className="text-muted-foreground text-xs mt-0.5 line-clamp-1">{item.description}</p>
                      <p className="font-bold text-sm mt-1" style={{ color: '#1E7CFF' }}>₦{item.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {cart[item.id] ? (
                        <>
                          <button onClick={() => removeFromCart(item)} className="w-7 h-7 rounded-full border-2 border-blue-500 flex items-center justify-center">
                            <Minus size={12} color="#1E7CFF" />
                          </button>
                          <span className="font-bold text-sm w-4 text-center text-foreground">{cart[item.id]}</span>
                        </>
                      ) : null}
                      <button onClick={() => addToCart(item)} className="w-7 h-7 rounded-full flex items-center justify-center text-white" style={{ background: '#1E7CFF' }}>
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="h-4" />
        </div>
      </div>

      {/* Cart FAB */}
      {cartCount > 0 && (
        <button
          onClick={() => navigate('/customer/checkout', { state: { cart, vendor, menuItems } })}
          className="absolute bottom-20 left-4 right-4 z-40 btn-filled w-auto mx-4 flex items-center justify-between"
          style={{ borderRadius: '16px', padding: '14px 20px' }}
        >
          <span className="bg-white/20 text-white text-sm font-bold w-6 h-6 rounded-full flex items-center justify-center">{cartCount}</span>
          <span className="font-semibold">View Cart</span>
          <span className="font-bold">₦{cartTotal.toLocaleString()}</span>
        </button>
      )}

      <BottomNav role="customer" />
    </RunnaShell>
  );
}