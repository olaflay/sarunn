import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, MapPin, Clock, Send } from 'lucide-react';
import RunnaShell from '@/components/RunnaShell';
import DemoBar from '@/components/DemoBar';
import PublicFooter from '@/components/PublicFooter';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <RunnaShell>
      <DemoBar currentRole="Customer" />
      <div className="runna-screen bg-background">
        <div className="flex items-center gap-3 px-4 py-4 bg-white border-b border-border/40 sticky top-0 z-30">
          <Link to="/customer/home" className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
            <ArrowLeft size={18} />
          </Link>
          <h1 className="font-heading font-bold text-foreground text-base">Contact Us</h1>
        </div>

        <div className="px-5 py-6 space-y-5">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Have a question, feedback, or need help with an order? We're here for you. Reach out using any of the
            methods below.
          </p>

          <div className="space-y-3">
            <div className="rounded-2xl bg-white border border-border/50 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#EDF3FF' }}>
                <Mail size={18} color="#1B2B45" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground font-medium">Email</p>
                <a href="mailto:support@runna.app" className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
                  support@runna.app
                </a>
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-border/50 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#E8F5E9' }}>
                <MapPin size={18} color="#2E7D32" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground font-medium">Location</p>
                <p className="text-sm font-semibold text-foreground">LASU Epe Campus, Lagos, Nigeria</p>
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-border/50 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#FFF3E0' }}>
                <Clock size={18} color="#E65100" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground font-medium">Support Hours</p>
                <p className="text-sm font-semibold text-foreground">Mon–Sat · 8:00 AM – 9:00 PM</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-border/50 p-5">
            <h2 className="font-heading font-bold text-foreground text-sm mb-4">Send a Message</h2>
            {sent ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: '#E8F5E9' }}>
                  <Send size={20} color="#2E7D32" />
                </div>
                <p className="text-sm font-semibold text-foreground">Message sent!</p>
                <p className="text-xs text-muted-foreground mt-1">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="md3-input"
                  required
                />
                <input
                  type="email"
                  placeholder="Your email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="md3-input"
                  required
                />
                <textarea
                  placeholder="Your message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="md3-input"
                  rows={4}
                  required
                />
                <button
                  type="submit"
                  className="btn-filled w-full"
                  style={{ background: '#1B2B45' }}
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        <PublicFooter />
      </div>
    </RunnaShell>
  );
}