// import React from 'react';
// import { useStore } from '../store/useOfficeAPI';
import { FcBusinesswoman } from "react-icons/fc";
import { FcBusinessman } from "react-icons/fc";
import { useStore } from "../store/useFavoriteStore";

export interface Character {
  id: string;
  name: string;
  actor: string;
  gender: string;
}

const CharacterCard = ({ character }: { character: Character }) => {
  const addFavorite = useStore(state => state.addFavorite);
  const removeFavorite = useStore(state => state.removeFavorite);
  const favorites = useStore(state => state.favorites);
  const isFavorite = favorites.some(fav => fav.id === character.id);
  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(character.id);
    } else {
      addFavorite(character);
    }
  };
  const GenderIcon =
    character.gender === "Male" ? FcBusinessman : FcBusinesswoman;

  return (
    <div className={`py-10 px-5 m-10 max-w-sm mx-auto ${isFavorite ? 'bg-blue-200' : 'bg-white'} rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6`}>
      <GenderIcon size={70} />

      <div className="text-center space-y-2 sm:text-left">
        <div className="space-y-0.5">
          <p className="text-lg text-black font-semibold">{character.name}</p>
          <p className="text-slate-500 font-medium">{character.actor}</p>
        </div>
        <button onClick={toggleFavorite}
          className="px-4 py-1 mr-2 text-sm text-purple-600 font-semibold rounded-full border border-purple-600 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
        >
          {isFavorite ? "Remove" : "Add Fav"}
        </button>
        <a href={`/character/${character.id}`}>
          <button className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-600 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
            More Info
          </button>
        </a>
      </div>
    </div>
  );
};

export default CharacterCard;
