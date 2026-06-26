import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, User, ClipboardList, UtensilsCrossed, TrendingUp, Briefcase, DollarSign, LayoutDashboard, Settings, Users, Headset } from 'lucide-react';
import { useCart, cartItemCount } from '@/lib/runnaStore';

const NAV_CONFIGS = {
  customer: [
    { label: 'Home', icon: Home, path: '/customer/home' },
    { label: 'Orders', icon: ShoppingBag, path: '/customer/orders', cartBadge: true },
    { label: 'Support', icon: Headset, path: '/customer/support' },
    { label: 'Profile', icon: User, path: '/customer/profile' },
  ],
  vendor: [
    { label: 'Orders', icon: ClipboardList, path: '/vendor/orders' },
    { label: 'Menu', icon: UtensilsCrossed, path: '/vendor/menu' },
    { label: 'Earnings', icon: TrendingUp, path: '/vendor/earnings' },
    { label: 'Profile', icon: User, path: '/vendor/profile' },
  ],
  runner: [
    { label: 'Home', icon: Home, path: '/runner/home' },
    { label: 'Jobs', icon: Briefcase, path: '/runner/jobs' },
    { label: 'Earnings', icon: DollarSign, path: '/runner/earnings' },
    { label: 'Profile', icon: User, path: '/runner/profile' },
  ],
  admin: [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { label: 'Orders', icon: ClipboardList, path: '/admin/orders' },
    { label: 'Users', icon: Users, path: '/admin/users' },
    { label: 'Settings', icon: Settings, path: '/admin/settings' },
  ],
};

export default function BottomNav({ role }) {
  const navigate = useNavigate();
  const location = useLocation();
  const cart = useCart();
  const items = NAV_CONFIGS[role] || [];
  const count = cartItemCount(cart);

  return (
    <nav className="bottom-nav" aria-label={`${role} navigation`}>
      <div className="hidden md:flex md:flex-col md:gap-1 md:mb-4 md:px-3">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Runna</p>
        <p className="text-lg font-semibold tracking-tight text-foreground">
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </p>
      </div>
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
        const label = `${item.label}${isActive ? ', current page' : ''}`;

        return (
          <button
            key={item.path}
            type="button"
            onClick={() => navigate(item.path)}
            className={`bottom-nav-item ${isActive ? 'active' : ''} md:w-full md:items-start`}
            aria-current={isActive ? 'page' : undefined}
            aria-label={label}
            title={item.label}
          >
            <span className="nav-indicator relative flex items-center justify-center transition-all duration-200 md:rounded-xl md:bg-transparent">
              <Icon
                size={22}
                strokeWidth={isActive ? 2.5 : 1.9}
                color={isActive ? '#1E7CFF' : '#64748b'}
                aria-hidden="true"
              />
              {item.cartBadge && count > 0 && (
                <span className="absolute -right-1 -top-1 flex min-w-[16px] h-4 items-center justify-center rounded-full border border-white bg-red-500 px-1 text-[9px] font-bold text-white">
                  {count}
                </span>
              )}
            </span>
            <span className="text-[0.6875rem] font-medium leading-none md:text-sm md:font-medium md:tracking-tight">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
