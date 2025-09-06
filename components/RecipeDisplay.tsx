import React, { useState, useRef, useEffect } from 'react';
import { Recipe } from '../types.ts';
import { ClockIcon } from './icons/ClockIcon.tsx';
import { ServingsIcon } from './icons/ServingsIcon.tsx';
import { DifficultyIcon } from './icons/DifficultyIcon.tsx';
import { StarIcon } from './icons/StarIcon.tsx';
import { PrintIcon } from './icons/PrintIcon.tsx';
import { TipIcon } from './icons/TipIcon.tsx';
import { PlayIcon } from './icons/PlayIcon.tsx';
import { CookingView } from './CookingView.tsx';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis.ts';
import { SpeakerIcon } from './icons/SpeakerIcon.tsx';
import { SpeakerOffIcon } from './icons/SpeakerOffIcon.tsx';

interface RecipeDisplayProps {
  recipe: Recipe;
  onToggleFavorite: (recipe: Recipe) => void;
  isFavorite: boolean;
}

export const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe, onToggleFavorite, isFavorite }) => {
  const [showCookingView, setShowCookingView] = useState(false);
  const startCookingButtonRef = useRef<HTMLButtonElement>(null);
  const { isSpeaking, speak, cancel } = useSpeechSynthesis();

  // Gerencia o foco do teclado para acessibilidade.
  // Quando o modal de preparo é aberto, este efeito é ativado.
  // A sua função de limpeza é executada quando o modal é fechado,
  // retornando o foco automaticamente para o botão que o abriu.
  useEffect(() => {
    if (showCookingView) {
      // A função de limpeza é a chave aqui. Ela é chamada quando o componente
      // é desmontado ou quando a dependência (showCookingView) muda.
      return () => {
        startCookingButtonRef.current?.focus();
      };
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
    <div id="recipe-display" className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in">
      <div className="relative">
        <img 
          src={recipe.imageUrl || `https://picsum.photos/seed/${recipe.title.replace(/\s/g, '')}/1200/600`} 
          alt={recipe.title} 
          className="w-full h-64 md:h-96 object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 md:p-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white font-display">{recipe.title}</h2>
          <p className="text-xl text-white/90 mt-2 max-w-3xl">{recipe.description}</p>
        </div>
      </div>

      <div className="p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-8 text-lg text-gray-700">
            <span className="flex items-center gap-2 font-semibold">
              <ClockIcon className="h-8 w-8 text-amber-700" />
              {recipe.prepTime}
            </span>
            <span className="flex items-center gap-2 font-semibold">
              <ServingsIcon className="h-8 w-8 text-amber-700" />
              {recipe.servings}
            </span>
            <span className="flex items-center gap-2 font-semibold">
              <DifficultyIcon className="h-8 w-8 text-amber-700" />
              {recipe.difficulty}
            </span>
          </div>

          <div className="print:hidden flex items-center gap-4">
            <button
              onClick={() => onToggleFavorite(recipe)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-colors ${
                isFavorite 
                ? 'bg-yellow-400 text-yellow-900 hover:bg-yellow-500' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
              aria-label="Toggle Favorite"
            >
              <StarIcon className={`h-8 w-8 ${isFavorite ? 'text-yellow-900' : ''}`} />
              <span>{isFavorite ? 'Salvo' : 'Salvar'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="p-3 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition-colors"
              aria-label="Print Recipe"
            >
              <PrintIcon className="h-8 w-8" />
            </button>
          </div>
        </div>

        <div className="text-center mb-10">
            <button
                ref={startCookingButtonRef}
                onClick={() => setShowCookingView(true)}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-green-700 text-white font-bold text-xl rounded-full hover:bg-green-600 transition-transform hover:scale-105"
            >
                <PlayIcon className="h-7 w-7" />
                <span>Modo de Cozinha</span>
            </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <h3 className="text-3xl font-bold text-amber-900 font-display mb-4 border-b-4 border-amber-300 pb-2">Ingredientes</h3>
            <ul className="space-y-3 text-lg list-none text-gray-800">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="text-amber-700">🍃</span>
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <div className="flex items-center justify-between gap-4 mb-4 border-b-4 border-amber-300 pb-2">
              <h3 className="text-3xl font-bold text-amber-900 font-display">Instruções</h3>
              <button
                  onClick={handleToggleSpeech}
                  className="p-2 rounded-full hover:bg-amber-100 transition-colors"
                  aria-label={isSpeaking ? "Parar leitura das instruções" : "Ler instruções em voz alta"}
              >
                  {isSpeaking ? (
                      <SpeakerOffIcon className="h-9 w-9 text-amber-800" />
                  ) : (
                      <SpeakerIcon className="h-9 w-9 text-gray-800" />
                  )}
              </button>
            </div>
            <ol className="space-y-4 text-lg text-gray-800">
              {recipe.instructions.map((step, index) => (
                <li key={index} className="flex gap-4">
                  <span className="flex-shrink-0 bg-amber-800 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold">{index + 1}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {recipe.tips && recipe.tips.length > 0 && (
          <div className="mt-12 bg-amber-50 p-6 rounded-2xl border-l-8 border-amber-400">
            <h3 className="text-2xl font-bold text-amber-900 font-display mb-3 flex items-center gap-3">
              <TipIcon className="h-7 w-7"/>
              Dicas do Chef
            </h3>
            <ul className="space-y-2 text-lg list-none text-gray-800">
              {recipe.tips.map((tip, index) => (
                 <li key={index} className="flex items-start gap-3">
                    <TipIcon className="h-7 w-7 flex-shrink-0 text-amber-600 mt-1" />
                    <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};