import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const ROLES = [
  { label: 'Customer', color: '#1E7CFF', path: '/customer/home' },
  { label: 'Vendor', color: '#2E7D32', path: '/vendor/orders' },
  { label: 'Runner', color: '#F59E0B', path: '/runner/home' },
  { label: 'Admin', color: '#9333EA', path: '/admin/dashboard' },
];

// Map incoming role strings to their correct label
const ROLE_ALIAS = {
  customer: 'Customer',
  vendor: 'Vendor',
  runner: 'Runner',
  admin: 'Admin',
};

export default function DemoBar({ currentRole }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const resolvedLabel = ROLE_ALIAS[currentRole?.toLowerCase()] || currentRole;
  const role = ROLES.find(r => r.label === resolvedLabel) || ROLES[0];

  return (
    <div className="demo-bar relative">
      <span className="text-xs font-medium text-white/50 tracking-widest uppercase">Demo View</span>
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-white text-sm font-semibold"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        >
          <div className="w-2 h-2 rounded-full" style={{ background: role.color }} />
          {role.label}
          <ChevronDown size={12} className={`text-white/40 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
        {open && (
          <div
            className="absolute right-0 top-full mt-1 rounded-xl overflow-hidden shadow-xl z-50 border border-white/10"
            style={{ background: '#0F1E35', minWidth: '140px' }}
          >
            {ROLES.map(r => (
              <button
                key={r.label}
                onClick={() => { navigate(r.path); setOpen(false); }}
                className="w-full flex items-center gap-2.5 px-4 py-3 text-sm font-medium text-white hover:bg-white/10 transition-colors text-left"
              >
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: r.color }} />
                {r.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}