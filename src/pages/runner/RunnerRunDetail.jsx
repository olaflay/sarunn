import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Circle, MapPin, Phone, ReceiptText, Truck, TimerReset, Play } from 'lucide-react';
import RunnaShell from '@/components/RunnaShell';
import BottomNav from '@/components/BottomNav';
import StatusBadge from '@/components/StatusBadge';
import Snackbar from '@/components/Snackbar';
import { EmptyState } from '@/components/PageStates';
import { runActions, useRunStore } from '@/store/runStore';

const STEP_ORDER = ['open', 'claimed', 'in_progress', 'picked_up', 'completed'];

export default function RunnerRunDetail() {
  const navigate = useNavigate();
  const { runId } = useParams();
  const { runs } = useRunStore((state) => state);
  const [snack, setSnack] = useState('');

  const run = useMemo(() => runs.find((item) => item.id === runId), [runs, runId]);

  if (!run) {
    return (
      <RunnaShell>
        <div className="sarunn-screen bg-background px-4 pt-6">
          <EmptyState
            icon={Truck}
            title="Run not found"
            subtitle="This run may have already been completed or removed from the active list."
            actionLabel="Back to runs"
            onAction={() => navigate('/runner/jobs')}
          />
        </div>
        <BottomNav role="runner" />
      </RunnaShell>
    );
  }

  const statusIndex = STEP_ORDER.indexOf(run.status);
  const canStart = ['claimed'].includes(run.status);
  const canMarkPicked = ['in_progress'].includes(run.status);
  const canComplete = ['picked_up'].includes(run.status);

  const handleComplete = () => {
    runActions.completeRun(run.id);
    setSnack('Run completed. Customer, vendor, and runner records were synced in the scaffold.');
    window.setTimeout(() => navigate('/runner/jobs', { replace: true }), 700);
  };

  return (
    <RunnaShell>
      <div className="sarunn-screen bg-background">
        <div className="navy-gradient px-4 pt-6 pb-8 text-white">
          <button
            type="button"
            onClick={() => navigate('/runner/jobs')}
            className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-white/80"
          >
            <ArrowLeft size={16} />
            Back to runs
          </button>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs text-white/60">Run Details</p>
              <h1 className="font-heading text-2xl font-black">{run.title}</h1>
              <p className="mt-1 text-sm text-white/70">{run.campus} · {run.zone}</p>
            </div>
            <StatusBadge status={run.status} />
          </div>
        </div>

        <div className="-mt-3 px-4 pb-4 space-y-4">
          <div className="md3-card p-4">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-2xl bg-muted/60 p-3">
                <p className="text-muted-foreground">Delivery fee</p>
                <p className="mt-1 font-bold text-foreground">₦{run.delivery_fee.toLocaleString()}</p>
              </div>
              <div className="rounded-2xl bg-muted/60 p-3">
                <p className="text-muted-foreground">Distance</p>
                <p className="mt-1 font-bold text-foreground">{run.estimated_distance_km} km</p>
              </div>
              <div className="rounded-2xl bg-muted/60 p-3">
                <p className="text-muted-foreground">Payment</p>
                <p className="mt-1 font-bold text-foreground">{run.payment_method}</p>
              </div>
              <div className="rounded-2xl bg-muted/60 p-3">
                <p className="text-muted-foreground">ETA</p>
                <p className="mt-1 font-bold text-foreground">{run.estimated_duration_min} min</p>
              </div>
            </div>
          </div>

          <div className="md3-card p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <MapPin size={16} className="text-primary" />
              Pickup and delivery
            </div>
            <div className="mt-4 space-y-4">
              <div className="rounded-2xl bg-muted/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Pickup</p>
                <p className="mt-1 font-semibold text-foreground">{run.pickup.vendor_name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{run.pickup.address}</p>
                <p className="mt-1 text-sm text-muted-foreground">{run.pickup.instructions}</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <Phone size={12} />
                  {run.pickup.contact}
                </div>
              </div>
              <div className="rounded-2xl bg-muted/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Delivery</p>
                <p className="mt-1 font-semibold text-foreground">{run.delivery.customer_name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{run.delivery.address}</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <Phone size={12} />
                  {run.delivery.contact}
                </div>
              </div>
            </div>
          </div>

          <div className="md3-card p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <ReceiptText size={16} className="text-primary" />
              Customer and vendor
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-border/40 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Customer</p>
                <p className="mt-2 font-semibold text-foreground">{run.customer.name}</p>
                <p className="text-sm text-muted-foreground">{run.customer.phone}</p>
                <p className="text-sm text-muted-foreground">{run.customer.email}</p>
              </div>
              <div className="rounded-2xl border border-border/40 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Vendor</p>
                <p className="mt-2 font-semibold text-foreground">{run.vendor.name}</p>
                <p className="text-sm text-muted-foreground">{run.vendor.phone}</p>
                <p className="text-sm text-muted-foreground">{run.vendor.email}</p>
              </div>
            </div>
            <div className="mt-3 rounded-2xl bg-muted/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Special instructions</p>
              <p className="mt-2 text-sm text-foreground">{run.special_instructions}</p>
            </div>
          </div>

          <div className="md3-card p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <TimerReset size={16} className="text-primary" />
              Status timeline
            </div>
            <div className="mt-4 space-y-3">
              {STEP_ORDER.map((step, index) => {
                const reached = index <= statusIndex;
                const labels = {
                  open: 'Run created',
                  claimed: 'Claimed',
                  in_progress: 'Started',
                  picked_up: 'Picked up',
                  completed: 'Completed',
                };
                return (
                  <div key={step} className="flex items-start gap-3">
                    <div className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-full ${reached ? 'bg-green-100 text-green-700' : 'bg-muted text-muted-foreground'}`}>
                      {reached ? <CheckCircle2 size={14} /> : <Circle size={12} />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-foreground">{labels[step]}</p>
                      <p className="text-xs text-muted-foreground">
                        {reached ? (run.timeline?.[index]?.at || 'Recorded in scaffold') : 'Waiting for runner action'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <button
              type="button"
              onClick={() => {
                runActions.startRun(run.id);
                setSnack('Run started.');
              }}
              disabled={!canStart}
              className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
              style={{ background: '#1B2B45' }}
            >
              <Play size={16} />
              Start Run
            </button>
            <button
              type="button"
              onClick={() => {
                runActions.markPickedUp(run.id);
                setSnack('Pickup confirmed.');
              }}
              disabled={!canMarkPicked}
              className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
              style={{ background: '#2E7D32' }}
            >
              <Truck size={16} />
              Mark Picked Up
            </button>
            <button
              type="button"
              onClick={handleComplete}
              disabled={!canComplete}
              className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
              style={{ background: '#1565C0' }}
            >
              Complete Run
            </button>
          </div>
        </div>
      </div>
      <BottomNav role="runner" />
      <Snackbar message={snack} onClose={() => setSnack('')} />
    </RunnaShell>
  );
}

