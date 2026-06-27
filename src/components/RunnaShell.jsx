import React from 'react';
import NetworkStatusBar from '@/components/NetworkStatusBar';

export default function SarunnShell({ children }) {
  return (
    <div className="w-full min-h-[100dvh] flex items-center justify-center navy-gradient px-0 sm:px-4 py-0 sm:py-4">
      <div className="sarunn-shell relative overflow-hidden shadow-[0_24px_80px_rgba(15,23,42,0.24)]">
        <NetworkStatusBar />
        {children}
      </div>
      <p className="absolute bottom-4 hidden text-xs text-white/30 md:block">
        SARUNN | Mobile-first PWA | Material Design 3
      </p>
    </div>
  );
}
