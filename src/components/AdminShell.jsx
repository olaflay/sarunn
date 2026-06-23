import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LayoutDashboard, Wallet, Users, AlertTriangle, Settings, ChevronDown, ChevronRight, MapPin } from 'lucide-react';
import DemoBar from '@/components/DemoBar';

const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
  { id: 'ledger', label: 'Ledger', icon: Wallet, path: '/admin/ledger' },
  {
    id: 'users', label: 'Users', icon: Users, expandable: true,
    children: [
      { label: 'Students', path: '/admin/users', tab: 'students' },
      { label: 'Vendors', path: '/admin/users', tab: 'vendors' },
      { label: 'Runners', path: '/admin/users', tab: 'runners' },
    ],
  },
  { id: 'disputes', label: 'Disputes', icon: AlertTriangle, path: '/admin/disputes', badge: 3 },
  { id: 'pricing', label: 'Pricing', icon: MapPin, path: '/admin/pricing' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/admin/settings' },
];

export default function AdminShell({ children }) {
  const [open, setOpen] = useState(false);
  const [usersOpen, setUsersOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const usersActive = location.pathname === '/admin/users';

  const goTo = (path, tab) => {
    navigate(tab ? `${path}?tab=${tab}` : path);
    setOpen(false);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center navy-gradient">
      <div className="runna-shell shadow-2xl flex flex-col relative">
        <DemoBar currentRole="Admin" />

        {/* Top bar with hamburger */}
        <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-border/40 flex-shrink-0 z-20">
          <button
            onClick={() => setOpen(true)}
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: '#1B2B45' }}
          >
            <Menu size={18} color="white" />
          </button>
          <span className="font-heading font-bold text-foreground text-sm">Admin Panel</span>
          <div className="w-9 h-9" />
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden bg-background">
          {children}
        </div>

        {/* Backdrop */}
        {open && (
          <div
            className="absolute inset-0 bg-black/50 z-40 animate-fade-in"
            onClick={() => setOpen(false)}
          />
        )}

        {/* Slide-in drawer */}
        <div
          className={`absolute top-0 left-0 bottom-0 z-50 bg-white flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : '-translate-x-full'}`}
          style={{ width: '80%', maxWidth: '300px' }}
        >
          <div className="flex items-center justify-between px-5 py-4 flex-shrink-0" style={{ background: '#1B2B45' }}>
            <div>
              <p className="font-heading font-bold text-white text-base">RUNNA</p>
              <p className="text-white/50 text-xs">Admin Panel</p>
            </div>
            <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <X size={16} color="white" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-2">
            {NAV.map(item => {
              const Icon = item.icon;
              const active = isActive(item.path || '');

              if (item.expandable) {
                return (
                  <div key={item.id}>
                    <button
                      onClick={() => setUsersOpen(v => !v)}
                      className="w-full flex items-center gap-3 px-5 py-3.5 transition-all"
                      style={{ borderLeft: usersActive ? '3px solid #1B2B45' : '3px solid transparent', background: usersActive ? '#F0F2F7' : 'transparent' }}
                    >
                      <Icon size={18} color={usersActive ? '#1B2B45' : '#64748b'} />
                      <span className="flex-1 text-sm font-medium" style={{ color: usersActive ? '#1B2B45' : '#374151' }}>{item.label}</span>
                      {usersOpen ? <ChevronDown size={14} color="#94a3b8" /> : <ChevronRight size={14} color="#94a3b8" />}
                    </button>
                    {usersOpen && item.children.map(child => (
                      <button
                        key={child.tab}
                        onClick={() => goTo(child.path, child.tab)}
                        className="w-full flex items-center pl-14 pr-5 py-3 text-left hover:bg-muted/50"
                        style={{ borderLeft: '3px solid transparent' }}
                      >
                        <span className="text-sm text-muted-foreground font-medium">{child.label}</span>
                      </button>
                    ))}
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => goTo(item.path)}
                  className="w-full flex items-center gap-3 px-5 py-3.5 transition-all"
                  style={{ borderLeft: active ? '3px solid #1B2B45' : '3px solid transparent', background: active ? '#F0F2F7' : 'transparent' }}
                >
                  <Icon size={18} color={active ? '#1B2B45' : '#64748b'} />
                  <span className="flex-1 text-sm font-medium" style={{ color: active ? '#1B2B45' : '#374151' }}>{item.label}</span>
                  {item.badge && (
                    <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-border/40 flex-shrink-0">
            <p className="text-xs text-muted-foreground text-center">RUNNA v1.0 · Admin</p>
          </div>
        </div>
      </div>
      <p className="absolute bottom-4 text-xs text-white/30 hidden md:block">RUNNA · Admin Panel</p>
    </div>
  );
}