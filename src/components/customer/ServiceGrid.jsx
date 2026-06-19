import React from 'react';
import { UtensilsCrossed, Package, Shirt, Printer } from 'lucide-react';
import { SERVICES } from '@/lib/runnaData';

const ICONS = {
  food: UtensilsCrossed,
  send: Package,
  laundry: Shirt,
  print: Printer
};

export default function ServiceGrid({ onSelect }) {
  return (
    <div className="grid grid-cols-4 gap-2.5">
      {SERVICES.map((s) => {
        const Icon = ICONS[s.id];
        return null;


































      })}
    </div>);

}