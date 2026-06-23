import React, { useState } from 'react';
import { MapPin, Plus, Trash2, ChevronDown, ChevronRight, Check, Edit2, X } from 'lucide-react';
import AdminShell from '@/components/AdminShell';
import Snackbar from '@/components/Snackbar';
import { CAMPUSES, getLocations, getSubLocations, setLocations, setSubLocations } from '@/lib/runnaData';

export default function AdminPricing() {
  const [expandedCampus, setExpandedCampus] = useState(CAMPUSES[0]?.id || '');
  const [snack, setSnack] = useState('');

  const [locations, setLocState] = useState(() => {
    const obj = {};
    CAMPUSES.forEach(c => { obj[c.id] = getLocations(c.id); });
    return obj;
  });
  const [subLocations, setSubLocState] = useState(() => {
    const obj = {};
    Object.values(locations).flat().forEach(loc => { obj[loc.id] = getSubLocations(loc.id); });
    return obj;
  });

  const [newZoneName, setNewZoneName] = useState('');
  const [newZoneFee, setNewZoneFee] = useState('');
  const [addingZoneTo, setAddingZoneTo] = useState(null);

  const [newSubName, setNewSubName] = useState('');
  const [newSubSurcharge, setNewSubSurcharge] = useState('');
  const [addingSubTo, setAddingSubTo] = useState(null);

  const [editingZone, setEditingZone] = useState(null);
  const [editZoneFee, setEditZoneFee] = useState('');
  const [editingSub, setEditingSub] = useState(null);
  const [editSubSurcharge, setEditSubSurcharge] = useState('');

  const persistLocations = (updated) => {
    setLocState(updated);
    setLocations(updated);
  };

  const persistSubLocations = (updated) => {
    setSubLocState(updated);
    setSubLocations(updated);
  };

  const addZone = (campusId) => {
    if (!newZoneName.trim() || !newZoneFee) { setSnack('Enter zone name and fee'); return; }
    const newZone = {
      id: `${campusId}-${Date.now()}`,
      label: newZoneName.trim(),
      base_fee: parseInt(newZoneFee) || 0,
    };
    persistLocations({ ...locations, [campusId]: [...(locations[campusId] || []), newZone] });
    setNewZoneName(''); setNewZoneFee(''); setAddingZoneTo(null);
    setSnack('Zone added');
  };

  const deleteZone = (campusId, zoneId) => {
    persistLocations({ ...locations, [campusId]: (locations[campusId] || []).filter(z => z.id !== zoneId) });
    const newSubs = { ...subLocations };
    delete newSubs[zoneId];
    persistSubLocations(newSubs);
    setSnack('Zone deleted');
  };

  const updateZoneFee = (campusId, zoneId) => {
    persistLocations({
      ...locations,
      [campusId]: (locations[campusId] || []).map(z => z.id === zoneId ? { ...z, base_fee: parseInt(editZoneFee) || 0 } : z),
    });
    setEditingZone(null);
    setSnack('Fee updated');
  };

  const addSubLocation = (zoneId) => {
    if (!newSubName.trim()) { setSnack('Enter landmark name'); return; }
    const newSub = {
      id: `${zoneId}-${Date.now()}`,
      label: newSubName.trim(),
      surcharge: parseInt(newSubSurcharge) || 0,
    };
    persistSubLocations({ ...subLocations, [zoneId]: [...(subLocations[zoneId] || []), newSub] });
    setNewSubName(''); setNewSubSurcharge(''); setAddingSubTo(null);
    setSnack('Landmark added');
  };

  const deleteSubLocation = (zoneId, subId) => {
    persistSubLocations({ ...subLocations, [zoneId]: (subLocations[zoneId] || []).filter(s => s.id !== subId) });
    setSnack('Landmark deleted');
  };

  const updateSubSurcharge = (zoneId, subId) => {
    persistSubLocations({
      ...subLocations,
      [zoneId]: (subLocations[zoneId] || []).map(s => s.id === subId ? { ...s, surcharge: parseInt(editSubSurcharge) || 0 } : s),
    });
    setEditingSub(null);
    setSnack('Surcharge updated');
  };

  return (
    <AdminShell>
      <div className="bg-background min-h-full">
        <div className="bg-white border-b border-border/40 px-4 py-4 sticky top-0 z-30 flex items-center gap-2">
          <MapPin size={20} color="#1E7CFF" />
          <h1 className="font-heading font-bold text-foreground text-lg">Location Pricing</h1>
        </div>

        <div className="px-4 pt-4 space-y-3 pb-8">
          <p className="text-xs text-muted-foreground">Manage delivery zones, landmarks, and pricing for each campus. Changes take effect immediately.</p>

          {CAMPUSES.map(campus => {
            const isExpanded = expandedCampus === campus.id;
            const zones = locations[campus.id] || [];
            return (
              <div key={campus.id} className="bg-white rounded-2xl border border-border/40 overflow-hidden">
                <button
                  onClick={() => setExpandedCampus(isExpanded ? '' : campus.id)}
                  className="w-full flex items-center justify-between px-4 py-3.5"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#F0F2F7' }}>
                      <MapPin size={16} color="#1B2B45" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-foreground text-sm">{campus.name}</p>
                      <p className="text-xs text-muted-foreground">{zones.length} zones</p>
                    </div>
                  </div>
                  {isExpanded ? <ChevronDown size={16} color="#94a3b8" /> : <ChevronRight size={16} color="#94a3b8" />}
                </button>

                {isExpanded && (
                  <div className="border-t border-border/30">
                    {zones.map(zone => {
                      const zoneSubs = subLocations[zone.id] || [];
                      return (
                        <div key={zone.id} className="border-b border-border/20 last:border-0">
                          <div className="flex items-center justify-between px-4 py-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-2 h-2 rounded-full" style={{ background: '#1B2B45' }} />
                              <div>
                                <p className="text-sm font-medium text-foreground">{zone.label}</p>
                                <p className="text-xs text-muted-foreground">Base fee: ₦{zone.base_fee}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {editingZone === zone.id ? (
                                <div className="flex items-center gap-1.5">
                                  <input
                                    type="number"
                                    value={editZoneFee}
                                    onChange={e => setEditZoneFee(e.target.value)}
                                    className="w-20 px-2 py-1 text-sm rounded-lg border border-border"
                                    placeholder="₦"
                                  />
                                  <button onClick={() => updateZoneFee(campus.id, zone.id)} className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#E8F5E9' }}>
                                    <Check size={14} color="#2E7D32" />
                                  </button>
                                  <button onClick={() => setEditingZone(null)} className="w-7 h-7 rounded-lg flex items-center justify-center bg-muted">
                                    <X size={14} color="#94a3b8" />
                                  </button>
                                </div>
                              ) : (
                                <>
                                  <button
                                    onClick={() => { setEditingZone(zone.id); setEditZoneFee(String(zone.base_fee)); }}
                                    className="w-7 h-7 rounded-lg flex items-center justify-center bg-muted"
                                  >
                                    <Edit2 size={12} color="#64748b" />
                                  </button>
                                  <button
                                    onClick={() => deleteZone(campus.id, zone.id)}
                                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                                    style={{ background: '#FEECEB' }}
                                  >
                                    <Trash2 size={12} color="#B3261E" />
                                  </button>
                                </>
                              )}
                            </div>
                          </div>

                          {zoneSubs.length > 0 && (
                            <div className="pl-10 pr-4 pb-2 space-y-1">
                              {zoneSubs.map(sub => (
                                <div key={sub.id} className="flex items-center justify-between py-1.5">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-muted-foreground">·</span>
                                    <span className="text-xs text-foreground">{sub.label}</span>
                                    {sub.surcharge > 0 && (
                                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ background: '#FFF3E0', color: '#E65100' }}>
                                        +₦{sub.surcharge}
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    {editingSub === sub.id ? (
                                      <div className="flex items-center gap-1">
                                        <input
                                          type="number"
                                          value={editSubSurcharge}
                                          onChange={e => setEditSubSurcharge(e.target.value)}
                                          className="w-16 px-2 py-0.5 text-xs rounded-lg border border-border"
                                          placeholder="₦"
                                        />
                                        <button onClick={() => updateSubSurcharge(zone.id, sub.id)} className="w-6 h-6 rounded flex items-center justify-center" style={{ background: '#E8F5E9' }}>
                                          <Check size={12} color="#2E7D32" />
                                        </button>
                                        <button onClick={() => setEditingSub(null)} className="w-6 h-6 rounded flex items-center justify-center bg-muted">
                                          <X size={12} color="#94a3b8" />
                                        </button>
                                      </div>
                                    ) : (
                                      <>
                                        <button
                                          onClick={() => { setEditingSub(sub.id); setEditSubSurcharge(String(sub.surcharge)); }}
                                          className="w-6 h-6 rounded flex items-center justify-center bg-muted"
                                        >
                                          <Edit2 size={10} color="#64748b" />
                                        </button>
                                        <button
                                          onClick={() => deleteSubLocation(zone.id, sub.id)}
                                          className="w-6 h-6 rounded flex items-center justify-center"
                                          style={{ background: '#FEECEB' }}
                                        >
                                          <Trash2 size={10} color="#B3261E" />
                                        </button>
                                      </>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          <div className="pl-10 pr-4 pb-2">
                            {addingSubTo === zone.id ? (
                              <div className="flex items-center gap-1.5">
                                <input
                                  type="text"
                                  value={newSubName}
                                  onChange={e => setNewSubName(e.target.value)}
                                  className="flex-1 px-2 py-1.5 text-xs rounded-lg border border-border"
                                  placeholder="Landmark name"
                                />
                                <input
                                  type="number"
                                  value={newSubSurcharge}
                                  onChange={e => setNewSubSurcharge(e.target.value)}
                                  className="w-16 px-2 py-1.5 text-xs rounded-lg border border-border"
                                  placeholder="₦"
                                />
                                <button onClick={() => addSubLocation(zone.id)} className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#1B2B45' }}>
                                  <Check size={14} color="white" />
                                </button>
                                <button onClick={() => { setAddingSubTo(null); setNewSubName(''); setNewSubSurcharge(''); }} className="w-7 h-7 rounded-lg flex items-center justify-center bg-muted">
                                  <X size={14} color="#94a3b8" />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => { setAddingSubTo(zone.id); setNewSubName(''); setNewSubSurcharge(''); }}
                                className="flex items-center gap-1.5 text-xs font-medium"
                                style={{ color: '#1E7CFF' }}
                              >
                                <Plus size={12} /> Add landmark
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    <div className="px-4 py-3 border-t border-border/20">
                      {addingZoneTo === campus.id ? (
                        <div className="flex items-center gap-1.5">
                          <input
                            type="text"
                            value={newZoneName}
                            onChange={e => setNewZoneName(e.target.value)}
                            className="flex-1 px-2 py-1.5 text-sm rounded-lg border border-border"
                            placeholder="Zone name"
                          />
                          <input
                            type="number"
                            value={newZoneFee}
                            onChange={e => setNewZoneFee(e.target.value)}
                            className="w-20 px-2 py-1.5 text-sm rounded-lg border border-border"
                            placeholder="₦ fee"
                          />
                          <button onClick={() => addZone(campus.id)} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#1B2B45' }}>
                            <Check size={16} color="white" />
                          </button>
                          <button onClick={() => { setAddingZoneTo(null); setNewZoneName(''); setNewZoneFee(''); }} className="w-8 h-8 rounded-lg flex items-center justify-center bg-muted">
                            <X size={16} color="#94a3b8" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => { setAddingZoneTo(campus.id); setNewZoneName(''); setNewZoneFee(''); }}
                          className="flex items-center gap-1.5 text-sm font-medium"
                          style={{ color: '#1E7CFF' }}
                        >
                          <Plus size={14} /> Add zone
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <Snackbar message={snack} onClose={() => setSnack('')} />
    </AdminShell>
  );
}