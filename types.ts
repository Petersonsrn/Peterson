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

// FIX: Define and export the User interface to resolve the "has no exported member 'User'" error.
export interface User {
  id: number;
  username: string;
  email: string;
}
