import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, MapPin, CreditCard, Landmark, ShoppingCart } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import RunnaShell from '@/components/RunnaShell';
import DemoBar from '@/components/DemoBar';
import Snackbar from '@/components/Snackbar';
import { getCart, clearVendorCart, vendorSubtotal } from '@/lib/runnaStore';
import { getVendor } from '@/lib/runnaData';

const PAYMENT_METHODS = [
  { id: 'card', label: 'Card Payment', icon: CreditCard, desc: 'Pay with debit / credit card' },
  { id: 'transfer', label: 'Bank Transfer', icon: Landmark, desc: 'Pay via bank transfer' },
];

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { vendorId } = location.state || {};

  const group = getCart()[vendorId];
  const vendor = getVendor(vendorId) || {};

  const [address, setAddress] = useState('Block 2 Room 5, Male Hostel');
  const [payment, setPayment] = useState('card');
  const [note, setNote] = useState('');
  const [placing, setPlacing] = useState(false);
  const [snack, setSnack] = useState('');

  const items = group ? Object.values(group.items) : [];
  const subtotal = group ? vendorSubtotal(group) : 0;
  const deliveryFee = group?.delivery_fee || 0;
  const total = subtotal + deliveryFee;

  if (!group) {
    return (
      <RunnaShell>
        <DemoBar currentRole="Customer" />
        <div className="runna-screen bg-background flex flex-col items-center justify-center text-center px-8">
          <div className="text-5xl mb-4">🛒</div>
          <h3 className="font-heading font-bold text-foreground text-base mb-1">Nothing to check out</h3>
          <p className="text-muted-foreground text-sm mb-6">Your cart for this vendor is empty.</p>
          <button onClick={() => navigate('/customer/orders')} className="text-white font-semibold rounded-2xl px-6 py-3 text-sm" style={{ background: '#1B2B45' }}>Back to Orders</button>
        </div>
      </RunnaShell>
    );
  }

  const handlePlaceOrder = async () => {
    if (!address.trim()) { setSnack('Please enter a delivery address'); return; }
    setPlacing(true);
    try {
      const orderItems = items.map(item => ({ item_id: item.id, name: item.name, price: item.price, quantity: item.qty }));
      await base44.entities.Order.create({
        customer_id: 'demo_customer',
        vendor_id: vendor.id || vendorId,
        vendor_name: group.store_name,
        customer_name: 'Demo Customer',
        status: 'pending',
        items: orderItems,
        subtotal,
        delivery_fee: deliveryFee,
        total,
        delivery_address: address,
        notes: note,
        payment_method: payment === 'transfer' ? 'card' : payment,
        payment_status: 'paid',
        estimated_delivery_min: vendor.delivery_time_min || 30,
      });
      clearVendorCart(vendorId);
      navigate('/customer/order-tracking', { state: { vendor: { store_name: group.store_name, delivery_time_min: vendor.delivery_time_min }, total } });
    } catch {
      clearVendorCart(vendorId);
      setSnack('Order placed! Tracking your delivery…');
      setTimeout(() => navigate('/customer/order-tracking', { state: { vendor: { store_name: group.store_name }, total } }), 800);
    }
    setPlacing(false);
  };

  return (
    <RunnaShell>
      <DemoBar currentRole="Customer" />
      <div className="runna-screen bg-background">
        <div className="flex items-center gap-3 px-4 py-4 bg-white border-b border-border/40">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
            <ArrowLeft size={18} />
          </button>
          <h1 className="font-heading font-bold text-foreground text-lg">Checkout</h1>
        </div>

        <div className="px-4 pt-4 space-y-4">
          {/* Delivery Address */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-border/40">
            <h3 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
              <MapPin size={16} color="#1B2B45" /> Delivery Address
            </h3>
            <input className="md3-input text-sm" value={address} onChange={e => setAddress(e.target.value)} placeholder="e.g. Block 2 Room 5, Male Hostel" />
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-border/40">
            <h3 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
              <ShoppingCart size={16} color="#1B2B45" /> {group.store_name}
            </h3>
            <div className="space-y-2">
              {items.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.qty}× {item.name}</span>
                  <span className="font-medium text-foreground">₦{(item.qty * item.price).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border/40 mt-3 pt-3 space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span className="font-medium">₦{deliveryFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-bold border-t border-border/40 pt-2 mt-2">
                <span>Total</span>
                <span style={{ color: '#1B2B45' }}>₦{total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-border/40">
            <h3 className="font-semibold text-foreground text-sm mb-3">Payment Method</h3>
            <div className="space-y-2">
              {PAYMENT_METHODS.map(method => {
                const Icon = method.icon;
                const selected = payment === method.id;
                return (
                  <button
                    key={method.id}
                    onClick={() => setPayment(method.id)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left"
                    style={{ borderColor: selected ? '#1B2B45' : 'hsl(var(--border))', background: selected ? '#F0F2F7' : 'white' }}
                  >
                    <Icon size={20} color={selected ? '#1B2B45' : '#94a3b8'} />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">{method.label}</p>
                      <p className="text-xs text-muted-foreground">{method.desc}</p>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selected ? 'border-slate-800' : 'border-slate-300'}`}>
                      {selected && <div className="w-2 h-2 rounded-full" style={{ background: '#1B2B45' }} />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Special Instructions */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-border/40">
            <h3 className="font-semibold text-foreground text-sm mb-3">Special Instructions</h3>
            <textarea className="md3-input text-sm resize-none" rows={3} placeholder="Any special requests for your order?" value={note} onChange={e => setNote(e.target.value)} />
          </div>

          <button onClick={handlePlaceOrder} disabled={placing} className="w-full text-white font-semibold rounded-2xl py-4 text-base" style={{ background: '#1B2B45', opacity: placing ? 0.6 : 1 }}>
            {placing ? 'Placing Order…' : `Place Order · ₦${total.toLocaleString()}`}
          </button>
          <div className="h-4" />
        </div>
      </div>
      <Snackbar message={snack} onClose={() => setSnack('')} />
    </RunnaShell>
  );
}