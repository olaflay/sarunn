import React, { useState } from 'react';
import { Headset, ChevronDown, MessageCircle, Phone, Mail, AlertTriangle, Send } from 'lucide-react';
import RunnaShell from '@/components/RunnaShell';
import DemoBar from '@/components/DemoBar';
import BottomNav from '@/components/BottomNav';
import Snackbar from '@/components/Snackbar';

const FAQS = [
  { q: 'How do I track my order?', a: 'Open the Orders tab, go to "Ongoing", and tap "Track" on any active order to see live status.' },
  { q: 'What if a vendor rejects my order?', a: "You'll be notified immediately and any payment is refunded to your original payment method within 24 hours." },
  { q: 'Can I order from a different campus?', a: 'No — for fast, reliable delivery you can only order from vendors on your selected campus.' },
  { q: 'How do I send a package?', a: 'On the Home screen tap "Send Package", fill in pickup and drop-off details, then confirm.' },
];

const CONTACTS = [
  { id: 'chat', label: 'Live Chat', desc: 'Avg. reply under 2 min', icon: MessageCircle },
  { id: 'call', label: 'Call Us', desc: '+234 800 RUNNA 00', icon: Phone },
  { id: 'email', label: 'Email Support', desc: 'help@runna.ng', icon: Mail },
];

export default function Support() {
  const [openFaq, setOpenFaq] = useState(null);
  const [issue, setIssue] = useState('');
  const [snack, setSnack] = useState('');

  const submitIssue = () => {
    if (!issue.trim()) { setSnack('Please describe your issue first'); return; }
    setIssue('');
    setSnack('Issue submitted — our team will reach out shortly');
  };

  return (
    <RunnaShell>
      <DemoBar currentRole="Customer" />
      <div className="runna-screen bg-background">
        <div className="flex items-center gap-3 px-4 py-4 bg-white border-b border-border/40 sticky top-0 z-30">
          <Headset size={20} color="#1B2B45" />
          <h1 className="font-heading font-bold text-foreground text-lg">Support</h1>
        </div>

        <div className="px-4 pt-4 space-y-5">
          {/* Contact channels */}
          <div className="grid grid-cols-3 gap-2.5">
            {CONTACTS.map(c => {
              const Icon = c.icon;
              return (
                <button
                  key={c.id}
                  onClick={() => setSnack(`${c.label} — connecting you now…`)}
                  className="flex flex-col items-center gap-2 py-4 px-1 rounded-2xl bg-white border border-border/60 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#F0F2F7' }}>
                    <Icon size={18} color="#1B2B45" />
                  </div>
                  <span className="text-[11px] font-semibold text-foreground text-center leading-tight">{c.label}</span>
                </button>
              );
            })}
          </div>

          {/* FAQ */}
          <div>
            <h3 className="font-heading font-bold text-foreground text-sm mb-3">Frequently Asked</h3>
            <div className="space-y-2">
              {FAQS.map((f, i) => (
                <div key={i} className="bg-white rounded-2xl border border-border/60 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 text-left"
                  >
                    <span className="font-medium text-foreground text-sm pr-3">{f.q}</span>
                    <ChevronDown size={16} className={`text-muted-foreground flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <p className="px-4 pb-4 text-muted-foreground text-sm leading-relaxed -mt-1">{f.a}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Report issue */}
          <div className="bg-white rounded-2xl p-4 border border-border/60">
            <h3 className="font-heading font-bold text-foreground text-sm mb-3 flex items-center gap-2">
              <AlertTriangle size={15} color="#F59E0B" /> Report an Issue
            </h3>
            <textarea
              className="md3-input text-sm resize-none"
              rows={3}
              placeholder="Describe the problem with your order…"
              value={issue}
              onChange={e => setIssue(e.target.value)}
            />
            <button
              onClick={submitIssue}
              className="w-full flex items-center justify-center gap-2 text-white font-semibold rounded-xl py-3 text-sm mt-3"
              style={{ background: '#1B2B45' }}
            >
              <Send size={15} /> Submit Report
            </button>
          </div>
          <div className="h-2" />
        </div>
      </div>
      <Snackbar message={snack} onClose={() => setSnack('')} />
      <BottomNav role="customer" />
    </RunnaShell>
  );
}