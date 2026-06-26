import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Clock, Package, Bike, Home, Phone, Star, MapPin, ReceiptText } from 'lucide-react';
import RunnaShell from '@/components/RunnaShell';
import BottomNav from '@/components/BottomNav';

const STATUS_STEPS = [
  { key: 'pending', label: 'Order Placed', sub: 'Your order has been sent to the restaurant', icon: Package, color: '#1E7CFF' },
  { key: 'confirmed', label: 'Order Confirmed', sub: 'The restaurant is preparing your food', icon: CheckCircle, color: '#9333EA' },
  { key: 'ready', label: 'Ready for Pickup', sub: 'Runner is heading to pick up your order', icon: Clock, color: '#F59E0B' },
  { key: 'picked_up', label: 'Out for Delivery', sub: 'Your runner is on the way to you', icon: Bike, color: '#F59E0B' },
  { key: 'delivered', label: 'Delivered! 🎉', sub: 'Enjoy your meal!', icon: Home, color: '#2E7D32' },
];

export default function OrderTracking() {
  const navigate = useNavigate();
  const location = useLocation();
  const { vendor = {}, total = 0 } = location.state || {};
  const [currentStep, setCurrentStep] = useState(0);
  const [showReview, setShowReview] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (currentStep >= STATUS_STEPS.length - 1) {
      const reviewTimer = setTimeout(() => setShowReview(true), 1000);
      return () => clearTimeout(reviewTimer);
    }

    const delays = [3000, 5000, 4000, 6000];
    const stepTimer = setTimeout(() => setCurrentStep((s) => s + 1), delays[currentStep] || 4000);
    return () => clearTimeout(stepTimer);
  }, [currentStep]);

  const step = STATUS_STEPS[currentStep];
  const StepIcon = step.icon;

  if (showReview) {
    return (
      <RunnaShell>
        <div className="runna-screen bg-background px-4 py-6 lg:px-6 lg:py-8">
          <div className="mx-auto flex max-w-5xl items-start justify-center lg:justify-start">
            <div className="grid w-full gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
              <section className="rounded-[28px] border border-border/40 bg-card p-6 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-50 animate-fade-in">
                  <CheckCircle size={40} color="#2E7D32" />
                </div>
                <h2 className="mb-1 font-heading text-xl font-bold text-foreground animate-fade-in-up">Order Delivered!</h2>
                <p className="mb-6 text-sm text-muted-foreground">Rate your experience with {vendor.store_name || 'the restaurant'}</p>

                <div className="mb-4 rounded-[24px] border border-border/40 bg-white p-5 shadow-sm animate-fade-in-up">
                  <p className="mb-3 text-sm font-semibold text-foreground">How was your food?</p>
                  <div className="mb-4 flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button key={s} onClick={() => setRating(s)} aria-label={`Rate ${s} stars`}>
                        <Star size={32} fill={s <= rating ? '#F59E0B' : 'none'} color={s <= rating ? '#F59E0B' : '#CBD5E1'} />
                      </button>
                    ))}
                  </div>
                  <textarea className="md3-input text-sm resize-none" rows={3} placeholder="Leave a comment (optional)" />
                </div>

                <button onClick={() => navigate('/customer/home')} className="btn-filled w-full px-6">
                  Submit & Go Home
                </button>
              </section>

              <aside className="space-y-4">
                <section className="rounded-[28px] border border-border/40 bg-card p-5 shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Order Summary</p>
                  <div className="mt-3 space-y-2 text-sm">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-muted-foreground">Restaurant</span>
                      <span className="font-medium text-foreground">{vendor.store_name || 'Restaurant'}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-muted-foreground">Total</span>
                      <span className="font-bold text-foreground">₦{total.toLocaleString()}</span>
                    </div>
                  </div>
                </section>

                <section className="rounded-[28px] border border-border/40 bg-card p-5 shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Next Steps</p>
                  <div className="mt-3 space-y-3 text-sm text-muted-foreground">
                    <p>Keep notifications on for your next order.</p>
                    <p>Track new requests from the sidebar on tablet and desktop.</p>
                  </div>
                </section>
              </aside>
            </div>
          </div>
        </div>
        <BottomNav role="customer" />
      </RunnaShell>
    );
  }

  return (
    <RunnaShell>
      <div className="runna-screen bg-background">
        <header className="border-b border-border/40 bg-white/95 px-4 pb-4 pt-6 backdrop-blur-sm lg:px-6">
          <div className="mx-auto flex max-w-5xl items-start gap-4">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full animate-fade-in" style={{ background: `${step.color}25` }}>
                <StepIcon size={30} color={step.color} aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <h2 className="font-heading text-lg font-bold text-foreground lg:text-2xl">{step.label}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{step.sub}</p>
              </div>
            </div>
            <button className="hidden items-center gap-2 rounded-full bg-muted px-3 py-2 text-sm font-semibold text-foreground lg:inline-flex">
              <Phone size={15} aria-hidden="true" />
              Call Runner
            </button>
          </div>
        </header>

        <div className="mx-auto grid max-w-5xl gap-4 px-4 py-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:gap-6 lg:px-6 lg:py-6">
          <section className="space-y-4">
            <div className="rounded-[24px] border border-border/40 bg-card p-4 shadow-sm lg:hidden">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Estimated Arrival</p>
                  <p className="font-heading text-2xl font-bold text-foreground">{Math.max(35 - currentStep * 8, 5)} min</p>
                </div>
                <button className="inline-flex items-center gap-2 rounded-xl bg-muted px-3 py-2 text-sm font-semibold text-foreground">
                  <Phone size={15} aria-hidden="true" />
                  Call Runner
                </button>
              </div>
            </div>

            <section className="rounded-[24px] border border-border/40 bg-card p-4 shadow-sm lg:p-5">
              <div className="hidden items-center justify-between lg:flex">
                <h3 className="text-sm font-semibold text-foreground">Order Progress</h3>
                <span className="text-xs text-muted-foreground">Live updates</span>
              </div>
              <div className="mt-0 space-y-0 lg:mt-4">
                {STATUS_STEPS.map((s, idx) => {
                  const isCompleted = idx < currentStep;
                  const isCurrent = idx === currentStep;
                  const SIcon = s.icon;

                  return (
                    <div key={s.key} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                          style={{ background: isCompleted || isCurrent ? s.color : '#F1F5F9', transition: 'background 0.4s ease' }}
                        >
                          <SIcon size={14} color={isCompleted || isCurrent ? 'white' : '#94a3b8'} aria-hidden="true" />
                        </div>
                        {idx < STATUS_STEPS.length - 1 && (
                          <div
                            className="mt-1 mb-1 w-0.5 flex-1"
                            style={{ background: isCompleted ? s.color : '#E2E8F0', minHeight: '24px', transition: 'background 0.4s ease' }}
                          />
                        )}
                      </div>
                      <div className="pb-4">
                        <p className={`text-sm font-semibold ${isCurrent ? 'text-foreground' : 'text-muted-foreground'}`}>{s.label}</p>
                        {isCurrent && <p className="mt-0.5 text-xs text-muted-foreground">{s.sub}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </section>

          <aside className="space-y-4 lg:sticky lg:top-6">
            <section className="rounded-[24px] border border-border/40 bg-card p-4 shadow-sm lg:p-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Summary</p>
              <div className="mt-3 space-y-3">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-muted-foreground">Restaurant</span>
                  <span className="font-medium text-foreground">{vendor.store_name || 'Restaurant'}</span>
                </div>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-muted-foreground">Order total</span>
                  <span className="font-bold text-foreground">₦{total.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-muted-foreground">Current ETA</span>
                  <span className="font-medium text-foreground">{Math.max(35 - currentStep * 8, 5)} min</span>
                </div>
              </div>
            </section>

            <section className="rounded-[24px] border border-border/40 bg-card p-4 shadow-sm lg:p-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Delivery Info</p>
              <div className="mt-3 space-y-3 text-sm text-muted-foreground">
                <p className="flex items-start gap-2">
                  <MapPin size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
                  Your delivery location will stay visible in checkout and tracking.
                </p>
                <p className="flex items-start gap-2">
                  <ReceiptText size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
                  Review receipts and feedback after delivery from the sidebar on larger screens.
                </p>
              </div>
            </section>

            <div className="rounded-[24px] border border-border/40 bg-card p-4 shadow-sm lg:hidden">
              <span className="text-muted-foreground text-sm">Order from {vendor.store_name || 'Restaurant'}</span>
              <span className="block font-bold text-foreground">₦{total.toLocaleString()}</span>
            </div>
          </aside>
        </div>
      </div>
      <BottomNav role="customer" />
    </RunnaShell>
  );
}
