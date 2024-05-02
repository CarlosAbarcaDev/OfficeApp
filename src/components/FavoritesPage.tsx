import { useStore } from "../store/useFavoriteStore";
import useOfficeStore from "../store/useOfficeAPI";
import CharacterCard from "./CharacterCard";
const FavoritesPage = () => {
  const { favorites } = useStore((state) => ({
    favorites: state.favorites,
    removeFavorite: state.removeFavorite,
  }));
  const { loading, error } = useOfficeStore();
  if (loading)
    return (
      <p className="text-5xl text-violet-900 h-screen flex justify-center mt-40 font-bold">
        Loading...
      </p>
    );
  if (error)
    return (
      <p className="text-5xl text-violet-900 h-screen flex justify-center mt-40 font-bold">
        Error: {error}
      </p>
    );
  return (
    <div className=" p-5">
      <div className="flex flex-wrap justify-start mt-10">
        {favorites.length > 0 ? (
          favorites.map((character) => <CharacterCard character={character} />)
        ) : (
          <p className="text-5xl text-violet-900 h-screen flex justify-center mt-40 font-bold">No tienes personajes favoritos.</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
