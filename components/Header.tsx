import React from 'react';
import { PotIcon } from './icons/PotIcon';

export const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-40 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="./" className="flex items-center gap-3">
          <PotIcon className="h-8 w-8 text-amber-600" />
          <h1 className="text-2xl font-bold text-amber-900 font-display">Chef IA</h1>
        </a>
      </div>
    </header>
  );
};
