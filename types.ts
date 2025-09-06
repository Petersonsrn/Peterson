// FIX: Define and export the Recipe interface. The previous content was a misplaced hook.
export interface Recipe {
  title: string;
  description: string;
  prepTime: string;
  servings: string;
  difficulty: string;
  ingredients: string[];
  instructions: string[];
  tips: string[];
  imageUrl: string;
}

// FIX: Define and export the User interface. This was missing, causing an import error.
export interface User {
  id: number;
  username: string;
  email: string;
}
