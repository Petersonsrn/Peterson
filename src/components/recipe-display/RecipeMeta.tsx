import React from 'react';
import { ClockIcon } from '../icons/ClockIcon';
import { ServingsIcon } from '../icons/ServingsIcon';
import { DifficultyIcon } from '../icons/DifficultyIcon';

interface RecipeMetaProps {
  prepTime: string;
  servings: string;
  difficulty: string;
}

export const RecipeMeta: React.FC<RecipeMetaProps> = ({ prepTime, servings, difficulty }) => (
  <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-lg text-gray-700">
    <span className="flex items-center gap-2 font-semibold">
      <ClockIcon className="h-8 w-8 text-amber-700" />
      {prepTime}
    </span>
    <span className="flex items-center gap-2 font-semibold">
      <ServingsIcon className="h-8 w-8 text-amber-700" />
      {servings}
    </span>
    <span className="flex items-center gap-2 font-semibold">
      <DifficultyIcon className="h-8 w-8 text-amber-700" />
      {difficulty}
    </span>
  </div>
);
