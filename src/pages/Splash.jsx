import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RunnaShell from '@/components/RunnaShell';
import DemoBar from '@/components/DemoBar';

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate('/customer/home'), 2800);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <RunnaShell>
      <DemoBar currentRole="Customer" />
      <div
        className="flex-1 flex flex-col items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #1B2B45 0%, #0F1E30 100%)' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8 animate-fade-in-up" style={{ animationDelay: '0s' }}>
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 8 L10 56 L20 56 L20 38 L34 38 L46 56 L58 56 L44 36 C50 33 54 27 54 20 C54 13 48 8 40 8 Z M20 18 L38 18 C42 18 44 21 44 24 C44 27 42 30 38 30 L20 30 Z"
              fill="#FFFFFF"
              fillRule="evenodd"
            />
            <rect x="0" y="19" width="9" height="5" rx="1" fill="rgba(255,255,255,0.3)" />
            <rect x="0" y="28" width="9" height="5" rx="1" fill="rgba(255,255,255,0.3)" />
            <rect x="0" y="37" width="9" height="5" rx="1" fill="rgba(255,255,255,0.3)" />
          </svg>
          <span className="text-white font-display font-black tracking-widest" style={{ fontSize: '2rem', letterSpacing: '0.1em' }}>
            RUNNA
          </span>
        </div>

        {/* Tagline */}
        <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <p className="text-white/90 font-heading font-bold text-xl mb-1">Food & Errands Delivery</p>
          <p className="text-white/60 font-body text-sm">Fast. Fresh. Reliable.</p>
        </div>

        {/* Loading dots */}
        <div className="flex gap-2 mt-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          {[0, 0.2, 0.4].map((delay, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-white/50"
              style={{ animation: `pulse 1.5s ease-in-out ${delay}s infinite` }}
            />
          ))}
        </div>
      </div>
    </RunnaShell>
  );
}