import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, Compass } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';

export default function PageNotFound() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const pageName = location.pathname.replace(/^\//, '') || 'home';

  const homePath = user?.role ? `/${user.role}/home` : '/';

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(27,43,69,0.14),_transparent_36%),linear-gradient(180deg,#f8fafc_0%,#eef2f7_100%)] flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center navy-gradient text-white">
            <Compass size={20} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Sarunn</p>
            <h1 className="text-2xl font-semibold text-slate-950">Page not found</h1>
          </div>
        </div>

        <p className="text-sm leading-6 text-slate-600">
          The route <span className="font-medium text-slate-900">/{pageName}</span> does not exist in this build.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <ArrowLeft size={16} />
            Go back
          </button>
          <button
            onClick={() => navigate(homePath)}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <Home size={16} />
            Go home
          </button>
        </div>
      </div>
    </div>
  );
}

