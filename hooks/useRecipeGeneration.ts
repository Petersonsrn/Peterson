import { useState, useCallback } from 'react';
import { Recipe } from '../types';
import { generateRecipe as generateRecipeService } from '../services/geminiService';

interface LastArgs {
  ingredients: string;
  time: string;
  difficulty: string;
}

// Helper function to update the ingredient history in localStorage
const updateIngredientHistory = (ingredients: string) => {
  try {
    const history: string[] = JSON.parse(localStorage.getItem('ingredientHistory') || '[]');
    const newItems = ingredients.split(',')
      .map(item => item.trim().toLowerCase())
      // Filter out empty strings and items already in history
      .filter(item => item && !history.includes(item));

    if (newItems.length > 0) {
      // Add new items and ensure the list is unique
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
    setRecipe(null); // Clear previous recipe

    // Scroll to the generator section when generation starts
    document.getElementById('generator-section')?.scrollIntoView({ behavior: 'smooth' });

    try {
      const newRecipe = await generateRecipeService(ingredients, time, difficulty);
      setRecipe(newRecipe);
      // Save ingredients to history ONLY on successful generation
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
    // For categories, default to 'Easy' difficulty.
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