import React from 'react';
import { motion } from 'framer-motion';
import { BreakfastIcon } from './icons/BreakfastIcon';
import { LunchIcon } from './icons/LunchIcon';
import { DinnerIcon } from './icons/DinnerIcon';
import { DessertIcon } from './icons/DessertIcon';
import { SnackIcon } from './icons/SnackIcon';
import { DrinkIcon } from './icons/DrinkIcon';

interface InitialInspirationProps {
  onCategoryClick: (category: string) => void;
}

const inspirationCategories = [
  { name: 'Café da Manhã', icon: BreakfastIcon, category: 'café da manhã' },
  { name: 'Almoço', icon: LunchIcon, category: 'almoço' },
  { name: 'Jantar', icon: DinnerIcon, category: 'jantar' },
  { name: 'Sobremesa', icon: DessertIcon, category: 'sobremesa' },
  { name: 'Lanche', icon: SnackIcon, category: 'lanche' },
  { name: 'Bebida', icon: DrinkIcon, category: 'bebida' },
];

export const InitialInspiration: React.FC<InitialInspirationProps> = ({ onCategoryClick }) => {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className="text-3xl font-bold text-amber-900 mb-2 font-display">Sem ideias?</h3>
      <p className="text-gray-700 mb-6 text-lg">Comece com uma destas categorias populares.</p>
      <div className="flex flex-wrap justify-center gap-4">
        {inspirationCategories.map(({ name, icon: Icon, category }) => (
          <motion.button
            key={name}
            onClick={() => onCategoryClick(category)}
            className="flex items-center gap-3 px-5 py-3 bg-white border-2 border-amber-200 rounded-full text-amber-800 font-semibold text-lg hover:bg-amber-100 hover:border-amber-300 transition-all shadow-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon className="h-6 w-6" />
            <span>{name}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};
