import { Recipe, User } from '../types';

const API_BASE_URL = '/api';

// Helper function to get authorization headers with the JWT token.
const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

// Helper function to handle API responses and errors.
const handleResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Ocorreu um erro no servidor.');
  }
  return data;
};

// API functions for user authentication.
export const registerUser = async (credentials: any): Promise<{ token: string; user: User }> => {
  const response = await fetch(`${API_BASE_URL}/users/register`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(credentials),
  });
  return handleResponse(response);
};

export const loginUser = async (credentials: any): Promise<{ token: string; user: User }> => {
  const response = await fetch(`${API_BASE_URL}/users/login`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(credentials),
  });
  return handleResponse(response);
};

export const getUserProfile = async (): Promise<{ user: User }> => {
  const response = await fetch(`${API_BASE_URL}/users/profile`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

// API functions for managing favorite recipes.
export const getFavoriteRecipes = async (): Promise<Recipe[]> => {
    const response = await fetch(`${API_BASE_URL}/recipes/favorites`, {
        method: 'GET',
        headers: getAuthHeaders(),
    });
    return handleResponse(response);
};

export const addFavoriteRecipe = async (recipe: Recipe): Promise<Recipe> => {
    const response = await fetch(`${API_BASE_URL}/recipes/favorites`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(recipe),
    });
    return handleResponse(response);
};

export const removeFavoriteRecipe = async (recipeTitle: string) => {
    const response = await fetch(`${API_BASE_URL}/recipes/favorites`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
        body: JSON.stringify({ title: recipeTitle }),
    });
    return handleResponse(response);
};
