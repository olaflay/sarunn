import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, MapPin, CreditCard, Landmark, ShoppingCart, AlertTriangle, ChevronRight } from 'lucide-react';
import { sarunnApi } from '@/lib/runnaClient';
import RunnaShell from '@/components/RunnaShell';
import Snackbar from '@/components/Snackbar';
import DeliveryLocationPicker from '@/components/customer/DeliveryLocationPicker';
import { getCart, clearVendorCart, vendorSubtotal, getDeliveryLocation, useCampus } from '@/lib/runnaStore';
import { getVendor, getLocationLabel } from '@/lib/runnaData';

const PAYMENT_METHODS = [
  { id: 'card', label: 'Card Payment', icon: CreditCard, desc: 'Pay with debit or credit card' },
  { id: 'transfer', label: 'Bank Transfer', icon: Landmark, desc: 'Pay via bank transfer' },
];

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { vendorId } = location.state || {};
  const campusId = useCampus();

  const group = getCart()[vendorId];
  const vendor = getVendor(vendorId) || {};

  const [payment, setPayment] = useState('card');
  const [note, setNote] = useState('');
  const [placing, setPlacing] = useState(false);
  const [snack, setSnack] = useState('');
  const [locPickerOpen, setLocPickerOpen] = useState(false);
  const [deliveryLoc, setDeliveryLocState] = useState(getDeliveryLocation());

  const locLabel = campusId && deliveryLoc
    ? getLocationLabel(campusId, deliveryLoc.mainId, deliveryLoc.subId)
    : null;
  const locFull = locLabel
    ? `${locLabel}${deliveryLoc?.note ? `, ${deliveryLoc.note}` : ''}`
    : '';

  const items = group ? Object.values(group.items) : [];
  const subtotal = group ? vendorSubtotal(group) : 0;
  const deliveryFee = group?.delivery_fee || 0;
  const total = subtotal + deliveryFee;

  if (!group) {
    return (
      <RunnaShell>
        <div className="sarunn-screen bg-background flex flex-col items-center justify-center px-6 text-center">
          <div className="mb-4 text-5xl" aria-hidden="true">🛒</div>
          <h3 className="font-heading text-base font-bold text-foreground">Nothing to check out</h3>
          <p className="mb-6 text-sm text-muted-foreground">Your cart for this vendor is empty.</p>
          <button onClick={() => navigate('/customer/orders')} className="btn-filled px-6">
            Back to Orders
          </button>
        </div>
      </RunnaShell>
    );
  }

  const handlePlaceOrder = async () => {
    if (!deliveryLoc || !deliveryLoc.mainId) {
      setLocPickerOpen(true);
      setSnack('Please set your delivery location first');
      return;
    }

    setPlacing(true);
    try {
      const orderItems = items.map((item) => ({
        item_id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.qty,
      }));

      await sarunnApi.entities.Order.create({
        customer_id: 'demo_customer',
        vendor_id: 'demo_vendor',
        vendor_ref: vendor.id || vendorId,
        vendor_name: group.store_name,
        customer_name: 'Demo Customer',
        status: 'pending',
        items: orderItems,
        subtotal,
        delivery_fee: deliveryFee,
        total,
        delivery_address: locFull,
        notes: note,
        payment_method: payment,
        payment_status: 'paid',
        estimated_delivery_min: vendor.delivery_time_min || 30,
      });

      clearVendorCart(vendorId);
      navigate('/customer/order-tracking', {
        state: {
          vendor: { store_name: group.store_name, delivery_time_min: vendor.delivery_time_min },
          total,
        },
      });
    } catch {
      clearVendorCart(vendorId);
      setSnack('Order placed! Tracking your delivery...');
      setTimeout(
        () => navigate('/customer/order-tracking', { state: { vendor: { store_name: group.store_name }, total } }),
        800,
      );
    }

    setPlacing(false);
  };

  return (
    <RunnaShell>
      <div className="sarunn-screen bg-background">
        <header className="sticky top-0 z-20 border-b border-border/40 bg-white/95 backdrop-blur-sm">
          <div className="flex items-center gap-3 px-4 py-4 lg:px-6">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-muted transition hover:bg-muted/80"
              aria-label="Go back"
            >
              <ArrowLeft size={18} aria-hidden="true" />
            </button>
            <div className="min-w-0">
              <h1 className="font-heading text-lg font-bold text-foreground lg:text-xl">Checkout</h1>
              <p className="text-xs text-muted-foreground">Review your delivery details before placing the order</p>
            </div>
          </div>
        </header>

        <div className="px-4 py-4 lg:px-6 lg:py-6">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start lg:gap-6">
            <div className="space-y-4">
              <section className="rounded-[24px] border border-border/40 bg-card p-4 shadow-sm lg:p-5">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <MapPin size={16} color="#1B2B45" aria-hidden="true" />
                  Delivery Location
                </h3>
                <button
                  onClick={() => setLocPickerOpen(true)}
                  className="flex w-full items-center gap-3 rounded-2xl border-2 p-3 text-left transition-colors hover:bg-muted/40"
                  style={{ borderColor: locLabel ? '#1B2B45' : '#F59E0B', background: locLabel ? '#F0F2F7' : '#FFFBEB' }}
                >
                  <MapPin size={16} color={locLabel ? '#1B2B45' : '#F59E0B'} aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    {locLabel ? (
                      <>
                        <p className="text-sm font-semibold text-foreground">{locLabel}</p>
                        {deliveryLoc?.note && <p className="truncate text-xs text-muted-foreground">{deliveryLoc.note}</p>}
                      </>
                    ) : (
                      <p className="text-sm font-semibold text-amber-700">Set delivery location before ordering</p>
                    )}
                  </div>
                  <ChevronRight size={15} color="#94a3b8" aria-hidden="true" />
                </button>
              </section>

              <section className="rounded-[24px] border border-border/40 bg-card p-4 shadow-sm lg:p-5">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <CreditCard size={16} color="#1B2B45" aria-hidden="true" />
                  Payment Method
                </h3>
                <div className="space-y-2">
                  {PAYMENT_METHODS.map((method) => {
                    const Icon = method.icon;
                    const selected = payment === method.id;
                    return (
                      <button
                        key={method.id}
                        onClick={() => setPayment(method.id)}
                        className="flex w-full items-center gap-3 rounded-2xl border-2 p-3 text-left transition-colors hover:bg-muted/40"
                        style={{ borderColor: selected ? '#1B2B45' : 'hsl(var(--border))', background: selected ? '#F0F2F7' : 'white' }}
                      >
                        <Icon size={20} color={selected ? '#1B2B45' : '#94a3b8'} aria-hidden="true" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-foreground">{method.label}</p>
                          <p className="text-xs text-muted-foreground">{method.desc}</p>
                        </div>
                        <div className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${selected ? 'border-slate-800' : 'border-slate-300'}`}>
                          {selected && <div className="h-2 w-2 rounded-full bg-slate-800" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className="rounded-[24px] border border-border/40 bg-card p-4 shadow-sm lg:p-5">
                <h3 className="mb-3 text-sm font-semibold text-foreground">Special Instructions</h3>
                <textarea
                  className="md3-input min-h-28 resize-none"
                  rows={4}
                  placeholder="Any special requests?"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </section>

              {!locLabel && (
                <div className="flex items-start gap-2 rounded-2xl bg-amber-50 px-4 py-3 text-xs font-medium text-amber-900">
                  <AlertTriangle size={14} className="mt-0.5 shrink-0" color="#F59E0B" aria-hidden="true" />
                  <span>You must set your delivery location before placing the order.</span>
                </div>
              )}

              <button
                onClick={handlePlaceOrder}
                disabled={placing}
                className="btn-filled w-full px-6 text-base"
              >
                {placing ? 'Placing order...' : `Place Order · ₦${total.toLocaleString()}`}
              </button>
            </div>

            <aside className="lg:sticky lg:top-6">
              <section className="rounded-[28px] border border-border/40 bg-card p-4 shadow-sm lg:p-5">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <ShoppingCart size={16} color="#1B2B45" aria-hidden="true" />
                  {group.store_name}
                </h3>

                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-start justify-between gap-4 text-sm">
                      <span className="min-w-0 flex-1 text-muted-foreground">
                        {item.qty}× {item.name}
                      </span>
                      <span className="font-medium text-foreground">₦{(item.qty * item.price).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 space-y-2 border-t border-border/40 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">₦{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery Fee</span>
                    <span className="font-medium">₦{deliveryFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t border-border/40 pt-3 text-sm font-bold">
                    <span>Total</span>
                    <span style={{ color: '#1B2B45' }}>₦{total.toLocaleString()}</span>
                  </div>
                </div>
              </section>
            </aside>
          </div>
        </div>
      </div>

      <DeliveryLocationPicker
        campusId={campusId}
        open={locPickerOpen}
        onClose={() => setLocPickerOpen(false)}
        onSave={(loc) => setDeliveryLocState(loc)}
      />
      <Snackbar message={snack} onClose={() => setSnack('')} />
    </RunnaShell>
  );
}
