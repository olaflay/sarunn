import React, { useState } from 'react';
import { X, ChevronDown, Check } from 'lucide-react';
import { getLocations, getSubLocations } from '@/lib/runnaData';
import { setDeliveryLocation, getDeliveryLocation } from '@/lib/runnaStore';

/**
 * Bottom-sheet modal for picking Main Location + Sub Location + free-text note.
 * Calls onSave({ mainId, subId, note }) and onClose.
 * Can be dismissed (onClose with no save) — but at checkout it is enforced.
 */
export default function DeliveryLocationPicker({ campusId, open, onClose, onSave }) {
  const saved = getDeliveryLocation();
  const [mainId, setMainId] = useState(saved?.mainId || '');
  const [subId, setSubId] = useState(saved?.subId || '');
  const [note, setNote] = useState(saved?.note || '');

  if (!open) return null;

  const mainLocs = getLocations(campusId);
  const subLocs = mainId ? getSubLocations(mainId) : [];

  const handleSave = () => {
    if (!mainId) return;
    const loc = { mainId, subId, note };
    setDeliveryLocation(loc);
    onSave?.(loc);
    onClose();
  };

  return (
    <div className="absolute inset-0 z-[80] flex flex-col justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/45 animate-fade-in" />
      <div
        className="relative bg-white rounded-t-3xl p-5 pb-8 animate-slide-up space-y-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-bold text-foreground text-base">Delivery Location</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            <X size={15} />
          </button>
        </div>

        {/* Main location */}
        <div>
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Zone *</label>
          <div className="relative">
            <select
              value={mainId}
              onChange={e => { setMainId(e.target.value); setSubId(''); }}
              className="md3-input text-sm appearance-none pr-10"
            >
              <option value="">Select zone / area</option>
              {mainLocs.map(l => (
                <option key={l.id} value={l.id}>{l.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* Sub location */}
        {mainId && subLocs.length > 0 && (
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Landmark</label>
            <div className="relative">
              <select
                value={subId}
                onChange={e => setSubId(e.target.value)}
                className="md3-input text-sm appearance-none pr-10"
              >
                <option value="">Select landmark (optional)</option>
                {subLocs.map(s => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        )}

        {/* Free-text note */}
        {mainId && (
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Precise Details (optional)</label>
            <input
              className="md3-input text-sm"
              placeholder="e.g. Room 12, Block B, opposite the ICT centre"
              value={note}
              onChange={e => setNote(e.target.value)}
            />
          </div>
        )}

        <button
          onClick={handleSave}
          disabled={!mainId}
          className="w-full flex items-center justify-center gap-2 text-white font-semibold rounded-2xl py-4 text-sm"
          style={{ background: '#1B2B45', opacity: mainId ? 1 : 0.4 }}
        >
          <Check size={16} /> Save Location
        </button>

        <button onClick={onClose} className="w-full text-center text-xs text-muted-foreground py-1">
          Skip for now — you'll need to add this before checkout
        </button>
      </div>
    </div>
  );
}