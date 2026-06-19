import React, { useState } from 'react';
import { MapPin, Clock, DollarSign, Star, Package } from 'lucide-react';
import RunnaShell from '@/components/RunnaShell';
import DemoBar from '@/components/DemoBar';
import BottomNav from '@/components/BottomNav';
import StatusBadge from '@/components/StatusBadge';

const TABS = ['All', 'Completed', 'Cancelled'];

const MOCK_JOBS = [
  { id: 'j1', vendor_name: 'Burger Palace', customer_name: 'Adaeze O.', pickup_address: '14 Allen Ave, Ikeja', delivery_address: '23 Lekki Phase 1', distance_km: 8.4, payout: 1800, status: 'delivered', date: '2026-06-18', rating: 5 },
  { id: 'j2', vendor_name: 'Sushi Garden', customer_name: 'Emeka N.', pickup_address: '23 Lekki Phase 1', delivery_address: '7 Victoria Island', distance_km: 5.2, payout: 1200, status: 'delivered', date: '2026-06-17', rating: 4 },
  { id: 'j3', vendor_name: 'Fresh Mart', customer_name: 'Fatima B.', pickup_address: '7 Victoria Island', delivery_address: '14 Allen Ave', distance_km: 6.1, payout: 1400, status: 'cancelled', date: '2026-06-16', rating: null },
  { id: 'j4', vendor_name: 'Artisan Bakery', customer_name: 'Ngozi A.', pickup_address: '5 Bode Thomas, Surulere', delivery_address: '12 Gbagada', distance_km: 9.3, payout: 2100, status: 'delivered', date: '2026-06-15', rating: 5 },
];

export default function RunnerJobs() {
  const [tab, setTab] = useState('All');
  const filtered = tab === 'All' ? MOCK_JOBS
    : tab === 'Completed' ? MOCK_JOBS.filter(j => j.status === 'delivered')
    : MOCK_JOBS.filter(j => j.status === 'cancelled');

  return (
    <RunnaShell>
      <DemoBar currentRole="Runner" />
      <div className="runna-screen bg-background">
        <div className="bg-white border-b border-border/40 px-4 py-4 sticky top-0 z-30">
          <h1 className="font-heading font-bold text-foreground text-lg mb-3">Job History</h1>
          <div className="flex gap-1 bg-muted rounded-xl p-1">
            {TABS.map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all"
                style={{ background: tab === t ? 'white' : 'transparent', color: tab === t ? '#1B2B45' : '#94a3b8', boxShadow: tab === t ? '0 1px 4px rgba(0,0,0,0.1)' : 'none' }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 pt-4">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">📦</div>
              <h3 className="font-heading font-bold text-foreground text-lg mb-1">No jobs here</h3>
              <p className="text-muted-foreground text-sm">Your completed jobs will appear here</p>
            </div>
          ) : (
            filtered.map(job => (
              <div key={job.id} className="md3-card p-4 mb-3">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-foreground text-sm">{job.vendor_name}</p>
                    <p className="text-muted-foreground text-xs">{job.date} · {job.customer_name}</p>
                  </div>
                  <StatusBadge status={job.status} />
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <MapPin size={11} />
                  <span className="truncate">{job.pickup_address} → {job.delivery_address}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-xs font-medium text-foreground">
                      <Package size={11} color="#1E7CFF" /> {job.distance_km}km
                    </span>
                    <span className="flex items-center gap-1 text-xs font-medium text-foreground">
                      <Clock size={11} color="#94a3b8" />
                      {Math.round(job.distance_km * 4)} min
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {job.rating && (
                      <span className="flex items-center gap-1 text-xs">
                        <Star size={11} fill="#F59E0B" color="#F59E0B" />{job.rating}
                      </span>
                    )}
                    <span className="font-bold text-sm" style={{ color: '#2E7D32' }}>₦{job.payout.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <BottomNav role="runner" />
    </RunnaShell>
  );
}