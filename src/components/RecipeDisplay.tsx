import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Recipe } from '../types';
import { CookingView } from './CookingView';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { PlayIcon } from './icons/PlayIcon';
import { RecipeHeader } from './recipe-display/RecipeHeader';
import { RecipeMeta } from './recipe-display/RecipeMeta';
import { RecipeActions } from './recipe-display/RecipeActions';
import { IngredientsPanel } from './recipe-display/IngredientsPanel';
import { InstructionsPanel } from './recipe-display/InstructionsPanel';
import { TipsPanel } from './recipe-display/TipsPanel';

interface RecipeDisplayProps {
  recipe: Recipe;
  onToggleFavorite: (recipe: Recipe) => void;
  isFavorite: boolean;
}

export const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe, onToggleFavorite, isFavorite }) => {
  const [showCookingView, setShowCookingView] = useState(false);
  const startCookingButtonRef = useRef<HTMLButtonElement>(null);
  const { isSpeaking, speak, cancel } = useSpeechSynthesis();
  const wasInCookingView = useRef(false);

  useEffect(() => {
    if (showCookingView) {
      wasInCookingView.current = true;
    } else if (wasInCookingView.current) {
      startCookingButtonRef.current?.focus();
      wasInCookingView.current = false;
    }
  }, [showCookingView]);

  const handlePrint = () => {
    window.print();
  };

  const handleToggleSpeech = () => {
    if (isSpeaking) {
      cancel();
    } else {
      const instructionsText = recipe.instructions.map((step, index) => `Passo ${index + 1}. ${step}`).join(' ');
      speak(instructionsText, 'pt-BR');
    }
  };

  if (showCookingView) {
    return <CookingView recipe={recipe} onClose={() => setShowCookingView(false)} />;
  }

  return (
    <motion.div
      id="recipe-display"
      className="bg-white rounded-3xl shadow-2xl overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ type: 'spring', duration: 0.6 }}
    >
      <RecipeHeader imageUrl={recipe.imageUrl} title={recipe.title} description={recipe.description} />

      <div className="p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
          <RecipeMeta prepTime={recipe.prepTime} servings={recipe.servings} difficulty={recipe.difficulty} />
          <RecipeActions onToggleFavorite={() => onToggleFavorite(recipe)} isFavorite={isFavorite} onPrint={handlePrint} />
        </div>

        <div className="text-center mb-10">
          <motion.button
              ref={startCookingButtonRef}
              onClick={() => setShowCookingView(true)}
              className="flex items-center justify-center gap-3 px-8 py-4 bg-amber-700 text-white font-bold text-xl rounded-full hover:bg-amber-600 transition-transform"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
          >
              <PlayIcon className="h-7 w-7" />
              <span>Modo de Cozinha</span>
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <IngredientsPanel ingredients={recipe.ingredients} />
          <InstructionsPanel instructions={recipe.instructions} onToggleSpeech={handleToggleSpeech} isSpeaking={isSpeaking} />
        </div>

        {recipe.tips && recipe.tips.length > 0 && (
          <TipsPanel tips={recipe.tips} />
        )}
      </div>
    </motion.div>
  );
};