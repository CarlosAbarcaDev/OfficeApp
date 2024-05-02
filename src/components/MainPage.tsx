import { useEffect, useState } from "react";
import useOfficeStore from "../store/useOfficeAPI";
import CharacterCard from "./CharacterCard";

interface Character {
  id: string;
  name: string;
  gender: string;
  actor: string;
}

const MainPage = () => {
  const { characters, meta, loadCharacters, loading, error } = useOfficeStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadCharacters(currentPage);
  }, [currentPage]);

  const PaginationLink = ({ page, isActive }: {page: number, isActive: boolean}) => (
    <button
      onClick={() => setCurrentPage(page)}
      className={`px-2 py-1 sm:px-4 sm:py-2 ml-1 mt-2 text-gray-600 border rounded-lg focus:outline-none ${
        isActive ? "bg-primary/20 ring ring-primary" : "hover:bg-gray-100"
      }`}
    >
      {page}
    </button>
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); 
  };

  const filteredCharacters = characters.filter((character:Character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <>
      <div className="bg-white mt-5 p-4 rounded-lg mb-4 w-1/3 flex ">
        <h1 className="flex items-center mx-5 text-black font-semibold text-lg" >Look for your favorite character</h1>
        <div className="relative bg-inherit">
          <input
            type="text"
            id="search"
            name="search"
            value={searchTerm}
            onChange={handleSearchChange}
            className="peer bg-transparent h-10 w-72 rounded-lg text-black placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-gray-800 focus:outline-none focus:border-rose-600"
            placeholder="Buscar personaje..."
          />
          
        </div>
      </div>
      <div className="flex p-5">
        <div className="flex flex-wrap justify-start mt-10">
          {filteredCharacters.map((character) => (
            <CharacterCard key={character} character={character} />
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-10 space-x-2">
        {Array.from({ length: meta.pageCount }, (_, index) => (
          <PaginationLink
            key={index + 1}
            page={index + 1}
            isActive={currentPage === index + 1}
          />
        ))}
      </div>
      <div className="flex justify-center mt-10 space-x-2">
        <p className="text-white">
          Page {currentPage} of {meta.pageCount}
        </p>
      </div>
    </>
  );
};

export default MainPage;
