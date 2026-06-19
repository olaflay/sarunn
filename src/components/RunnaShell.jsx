import React from 'react';

export default function RunnaShell({ children }) {
  return (
    <div className="w-full h-screen flex items-center justify-center navy-gradient">
      <div className="runna-shell shadow-2xl">
        {children}
      </div>
      <p className="absolute bottom-4 text-xs text-white/30 hidden md:block">
        RUNNA · Mobile-first PWA · Material Design 3
      </p>
    </div>
  );
}