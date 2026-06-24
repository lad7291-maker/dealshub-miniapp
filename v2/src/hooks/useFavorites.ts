import { useState, useEffect, useCallback } from 'react';
import { trackAddToFavorites, trackRemoveFromFavorites } from '@/lib/analytics';

const STORAGE_KEY = 'smartskidka_favorites';
const MAX_FAVORITES = 100;

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = useCallback((productId: number) => {
    setFavorites((prev) => {
      if (prev.includes(productId)) {
        trackRemoveFromFavorites(productId);
        return prev.filter((id) => id !== productId);
      }
      trackAddToFavorites(productId);
      const next = [...prev, productId];
      if (next.length > MAX_FAVORITES) {
        return next.slice(next.length - MAX_FAVORITES);
      }
      return next;
    });
  }, []);

  const isFavorite = useCallback((productId: number) => favorites.includes(productId), [favorites]);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  return { favorites, toggleFavorite, isFavorite, clearFavorites };
}
