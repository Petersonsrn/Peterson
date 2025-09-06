import React from 'react';
import { motion } from 'framer-motion';
import { StarIcon } from '../icons/StarIcon';
import { PrintIcon } from '../icons/PrintIcon';

interface RecipeActionsProps {
  onToggleFavorite: () => void;
  isFavorite: boolean;
  onPrint: () => void;
}

export const RecipeActions: React.FC<RecipeActionsProps> = ({ onToggleFavorite, isFavorite, onPrint }) => (
  <div className="print:hidden flex items-center gap-4">
    <motion.button
      onClick={onToggleFavorite}
      className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-colors ${
        isFavorite
        ? 'bg-yellow-400 text-yellow-900 hover:bg-yellow-500'
        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
      }`}
      aria-label="Toggle Favorite"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <StarIcon className={`h-8 w-8 ${isFavorite ? 'text-yellow-900' : 'text-gray-800'}`} />
      <span>{isFavorite ? 'Salvo' : 'Salvar'}</span>
    </motion.button>
    <motion.button
      onClick={onPrint}
      className="p-3 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition-colors"
      aria-label="Print Recipe"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <PrintIcon className="h-8 w-8" />
    </motion.button>
  </div>
);