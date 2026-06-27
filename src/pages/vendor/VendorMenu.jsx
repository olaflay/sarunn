import React, { useState } from 'react';
import { Plus, Edit2, Trash2, ToggleLeft, ToggleRight, X } from 'lucide-react';
import RunnaShell from '@/components/RunnaShell';
import BottomNav from '@/components/BottomNav';
import Snackbar from '@/components/Snackbar';
import { EmptyState } from '@/components/PageStates';

const DEFAULT_ITEMS = [
  { id: 'm1', name: 'Classic Smash Burger', description: 'Double patty, cheddar, special sauce', price: 4500, category: 'Burgers', image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=80&h=80&fit=crop', is_available: true },
  { id: 'm2', name: 'BBQ Bacon Burger', description: 'Crispy bacon, BBQ sauce, pickles', price: 5200, category: 'Burgers', image_url: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=80&h=80&fit=crop', is_available: true },
  { id: 'm3', name: 'Crispy Fries (Large)', description: 'Seasoned with our signature spice', price: 1500, category: 'Sides', image_url: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=80&h=80&fit=crop', is_available: true },
  { id: 'm4', name: 'Chocolate Milkshake', description: 'Thick, creamy, indulgent', price: 2200, category: 'Drinks', image_url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=80&h=80&fit=crop', is_available: false },
];

function ItemModal({ item, onClose, onSave }) {
  const [form, setForm] = useState(item || { name: '', description: '', price: '', category: '', is_available: true });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 z-50 flex items-end" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="bg-white rounded-t-3xl w-full p-5 animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-bold text-foreground text-lg">{item ? 'Edit Item' : 'Add Menu Item'}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"><X size={16} /></button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">Item Name *</label>
            <input className="md3-input text-sm" placeholder="e.g. Classic Burger" value={form.name} onChange={e => set('name', e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">Description</label>
            <input className="md3-input text-sm" placeholder="Briefly describe this item" value={form.description} onChange={e => set('description', e.target.value)} />
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs font-medium text-muted-foreground block mb-1.5">Price (₦) *</label>
              <input className="md3-input text-sm" type="number" placeholder="0" value={form.price} onChange={e => set('price', e.target.value)} />
            </div>
            <div className="flex-1">
              <label className="text-xs font-medium text-muted-foreground block mb-1.5">Category</label>
              <input className="md3-input text-sm" placeholder="e.g. Burgers" value={form.category} onChange={e => set('category', e.target.value)} />
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted rounded-xl">
            <span className="text-sm font-medium text-foreground">Available for ordering</span>
            <button onClick={() => set('is_available', !form.is_available)}>
              {form.is_available
                ? <ToggleRight size={28} color="#1E7CFF" />
                : <ToggleLeft size={28} color="#94a3b8" />}
            </button>
          </div>
          <button onClick={() => onSave(form)} className="btn-filled w-full" style={{ borderRadius: '14px', padding: '14px' }}>
            {item ? 'Save Changes' : 'Add Item'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function VendorMenu() {
  const [items, setItems] = useState(DEFAULT_ITEMS);
  const [modal, setModal] = useState(null);
  const [snack, setSnack] = useState('');

  const handleSave = (form) => {
    if (modal === 'new') {
      setItems(prev => [...prev, { ...form, id: Date.now().toString(), price: parseFloat(form.price), image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=80&h=80&fit=crop' }]);
      setSnack('✅ Item added to menu!');
    } else {
      setItems(prev => prev.map(i => i.id === modal.id ? { ...i, ...form, price: parseFloat(form.price) } : i));
      setSnack('✅ Item updated!');
    }
    setModal(null);
  };

  const handleDelete = (id) => {
    setItems(prev => prev.filter(i => i.id !== id));
    setSnack('🗑 Item removed from menu.');
  };

  const toggleAvailability = (id) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, is_available: !i.is_available } : i));
  };

  const categories = [...new Set(items.map(i => i.category))];

  if (items.length === 0) {
    return (
      <RunnaShell>
        <div className="sarunn-screen bg-background flex flex-col items-center justify-center px-8 text-center">
          <EmptyState
            title="Menu is empty"
            subtitle="Add your first item to start accepting orders."
            actionLabel="Add Item"
            onAction={() => setModal('new')}
          />
        </div>
        <BottomNav role="vendor" />
        {modal && <ItemModal item={modal === 'new' ? null : modal} onClose={() => setModal(null)} onSave={handleSave} />}
        <Snackbar message={snack} onClose={() => setSnack('')} />
      </RunnaShell>
    );
  }

  return (
    <RunnaShell>
      <div className="sarunn-screen bg-background">
        <div className="flex items-center justify-between px-4 py-4 bg-white border-b border-border/40 sticky top-0 z-30">
          <div>
            <h1 className="font-heading font-bold text-foreground text-lg">Menu</h1>
            <p className="text-muted-foreground text-xs">{items.length} items · {items.filter(i => i.is_available).length} available</p>
          </div>
          <button onClick={() => setModal('new')} className="btn-filled text-xs px-4 py-2.5">
            <Plus size={14} /> Add Item
          </button>
        </div>

        <div className="px-4 pt-4">
          {categories.map(cat => (
            <div key={cat} className="mb-5">
              <h3 className="font-semibold text-foreground text-sm mb-3">{cat}</h3>
              <div className="space-y-2">
                {items.filter(i => i.category === cat).map(item => (
                  <div key={item.id} className={`md3-card flex items-center gap-3 p-3 ${!item.is_available ? 'opacity-60' : ''}`}>
                    <img src={item.image_url} alt="" className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-foreground text-sm leading-tight">{item.name}</p>
                        {!item.is_available && <span className="text-xs bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-lg">Unavailable</span>}
                      </div>
                      <p className="font-bold text-sm mt-0.5" style={{ color: '#1E7CFF' }}>₦{item.price?.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button onClick={() => toggleAvailability(item.id)} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        {item.is_available ? <ToggleRight size={16} color="#2E7D32" /> : <ToggleLeft size={16} color="#94a3b8" />}
                      </button>
                      <button onClick={() => setModal(item)} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <Edit2 size={14} color="#1E7CFF" />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                        <Trash2 size={14} color="#B3261E" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav role="vendor" />
      {modal && <ItemModal item={modal === 'new' ? null : modal} onClose={() => setModal(null)} onSave={handleSave} />}
      <Snackbar message={snack} onClose={() => setSnack('')} />
    </RunnaShell>
  );
}
