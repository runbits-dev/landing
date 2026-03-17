import { useState } from 'react';
import type { Translations } from '../i18n';

const PLANS = [
  { name: 'Starter', price: 49,  maxVolume: 8000 },
  { name: 'Growth',  price: 129, maxVolume: 25000 },
  { name: 'Pro',     price: 299, maxVolume: 80000 },
];

function recommendPlan(monthlyVolume: number) {
  return PLANS.find(p => monthlyVolume <= p.maxVolume) ?? PLANS[PLANS.length - 1];
}

interface Props {
  tr: Translations['savings'];
}

export default function SavingsCalculator({ tr }: Props) {
  const [dailySales, setDailySales] = useState(500);

  const monthlyVolume   = dailySales * 30;
  const rappiCommission = Math.round(monthlyVolume * 0.30);
  const plan            = recommendPlan(monthlyVolume);
  const savings         = rappiCommission - plan.price;
  const roi             = plan.price > 0 ? Math.round(savings / plan.price) : 0;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-xl mx-auto">
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {tr.dailySales}
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min={50}
            max={10000}
            step={50}
            value={dailySales}
            onChange={e => setDailySales(Number(e.target.value))}
            className="flex-1 accent-brand-500"
          />
          <span className="text-2xl font-bold text-brand-600 w-28 text-right">
            ${dailySales.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-red-50 rounded-xl p-4">
          <p className="text-xs text-red-500 font-medium mb-1">{tr.monthlyCommission}</p>
          <p className="text-2xl font-bold text-red-600">${rappiCommission.toLocaleString()}</p>
          <p className="text-xs text-red-400 mt-1">Rappi / PedidosYa (30%)</p>
        </div>
        <div className="bg-brand-50 rounded-xl p-4">
          <p className="text-xs text-brand-600 font-medium mb-1">{tr.withRunbits}</p>
          <p className="text-2xl font-bold text-brand-700">${plan.price}</p>
          <p className="text-xs text-brand-500 mt-1">Plan {plan.name}</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-brand-500 to-brand-600 rounded-xl p-5 text-white text-center">
        <p className="text-sm font-medium opacity-90 mb-1">{tr.youSave}</p>
        <p className="text-4xl font-black">${savings.toLocaleString()}</p>
        <p className="text-sm mt-2 opacity-80">
          {tr.roiLabel}: <span className="font-bold">{roi}{tr.times}</span>
        </p>
      </div>
    </div>
  );
}
