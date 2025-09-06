import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
    <div className="flex flex-col min-h-screen font-sans">
      <Header />

      <main className="container mx-auto px-4 py-8 md:py-16 flex-grow">
        <RecipeGenerator generateRecipe={generateRecipe} isGenerating={isGenerating} />

        <AnimatePresence mode="wait">
          {error && <ErrorDisplay key="error" error={error} onRetry={retry} onDismiss={() => setError(null)} />}

          {recipe && !isGenerating && !error && (
            <motion.div 
              className="mt-24"
              key={recipe.title} // A chave garante que AnimatePresence detecte a mudança
            >
              <RecipeDisplay
                recipe={recipe}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={isFavorite(recipe)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {!recipe && !isGenerating && !error && (
          <div id="initial-inspiration-section" className="mt-24">
            <InitialInspiration onCategoryClick={generateRecipeFromCategory} />
          </div>
        )}

        <div className="mt-24">
          <Favorites
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            isFavorite={isFavorite}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;