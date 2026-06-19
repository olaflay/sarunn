import React from 'react';

const STATUS_STYLES = {
  pending:    { bg: '#FFF8E1', color: '#F59E0B', label: 'Pending' },
  confirmed:  { bg: '#E3F2FD', color: '#1E7CFF', label: 'Confirmed' },
  ready:      { bg: '#E8F5E9', color: '#2E7D32', label: 'Ready' },
  picked_up:  { bg: '#F3E5F5', color: '#9333EA', label: 'Picked Up' },
  delivered:  { bg: '#E8F5E9', color: '#2E7D32', label: 'Delivered' },
  cancelled:  { bg: '#FEECEB', color: '#B3261E', label: 'Cancelled' },
  open:       { bg: '#E3F2FD', color: '#1E7CFF', label: 'Open' },
  accepted:   { bg: '#F3E5F5', color: '#9333EA', label: 'Accepted' },
  in_progress:{ bg: '#FFF8E1', color: '#F59E0B', label: 'In Progress' },
  completed:  { bg: '#E8F5E9', color: '#2E7D32', label: 'Completed' },
  paid:       { bg: '#E8F5E9', color: '#2E7D32', label: 'Paid' },
  failed:     { bg: '#FEECEB', color: '#B3261E', label: 'Failed' },
};

export default function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || { bg: '#F5F5F5', color: '#666', label: status };
  return (
    <span
      className="status-badge"
      style={{ background: style.bg, color: style.color }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full inline-block"
        style={{ background: style.color }}
      />
      {style.label}
    </span>
  );
}