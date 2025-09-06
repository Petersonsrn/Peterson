import { useState, useEffect, useCallback } from 'react';

const MAX_SUGGESTIONS = 5;

const getCurrentTerm = (value: string): string => {
  return value.split(',').pop()?.trim().toLowerCase() || '';
};

export const useIngredientSuggestions = () => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    try {
      const savedHistory = JSON.parse(localStorage.getItem('ingredientHistory') || '[]');
      setHistory(savedHistory);
    } catch (e) {
      console.error("Failed to load ingredient history:", e);
      setHistory([]);
    }
  }, []);

  const updateSuggestions = useCallback((inputValue: string) => {
    if (inputValue.length < 2) {
      setSuggestions([]);
      return;
    }

    const currentTerm = getCurrentTerm(inputValue);
    if (currentTerm) {
      const filtered = history
        .filter(item =>
          item.toLowerCase().startsWith(currentTerm) &&
          !inputValue.toLowerCase().includes(item.toLowerCase())
        )
        .slice(0, MAX_SUGGESTIONS);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [history]);

  const clearSuggestions = () => {
    setSuggestions([]);
  };

  return { suggestions, updateSuggestions, clearSuggestions };
};
