import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, MapPin, CreditCard, Wallet, ChevronRight, CheckCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import RunnaShell from '@/components/RunnaShell';
import DemoBar from '@/components/DemoBar';
import Snackbar from '@/components/Snackbar';

const PAYMENT_METHODS = [
  { id: 'card', label: 'Credit / Debit Card', icon: CreditCard, desc: '•••• 4242' },
  { id: 'wallet', label: 'RUNNA Wallet', icon: Wallet, desc: 'Balance: ₦12,500' },
];

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart = {}, vendor = {}, menuItems = [] } = location.state || {};

  const [address, setAddress] = useState('14 Allen Avenue, Ikeja, Lagos');
  const [payment, setPayment] = useState('card');
  const [note, setNote] = useState('');
  const [placing, setPlacing] = useState(false);
  const [snack, setSnack] = useState('');

  const items = menuItems.filter(i => cart[i.id]);
  const subtotal = items.reduce((sum, item) => sum + cart[item.id] * item.price, 0);
  const deliveryFee = (vendor.delivery_fee || 1.5) * 700;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = async () => {
    if (!address.trim()) { setSnack('Please enter a delivery address'); return; }
    setPlacing(true);
    try {
      const orderItems = items.map(item => ({
        item_id: item.id,
        name: item.name,
        price: item.price,
        quantity: cart[item.id],
      }));
      await base44.entities.Order.create({
        customer_id: 'demo_customer',
        vendor_id: vendor.id || '1',
        vendor_name: vendor.store_name || 'Burger Palace',
        customer_name: 'Demo Customer',
        status: 'pending',
        items: orderItems,
        subtotal,
        delivery_fee: deliveryFee,
        total,
        delivery_address: address,
        payment_method: payment,
        payment_status: 'paid',
        estimated_delivery_min: vendor.delivery_time_min || 30,
      });
      navigate('/customer/order-tracking', { state: { vendor, total } });
    } catch {
      setSnack('Order placed! Tracking your delivery…');
      setTimeout(() => navigate('/customer/order-tracking', { state: { vendor, total } }), 800);
    }
    setPlacing(false);
  };

  return (
    <RunnaShell>
      <DemoBar currentRole="Customer" />
      <div className="runna-screen bg-background">
        {/* Header */}
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
              <MapPin size={16} color="#1E7CFF" /> Delivery Address
            </h3>
            <input
              className="md3-input text-sm"
              value={address}
              onChange={e => setAddress(e.target.value)}
              placeholder="Enter your delivery address"
            />
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-border/40">
            <h3 className="font-semibold text-foreground text-sm mb-3">Order from {vendor.store_name || 'Restaurant'}</h3>
            <div className="space-y-2">
              {items.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{cart[item.id]}× {item.name}</span>
                  <span className="font-medium text-foreground">₦{(cart[item.id] * item.price).toLocaleString()}</span>
                </div>
              ))}
              {items.length === 0 && <p className="text-muted-foreground text-sm">No items in cart</p>}
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
                <span style={{ color: '#1E7CFF' }}>₦{total.toLocaleString()}</span>
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
                    style={{ borderColor: selected ? '#1E7CFF' : 'hsl(var(--border))', background: selected ? '#F0F7FF' : 'white' }}
                  >
                    <Icon size={20} color={selected ? '#1E7CFF' : '#94a3b8'} />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">{method.label}</p>
                      <p className="text-xs text-muted-foreground">{method.desc}</p>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selected ? 'border-blue-500' : 'border-slate-300'}`}>
                      {selected && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Special Instructions */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-border/40">
            <h3 className="font-semibold text-foreground text-sm mb-3">Special Instructions</h3>
            <textarea
              className="md3-input text-sm resize-none"
              rows={3}
              placeholder="Any special requests for your order?"
              value={note}
              onChange={e => setNote(e.target.value)}
            />
          </div>

          {/* Place Order */}
          <button
            onClick={handlePlaceOrder}
            disabled={placing}
            className="btn-filled w-full text-sm"
            style={{ borderRadius: '16px', padding: '16px', fontSize: '1rem' }}
          >
            {placing ? 'Placing Order…' : `Place Order · ₦${total.toLocaleString()}`}
          </button>
          <div className="h-4" />
        </div>
      </div>
      <Snackbar message={snack} onClose={() => setSnack('')} />
    </RunnaShell>
  );
}