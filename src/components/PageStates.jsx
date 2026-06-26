import React from 'react';
import { AlertTriangle, Inbox, Loader2, RefreshCw } from 'lucide-react';

export function LoadingState({ title = 'Loading...', subtitle = 'Please wait while we fetch your data.', rows = 3 }) {
  return (
    <div className="space-y-4 py-2" aria-busy="true" aria-live="polite">
      <div className="px-1">
        <div className="flex items-center gap-3 mb-2">
          <Loader2 size={18} className="animate-spin text-primary" />
          <div>
            <p className="font-semibold text-foreground text-sm">{title}</p>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="skeleton h-24 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

export function EmptyState({ icon: Icon = Inbox, title = 'Nothing here yet', subtitle = 'There is no data to show right now.', actionLabel, onAction }) {
  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
        <Icon size={28} color="#94a3b8" />
      </div>
      <h3 className="font-heading font-bold text-foreground text-base mb-1">{title}</h3>
      <p className="text-muted-foreground text-sm mb-6">{subtitle}</p>
      {actionLabel && onAction && (
        <button onClick={onAction} className="btn-filled px-6">
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export function ErrorState({ title = 'Something went wrong', subtitle = 'Please try again in a moment.', actionLabel = 'Retry', onAction }) {
  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
        <AlertTriangle size={28} color="#B3261E" />
      </div>
      <h3 className="font-heading font-bold text-foreground text-base mb-1">{title}</h3>
      <p className="text-muted-foreground text-sm mb-6">{subtitle}</p>
      {onAction && (
        <button onClick={onAction} className="btn-filled px-6">
          <RefreshCw size={14} />
          {actionLabel}
        </button>
      )}
    </div>
  );
}
