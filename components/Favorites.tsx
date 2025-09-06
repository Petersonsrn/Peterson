import React from 'react';
import { Recipe } from '../types';
import { StarIcon } from './icons/StarIcon';
import { ClockIcon } from './icons/ClockIcon';
import { DifficultyIcon } from './icons/DifficultyIcon';
import { PotIcon } from './icons/PotIcon';

interface FavoritesProps {
  favorites: Recipe[];
  onToggleFavorite: (recipe: Recipe) => void;
  isFavorite: (recipe: Recipe) => boolean;
}

export const Favorites: React.FC<FavoritesProps> = ({ favorites, onToggleFavorite, isFavorite }) => {
  if (favorites.length === 0) {
    return (
      <section id="favorites-section" className="mt-20 py-12 bg-white rounded-3xl shadow-lg">
        <div className="text-center">
          <PotIcon className="h-12 w-12 mx-auto text-amber-600 mb-4" />
          <h2 className="text-3xl font-bold text-amber-900 font-display">Suas Receitas Salvas</h2>
          <p className="text-gray-700 mt-2 text-lg">Você ainda não salvou nenhuma receita.</p>
          <p className="text-gray-700 text-base">Clique no ícone ⭐️ em uma receita para guardá-la aqui!</p>
        </div>
      </section>
    );
  }

  return (
    <section id="favorites-section" className="mt-20">
      <h2 className="text-3xl font-bold text-amber-900 mb-8 text-center font-display">Suas Receitas Salvas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {favorites.map((recipe) => (
          <div key={recipe.title} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <img 
              src={recipe.imageUrl || `https://picsum.photos/seed/${recipe.title.replace(/\s/g, '')}/400/300`} 
              alt={recipe.title} 
              className="w-full h-48 object-cover" 
            />
            <div className="p-6 flex-grow flex flex-col">
              <h3 className="text-2xl font-bold text-amber-800 mb-2 font-display">{recipe.title}</h3>
              <p className="text-gray-700 text-lg mb-4 flex-grow">{recipe.description.substring(0, 100)}...</p>
              
              <div className="flex items-center gap-4 text-lg text-gray-700 mt-auto border-t pt-4">
                <div className="flex items-center gap-1.5">
                    <ClockIcon className="h-5 w-5" />
                    <span>{recipe.prepTime}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <DifficultyIcon className="h-5 w-5" />
                    <span>{recipe.difficulty}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <span className={`text-lg font-bold ${isFavorite(recipe) ? 'text-amber-600' : 'text-gray-500'}`}>
                  {isFavorite(recipe) ? 'Salvo' : 'Não Salvo'}
                </span>
                <button
                  onClick={() => onToggleFavorite(recipe)}
                  className={`p-2 rounded-full transition-colors ${
                    isFavorite(recipe) ? 'text-yellow-400' : 'text-gray-300'
                  } hover:text-yellow-500`}
                  aria-label="Toggle Favorite"
                >
                  <StarIcon className={`h-8 w-8 ${isFavorite(recipe) ? 'fill-yellow-400' : 'fill-current'}`} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};