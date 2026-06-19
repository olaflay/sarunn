import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Clock, Package, Bike, Home, Phone, Star } from 'lucide-react';
import RunnaShell from '@/components/RunnaShell';
import DemoBar from '@/components/DemoBar';
import BottomNav from '@/components/BottomNav';

const STATUS_STEPS = [
  { key: 'pending',   label: 'Order Placed',        sub: 'Your order has been sent to the restaurant', icon: Package, color: '#1E7CFF' },
  { key: 'confirmed', label: 'Order Confirmed',      sub: 'The restaurant is preparing your food', icon: CheckCircle, color: '#9333EA' },
  { key: 'ready',     label: 'Ready for Pickup',     sub: 'Runner is heading to pick up your order', icon: Clock, color: '#F59E0B' },
  { key: 'picked_up', label: 'Out for Delivery',     sub: 'Your runner is on the way to you', icon: Bike, color: '#F59E0B' },
  { key: 'delivered', label: 'Delivered! 🎉',        sub: 'Enjoy your meal!', icon: Home, color: '#2E7D32' },
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
      setTimeout(() => setShowReview(true), 1000);
      return;
    }
    const delays = [3000, 5000, 4000, 6000];
    const t = setTimeout(() => setCurrentStep(s => s + 1), delays[currentStep] || 4000);
    return () => clearTimeout(t);
  }, [currentStep]);

  const step = STATUS_STEPS[currentStep];
  const StepIcon = step.icon;

  if (showReview) {
    return (
      <RunnaShell>
        <DemoBar currentRole="Customer" />
        <div className="runna-screen bg-background flex flex-col items-center justify-center px-6 text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4 animate-fade-in" style={{ background: '#E8F5E9' }}>
            <CheckCircle size={40} color="#2E7D32" />
          </div>
          <h2 className="font-heading font-bold text-foreground text-xl mb-1 animate-fade-in-up">Order Delivered!</h2>
          <p className="text-muted-foreground text-sm mb-6">Rate your experience with {vendor.store_name || 'the restaurant'}</p>

          <div className="bg-white rounded-2xl p-5 w-full shadow-sm border border-border/40 mb-4 animate-fade-in-up">
            <p className="font-semibold text-foreground text-sm mb-3">How was your food?</p>
            <div className="flex justify-center gap-2 mb-4">
              {[1,2,3,4,5].map(s => (
                <button key={s} onClick={() => setRating(s)}>
                  <Star size={32} fill={s <= rating ? '#F59E0B' : 'none'} color={s <= rating ? '#F59E0B' : '#CBD5E1'} />
                </button>
              ))}
            </div>
            <textarea className="md3-input text-sm resize-none" rows={2} placeholder="Leave a comment (optional)" />
          </div>

          <button
            onClick={() => navigate('/customer/home')}
            className="btn-filled w-full"
            style={{ borderRadius: '16px', padding: '15px' }}
          >
            Submit & Go Home
          </button>
        </div>
        <BottomNav role="customer" />
      </RunnaShell>
    );
  }

  return (
    <RunnaShell>
      <DemoBar currentRole="Customer" />
      <div className="runna-screen bg-background">
        {/* Hero */}
        <div className="px-4 pt-6 pb-4 text-center" style={{ background: 'linear-gradient(135deg, #1B2B45 0%, #0F1E35 100%)' }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 animate-fade-in" style={{ background: `${step.color}25` }}>
            <StepIcon size={30} color={step.color} />
          </div>
          <h2 className="font-heading font-bold text-white text-lg">{step.label}</h2>
          <p className="text-white/60 text-sm mt-1">{step.sub}</p>
        </div>

        <div className="px-4 pt-5">
          {/* ETA Card */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-border/40 mb-4 flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-xs mb-0.5">Estimated Arrival</p>
              <p className="font-heading font-bold text-2xl text-foreground">
                {Math.max(35 - currentStep * 8, 5)} min
              </p>
            </div>
            <button className="flex items-center gap-2 bg-muted rounded-xl px-3 py-2 text-sm font-semibold text-foreground">
              <Phone size={15} /> Call Runner
            </button>
          </div>

          {/* Status Steps */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-border/40 mb-4">
            <h3 className="font-semibold text-foreground text-sm mb-4">Order Progress</h3>
            <div className="space-y-0">
              {STATUS_STEPS.map((s, idx) => {
                const isCompleted = idx < currentStep;
                const isCurrent = idx === currentStep;
                const SIcon = s.icon;
                return (
                  <div key={s.key} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          background: isCompleted || isCurrent ? s.color : '#F1F5F9',
                          transition: 'background 0.4s ease',
                        }}
                      >
                        <SIcon size={14} color={isCompleted || isCurrent ? 'white' : '#94a3b8'} />
                      </div>
                      {idx < STATUS_STEPS.length - 1 && (
                        <div
                          className="w-0.5 flex-1 mt-1 mb-1"
                          style={{
                            background: isCompleted ? s.color : '#E2E8F0',
                            minHeight: '24px',
                            transition: 'background 0.4s ease',
                          }}
                        />
                      )}
                    </div>
                    <div className="pb-4">
                      <p className={`text-sm font-semibold ${isCurrent ? 'text-foreground' : isCompleted ? 'text-muted-foreground' : 'text-muted-foreground/50'}`}>
                        {s.label}
                      </p>
                      {isCurrent && <p className="text-xs text-muted-foreground mt-0.5">{s.sub}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order total */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-border/40 flex justify-between items-center">
            <span className="text-muted-foreground text-sm">Order from {vendor.store_name || 'Restaurant'}</span>
            <span className="font-bold text-foreground">₦{total.toLocaleString()}</span>
          </div>
        </div>
      </div>
      <BottomNav role="customer" />
    </RunnaShell>
  );
}