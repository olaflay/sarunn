import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingBag, User, ClipboardList, UtensilsCrossed, TrendingUp, Briefcase, DollarSign, LayoutDashboard, Settings, Users } from 'lucide-react';

const NAV_CONFIGS = {
  customer: [
    { label: 'Home', icon: Home, path: '/customer/home' },
    { label: 'Search', icon: Search, path: '/customer/search' },
    { label: 'Orders', icon: ShoppingBag, path: '/customer/orders' },
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
  const items = NAV_CONFIGS[role] || [];

  return (
    <div className="bottom-nav">
      {items.map(item => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="bottom-nav-item"
          >
            <div className={`nav-indicator px-4 py-1 transition-all duration-200 ${isActive ? 'bg-blue-50 rounded-2xl' : ''}`}>
              <Icon
                size={22}
                strokeWidth={isActive ? 2.5 : 1.75}
                color={isActive ? '#1E7CFF' : '#94a3b8'}
              />
            </div>
            <span
              className="text-xs font-medium transition-colors"
              style={{ color: isActive ? '#1E7CFF' : '#94a3b8', fontSize: '0.6875rem' }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}