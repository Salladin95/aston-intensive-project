import { useState } from 'react';
import { Movie } from '~/shared/types';

type UseFavoritesHook = {
  favorites: Movie[];
  toggleFavorite: (movie: Movie) => void;
  clearFavorites: () => void;
  isFavorite: (id: Movie) => boolean
  initFavorites: (name?: string) => void
};

export const useFavorites = (username: string | undefined): UseFavoritesHook => {
  const favoritesKey = `${username}_favorites`;

  const getFavorites = (): Movie[] => {
    if (!username) return [];
    return JSON.parse(localStorage.getItem(favoritesKey) || '[]');
  };

  const [favorites, setFavorites] = useState<Movie[]>(getFavorites);


  const isFavorite = (movie: Movie): boolean => {
    return favorites.some((m) => m.imdbID === movie.imdbID)
  };

  const initFavorites = (name?: string) => {
    localStorage.setItem(`${name || username}_favorites`, JSON.stringify([]))
  };

  const toggleFavorite = (movie: Movie) => {
    if (!username) return;

    setFavorites((prevFavorites) => {
      const updatedFavorites = isFavorite(movie)
        ? prevFavorites.filter((m) => movie.imdbID !== m.imdbID)
        : [...prevFavorites, movie];

      localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const clearFavorites = () => {
    if (!username) return;
    localStorage.setItem(favoritesKey, JSON.stringify([]));
    setFavorites([]);
  };

  return { favorites, initFavorites, isFavorite, toggleFavorite, clearFavorites };
};