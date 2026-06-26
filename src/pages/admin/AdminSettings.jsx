import React, { useState } from 'react';
import { Settings, DollarSign, Bell, Shield, Globe, ToggleRight, ToggleLeft } from 'lucide-react';
import AdminShell from '@/components/AdminShell';
import Snackbar from '@/components/Snackbar';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    autoApproveVendors: false,
    notificationsEnabled: true,
    deliveryFeeBase: '1500',
    platformFeePercent: '10',
    supportEmail: 'support@runna.app',
  });
  const [snack, setSnack] = useState('');

  const toggle = (key) => {
    setSettings(s => ({ ...s, [key]: !s[key] }));
    setSnack('Setting updated');
  };

  const set = (k, v) => setSettings(s => ({ ...s, [k]: v }));

  return (
    <AdminShell>
      <div className="bg-background min-h-full">
        <div className="bg-white border-b border-border/40 px-4 py-4 sticky top-0 z-30 flex items-center gap-2">
          <Settings size={20} color="#1E7CFF" />
          <h1 className="font-heading font-bold text-foreground text-lg">Platform Settings</h1>
        </div>

        <div className="px-4 pt-4 space-y-4">
          {/* Platform Controls */}
          <div className="bg-white rounded-2xl shadow-sm border border-border/40 overflow-hidden">
            <div className="px-4 py-3 border-b border-border/30">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Platform Controls</p>
            </div>
            {[
              { key: 'maintenanceMode', label: 'Maintenance Mode', sub: 'Temporarily disable the app for all users', icon: Shield, danger: true },
              { key: 'autoApproveVendors', label: 'Auto-Approve Vendors', sub: 'Skip manual review for new vendors', icon: Globe, danger: false },
              { key: 'notificationsEnabled', label: 'Push Notifications', sub: 'Send order updates to users', icon: Bell, danger: false },
            ].map(item => {
              const Icon = item.icon;
              return (
                <div key={item.key} className="flex items-center gap-3 px-4 py-4 border-b border-border/20 last:border-0">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: item.danger ? '#FEECEB' : '#F0F7FF' }}>
                    <Icon size={16} color={item.danger ? '#B3261E' : '#1E7CFF'} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground text-sm">{item.label}</p>
                    <p className="text-muted-foreground text-xs">{item.sub}</p>
                  </div>
                  <button onClick={() => toggle(item.key)}>
                    {settings[item.key]
                      ? <ToggleRight size={30} color={item.danger ? '#B3261E' : '#2E7D32'} />
                      : <ToggleLeft size={30} color="#94a3b8" />}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Fees */}
          <div className="bg-white rounded-2xl shadow-sm border border-border/40 overflow-hidden">
            <div className="px-4 py-3 border-b border-border/30">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2"><DollarSign size={12} /> Fees & Commission</p>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1.5">Base Delivery Fee (₦)</label>
                <input className="md3-input text-sm" type="number" value={settings.deliveryFeeBase} onChange={e => set('deliveryFeeBase', e.target.value)} />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1.5">Platform Commission (%)</label>
                <input className="md3-input text-sm" type="number" value={settings.platformFeePercent} onChange={e => set('platformFeePercent', e.target.value)} />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1.5">Support Email</label>
                <input className="md3-input text-sm" type="email" value={settings.supportEmail} onChange={e => set('supportEmail', e.target.value)} />
              </div>
              <button onClick={() => setSnack('Settings saved!')} className="btn-filled w-full text-sm" style={{ borderRadius: '14px', padding: '13px' }}>
                Save Changes
              </button>
            </div>
          </div>

          {/* App Info */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-border/40">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground text-sm">RUNNA App</p>
                <p className="text-muted-foreground text-xs">Version 1.0.0 · Build 2026.06.19</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Environment</p>
                <p className="text-xs font-bold text-green-600">Production</p>
              </div>
            </div>
          </div>
          <div className="h-4" />
        </div>
      </div>
      <Snackbar message={snack} onClose={() => setSnack('')} />
    </AdminShell>
  );
}