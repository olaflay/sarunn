import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LayoutDashboard, Wallet, Users, AlertTriangle, Settings, ChevronDown, ChevronRight, MapPin } from 'lucide-react';
import NetworkStatusBar from '@/components/NetworkStatusBar';

const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
  { id: 'ledger', label: 'Ledger', icon: Wallet, path: '/admin/ledger' },
  {
    id: 'users',
    label: 'Users',
    icon: Users,
    expandable: true,
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

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const goTo = (path, tab) => {
    navigate(tab ? `${path}?tab=${tab}` : path);
    setOpen(false);
  };

  return (
    <div className="w-full min-h-[100dvh] flex items-center justify-center navy-gradient px-0 sm:px-4 py-0 sm:py-4">
      <div className="runna-shell relative flex flex-col overflow-hidden shadow-[0_24px_80px_rgba(15,23,42,0.24)]">
        <NetworkStatusBar />

        <header className="flex items-center justify-between border-b border-border/40 bg-white/95 px-4 py-3 backdrop-blur-sm flex-shrink-0">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-white transition-transform hover:scale-[0.98] focus-visible:ring-2 focus-visible:ring-ring"
            aria-expanded={open}
            aria-controls="admin-drawer"
            aria-label="Open admin navigation"
          >
            <Menu size={18} aria-hidden="true" />
          </button>
          <span className="font-heading text-sm font-semibold tracking-tight text-foreground">Admin Panel</span>
          <div className="h-11 w-11" aria-hidden="true" />
        </header>

        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-background">
          {children}
        </main>

        {open && (
          <button
            type="button"
            className="absolute inset-0 z-40 bg-black/50 backdrop-blur-[1px]"
            onClick={() => setOpen(false)}
            aria-label="Close admin navigation"
          />
        )}

        <aside
          id="admin-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Admin navigation"
          className={`absolute inset-y-0 left-0 z-50 flex w-[84%] max-w-[320px] flex-col bg-white shadow-[0_24px_80px_rgba(15,23,42,0.24)] transition-transform duration-300 ease-out ${open ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="flex items-center justify-between bg-slate-950 px-5 py-4 text-white">
            <div>
              <p className="font-heading text-base font-semibold">RUNNA</p>
              <p className="text-xs text-white/60">Admin Panel</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/80"
              aria-label="Close admin navigation"
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-2" aria-label="Admin sections">
            {NAV.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path || '');

              if (item.expandable) {
                return (
                  <div key={item.id}>
                    <button
                      type="button"
                      onClick={() => setUsersOpen((value) => !value)}
                      className={`flex w-full items-center gap-3 border-l-4 px-5 py-3.5 text-left transition-colors ${usersActive ? 'border-slate-950 bg-slate-100' : 'border-transparent hover:bg-slate-50'}`}
                      aria-expanded={usersOpen}
                    >
                      <Icon size={18} color={usersActive ? '#0f172a' : '#64748b'} aria-hidden="true" />
                      <span className={`flex-1 text-sm font-medium ${usersActive ? 'text-slate-950' : 'text-slate-700'}`}>{item.label}</span>
                      {usersOpen ? <ChevronDown size={14} color="#94a3b8" aria-hidden="true" /> : <ChevronRight size={14} color="#94a3b8" aria-hidden="true" />}
                    </button>
                    {usersOpen && item.children.map((child) => (
                      <button
                        key={child.tab}
                        type="button"
                        onClick={() => goTo(child.path, child.tab)}
                        className="flex w-full items-center border-l-4 border-transparent py-3 pl-14 pr-5 text-left text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                );
              }

              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => goTo(item.path)}
                  className={`flex w-full items-center gap-3 border-l-4 px-5 py-3.5 text-left transition-colors ${active ? 'border-slate-950 bg-slate-100' : 'border-transparent hover:bg-slate-50'}`}
                  aria-current={active ? 'page' : undefined}
                >
                  <Icon size={18} color={active ? '#0f172a' : '#64748b'} aria-hidden="true" />
                  <span className={`flex-1 text-sm font-medium ${active ? 'text-slate-950' : 'text-slate-700'}`}>{item.label}</span>
                  {item.badge && (
                    <span className="flex min-w-[20px] h-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="border-t border-border/40 p-4 text-center">
            <p className="text-xs text-muted-foreground">RUNNA v1.0 | Admin</p>
          </div>
        </aside>
      </div>
      <p className="absolute bottom-4 hidden text-xs text-white/30 md:block">RUNNA | Admin Panel</p>
    </div>
  );
}
