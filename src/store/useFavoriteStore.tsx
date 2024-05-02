import create from "zustand";
interface Character {
  id: string;
  name: string;
  gender: string;
  actor: string;
}

interface FavoriteState {
  favorites: Character[];
  addFavorite: (character: Character) => void;
  removeFavorite: (characterId: string) => void;
}

export const useStore = create<FavoriteState>((set) => ({
  favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),

  addFavorite: (character) =>
    set((state) => {
      const newFavorites = state.favorites.some(
        (fav) => fav.id === character.id
      )
        ? state.favorites
        : [...state.favorites, character];
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return { favorites: newFavorites };
    }),

  removeFavorite: (characterId) =>
    set((state) => {
      const newFavorites = state.favorites.filter(
        (fav) => fav.id !== characterId
      );
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return { favorites: newFavorites };
    }),
}));
