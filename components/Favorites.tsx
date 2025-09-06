import React from 'react';
import { Recipe } from '../types';
import { StarIcon } from './icons/StarIcon';

interface FavoritesProps {
  favorites: Recipe[];
  onToggleFavorite: (recipe: Recipe) => void;
  isFavorite: (recipe: Recipe) => boolean;
}

export const Favorites: React.FC<FavoritesProps> = ({ favorites, onToggleFavorite, isFavorite }) => {
  return (
    <section id="favorites-section" className="mt-16">
      <h2 className="text-3xl font-bold text-amber-900 mb-8 text-center font-display">Minhas Receitas Favoritas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {favorites.map((recipe) => (
          <div key={recipe.title} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
            <img 
              src={recipe.imageUrl || `https://picsum.photos/seed/${recipe.title.replace(/\s/g, '')}/400/300`} 
              alt={recipe.title} 
              className="w-full h-48 object-cover" 
            />
            <div className="p-6 flex-grow flex flex-col">
              <h3 className="text-xl font-bold text-amber-800 mb-2">{recipe.title}</h3>
              <p className="text-gray-600 text-sm mb-4 flex-grow">{recipe.description.substring(0, 100)}...</p>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-amber-600 font-semibold">Salvo</span>
                <button
                  onClick={() => onToggleFavorite(recipe)}
                  className={`p-2 rounded-full transition-colors ${
                    isFavorite(recipe) ? 'text-yellow-400' : 'text-gray-300'
                  } hover:text-yellow-500`}
                  aria-label="Toggle Favorite"
                >
                  <StarIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
