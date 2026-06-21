import React, { useState } from 'react';
import { Search, CheckCircle, XCircle, User, Store, Bike, Shield } from 'lucide-react';
import AdminShell from '@/components/AdminShell';
import Snackbar from '@/components/Snackbar';

const TABS = ['Customers', 'Vendors', 'Runners'];

const MOCK_CUSTOMERS = [
  { id: 'c1', name: 'Adaeze Okafor', email: 'adaeze@email.com', orders: 23, status: 'active', joined: 'Jan 2026' },
  { id: 'c2', name: 'Emeka Nwosu', email: 'emeka@email.com', orders: 11, status: 'active', joined: 'Feb 2026' },
  { id: 'c3', name: 'Fatima Bello', email: 'fatima@email.com', orders: 5, status: 'suspended', joined: 'Mar 2026' },
];

const MOCK_VENDORS = [
  { id: 'v1', name: 'Burger Palace', owner: 'Olu Ade', category: 'food', orders: 312, status: 'approved', rating: 4.8 },
  { id: 'v2', name: 'Fresh Mart', owner: 'Sade Bello', category: 'groceries', orders: 218, status: 'approved', rating: 4.6 },
  { id: 'v3', name: 'Pizza Hub', owner: 'Kemi Osei', category: 'food', orders: 0, status: 'pending', rating: null },
];

const MOCK_RUNNERS = [
  { id: 'r1', name: 'Chidi Obi', phone: '+234 803 456 7890', vehicle: 'motorbike', deliveries: 247, status: 'approved', rating: 4.9 },
  { id: 'r2', name: 'Tunde Adeyemi', phone: '+234 806 789 0123', vehicle: 'bicycle', deliveries: 98, status: 'approved', rating: 4.7 },
  { id: 'r3', name: 'Amaka Eze', phone: '+234 801 234 5678', vehicle: 'motorbike', deliveries: 0, status: 'pending', rating: null },
];

export default function AdminUsers() {
  const [tab, setTab] = useState('Customers');
  const [search, setSearch] = useState('');
  const [vendors, setVendors] = useState(MOCK_VENDORS);
  const [runners, setRunners] = useState(MOCK_RUNNERS);
  const [customers, setCustomers] = useState(MOCK_CUSTOMERS);
  const [snack, setSnack] = useState('');

  const approveVendor = (id) => {
    setVendors(prev => prev.map(v => v.id === id ? { ...v, status: 'approved' } : v));
    setSnack('✅ Vendor approved!');
  };

  const approveRunner = (id) => {
    setRunners(prev => prev.map(r => r.id === id ? { ...r, status: 'approved' } : r));
    setSnack('✅ Runner approved!');
  };

  const suspendUser = (type, id) => {
    if (type === 'customer') setCustomers(prev => prev.map(c => c.id === id ? { ...c, status: 'suspended' } : c));
    if (type === 'vendor') setVendors(prev => prev.map(v => v.id === id ? { ...v, status: 'suspended' } : v));
    if (type === 'runner') setRunners(prev => prev.map(r => r.id === id ? { ...r, status: 'suspended' } : r));
    setSnack('User suspended and notified.');
  };

  return (
    <AdminShell>
      <div className="bg-background min-h-full">
        <div className="bg-white border-b border-border/40 px-4 py-4 sticky top-0 z-10">
          <h1 className="font-heading font-bold text-foreground text-lg mb-3">User Management</h1>
          <div className="flex items-center gap-2 bg-muted rounded-2xl px-3 py-2.5 mb-3">
            <Search size={15} color="#94a3b8" />
            <input className="flex-1 bg-transparent outline-none text-sm placeholder-muted-foreground" placeholder="Search users…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-1 bg-muted rounded-xl p-1">
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)} className="flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all" style={{ background: tab === t ? 'white' : 'transparent', color: tab === t ? '#1B2B45' : '#94a3b8', boxShadow: tab === t ? '0 1px 4px rgba(0,0,0,0.1)' : 'none' }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 pt-4">
          {/* Customers */}
          {tab === 'Customers' && customers.filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase())).map(c => (
            <div key={c.id} className="md3-card p-4 mb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <User size={18} color="#1E7CFF" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{c.name}</p>
                    <p className="text-muted-foreground text-xs">{c.email}</p>
                    <p className="text-muted-foreground text-xs">{c.orders} orders · Since {c.joined}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${c.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>{c.status}</span>
                  {c.status === 'active' && (
                    <button onClick={() => suspendUser('customer', c.id)} className="text-xs text-red-500 font-medium">Suspend</button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Vendors */}
          {tab === 'Vendors' && vendors.filter(v => !search || v.name.toLowerCase().includes(search.toLowerCase())).map(v => (
            <div key={v.id} className="md3-card p-4 mb-3">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                    <Store size={18} color="#9333EA" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{v.name}</p>
                    <p className="text-muted-foreground text-xs">Owner: {v.owner} · {v.category}</p>
                    <p className="text-muted-foreground text-xs">{v.orders} orders{v.rating ? ` · ★${v.rating}` : ''}</p>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${v.status === 'approved' ? 'bg-green-50 text-green-700' : v.status === 'pending' ? 'bg-yellow-50 text-yellow-700' : 'bg-red-50 text-red-600'}`}>{v.status}</span>
              </div>
              {v.status === 'pending' && (
                <div className="flex gap-2 mt-2">
                  <button onClick={() => approveVendor(v.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold text-white" style={{ background: '#2E7D32' }}>
                    <CheckCircle size={13} /> Approve
                  </button>
                  <button onClick={() => suspendUser('vendor', v.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold" style={{ background: '#FEECEB', color: '#B3261E' }}>
                    <XCircle size={13} /> Reject
                  </button>
                </div>
              )}
              {v.status === 'approved' && (
                <button onClick={() => suspendUser('vendor', v.id)} className="mt-2 text-xs text-red-500 font-medium">Suspend Vendor</button>
              )}
            </div>
          ))}

          {/* Runners */}
          {tab === 'Runners' && runners.filter(r => !search || r.name.toLowerCase().includes(search.toLowerCase())).map(r => (
            <div key={r.id} className="md3-card p-4 mb-3">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                    <Bike size={18} color="#2E7D32" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{r.name}</p>
                    <p className="text-muted-foreground text-xs">{r.phone} · {r.vehicle}</p>
                    <p className="text-muted-foreground text-xs">{r.deliveries} deliveries{r.rating ? ` · ★${r.rating}` : ''}</p>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${r.status === 'approved' ? 'bg-green-50 text-green-700' : r.status === 'pending' ? 'bg-yellow-50 text-yellow-700' : 'bg-red-50 text-red-600'}`}>{r.status}</span>
              </div>
              {r.status === 'pending' && (
                <div className="flex gap-2 mt-2">
                  <button onClick={() => approveRunner(r.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold text-white" style={{ background: '#2E7D32' }}>
                    <Shield size={13} /> Approve Runner
                  </button>
                  <button onClick={() => suspendUser('runner', r.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold" style={{ background: '#FEECEB', color: '#B3261E' }}>
                    <XCircle size={13} /> Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Snackbar message={snack} onClose={() => setSnack('')} />
    </AdminShell>
  );
}