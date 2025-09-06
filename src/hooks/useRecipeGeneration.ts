import { useState, useCallback } from 'react';
import { Recipe } from '../types';
import { generateRecipe as generateRecipeService } from '../services/geminiService';

interface LastArgs {
  ingredients: string;
  time: string;
  difficulty: string;
}

const updateIngredientHistory = (ingredients: string) => {
  try {
    const history: string[] = JSON.parse(localStorage.getItem('ingredientHistory') || '[]');
    const newItems = ingredients.split(',')
      .map(item => item.trim().toLowerCase())
      .filter(item => item && !history.includes(item));

    if (newItems.length > 0) {
      const updatedHistory = [...new Set([...history, ...newItems])];
      localStorage.setItem('ingredientHistory', JSON.stringify(updatedHistory));
    }
  } catch (e) {
    console.error("Failed to update ingredient history:", e);
  }
};


export const useRecipeGeneration = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastArgs, setLastArgs] = useState<LastArgs | null>(null);

  const generateRecipe = useCallback(async (ingredients: string, time: string, difficulty: string) => {
    if (!ingredients.trim()) {
      setError("Por favor, insira alguns ingredientes.");
      setLastArgs(null);
      return;
    }
    
    setLastArgs({ ingredients, time, difficulty });
    setIsGenerating(true);
    setError(null);
    setRecipe(null);

    document.getElementById('generator-section')?.scrollIntoView({ behavior: 'smooth' });

    try {
      const newRecipe = await generateRecipeService(ingredients, time, difficulty);
      setRecipe(newRecipe);
      updateIngredientHistory(ingredients);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocorreu um erro desconhecido.");
      }
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const generateRecipeFromCategory = useCallback(async (category: string) => {
    const prompt = `Uma receita popular de ${category} que seja fácil e rápida.`;
    await generateRecipe(prompt, 'any', 'Fácil');
  }, [generateRecipe]);

  const retry = useCallback(() => {
    if (lastArgs) {
      generateRecipe(lastArgs.ingredients, lastArgs.time, lastArgs.difficulty);
    }
  }, [lastArgs, generateRecipe]);
  
  const canRetry = lastArgs !== null;

  return { 
    recipe, 
    isGenerating, 
    error, 
    generateRecipe, 
    generateRecipeFromCategory, 
    retry: canRetry ? retry : undefined,
    setError 
  };
};
