import React, { useState } from 'react';
import { Header } from './components/Header';
import { RecipeGenerator } from './components/RecipeGenerator';
import { RecipeDisplay } from './components/RecipeDisplay';
import { Favorites } from './components/Favorites';
import { Footer } from './components/Footer';
import { ErrorDisplay } from './components/ErrorDisplay';
import { InitialInspiration } from './components/InitialInspiration';
import { useRecipeGeneration } from './hooks/useRecipeGeneration';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Recipe } from './types';

function App() {
  const { recipe, isGenerating, error, generateRecipe, generateRecipeFromCategory, retry, setError } = useRecipeGeneration();
  const [favorites, setFavorites] = useLocalStorage<Recipe[]>('favoriteRecipes', []);

  const isFavorite = (recipeToCheck: Recipe) => {
    return favorites.some(fav => fav.title === recipeToCheck.title);
  };

  const handleToggleFavorite = (recipeToToggle: Recipe) => {
    if (isFavorite(recipeToToggle)) {
      setFavorites(prev => prev.filter(r => r.title !== recipeToToggle.title));
    } else {
      setFavorites(prev => [...prev, recipeToToggle]);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-amber-50 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12 flex-grow">
        <RecipeGenerator generateRecipe={generateRecipe} isGenerating={isGenerating} />

        {error && <ErrorDisplay error={error} onRetry={retry} onDismiss={() => setError(null)} />}

        {recipe && !isGenerating && !error && (
          <div className="mt-12">
            <RecipeDisplay 
              recipe={recipe} 
              onToggleFavorite={handleToggleFavorite}
              isFavorite={isFavorite(recipe)}
            />
          </div>
        )}

        {!recipe && !isGenerating && !error && (
          <div className="mt-12">
            <InitialInspiration onCategoryClick={generateRecipeFromCategory} />
          </div>
        )}

        {favorites.length > 0 && (
          <Favorites
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            isFavorite={isFavorite}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
