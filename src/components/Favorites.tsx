import React from 'react';
import { motion } from 'framer-motion';
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

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
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {favorites.map((recipe) => (
          <motion.div
            key={recipe.title}
            className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
            variants={itemVariants}
            // FIX: Corrected the framer-motion 'shadow' prop to 'boxShadow' to fix the animation error on hover.
            whileHover={{ y: -8, scale: 1.03, boxShadow: '0px 20px 30px -10px rgba(0,0,0,0.2)' }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
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
                    <ClockIcon className="h-5 w-5 text-gray-600" />
                    <span>{recipe.prepTime}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <DifficultyIcon className="h-5 w-5 text-gray-600" />
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
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};