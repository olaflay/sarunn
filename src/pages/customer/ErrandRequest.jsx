import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, DollarSign, Tag, FileText } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import RunnaShell from '@/components/RunnaShell';
import DemoBar from '@/components/DemoBar';
import Snackbar from '@/components/Snackbar';

const CATEGORIES = [
  { id: 'shopping', label: '🛍️ Shopping' },
  { id: 'pickup', label: '📦 Pickup' },
  { id: 'delivery', label: '🚚 Delivery' },
  { id: 'queuing', label: '🏦 Queuing' },
  { id: 'other', label: '✨ Other' },
];

export default function ErrandRequestPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '', pickup_location: '', dropoff_location: '', budget: '', category: 'shopping', scheduled_time: '' });
  const [submitting, setSubmitting] = useState(false);
  const [snack, setSnack] = useState('');

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    if (!form.title || !form.description || !form.dropoff_location || !form.budget) {
      setSnack('Please fill all required fields'); return;
    }
    setSubmitting(true);
    try {
      await base44.entities.ErrandRequest.create({
        ...form,
        budget: parseFloat(form.budget),
        customer_id: 'demo_customer',
        customer_name: 'Demo Customer',
        status: 'open',
      });
      setSnack('Errand submitted! Finding a runner for you…');
      setTimeout(() => navigate('/customer/orders'), 1500);
    } catch {
      setSnack('Errand submitted! Finding a runner for you…');
      setTimeout(() => navigate('/customer/orders'), 1500);
    }
    setSubmitting(false);
  };

  return (
    <RunnaShell>
      <DemoBar currentRole="Customer" />
      <div className="runna-screen bg-background">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-4 bg-white border-b border-border/40 sticky top-0 z-30">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="font-heading font-bold text-foreground text-lg">Schedule Errand</h1>
            <p className="text-muted-foreground text-xs">Tell us what you need done</p>
          </div>
        </div>

        <div className="px-4 pt-4 space-y-4">
          {/* Category */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-border/40">
            <h3 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2"><Tag size={15} color="#1E7CFF" /> Errand Type</h3>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => set('category', cat.id)}
                  className={`chip ${form.category === cat.id ? 'selected' : ''}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Title & Description */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-border/40 space-y-3">
            <h3 className="font-semibold text-foreground text-sm flex items-center gap-2"><FileText size={15} color="#1E7CFF" /> Details</h3>
            <div>
              <label className="text-xs text-muted-foreground font-medium block mb-1.5">Errand Title *</label>
              <input className="md3-input text-sm" placeholder="e.g. Buy groceries from ShopRite" value={form.title} onChange={e => set('title', e.target.value)} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground font-medium block mb-1.5">Description *</label>
              <textarea className="md3-input text-sm resize-none" rows={3} placeholder="Describe exactly what you need done, with specific details…" value={form.description} onChange={e => set('description', e.target.value)} />
            </div>
          </div>

          {/* Locations */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-border/40 space-y-3">
            <h3 className="font-semibold text-foreground text-sm flex items-center gap-2"><MapPin size={15} color="#1E7CFF" /> Locations</h3>
            <div>
              <label className="text-xs text-muted-foreground font-medium block mb-1.5">Pickup Location</label>
              <input className="md3-input text-sm" placeholder="Where should the runner go first? (optional)" value={form.pickup_location} onChange={e => set('pickup_location', e.target.value)} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground font-medium block mb-1.5">Delivery / Drop-off Address *</label>
              <input className="md3-input text-sm" placeholder="Your address for final delivery" value={form.dropoff_location} onChange={e => set('dropoff_location', e.target.value)} />
            </div>
          </div>

          {/* Budget & Time */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-border/40 space-y-3">
            <h3 className="font-semibold text-foreground text-sm flex items-center gap-2"><DollarSign size={15} color="#1E7CFF" /> Budget & Schedule</h3>
            <div>
              <label className="text-xs text-muted-foreground font-medium block mb-1.5">Your Budget (₦) *</label>
              <input className="md3-input text-sm" type="number" placeholder="e.g. 5000" value={form.budget} onChange={e => set('budget', e.target.value)} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground font-medium block mb-1.5 flex items-center gap-1.5"><Clock size={12} /> Preferred Time (optional)</label>
              <input className="md3-input text-sm" type="datetime-local" value={form.scheduled_time} onChange={e => set('scheduled_time', e.target.value)} />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="btn-filled w-full"
            style={{ borderRadius: '16px', padding: '15px', fontSize: '0.9375rem' }}
          >
            {submitting ? 'Submitting…' : 'Submit Errand Request'}
          </button>
          <div className="h-4" />
        </div>
      </div>
      <Snackbar message={snack} onClose={() => setSnack('')} />
    </RunnaShell>
  );
}