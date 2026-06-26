import React, { useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';

export default function NetworkStatusBar() {
  const [online, setOnline] = useState(typeof navigator === 'undefined' ? true : navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (online) return null;

  return (
    <div
      className="mx-4 mt-3 flex items-center gap-2 rounded-[20px] border border-amber-200 bg-amber-50/95 px-4 py-3 text-amber-900 shadow-sm animate-fade-in-up"
      role="status"
      aria-live="polite"
    >
      <WifiOff size={16} className="shrink-0" />
      <div className="min-w-0">
        <p className="text-sm font-semibold leading-tight">You're offline</p>
        <p className="text-xs text-amber-800/80">Some changes will sync when the connection returns.</p>
      </div>
    </div>
  );
}
