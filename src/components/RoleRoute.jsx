import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { ROLE_HOME_PATHS } from '@/constants/roles';

export default function RoleRoute({ allowedRoles = [], children }) {
  const { user, isLoadingAuth, authChecked } = useAuth();

  if (isLoadingAuth || !authChecked) {
    return (
      <div className="min-h-screen grid place-items-center bg-background">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-950" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === 'admin') return children;
  if (allowedRoles.includes(user.role)) return children;

  return <Navigate to={ROLE_HOME_PATHS[user.role] || '/login'} replace />;
}
