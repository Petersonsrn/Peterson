import React from 'react';
import { Header } from './components/Header.tsx';
import { RecipeGenerator } from './components/RecipeGenerator.tsx';
import { RecipeDisplay } from './components/RecipeDisplay.tsx';
import { Favorites } from './components/Favorites.tsx';
import { Footer } from './components/Footer.tsx';
import { ErrorDisplay } from './components/ErrorDisplay.tsx';
import { InitialInspiration } from './components/InitialInspiration.tsx';
import { useRecipeGeneration } from './hooks/useRecipeGeneration.ts';
import { useLocalStorage } from './hooks/useLocalStorage.ts';
import { Recipe } from './types.ts';

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
    <div className="flex flex-col min-h-screen font-sans">
      <Header />

      <main className="container mx-auto px-4 py-8 md:py-12 flex-grow">
        <RecipeGenerator generateRecipe={generateRecipe} isGenerating={isGenerating} />

        {error && <ErrorDisplay error={error} onRetry={retry} onDismiss={() => setError(null)} />}

        {recipe && !isGenerating && !error && (
          <div className="mt-20">
            <RecipeDisplay 
              recipe={recipe} 
              onToggleFavorite={handleToggleFavorite}
              isFavorite={isFavorite(recipe)}
            />
          </div>
        )}

        {!recipe && !isGenerating && !error && (
          <div id="initial-inspiration-section" className="mt-20">
            <InitialInspiration onCategoryClick={generateRecipeFromCategory} />
          </div>
        )}

        <Favorites
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={isFavorite}
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;