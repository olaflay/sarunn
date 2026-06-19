import React, { useState, useEffect } from 'react';
import { ToggleRight, ToggleLeft, MapPin, DollarSign, Package, Clock, CheckCircle, X } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import RunnaShell from '@/components/RunnaShell';
import DemoBar from '@/components/DemoBar';
import BottomNav from '@/components/BottomNav';
import Snackbar from '@/components/Snackbar';

const MOCK_JOB_OFFER = {
  id: 'job1',
  vendor_name: 'Burger Palace',
  pickup_address: '14 Allen Ave, Ikeja',
  delivery_address: '23 Lekki Phase 1, Lagos',
  distance_km: 8.4,
  payout: 1800,
  estimated_time: 35,
  customer_name: 'Adaeze Okafor',
  items_count: 3,
};

function JobOfferModal({ job, onAccept, onDecline }) {
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    if (countdown <= 0) { onDecline(); return; }
    const t = setInterval(() => setCountdown(c => c - 1), 1000);
    return () => clearInterval(t);
  }, [countdown]);

  return (
    <div className="fixed inset-0 z-50 flex items-end" style={{ background: 'rgba(0,0,0,0.6)' }}>
      <div className="bg-white rounded-t-3xl w-full p-5 animate-slide-up">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-heading font-bold text-foreground text-lg">New Job Offer!</h3>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: countdown < 10 ? '#B3261E' : '#1E7CFF' }}>
            {countdown}s
          </div>
        </div>
        <p className="text-muted-foreground text-xs mb-4">Accept quickly before it expires</p>

        <div className="bg-muted rounded-2xl p-4 mb-4 space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#E8F5E9' }}>
              <Package size={14} color="#2E7D32" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Pickup from</p>
              <p className="font-semibold text-foreground text-sm">{job.vendor_name}</p>
              <p className="text-xs text-muted-foreground">{job.pickup_address}</p>
            </div>
          </div>
          <div className="w-px h-4 bg-border ml-3.5" />
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#E3F2FD' }}>
              <MapPin size={14} color="#1E7CFF" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Deliver to</p>
              <p className="font-semibold text-foreground text-sm">{job.customer_name}</p>
              <p className="text-xs text-muted-foreground">{job.delivery_address}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-4 text-center">
          <div className="flex-1 bg-muted rounded-xl py-2.5">
            <p className="font-bold text-foreground text-base">₦{job.payout.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Payout</p>
          </div>
          <div className="flex-1 bg-muted rounded-xl py-2.5">
            <p className="font-bold text-foreground text-base">{job.distance_km} km</p>
            <p className="text-xs text-muted-foreground">Distance</p>
          </div>
          <div className="flex-1 bg-muted rounded-xl py-2.5">
            <p className="font-bold text-foreground text-base">{job.estimated_time} min</p>
            <p className="text-xs text-muted-foreground">Est. Time</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={onDecline} className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-sm" style={{ background: '#FEECEB', color: '#B3261E' }}>
            <X size={16} /> Decline
          </button>
          <button onClick={() => onAccept(job)} className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm text-white" style={{ background: '#1E7CFF' }}>
            <CheckCircle size={16} /> Accept Job
          </button>
        </div>
      </div>
    </div>
  );
}

function ActiveJobCard({ job, onStatusUpdate }) {
  const STEPS = [
    { key: 'accepted', label: 'Job Accepted', action: null },
    { key: 'heading_to_vendor', label: 'Heading to Vendor', action: 'Mark as Arrived at Vendor' },
    { key: 'picked_up', label: 'Picked Up', action: 'Mark as Picked Up', color: '#9333EA' },
    { key: 'delivering', label: 'Delivering', action: 'Mark as Delivered' },
    { key: 'delivered', label: 'Delivered ✓', action: null, color: '#2E7D32' },
  ];
  const [stepIdx, setStepIdx] = useState(0);
  const step = STEPS[stepIdx];

  return (
    <div className="md3-card p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <p className="font-semibold text-foreground text-sm">Active Job</p>
        <span className="text-xs font-bold text-white px-2.5 py-1 rounded-full" style={{ background: '#1E7CFF' }}>{step.label}</span>
      </div>
      <div className="flex items-start gap-3 mb-3">
        <div className="flex flex-col items-center gap-1 flex-shrink-0 mt-1">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <div className="w-0.5 h-8 bg-slate-200" />
          <div className="w-2 h-2 rounded-full bg-blue-500" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Pickup</p>
          <p className="font-medium text-foreground text-sm">{job.pickup_address}</p>
          <p className="text-xs text-muted-foreground mt-2">Delivery</p>
          <p className="font-medium text-foreground text-sm">{job.delivery_address}</p>
        </div>
      </div>
      <div className="flex items-center justify-between py-2 border-t border-border/40 mb-3">
        <span className="text-sm text-muted-foreground">Payout</span>
        <span className="font-bold text-foreground" style={{ color: '#2E7D32' }}>₦{job.payout.toLocaleString()}</span>
      </div>
      {step.action && (
        <button
          onClick={() => setStepIdx(i => Math.min(i + 1, STEPS.length - 1))}
          className="btn-filled w-full text-sm"
          style={{ borderRadius: '14px', padding: '13px' }}
        >
          {step.action}
        </button>
      )}
      {stepIdx === STEPS.length - 1 && (
        <div className="text-center py-2">
          <p className="text-green-600 font-bold text-sm">🎉 Job Complete! ₦{job.payout.toLocaleString()} earned</p>
        </div>
      )}
    </div>
  );
}

export default function RunnerHome() {
  const [isOnline, setIsOnline] = useState(false);
  const [jobOffer, setJobOffer] = useState(null);
  const [activeJob, setActiveJob] = useState(null);
  const [snack, setSnack] = useState('');
  const [todayEarnings, setTodayEarnings] = useState(4200);
  const [todayJobs, setTodayJobs] = useState(3);

  useEffect(() => {
    if (!isOnline || activeJob || jobOffer) return;
    const t = setTimeout(() => {
      setJobOffer(MOCK_JOB_OFFER);
    }, 4000);
    return () => clearTimeout(t);
  }, [isOnline, activeJob, jobOffer]);

  const handleAccept = (job) => {
    setJobOffer(null);
    setActiveJob(job);
    setSnack('✅ Job accepted! Head to the vendor.');
  };

  const handleDecline = () => {
    setJobOffer(null);
    setSnack('Job declined. Waiting for next offer…');
  };

  return (
    <RunnaShell>
      <DemoBar currentRole="Runner" />
      <div className="runna-screen bg-background">
        {/* Header */}
        <div className="navy-gradient px-4 pt-6 pb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/60 text-xs">Good morning,</p>
              <h1 className="font-heading font-bold text-white text-xl">Chidi Obi</h1>
            </div>
            <div className="text-right">
              <p className="text-white/60 text-xs mb-0.5">Today's Earnings</p>
              <p className="font-heading font-black text-white text-2xl">₦{todayEarnings.toLocaleString()}</p>
            </div>
          </div>

          {/* Online Toggle */}
          <div className="bg-white/10 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-white font-semibold text-sm">{isOnline ? '🟢 You are Online' : '⚫ You are Offline'}</p>
              <p className="text-white/50 text-xs">{isOnline ? 'Accepting job offers' : 'Toggle to start receiving jobs'}</p>
            </div>
            <button onClick={() => { setIsOnline(!isOnline); setSnack(isOnline ? 'You are now Offline' : '🟢 You are now Online!'); }}>
              {isOnline ? <ToggleRight size={44} color="#4ADE80" /> : <ToggleLeft size={44} color="rgba(255,255,255,0.4)" />}
            </button>
          </div>
        </div>

        <div className="px-4 -mt-4">
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: "Today's Jobs", value: todayJobs, icon: Package, color: '#1E7CFF', bg: '#E3F2FD' },
              { label: "Rating", value: '4.9★', icon: CheckCircle, color: '#2E7D32', bg: '#E8F5E9' },
              { label: "Distance", value: '34km', icon: MapPin, color: '#9333EA', bg: '#F3E5F5' },
            ].map(s => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="bg-white rounded-2xl p-3 shadow-sm border border-border/40 text-center">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center mx-auto mb-1.5" style={{ background: s.bg }}>
                    <Icon size={16} color={s.color} />
                  </div>
                  <p className="font-bold text-foreground text-base">{s.value}</p>
                  <p className="text-muted-foreground text-xs">{s.label}</p>
                </div>
              );
            })}
          </div>

          {/* Active Job / Offline State */}
          {activeJob ? (
            <ActiveJobCard job={activeJob} onStatusUpdate={() => {}} />
          ) : (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-border/40 text-center">
              {isOnline ? (
                <>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: '#F0F7FF' }}>
                    <div className="w-3 h-3 rounded-full bg-blue-500 animate-ping" />
                  </div>
                  <p className="font-semibold text-foreground text-sm">Looking for jobs nearby…</p>
                  <p className="text-muted-foreground text-xs mt-1">You'll be notified when a job matches your area</p>
                </>
              ) : (
                <>
                  <div className="text-4xl mb-3">🛵</div>
                  <p className="font-semibold text-foreground text-sm">You're offline</p>
                  <p className="text-muted-foreground text-xs mt-1">Go online to start receiving delivery jobs</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <BottomNav role="runner" />
      {jobOffer && <JobOfferModal job={jobOffer} onAccept={handleAccept} onDecline={handleDecline} />}
      <Snackbar message={snack} onClose={() => setSnack('')} />
    </RunnaShell>
  );
}