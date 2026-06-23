import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Inbox, ChevronDown, CheckCircle, Loader, AlertTriangle, Info, ChevronRight, MapPin } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import RunnaShell from '@/components/RunnaShell';
import DemoBar from '@/components/DemoBar';
import Snackbar from '@/components/Snackbar';
import { getCampus, getDeliveryLocation } from '@/lib/runnaStore';
import DeliveryLocationPicker from '@/components/customer/DeliveryLocationPicker';
import { getLocations, getSubLocations, calculateErrandFee, getLocationLabel, CAMPUSES } from '@/lib/runnaData';

const SIZES = [
  { id: 'small', label: 'Small', desc: 'Envelope, docs' },
  { id: 'medium', label: 'Medium', desc: 'Bag, <5kg' },
  { id: 'large', label: 'Large', desc: 'Box, >5kg' },
];

function LocationSelect({ campusId, mainId, subId, onMain, onSub, label }) {
  const mains = getLocations(campusId);
  const subs = mainId ? getSubLocations(mainId) : [];
  const summary = mainId ? getLocationLabel(campusId, mainId, subId) : null;

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</p>
      {summary ? (
        <button
          onClick={() => onMain('')}
          className="w-full flex items-center gap-2 p-3 rounded-xl border-2 text-left"
          style={{ borderColor: '#1B2B45', background: '#F0F2F7' }}
        >
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#1B2B45' }} />
          <span className="flex-1 text-sm font-semibold text-foreground truncate">{summary}</span>
          <span className="text-xs text-muted-foreground">Change</span>
        </button>
      ) : (
        <>
          <div className="relative">
            <select value={mainId || ''} onChange={e => { onMain(e.target.value); onSub(''); }} className="md3-input text-sm appearance-none pr-10">
              <option value="">Select zone</option>
              {mains.map(l => <option key={l.id} value={l.id}>{l.label} (₦{l.base_fee})</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
          {mainId && subs.length > 0 && (
            <div className="relative">
              <select value={subId || ''} onChange={e => onSub(e.target.value)} className="md3-input text-sm appearance-none pr-10">
                <option value="">Select landmark (optional)</option>
                {subs.map(s => <option key={s.id} value={s.id}>{s.label}{s.surcharge > 0 ? ` +₦${s.surcharge}` : ''}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function ErrandRequestPage() {
  const navigate = useNavigate();
  const campusId = getCampus() || 'lasu-epe';
  const savedLoc = getDeliveryLocation();

  const [step, setStep] = useState(0); // 0=landing, 1=form, 2=matching, 3=confirmed
  const [mode, setMode] = useState('send');
  const [locPickerOpen, setLocPickerOpen] = useState(false);
  const [deliveryLocState, setDeliveryLocState] = useState(savedLoc);
  const locLabel = campusId && deliveryLocState ? getLocationLabel(campusId, deliveryLocState.mainId, deliveryLocState.subId) : null;

  // Pickup & delivery locations — set when user picks a mode (step 0)
  const [fromMain, setFromMain] = useState('');
  const [fromSub, setFromSub] = useState('');
  const [fromNote, setFromNote] = useState('');
  const [toMain, setToMain] = useState('');
  const [toSub, setToSub] = useState('');
  const [toNote, setToNote] = useState('');

  // Sender details
  const [useMy, setUseMy] = useState(true);
  const [senderName, setSenderName] = useState('Demo Customer');
  const [senderPhone, setSenderPhone] = useState('+234 800 000 0000');
  const [senderEmail, setSenderEmail] = useState('');

  // Receiver details
  const [recvName, setRecvName] = useState('');
  const [recvPhone, setRecvPhone] = useState('');
  const [recvEmail, setRecvEmail] = useState('');

  // Package
  const [description, setDescription] = useState('');
  const [size, setSize] = useState('small');

  const [snack, setSnack] = useState('');

  const fee = calculateErrandFee(fromMain, toMain, toSub);
  const canSubmit = fromMain && toMain && recvName && recvPhone;

  // ── Step 0: Package Delivery Dashboard ──
  if (step === 0) {
    return (
      <RunnaShell>
        <DemoBar currentRole="Customer" />
        <div className="runna-screen bg-background flex flex-col">

          {/* Top bar with location capsule */}
          <div className="flex items-center gap-3 px-4 py-4 bg-white border-b border-border/40 sticky top-0 z-30">
            <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={() => setLocPickerOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-muted flex-1 max-w-[280px] m3-motion-standard active:scale-98"
            >
              <MapPin size={14} color={locLabel ? '#2E7D32' : '#F59E0B'} className="flex-shrink-0" />
              <span className="text-xs font-medium text-foreground truncate">
                {locLabel || 'Select delivery location'}
              </span>
              <ChevronDown size={12} color="#94a3b8" className="flex-shrink-0 ml-auto" />
            </button>
          </div>

          {/* Main action cards — fill available space, balanced */}
          <div className="flex-1 flex flex-col gap-4 p-4 min-h-0">
            {/* Send card */}
            <button
              onClick={() => {
                setMode('send');
                setFromMain(savedLoc?.mainId || '');
                setFromSub(savedLoc?.subId || '');
                setFromNote(savedLoc?.note || '');
                setToMain(''); setToSub(''); setToNote('');
                setStep(1);
              }}
              className="relative flex-1 rounded-3xl overflow-hidden text-left m3-motion-emphasized active:scale-98"
              style={{ background: 'linear-gradient(135deg, #1B2B45 0%, #2A4374 100%)', minHeight: '180px' }}
            >
              {/* Decorative illustration circle */}
              <div className="absolute inset-0 flex items-center justify-end pr-6">
                <div className="w-28 h-28 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <Package size={48} color="rgba(255,255,255,0.9)" />
                </div>
              </div>
              <div className="relative p-6 flex flex-col h-full justify-between">
                <div>
                  <h2 className="font-heading font-bold text-white text-xl leading-tight">Send, seamlessly</h2>
                  <p className="text-white/60 text-xs mt-1">Packages • Parcels • Deliveries</p>
                </div>
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.15)', boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3)' }}
                >
                  <ChevronRight size={20} color="white" />
                </div>
              </div>
            </button>

            {/* Receive card */}
            <button
              onClick={() => {
                setMode('receive');
                setFromMain(''); setFromSub(''); setFromNote('');
                setToMain(savedLoc?.mainId || '');
                setToSub(savedLoc?.subId || '');
                setToNote(savedLoc?.note || '');
                setStep(1);
              }}
              className="relative flex-1 rounded-3xl overflow-hidden text-left m3-motion-emphasized active:scale-98"
              style={{ background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)', minHeight: '180px' }}
            >
              {/* Decorative illustration circle */}
              <div className="absolute inset-0 flex items-center justify-end pr-6">
                <div className="w-28 h-28 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <Inbox size={48} color="rgba(255,255,255,0.9)" />
                </div>
              </div>
              <div className="relative p-6 flex flex-col h-full justify-between">
                <div>
                  <h2 className="font-heading font-bold text-white text-xl leading-tight">Receive, with ease</h2>
                  <p className="text-white/60 text-xs mt-1">Packages • Parcels • Deliveries</p>
                </div>
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.15)', boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3)' }}
                >
                  <ChevronRight size={20} color="white" />
                </div>
              </div>
            </button>
          </div>
        </div>

        <DeliveryLocationPicker
          campusId={campusId}
          open={locPickerOpen}
          onClose={() => setLocPickerOpen(false)}
          onSave={(loc) => setDeliveryLocState(loc)}
        />
      </RunnaShell>
    );
  }

  // ── Step 2: Matching ──
  if (step === 2) {
    return (
      <RunnaShell>
        <DemoBar currentRole="Customer" />
        <div className="runna-screen bg-background flex flex-col items-center justify-center px-8 text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ background: '#E8F5F0' }}>
            <Loader size={36} color="#1B2B45" className="animate-spin" />
          </div>
          <h2 className="font-heading font-bold text-foreground text-xl mb-2">Finding your runner</h2>
          <p className="text-muted-foreground text-sm">Matching you with the nearest available runner…</p>
        </div>
      </RunnaShell>
    );
  }

  // ── Step 3: Confirmed ──
  if (step === 3) {
    return (
      <RunnaShell>
        <DemoBar currentRole="Customer" />
        <div className="runna-screen bg-background flex flex-col items-center justify-center px-8 text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ background: '#E8F5E9' }}>
            <CheckCircle size={40} color="#2E7D32" />
          </div>
          <h2 className="font-heading font-bold text-foreground text-xl mb-2">Runner found!</h2>
          <p className="text-muted-foreground text-sm mb-2">Chidi Obi is on the way to {mode === 'send' ? 'pick up your package' : 'collect the package for you'}.</p>
          <p className="text-muted-foreground text-sm mb-8">Estimated: <span className="font-semibold text-foreground">15–20 min</span></p>
          <div className="w-full bg-white rounded-2xl p-4 border border-border/60 text-left mb-6">
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-muted-foreground">Delivery fee</span>
              <span className="font-bold" style={{ color: '#1B2B45' }}>₦{fee.toLocaleString()}</span>
            </div>
            {description && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Package</span>
                <span className="font-medium text-foreground truncate max-w-[180px]">{description}</span>
              </div>
            )}
          </div>
          <button onClick={() => navigate('/customer/orders')} className="w-full text-white font-semibold rounded-2xl py-4 text-base" style={{ background: '#1B2B45' }}>
            Track in Orders
          </button>
        </div>
      </RunnaShell>
    );
  }

  // ── Step 1: Form ──
  const handleReviewDelivery = async () => {
    if (!canSubmit) { setSnack('Please fill in all required fields'); return; }
    setStep(2);
    try {
      await base44.entities.ErrandRequest.create({
        customer_id: 'demo_customer',
        customer_name: senderName,
        title: `${mode === 'send' ? 'Send' : 'Receive'} package${description ? ` — ${description}` : ''}`,
        description: description || 'No description provided',
        pickup_location: mode === 'send'
          ? (getLocationLabel(campusId, fromMain, fromSub) || fromMain) + (fromNote ? ` (${fromNote})` : '')
          : (getLocationLabel(campusId, fromMain, fromSub) || fromMain) + (fromNote ? ` (${fromNote})` : ''),
        dropoff_location: (getLocationLabel(campusId, toMain, toSub) || toMain) + (toNote ? ` (${toNote})` : ''),
        budget: fee,
        status: 'open',
        category: 'delivery',
      });
    } catch { /* proceed to step 3 */ }
    setTimeout(() => setStep(3), 2500);
  };

  return (
    <RunnaShell>
      <DemoBar currentRole="Customer" />
      <div className="runna-screen bg-background">
        <div className="flex items-center gap-3 px-4 py-4 bg-white border-b border-border/40 sticky top-0 z-20">
          <button onClick={() => setStep(0)} className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
            <ArrowLeft size={18} />
          </button>
          <div>
            <p className="text-xs text-muted-foreground">Package Delivery</p>
            <h1 className="font-heading font-bold text-foreground text-base">
              {mode === 'send' ? 'Send Packages' : 'Receive Packages'}
            </h1>
          </div>
        </div>

        <div className="px-4 pt-4 space-y-4">
          {/* Pickup & Delivery Locations */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-border/40 space-y-4">
            <h3 className="font-semibold text-foreground text-sm">Pickup & Delivery Locations</h3>

            {mode === 'send' ? (
              <>
                <LocationSelect
                  campusId={campusId} mainId={fromMain} subId={fromSub}
                  onMain={setFromMain} onSub={setFromSub} label="Pickup (your location)"
                />
                {fromMain && (
                  <input className="md3-input text-sm" placeholder="Precise pickup details (optional)" value={fromNote} onChange={e => setFromNote(e.target.value)} />
                )}
                <div className="border-t border-border/30" />
                <LocationSelect
                  campusId={campusId} mainId={toMain} subId={toSub}
                  onMain={setToMain} onSub={setToSub} label="Drop-off (receiver's location)"
                />
                {toMain && (
                  <input className="md3-input text-sm" placeholder="Precise drop-off details (optional)" value={toNote} onChange={e => setToNote(e.target.value)} />
                )}
              </>
            ) : (
              <>
                <LocationSelect
                  campusId={campusId} mainId={fromMain} subId={fromSub}
                  onMain={setFromMain} onSub={setFromSub} label="Pickup (where runner collects from)"
                />
                {fromMain && (
                  <input className="md3-input text-sm" placeholder="Precise pickup address" value={fromNote} onChange={e => setFromNote(e.target.value)} />
                )}
                <div className="border-t border-border/30" />
                <LocationSelect
                  campusId={campusId} mainId={toMain} subId={toSub}
                  onMain={setToMain} onSub={setToSub} label="Drop-off (your location)"
                />
                {toMain && (
                  <input className="md3-input text-sm" placeholder="Precise drop-off details" value={toNote} onChange={e => setToNote(e.target.value)} />
                )}
              </>
            )}
          </div>

          {/* Sender Details */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-border/40 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground text-sm">Sender Details</h3>
              <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
                <input type="checkbox" checked={useMy} onChange={e => setUseMy(e.target.checked)} className="w-4 h-4 rounded" />
                Use my details
              </label>
            </div>
            <input className="md3-input text-sm" placeholder="Full Name" value={useMy ? 'Demo Customer' : senderName} onChange={e => setSenderName(e.target.value)} readOnly={useMy} style={{ opacity: useMy ? 0.6 : 1 }} />
            <input className="md3-input text-sm" placeholder="Phone Number" value={useMy ? '+234 800 000 0000' : senderPhone} onChange={e => setSenderPhone(e.target.value)} readOnly={useMy} style={{ opacity: useMy ? 0.6 : 1 }} />
            <input className="md3-input text-sm" placeholder="Email (Optional)" value={senderEmail} onChange={e => setSenderEmail(e.target.value)} />
          </div>

          {/* Receiver Details */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-border/40 space-y-3">
            <h3 className="font-semibold text-foreground text-sm">Receiver Details</h3>
            <input className="md3-input text-sm" placeholder="Enter receiver name *" value={recvName} onChange={e => setRecvName(e.target.value)} />
            <input className="md3-input text-sm" placeholder="Enter phone number *" value={recvPhone} onChange={e => setRecvPhone(e.target.value)} />
            <input className="md3-input text-sm" placeholder="Enter email (optional)" value={recvEmail} onChange={e => setRecvEmail(e.target.value)} />
          </div>

          {/* Package Information */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-border/40 space-y-3">
            <h3 className="font-semibold text-foreground text-sm">Package Information</h3>
            <textarea className="md3-input text-sm resize-none" rows={3} placeholder="Package Description (Optional) — What are you sending? e.g Food item" value={description} onChange={e => setDescription(e.target.value)} />
            <div className="grid grid-cols-3 gap-2">
              {SIZES.map(s => (
                <button key={s.id} onClick={() => setSize(s.id)}
                  className="py-3 px-1 rounded-xl border-2 text-center"
                  style={{ borderColor: size === s.id ? '#1B2B45' : 'hsl(var(--border))', background: size === s.id ? '#F0F2F7' : 'white' }}>
                  <p className="text-xs font-semibold" style={{ color: size === s.id ? '#1B2B45' : '#374151' }}>{s.label}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{s.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Info Banners */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl text-xs" style={{ background: '#E3F2FD' }}>
            <Info size={14} color="#1565C0" className="flex-shrink-0 mt-0.5" />
            <p style={{ color: '#1565C0' }}>Maximum package size is 65 × 65 × 40 cm, with a weight limit of 20 kg.</p>
          </div>
          <div className="flex items-start gap-2.5 p-3 rounded-xl text-xs" style={{ background: '#FFF3E0' }}>
            <AlertTriangle size={14} color="#E65100" className="flex-shrink-0 mt-0.5" />
            <p style={{ color: '#E65100' }}>We do not transport illegal or prohibited items, including cash.</p>
          </div>

          {/* Pricing preview */}
          {(fromMain || toMain) && (
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-border/40">
              <div className="flex justify-between text-sm font-bold">
                <span>Estimated Delivery Fee</span>
                <span style={{ color: '#1B2B45' }}>₦{fee.toLocaleString()}</span>
              </div>
            </div>
          )}

          <button
            onClick={handleReviewDelivery}
            disabled={!canSubmit}
            className="w-full text-white font-semibold rounded-2xl py-4 text-base"
            style={{ background: '#1B2B45', opacity: canSubmit ? 1 : 0.4 }}
          >
            Review Delivery · ₦{fee.toLocaleString()}
          </button>
          <div className="h-4" />
        </div>
      </div>
      <Snackbar message={snack} onClose={() => setSnack('')} />
    </RunnaShell>
  );
}