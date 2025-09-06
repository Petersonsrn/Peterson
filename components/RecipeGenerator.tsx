import React, { useState, useCallback } from 'react';
import { SearchIcon } from './icons/SearchIcon.tsx';
import { CookingSpinner } from './icons/CookingSpinner.tsx';
import { useIngredientSuggestions } from '../hooks/useIngredientSuggestions.ts';

interface RecipeGeneratorProps {
  generateRecipe: (ingredients: string, time: string, difficulty: string) => void;
  isGenerating: boolean;
}

export const RecipeGenerator: React.FC<RecipeGeneratorProps> = ({ generateRecipe, isGenerating }) => {
  const [ingredients, setIngredients] = useState('');
  const [time, setTime] = useState('any');
  const [difficulty, setDifficulty] = useState('any');

  const { suggestions, updateSuggestions, clearSuggestions } = useIngredientSuggestions();

  const handleIngredientsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIngredients(value);
    updateSuggestions(value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    const parts = ingredients.split(',').map(p => p.trim());
    parts[parts.length - 1] = suggestion;
    setIngredients(parts.join(', ') + ', ');
    clearSuggestions();
  };

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (isGenerating || !ingredients.trim()) return;
    generateRecipe(ingredients, time, difficulty);
  }, [ingredients, time, difficulty, generateRecipe, isGenerating]);

  return (
    <section id="generator-section" className="w-full max-w-3xl mx-auto bg-white p-10 md:p-12 rounded-3xl shadow-xl">
      <h2 className="text-3xl md:text-4xl font-bold text-amber-900 text-center mb-6 font-display">Crie sua receita perfeita!</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <label htmlFor="ingredients" className="block text-lg font-semibold text-gray-800 mb-2">
            Quais ingredientes você tem em casa?
          </label>
          <div className="relative">
            <input
              type="text"
              id="ingredients"
              value={ingredients}
              onChange={handleIngredientsChange}
              onBlur={() => setTimeout(clearSuggestions, 200)}
              className="w-full pl-4 pr-10 py-3 text-lg bg-white text-gray-900 placeholder-gray-400 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              placeholder="Ex: frango, tomate, arroz"
              autoComplete="off"
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg max-h-60 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onMouseDown={() => handleSuggestionClick(suggestion)}
                    className="px-4 py-2 cursor-pointer hover:bg-amber-100"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <p className="text-lg text-gray-600 mt-2">Comece digitando os ingredientes que você tem, separados por vírgulas.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="time" className="block text-lg font-semibold text-gray-800 mb-2">
              Tempo de Preparo
            </label>
            <select
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white text-gray-700 font-semibold"
            >
              <option value="any">Qualquer tempo</option>
              <option value="15">Até 15 min</option>
              <option value="30">Até 30 min</option>
              <option value="60">Até 1 hora</option>
            </select>
          </div>
          <div>
            <label htmlFor="difficulty" className="block text-lg font-semibold text-gray-800 mb-2">
              Dificuldade
            </label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white text-gray-700 font-semibold"
            >
              <option value="any">Qualquer uma</option>
              <option value="Fácil">Fácil</option>
              <option value="Média">Média</option>
              <option value="Difícil">Difícil</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isGenerating || !ingredients.trim()}
          className="w-full flex items-center justify-center py-5 px-6 bg-amber-900 text-white font-bold text-2xl rounded-full hover:bg-amber-800 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <CookingSpinner className="h-8 w-8 mr-3" />
              <span>Gerando Mágica...</span>
            </>
          ) : (
            <>
              <SearchIcon className="h-8 w-8 mr-3" />
              <span>Gerar Receita</span>
            </>
          )}
        </button>
      </form>
    </section>
  );
};