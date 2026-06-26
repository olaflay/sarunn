import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Package, ClipboardList } from 'lucide-react';
import RunnaShell from '@/components/RunnaShell';
import BottomNav from '@/components/BottomNav';
import CartVendorGroup from '@/components/customer/CartVendorGroup';
import OngoingOrderCard from '@/components/customer/OngoingOrderCard';
import CompletedOrderCard from '@/components/customer/CompletedOrderCard';
import { ErrorState, LoadingState } from '@/components/PageStates';
import { useCart, cartItemCount, clearCart } from '@/lib/runnaStore';
import { useOrdersStore, ordersActions } from '@/store';

const TABS = [
  { id: 'cart', label: 'My Cart' },
  { id: 'ongoing', label: 'Ongoing' },
  { id: 'completed', label: 'Completed' },
];

const ONGOING_STATUSES = ['pending', 'confirmed', 'ready', 'picked_up'];

export default function CustomerOrders() {
  const navigate = useNavigate();
  const cart = useCart();
  const [tab, setTab] = useState('cart');
  const orders = useOrdersStore((state) => state.orders);
  const loading = useOrdersStore((state) => state.isLoading);
  const error = useOrdersStore((state) => state.error);

  useEffect(() => {
    ordersActions.hydrateOrders();
  }, []);

  const ongoing = orders.filter((order) => ONGOING_STATUSES.includes(order.status));
  const completed = orders.filter((order) => ['delivered', 'cancelled'].includes(order.status));

  const cartGroups = Object.values(cart);
  const count = cartItemCount(cart);

  return (
    <RunnaShell>
      <div className="runna-screen bg-background">
        {/* Header */}
        <div className="bg-white border-b border-border/40 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-3">
              <ShoppingBag size={20} color="#1B2B45" />
              <h1 className="font-heading font-bold text-foreground text-lg">Orders</h1>
            </div>
            {tab === 'cart' && count > 0 && (
              <button
                onClick={clearCart}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border border-border text-muted-foreground"
              >
                <Trash2 size={12} /> Clear Cart
              </button>
            )}
          </div>
          {/* Tabs */}
          <div className="flex px-4 gap-1">
            {TABS.map(t => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className="flex-1 pb-3 pt-1 text-sm font-semibold relative transition-colors"
                  style={{ color: active ? '#1B2B45' : '#94a3b8' }}
                >
                  {t.label}
                  {t.id === 'cart' && count > 0 && (
                    <span className="ml-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-red-500 text-white">{count}</span>
                  )}
                  {active && <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" style={{ background: '#1B2B45' }} />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="px-4 pt-4">
          {error && tab !== 'cart' && (
            <div className="mb-4">
              <ErrorState
                title="Could not load orders"
                subtitle="Check your connection and try again."
                actionLabel="Retry"
                onAction={ordersActions.hydrateOrders}
              />
            </div>
          )}
          {/* MY CART */}
          {tab === 'cart' && (
            cartGroups.length === 0 ? (
              <EmptyState icon={ShoppingBag} title="Your cart is empty" sub="Add items from a vendor to get started" cta="Browse Vendors" onCta={() => navigate('/customer/home')} />
            ) : (
              cartGroups.map(group => (
                <CartVendorGroup
                  key={group.vendorId}
                  group={group}
                  onCheckout={(vendorId) => navigate('/customer/checkout', { state: { vendorId } })}
                />
              ))
            )
          )}

          {/* ONGOING */}
          {tab === 'ongoing' && (
            loading ? <LoadingState title="Loading ongoing orders" subtitle="Fetching your live order updates." rows={3} /> :
            ongoing.length === 0 ? (
              <EmptyState icon={Package} title="No ongoing orders" sub="Your live orders will show up here" cta="Order Now" onCta={() => navigate('/customer/home')} />
            ) : (
              ongoing.map(o => <OngoingOrderCard key={o.id} order={o} />)
            )
          )}

          {/* COMPLETED */}
          {tab === 'completed' && (
            loading ? <LoadingState title="Loading completed orders" subtitle="Fetching your order history." rows={3} /> :
            completed.length === 0 ? (
              <EmptyState icon={ClipboardList} title="No past orders" sub="Completed orders will appear here" cta="Browse Vendors" onCta={() => navigate('/customer/home')} />
            ) : (
              completed.map(o => <CompletedOrderCard key={o.id} order={o} onReorder={() => navigate('/customer/home')} />)
            )
          )}
        </div>
      </div>
      <BottomNav role="customer" />
    </RunnaShell>
  );
}

function EmptyState({ icon: Icon, title, sub, cta, onCta }) {
  return (
    <div className="text-center py-20">
      <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
        <Icon size={28} color="#94a3b8" />
      </div>
      <h3 className="font-heading font-bold text-foreground text-base mb-1">{title}</h3>
      <p className="text-muted-foreground text-sm mb-6">{sub}</p>
      <button onClick={onCta} className="text-white font-semibold rounded-2xl px-6 py-3 text-sm" style={{ background: '#1B2B45' }}>{cta}</button>
    </div>
  );
}
