import React from 'react';
import { TipIcon } from '../icons/TipIcon';

interface TipsPanelProps {
  tips: string[];
}

export const TipsPanel: React.FC<TipsPanelProps> = ({ tips }) => (
  <div className="mt-12 bg-amber-50 p-6 rounded-2xl border-l-8 border-amber-400">
    <h3 className="text-2xl font-bold text-amber-900 font-display mb-3 flex items-center gap-3">
      <TipIcon className="h-7 w-7"/>
      Dicas do Chef
    </h3>
    <ul className="space-y-2 text-lg list-none text-gray-800">
      {tips.map((tip, index) => (
         <li key={index} className="flex items-start gap-3">
            <TipIcon className="h-7 w-7 flex-shrink-0 text-amber-600 mt-1" />
            <span>{tip}</span>
        </li>
      ))}
    </ul>
  </div>
);