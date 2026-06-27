import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, Star, Package, Filter, Radar, ListChecks, RefreshCw } from 'lucide-react';
import RunnaShell from '@/components/RunnaShell';
import BottomNav from '@/components/BottomNav';
import StatusBadge from '@/components/StatusBadge';
import { EmptyState } from '@/components/PageStates';
import { runActions, useRunStore } from '@/store/runStore';

const CAMPUS_FILTERS = ['All campuses', 'University of Lagos', 'Lagos State University', 'Yaba College of Technology'];
const ZONE_FILTERS = ['All zones', 'Yaba', 'Akoka', 'Surulere', 'Ojo'];

export default function RunnerJobs() {
  const navigate = useNavigate();
  const { runs, events, earnings, currentRunnerId, syncTick } = useRunStore((state) => state);
  const [campusFilter, setCampusFilter] = useState('All campuses');
  const [zoneFilter, setZoneFilter] = useState('All zones');

  useEffect(() => {
    const timer = window.setInterval(() => {
      runActions.simulateLiveUpdate();
    }, 18000);

    return () => window.clearInterval(timer);
  }, []);

  const visibleRuns = useMemo(() => {
    return runs.filter((run) => {
      const matchesCampus = campusFilter === 'All campuses' || run.campus === campusFilter;
      const matchesZone = zoneFilter === 'All zones' || run.zone === zoneFilter;
      return matchesCampus && matchesZone;
    });
  }, [campusFilter, zoneFilter, runs]);

  const openRuns = runs.filter((run) => run.status === 'open').length;
  const claimedRuns = runs.filter((run) => run.status === 'claimed' && run.claimed_by === currentRunnerId).length;
  const activeZones = [...new Set(runs.map((run) => run.zone))].length;

  return (
    <RunnaShell>
      <div className="sarunn-screen bg-background">
        <div className="navy-gradient px-4 pt-6 pb-8 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs text-white/60">Live Runner Feed</p>
              <h1 className="font-heading text-2xl font-black">Available Runs</h1>
              <p className="mt-1 text-sm text-white/70">Filtered by campus and active zones, with mock live sync enabled.</p>
            </div>
            <button
              type="button"
              onClick={() => runActions.simulateLiveUpdate()}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-white/10 px-4 text-xs font-semibold text-white transition hover:bg-white/15"
            >
              <RefreshCw size={14} />
              Sync
            </button>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="rounded-2xl bg-white/10 p-3">
              <p className="text-[11px] text-white/60">Open</p>
              <p className="mt-1 text-xl font-black">{openRuns}</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-3">
              <p className="text-[11px] text-white/60">Claimed</p>
              <p className="mt-1 text-xl font-black">{claimedRuns}</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-3">
              <p className="text-[11px] text-white/60">Zones</p>
              <p className="mt-1 text-xl font-black">{activeZones}</p>
            </div>
          </div>
        </div>

        <div className="-mt-3 px-4 pb-4">
          <div className="rounded-[24px] border border-border/40 bg-card p-4 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Filter size={16} className="text-primary" />
              Filters
            </div>
            <div className="mt-3 space-y-3">
              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Campus</p>
                <div className="flex flex-wrap gap-2">
                  {CAMPUS_FILTERS.map((campus) => (
                    <button
                      key={campus}
                      type="button"
                      onClick={() => setCampusFilter(campus)}
                      className="rounded-full border px-3 py-1.5 text-xs font-semibold transition"
                      style={{
                        background: campusFilter === campus ? '#1B2B45' : 'transparent',
                        borderColor: campusFilter === campus ? '#1B2B45' : 'hsl(var(--border))',
                        color: campusFilter === campus ? '#fff' : 'hsl(var(--foreground))',
                      }}
                    >
                      {campus}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Zone</p>
                <div className="flex flex-wrap gap-2">
                  {ZONE_FILTERS.map((zone) => (
                    <button
                      key={zone}
                      type="button"
                      onClick={() => setZoneFilter(zone)}
                      className="rounded-full border px-3 py-1.5 text-xs font-semibold transition"
                      style={{
                        background: zoneFilter === zone ? '#2E7D32' : 'transparent',
                        borderColor: zoneFilter === zone ? '#2E7D32' : 'hsl(var(--border))',
                        color: zoneFilter === zone ? '#fff' : 'hsl(var(--foreground))',
                      }}
                    >
                      {zone}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-[24px] border border-border/40 bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-foreground">Live updates</p>
                <p className="text-xs text-muted-foreground">New runs, claimed runs, cancellations, and completions are mocked here for now.</p>
              </div>
              <div className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                Tick {syncTick}
              </div>
            </div>
            <div className="mt-3 space-y-2">
              {events.slice(0, 3).map((event) => (
                <div key={event.id} className="flex items-center gap-3 rounded-2xl bg-muted/60 px-3 py-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
                    <Radar size={14} className="text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-foreground">{event.text}</p>
                    <p className="text-[11px] text-muted-foreground">{event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            {visibleRuns.length === 0 ? (
              <EmptyState
                icon={ListChecks}
                title="No runs match the current filters"
                subtitle="Try another campus or active zone."
              />
            ) : (
              visibleRuns.map((run) => {
                const isMine = run.claimed_by === currentRunnerId;
                const actionLabel = run.status === 'open' ? 'Claim Run' : isMine ? 'Run Details' : 'Taken';

                return (
                  <div key={run.id} className="md3-card mb-3 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-semibold text-foreground text-sm">{run.title}</p>
                        <p className="text-xs text-muted-foreground">{run.campus} · {run.zone}</p>
                      </div>
                      <StatusBadge status={run.status} />
                    </div>

                    <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin size={12} />
                      <span className="truncate">{run.pickup.address} → {run.delivery.address}</span>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                      <div className="rounded-2xl bg-muted/60 p-3">
                        <p className="text-muted-foreground">Delivery fee</p>
                        <p className="mt-1 font-bold text-foreground">₦{run.delivery_fee.toLocaleString()}</p>
                      </div>
                      <div className="rounded-2xl bg-muted/60 p-3">
                        <p className="text-muted-foreground">Distance</p>
                        <p className="mt-1 font-bold text-foreground">{run.estimated_distance_km} km</p>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} />
                        {run.estimated_duration_min} min estimate
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Package size={12} />
                        {run.payment_method}
                      </span>
                      {run.status === 'claimed' && isMine && (
                        <span className="flex items-center gap-1.5">
                          <Star size={12} className="text-amber-500" />
                          Claimed by you
                        </span>
                      )}
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (run.status === 'open') {
                            runActions.claimRun(run.id, currentRunnerId);
                            return;
                          }
                          if (isMine) navigate(`/runner/jobs/${run.id}`);
                        }}
                        disabled={run.status !== 'open' && !isMine}
                        className="flex-1 rounded-2xl px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                        style={{ background: isMine ? '#1B2B45' : '#2E7D32' }}
                      >
                        {actionLabel}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      <BottomNav role="runner" />
    </RunnaShell>
  );
}

