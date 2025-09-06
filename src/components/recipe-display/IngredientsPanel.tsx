import React from 'react';
import { TipIcon } from '../icons/TipIcon';

interface IngredientsPanelProps {
  ingredients: string[];
}

export const IngredientsPanel: React.FC<IngredientsPanelProps> = ({ ingredients }) => (
  <div className="lg:col-span-1">
    <h3 className="text-3xl font-bold text-amber-900 font-display mb-4 border-b-4 border-amber-300 pb-2">Ingredientes</h3>
    <ul className="space-y-3 text-lg list-none text-gray-800">
      {ingredients.map((ingredient, index) => (
        <li key={index} className="flex items-start gap-3">
            <TipIcon className="h-7 w-7 flex-shrink-0 text-amber-600 mt-1" />
            <span>{ingredient}</span>
        </li>
      ))}
    </ul>
  </div>
);