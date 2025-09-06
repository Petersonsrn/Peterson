import React from 'react';
import { Recipe } from '../types';
import { ClockIcon } from './icons/ClockIcon';
import { ServingsIcon } from './icons/ServingsIcon';
import { StarIcon } from './icons/StarIcon';
import { PrintIcon } from './icons/PrintIcon';
import { DifficultyIcon } from './icons/DifficultyIcon';

interface RecipeDisplayProps {
  recipe: Recipe;
  onToggleFavorite: (recipe: Recipe) => void;
  isFavorite: boolean;
}

export const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe, onToggleFavorite, isFavorite }) => {
    
  const handlePrint = () => {
    window.print();
  };
    
  return (
    <article className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden print:shadow-none">
      <div className="relative">
        {recipe.imageUrl && (
          <img 
            src={recipe.imageUrl} 
            alt={recipe.title} 
            className="w-full h-64 md:h-96 object-cover" 
          />
        )}
        <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => onToggleFavorite(recipe)}
              className={`p-3 rounded-full transition-colors ${
                isFavorite ? 'bg-yellow-400 text-white' : 'bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-yellow-200'
              }`}
              aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            >
              <StarIcon className="h-6 w-6" />
            </button>
             <button
              onClick={handlePrint}
              className="p-3 bg-white/80 backdrop-blur-sm text-gray-600 rounded-full hover:bg-gray-200 transition-colors print:hidden"
              aria-label="Imprimir Receita"
            >
              <PrintIcon className="h-6 w-6" />
            </button>
        </div>
      </div>
      
      <div className="p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-bold text-amber-900 font-display mb-4">{recipe.title}</h1>
        <p className="text-gray-600 text-lg mb-6">{recipe.description}</p>
        
        <div className="flex flex-wrap gap-6 mb-8 text-amber-800">
          <div className="flex items-center gap-2">
            <ClockIcon className="h-6 w-6" />
            <span className="font-semibold">{recipe.prepTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <ServingsIcon className="h-6 w-6" />
            <span className="font-semibold">{recipe.servings}</span>
          </div>
          <div className="flex items-center gap-2">
            <DifficultyIcon className="h-6 w-6" />
            <span className="font-semibold">{recipe.difficulty}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold text-amber-900 mb-4 font-display">Ingredientes</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-amber-900 mb-4 font-display">Modo de Preparo</h2>
            <ol className="list-decimal list-inside space-y-4 text-gray-700">
              {recipe.instructions.map((step, index) => (
                <li key={index} className="pl-2">
                  <strong className="font-semibold text-gray-800">Passo {index + 1}:</strong> {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
        
        {recipe.tips && recipe.tips.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-amber-900 mb-4 font-display">Dicas do Chef</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 bg-amber-50 p-4 rounded-lg">
              {recipe.tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
};
