import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Inbox, MapPin, ChevronDown, CheckCircle, Loader } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import RunnaShell from '@/components/RunnaShell';
import DemoBar from '@/components/DemoBar';
import Snackbar from '@/components/Snackbar';
import { getCampus } from '@/lib/runnaStore';
import { getLocations, getSubLocations, calculateErrandFee } from '@/lib/runnaData';

const SIZES = [
  { id: 'small', label: 'Small', desc: 'Envelope, documents' },
  { id: 'medium', label: 'Medium', desc: 'Bag, box up to 5kg' },
  { id: 'large', label: 'Large', desc: 'Box, luggage over 5kg' },
];

function LocationPicker({ label, campusId, mainId, subId, onMain, onSub }) {
  const mainLocs = getLocations(campusId);
  const subLocs = mainId ? getSubLocations(mainId) : [];
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</p>
      <div className="relative">
        <select
          value={mainId || ''}
          onChange={e => { onMain(e.target.value); onSub(''); }}
          className="md3-input text-sm appearance-none pr-10"
        >
          <option value="">Select zone</option>
          {mainLocs.map(l => (
            <option key={l.id} value={l.id}>{l.label} (₦{l.base_fee} base)</option>
          ))}
        </select>
        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
      </div>
      {mainId && subLocs.length > 0 && (
        <div className="relative">
          <select
            value={subId || ''}
            onChange={e => onSub(e.target.value)}
            className="md3-input text-sm appearance-none pr-10"
          >
            <option value="">Select landmark (optional)</option>
            {subLocs.map(s => (
              <option key={s.id} value={s.id}>{s.label}{s.surcharge > 0 ? ` +₦${s.surcharge}` : ''}</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        </div>
      )}
    </div>
  );
}

export default function ErrandRequestPage() {
  const navigate = useNavigate();
  const campusId = getCampus() || 'lasu-epe';
  const [step, setStep] = useState(0); // 0=landing, 1=send-form, 2=matching, 3=confirmed
  const [mode, setMode] = useState('send'); // 'send' | 'receive'
  const [form, setForm] = useState({
    fromMain: '', fromSub: '', fromNote: '',
    toMain: '', toSub: '', toNote: '',
    description: '', size: 'small',
  });
  const [snack, setSnack] = useState('');

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const fee = calculateErrandFee(form.fromMain, form.toMain, form.toSub);

  const canProceed = form.fromMain && form.toMain && form.description.trim();

  const handleFindRunner = async () => {
    if (!canProceed) { setSnack('Please complete all required fields'); return; }
    setStep(2);
    try {
      await base44.entities.ErrandRequest.create({
        customer_id: 'demo_customer',
        customer_name: 'Demo Customer',
        title: `${mode === 'send' ? 'Send' : 'Receive'} package — ${form.description}`,
        description: form.description,
        pickup_location: form.fromMain + (form.fromSub ? `/${form.fromSub}` : '') + (form.fromNote ? ` (${form.fromNote})` : ''),
        dropoff_location: form.toMain + (form.toSub ? `/${form.toSub}` : '') + (form.toNote ? ` (${form.toNote})` : ''),
        budget: fee,
        status: 'open',
        category: 'delivery',
      });
    } catch { /* continue to step 3 */ }
    setTimeout(() => setStep(3), 2500);
  };

  // Step 0 — Landing
  if (step === 0) {
    return (
      <RunnaShell>
        <DemoBar currentRole="Customer" />
        <div className="runna-screen bg-background">
          <div className="flex items-center gap-3 px-4 py-4 bg-white border-b border-border/40 sticky top-0 z-30">
            <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
              <ArrowLeft size={18} />
            </button>
            <h1 className="font-heading font-bold text-foreground text-lg">Send Package</h1>
          </div>

          <div className="px-4 pt-6 space-y-4">
            <p className="text-muted-foreground text-sm text-center">What would you like to do?</p>

            <button
              onClick={() => { setMode('send'); setStep(1); }}
              className="w-full rounded-3xl p-6 text-left border-2 border-border/60 bg-white shadow-sm flex items-center gap-4 active:scale-95 transition-transform"
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: '#E8F5F0' }}>
                <Package size={28} color="#1B2B45" />
              </div>
              <div>
                <p className="font-heading font-bold text-foreground text-base">Send Package</p>
                <p className="text-muted-foreground text-sm mt-0.5">Dispatch an item to another location on campus</p>
              </div>
            </button>

            <button
              onClick={() => { setMode('receive'); setStep(1); }}
              className="w-full rounded-3xl p-6 text-left border-2 border-border/60 bg-white shadow-sm flex items-center gap-4 active:scale-95 transition-transform"
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: '#EDF3FF' }}>
                <Inbox size={28} color="#1B2B45" />
              </div>
              <div>
                <p className="font-heading font-bold text-foreground text-base">Receive Package</p>
                <p className="text-muted-foreground text-sm mt-0.5">Have a package collected and brought to you</p>
              </div>
            </button>
          </div>
        </div>
      </RunnaShell>
    );
  }

  // Step 2 — Matching runner
  if (step === 2) {
    return (
      <RunnaShell>
        <DemoBar currentRole="Customer" />
        <div className="runna-screen bg-background flex flex-col items-center justify-center px-8 text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 animate-pulse" style={{ background: '#E8F5F0' }}>
            <Loader size={36} color="#1B2B45" className="animate-spin" />
          </div>
          <h2 className="font-heading font-bold text-foreground text-xl mb-2">Finding your runner</h2>
          <p className="text-muted-foreground text-sm">Matching you with the nearest available runner on campus…</p>
        </div>
      </RunnaShell>
    );
  }

  // Step 3 — Confirmed
  if (step === 3) {
    return (
      <RunnaShell>
        <DemoBar currentRole="Customer" />
        <div className="runna-screen bg-background flex flex-col items-center justify-center px-8 text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ background: '#E8F5E9' }}>
            <CheckCircle size={40} color="#2E7D32" />
          </div>
          <h2 className="font-heading font-bold text-foreground text-xl mb-2">Runner found!</h2>
          <p className="text-muted-foreground text-sm mb-2">Chidi Obi is on the way to pick up your package.</p>
          <p className="text-muted-foreground text-sm mb-8">Estimated: <span className="font-semibold text-foreground">15–20 min</span></p>

          <div className="w-full bg-white rounded-2xl p-4 border border-border/60 text-left mb-6">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Delivery fee</span>
              <span className="font-bold" style={{ color: '#1B2B45' }}>₦{fee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Package</span>
              <span className="font-medium text-foreground truncate max-w-[180px]">{form.description}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/customer/orders')}
            className="w-full text-white font-semibold rounded-2xl py-4 text-base"
            style={{ background: '#1B2B45' }}
          >
            Track in Orders
          </button>
        </div>
      </RunnaShell>
    );
  }

  // Step 1 — Form
  return (
    <RunnaShell>
      <DemoBar currentRole="Customer" />
      <div className="runna-screen bg-background">
        <div className="flex items-center gap-3 px-4 py-4 bg-white border-b border-border/40 sticky top-0 z-30">
          <button onClick={() => setStep(0)} className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="font-heading font-bold text-foreground text-base">{mode === 'send' ? 'Send a Package' : 'Receive a Package'}</h1>
            <p className="text-muted-foreground text-xs">Fill in delivery details</p>
          </div>
        </div>

        <div className="px-4 pt-4 space-y-4">
          {/* Pickup location */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-border/40">
            <h3 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              Pickup Location
            </h3>
            <LocationPicker
              label="Where to collect from"
              campusId={campusId}
              mainId={form.fromMain}
              subId={form.fromSub}
              onMain={v => set('fromMain', v)}
              onSub={v => set('fromSub', v)}
            />
            <div className="mt-2">
              <input
                className="md3-input text-sm"
                placeholder="Extra directions (optional)"
                value={form.fromNote}
                onChange={e => set('fromNote', e.target.value)}
              />
            </div>
          </div>

          {/* Drop-off location */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-border/40">
            <h3 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              Drop-off Location
            </h3>
            <LocationPicker
              label="Where to deliver"
              campusId={campusId}
              mainId={form.toMain}
              subId={form.toSub}
              onMain={v => set('toMain', v)}
              onSub={v => set('toSub', v)}
            />
            <div className="mt-2">
              <input
                className="md3-input text-sm"
                placeholder="Extra directions (optional)"
                value={form.toNote}
                onChange={e => set('toNote', e.target.value)}
              />
            </div>
          </div>

          {/* Package details */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-border/40 space-y-3">
            <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
              <Package size={15} color="#1B2B45" /> Package Details
            </h3>
            <div>
              <label className="text-xs text-muted-foreground font-medium block mb-1.5">Description *</label>
              <input
                className="md3-input text-sm"
                placeholder="e.g. Textbook, laptop charger, food flask…"
                value={form.description}
                onChange={e => set('description', e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground font-medium block mb-2">Size</label>
              <div className="grid grid-cols-3 gap-2">
                {SIZES.map(s => (
                  <button
                    key={s.id}
                    onClick={() => set('size', s.id)}
                    className="py-3 px-2 rounded-xl border-2 text-center transition-all"
                    style={{ borderColor: form.size === s.id ? '#1B2B45' : 'hsl(var(--border))', background: form.size === s.id ? '#F0F2F7' : 'white' }}
                  >
                    <p className="text-xs font-semibold" style={{ color: form.size === s.id ? '#1B2B45' : '#374151' }}>{s.label}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{s.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing preview */}
          {(form.fromMain || form.toMain) && (
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-border/40">
              <h3 className="font-semibold text-foreground text-sm mb-3">Pricing Preview</h3>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Base delivery fee</span>
                  <span className="font-medium">₦{Math.max(
                    getLocations(campusId).find(l => l.id === form.fromMain)?.base_fee || 0,
                    getLocations(campusId).find(l => l.id === form.toMain)?.base_fee || 0
                  ).toLocaleString()}</span>
                </div>
                {form.toSub && getSubLocations(form.toMain).find(s => s.id === form.toSub)?.surcharge > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location surcharge</span>
                    <span className="font-medium">+₦{getSubLocations(form.toMain).find(s => s.id === form.toSub).surcharge}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold border-t border-border/40 pt-2 mt-2">
                  <span>Total</span>
                  <span style={{ color: '#1B2B45' }}>₦{fee.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleFindRunner}
            disabled={!canProceed}
            className="w-full text-white font-semibold rounded-2xl py-4 text-base transition-opacity"
            style={{ background: '#1B2B45', opacity: canProceed ? 1 : 0.4 }}
          >
            Find Runner · ₦{fee.toLocaleString()}
          </button>
          <div className="h-4" />
        </div>
      </div>
      <Snackbar message={snack} onClose={() => setSnack('')} />
    </RunnaShell>
  );
}