import React, { useEffect } from 'react';

export default function Snackbar({ message, onClose, duration = 3000 }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [message, onClose, duration]);

  if (!message) return null;
  return (
    <div className="snackbar animate-fade-in-up">
      {message}
    </div>
  );
}